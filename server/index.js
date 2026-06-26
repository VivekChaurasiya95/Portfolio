// ─── Environment ──────────────────────────────────────────────────────────────
// On Render, NODE_ENV=production and env vars are injected by the platform.
// dotenv must only run locally so it never overrides platform-injected vars.
if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// ─── Constants ────────────────────────────────────────────────────────────────
const ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT || 5000);

const FRONTEND_ORIGINS = (
  process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:8080,http://localhost:5173,http://localhost:4173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// ─── Startup diagnostics ──────────────────────────────────────────────────────
// Printed once at boot so Render logs immediately show which env vars loaded.
// NEVER log secret values.
const GMAIL_API_READY = Boolean(
  process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN &&
    process.env.GMAIL_USER
);
const SMTP_READY = Boolean(
  process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
);

console.log("═".repeat(56));
console.log(`  portfolio-contact-api  |  NODE_ENV=${ENV}`);
console.log("═".repeat(56));
console.log(`  Transport mode  : ${GMAIL_API_READY ? "Gmail REST API (HTTPS ✓)" : SMTP_READY ? "SMTP (local only)" : "⚠ NOT CONFIGURED"}`);
console.log("─".repeat(56));
console.log("  Gmail API vars:");
console.log(`    GMAIL_USER          : ${process.env.GMAIL_USER || "(not set)"}`);
console.log(`    GMAIL_CLIENT_ID     : ${process.env.GMAIL_CLIENT_ID ? "✓ (set)" : "(not set)"}`);
console.log(`    GMAIL_CLIENT_SECRET : ${process.env.GMAIL_CLIENT_SECRET ? "✓ (set)" : "(not set)"}`);
console.log(`    GMAIL_REFRESH_TOKEN : ${process.env.GMAIL_REFRESH_TOKEN ? "✓ (set)" : "(not set)"}`);
console.log("─".repeat(56));
console.log("  SMTP vars (local dev fallback):");
console.log(`    SMTP_HOST : ${process.env.SMTP_HOST || "(not set)"}`);
console.log(`    SMTP_PORT : ${process.env.SMTP_PORT || "(not set)"}`);
console.log(`    SMTP_USER : ${process.env.SMTP_USER || "(not set)"}`);
console.log(`    SMTP_PASS : ${process.env.SMTP_PASS ? "✓ (set)" : "(not set)"}`);
console.log("─".repeat(56));
console.log(`  CONTACT_TARGET : ${process.env.CONTACT_TARGET_EMAIL || "(defaults to sender)"}`);
console.log(`  MAIL_FROM      : ${process.env.MAIL_FROM || "(not set)"}`);
console.log(`  FRONTEND_ORIGINS: ${FRONTEND_ORIGINS.join(", ")}`);
console.log("═".repeat(56));

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ─── Helpers ──────────────────────────────────────────────────────────────────
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

const normalizeContactPayload = (body = {}) => ({
  name: String(body.name || "").trim(),
  email: String(body.email || "").trim(),
  message: String(body.message || "").trim(),
});

const validateContactPayload = ({ name, email, message }) => {
  if (!name || !email || !message)
    return "Please provide name, email, and message.";
  if (!isValidEmail(email)) return "Please provide a valid email address.";
  if (name.length > 120) return "Name is too long (max 120 characters).";
  if (message.length > 4000) return "Message is too long (max 4000 characters).";
  return null;
};

// ─── Error logger (works for both Gmail API and SMTP errors) ──────────────────
const logMailError = (label, error) => {
  console.error(`\n${"═".repeat(60)}`);
  console.error(`  MAIL ERROR — ${label}`);
  console.error(`${"─".repeat(60)}`);
  // SMTP-specific fields (nodemailer)
  console.error(`  message      : ${error.message}`);
  console.error(`  code         : ${error.code}`);
  console.error(`  command      : ${error.command}`);
  console.error(`  response     : ${error.response}`);
  console.error(`  responseCode : ${error.responseCode}`);
  // Gmail API-specific fields
  if (error.status) console.error(`  http status  : ${error.status}`);
  if (error.errors) console.error(`  api errors   : ${JSON.stringify(error.errors)}`);
  console.error(`${"─".repeat(60)}`);
  console.error("  Stack trace:");
  console.error(error.stack);
  console.error(`${"═".repeat(60)}\n`);

  // Plain-English diagnosis
  if (error.code === "ETIMEDOUT" && error.command === "CONN") {
    console.error(
      "[DIAGNOSIS] TCP connection to SMTP timed out — this is a NETWORK-LEVEL block.\n" +
        "  Render's free tier blocks outbound SMTP on ports 25, 465, 587.\n" +
        "  Fix: configure Gmail REST API env vars (GMAIL_CLIENT_ID etc.) so email\n" +
        "  is sent over HTTPS (port 443) instead of raw SMTP.\n"
    );
  }
  if (error.code === "EAUTH") {
    console.error(
      "[DIAGNOSIS] SMTP authentication failed.\n" +
        "  Ensure SMTP_PASS is a 16-char Gmail App Password (not your login password).\n" +
        "  2-Step Verification must be enabled on your Google account.\n"
    );
  }
  if (error.status === 401) {
    console.error(
      "[DIAGNOSIS] Gmail API returned HTTP 401 Unauthorized.\n" +
        "  Check GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN.\n" +
        "  The refresh token may have expired — re-generate it from OAuth Playground.\n"
    );
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// TRANSPORT A — Gmail REST API (HTTPS, port 443)
// ─────────────────────────────────────────────────────────────────────────────
// WHY: Render's free tier blocks outbound TCP on all SMTP ports (25, 465, 587).
// The Gmail REST API uses HTTPS (port 443) which is always open.
// This is still Gmail — same sender address, same inbox — just using the API
// instead of raw SMTP sockets.
//
// Required env vars on Render:
//   GMAIL_USER           — your Gmail address (e.g. you@gmail.com)
//   GMAIL_CLIENT_ID      — from Google Cloud Console → OAuth 2.0 Client
//   GMAIL_CLIENT_SECRET  — from Google Cloud Console → OAuth 2.0 Client
//   GMAIL_REFRESH_TOKEN  — from OAuth Playground (one-time setup)
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Build an authorized OAuth2 client for the Gmail API.
 */
const buildOAuth2Client = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    // This must match the redirect URI you set in Google Cloud Console.
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  return oauth2Client;
};

/**
 * Build a RFC 2822 raw email message and base64url-encode it for the Gmail API.
 * Gmail API requires this format: https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send
 */
const buildRawMessage = ({ from, to, replyTo, subject, text, html }) => {
  const boundary = `----=_Part_${Date.now().toString(36)}`;

  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    // RFC 2047 encoded subject handles special characters and non-ASCII safely.
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const textPart = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    text || "",
  ].join("\r\n");

  const htmlPart = [
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "",
    html || "",
    "",
    `--${boundary}--`,
  ].join("\r\n");

  const fullMessage = [headers, "", textPart, "", htmlPart].join("\r\n");
  return Buffer.from(fullMessage).toString("base64url");
};

/**
 * Send one email via Gmail REST API (HTTPS).
 */
const sendViaGmailAPI = async (mailOptions) => {
  const auth = buildOAuth2Client();
  const gmail = google.gmail({ version: "v1", auth });
  const raw = buildRawMessage(mailOptions);
  const result = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
  console.log(`[gmail-api] ✓ Sent — Gmail message id: ${result.data.id}`);
  return result.data;
};

// ═════════════════════════════════════════════════════════════════════════════
// TRANSPORT B — SMTP via Nodemailer (local development fallback)
// ─────────────────────────────────────────────────────────────────────────────
// Only used when Gmail API env vars are NOT set.
// Works perfectly on localhost; blocked by Render free tier.
// ═════════════════════════════════════════════════════════════════════════════

const buildSMTPTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  const port = Number(SMTP_PORT);
  const isImplicitTLS = port === 465; // port 465 = SMTPS, port 587 = STARTTLS

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: isImplicitTLS,
    requireTLS: !isImplicitTLS,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 30_000,
    greetingTimeout: 30_000,
    socketTimeout: 60_000,
    tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" },
    logger: true,
    debug: true,
  });
};

// ─── Unified sendMail ─────────────────────────────────────────────────────────
// Chooses the right transport automatically based on which env vars are present.
const sendMail = async (mailOptions) => {
  if (GMAIL_API_READY) {
    console.log("[mail] Transport: Gmail REST API (HTTPS)");
    return sendViaGmailAPI(mailOptions);
  }
  if (SMTP_READY) {
    console.log("[mail] Transport: SMTP (local dev fallback)");
    const transporter = buildSMTPTransporter();
    await transporter.verify();
    return transporter.sendMail(mailOptions);
  }
  throw Object.assign(
    new Error("No email transport configured. Set GMAIL_* or SMTP_* env vars."),
    { code: "ENOTCONFIGURED" }
  );
};

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) { callback(null, true); return; }
      if (FRONTEND_ORIGINS.includes(origin)) { callback(null, true); return; }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "1mb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/health
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-contact-api",
    env: ENV,
    transport: GMAIL_API_READY ? "gmail-api" : SMTP_READY ? "smtp" : "none",
    gmailApiConfigured: GMAIL_API_READY,
    smtpConfigured: SMTP_READY,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/smtp-test   (kept for backward compat — now tests active transport)
// GET /api/email-test  (canonical name)
// ─────────────────────────────────────────────────────────────────────────────
// Diagnostic endpoint — call this right after Render deploys:
//   curl https://<your-service>.onrender.com/api/email-test
//
// Returns:
//   { ok: true }                         → email sending works end-to-end
//   { ok: false, code: "ETIMEDOUT" }     → Render network block (SMTP only)
//   { ok: false, code: "EAUTH" }         → wrong credentials
//   { ok: false, code: "ENOTCONFIGURED"} → no env vars set at all
// ─────────────────────────────────────────────────────────────────────────────
const emailTestHandler = async (_req, res) => {
  if (!GMAIL_API_READY && !SMTP_READY) {
    return res.status(503).json({
      ok: false,
      code: "ENOTCONFIGURED",
      error:
        "No email transport is configured. Set GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / " +
        "GMAIL_REFRESH_TOKEN / GMAIL_USER for production (Render), or SMTP_* for local dev.",
    });
  }

  try {
    if (GMAIL_API_READY) {
      console.log("[email-test] Testing Gmail REST API connectivity …");
      // A lightweight API call — just fetch profile, no email sent.
      const auth = buildOAuth2Client();
      const gmail = google.gmail({ version: "v1", auth });
      const profile = await gmail.users.getProfile({ userId: "me" });
      console.log("[email-test] ✓ Gmail API reachable. Account:", profile.data.emailAddress);
      return res.json({
        ok: true,
        transport: "gmail-api",
        message: "Gmail REST API is reachable and credentials are valid.",
        emailAddress: profile.data.emailAddress,
        messagesTotal: profile.data.messagesTotal,
      });
    }

    // SMTP fallback test
    console.log("[email-test] Testing SMTP connectivity …");
    const transporter = buildSMTPTransporter();
    await transporter.verify();
    console.log("[email-test] ✓ SMTP connection verified.");
    return res.json({
      ok: true,
      transport: "smtp",
      message: "SMTP connection verified. Gmail SMTP is reachable from this server.",
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
    });
  } catch (error) {
    logMailError("email-test endpoint", error);
    return res.status(500).json({
      ok: false,
      transport: GMAIL_API_READY ? "gmail-api" : "smtp",
      code: error.code,
      status: error.status,
      message: error.message,
      // SMTP-specific
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      // Gmail API-specific
      errors: error.errors,
      diagnosis: (() => {
        if (error.code === "ETIMEDOUT" && error.command === "CONN")
          return "TCP connection timed out. Render cannot reach the SMTP host on this port. This is a network-level block. Switch to Gmail REST API transport.";
        if (error.code === "EAUTH")
          return "SMTP authentication failed. Check your Gmail App Password.";
        if (error.status === 401)
          return "Gmail API auth failed. Regenerate your refresh token at https://developers.google.com/oauthplayground";
        if (error.status === 403)
          return "Gmail API access denied. Ensure Gmail API is enabled in Google Cloud Console and the OAuth scope includes https://www.googleapis.com/auth/gmail.send";
        return "Unknown error — see Render logs for full stack trace.";
      })(),
    });
  }
};

app.get("/api/email-test", emailTestHandler);
app.get("/api/smtp-test", emailTestHandler); // backward-compatible alias

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact — contact form (functionality 100% preserved)
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    // 1. Validate
    const payload = normalizeContactPayload(req.body);
    const validationError = validateContactPayload(payload);
    if (validationError) {
      return res.status(400).json({ ok: false, error: validationError });
    }

    // 2. Resolve sender & target
    const senderAddress =
      process.env.GMAIL_USER ||
      process.env.MAIL_FROM ||
      process.env.SMTP_USER;
    const targetEmail =
      process.env.CONTACT_TARGET_EMAIL || senderAddress;

    if (!senderAddress || !targetEmail) {
      return res.status(503).json({
        ok: false,
        error:
          "Mail service is not configured. " +
          "Set GMAIL_USER (and other GMAIL_* vars) on Render, " +
          "or SMTP_* vars for local dev.",
      });
    }

    const fromAddress = process.env.MAIL_FROM || senderAddress;

    // 3. Send notification to portfolio owner
    console.log(`[contact] Sending notification → ${targetEmail}`);
    await sendMail({
      from: fromAddress,
      to: targetEmail,
      replyTo: payload.email,
      subject: `Portfolio message from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 4. Send auto-reply to the user
    console.log(`[contact] Sending auto-reply → ${payload.email}`);
    await sendMail({
      from: fromAddress,
      to: payload.email,
      subject: `Thanks for reaching out, ${payload.name}!`,
      text:
        `Hi ${payload.name},\n\n` +
        `Thank you for contacting me! I have received your message and will get back to you very soon.\n\n` +
        `In the meantime, feel free to connect with me on LinkedIn: https://www.linkedin.com/in/vivek-chaurasiya-722037315\n\n` +
        `Best regards,\nVivek Chaurasiya`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Hi ${escapeHtml(payload.name)},</h2>
          <p>Thank you for contacting me through my portfolio! I have received your message and will get back to you very soon.</p>
          <p>In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/vivek-chaurasiya-722037315" style="color: #0077b5; text-decoration: none; font-weight: bold;">LinkedIn</a>.</p>
          <br/>
          <p>Best regards,<br/><strong>Vivek Chaurasiya</strong></p>
        </div>
      `,
    });

    console.log(
      `[contact] ✓ Both emails sent — owner: ${targetEmail}, visitor: ${payload.email}`
    );
    return res.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    logMailError("POST /api/contact", error);
    return res
      .status(500)
      .json({ ok: false, error: "Failed to send message. Please try again." });
  }
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ ok: false, error: "Invalid JSON payload." });
  }
  if (err?.message === "Origin not allowed by CORS") {
    return res.status(403).json({ ok: false, error: "Request origin is not allowed." });
  }
  console.error("Unhandled API error:", err);
  return res.status(500).json({ ok: false, error: "Internal server error." });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[server] Listening on port ${PORT}`);
  console.log(`[server] Allowed origins: ${FRONTEND_ORIGINS.join(", ")}`);
});
