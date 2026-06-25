// ─── Environment ─────────────────────────────────────────────────────────────
// Load .env only in non-production environments (i.e. local dev).
// On Render, NODE_ENV is set to "production" and env vars are injected
// directly by the platform — dotenv must NOT override them.
if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config(); // loads .env from the current working directory
}

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

// ─── Runtime environment summary (printed once at startup) ───────────────────
// Helps you instantly see what Render actually loaded — never log SMTP_PASS.
const ENV = process.env.NODE_ENV || "development";
console.log("════════════════════════════════════════════════");
console.log(`  portfolio-contact-api  |  NODE_ENV=${ENV}`);
console.log("════════════════════════════════════════════════");
console.log(`  SMTP_HOST      : ${process.env.SMTP_HOST || "(not set)"}`);
console.log(`  SMTP_PORT      : ${process.env.SMTP_PORT || "(not set)"}`);
console.log(`  SMTP_SECURE    : ${process.env.SMTP_SECURE || "(not set)"}`);
console.log(`  SMTP_USER      : ${process.env.SMTP_USER || "(not set)"}`);
console.log(`  SMTP_PASS      : ${process.env.SMTP_PASS ? "✓ (set)" : "(not set)"}`);
console.log(`  MAIL_FROM      : ${process.env.MAIL_FROM || "(not set)"}`);
console.log(
  `  CONTACT_TARGET : ${process.env.CONTACT_TARGET_EMAIL || "(defaults to SMTP_USER)"}`
);
console.log(`  FRONTEND_ORIGINS: ${process.env.FRONTEND_ORIGINS || "(defaults)"}`);
console.log("════════════════════════════════════════════════");

// ─── App bootstrap ────────────────────────────────────────────────────────────
const app = express();
const PORT = Number(process.env.PORT || 5000);

const FRONTEND_ORIGINS = (
  process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:8080,http://localhost:5173,http://localhost:4173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

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
  if (!name || !email || !message) {
    return "Please provide name, email, and message.";
  }
  if (!isValidEmail(email)) {
    return "Please provide a valid email address.";
  }
  if (name.length > 120) {
    return "Name is too long (max 120 characters).";
  }
  if (message.length > 4000) {
    return "Message is too long (max 4000 characters).";
  }
  return null;
};

// ─── SMTP transporter factory ─────────────────────────────────────────────────
//
// Gmail SMTP recommendations for production (Nodemailer docs):
//
//   Port 465  →  secure: true   (implicit TLS/SSL from the start)
//   Port 587  →  secure: false  (STARTTLS upgrade — Render often blocks this)
//
// WHY port 465 is preferred on Render:
//   Render's network (like most cloud PaaS) frequently blocks outbound
//   connections on port 587 (STARTTLS) due to anti-spam policies.
//   Port 465 (SMTPS) uses implicit SSL from byte-1 and is more reliably
//   open on managed hosting because it looks like normal HTTPS traffic
//   on an alternate port.
//
// requireTLS on port 465:
//   Not needed (TLS is implicit). On port 587 it enforces STARTTLS upgrade.
//   We detect the port and set flags accordingly.
//
const buildTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[SMTP] One or more required env vars are missing: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS"
    );
    return null;
  }

  const port = Number(SMTP_PORT);

  // Port 465 = implicit TLS (SMTPS). Port 587/25 = STARTTLS.
  const isImplicitTLS = port === 465;

  const transportConfig = {
    host: SMTP_HOST,
    port,

    // true  → connect with TLS immediately (port 465)
    // false → plain TCP then STARTTLS upgrade (port 587)
    secure: isImplicitTLS,

    // Only force STARTTLS on non-SSL ports; irrelevant on port 465.
    requireTLS: !isImplicitTLS,

    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },

    // Generous timeouts for cloud environments with higher network latency.
    connectionTimeout: 30_000, // 30 s — TCP connect
    greetingTimeout: 30_000,   // 30 s — wait for "220 smtp.gmail.com ESMTP"
    socketTimeout: 60_000,     // 60 s — idle socket before kill

    tls: {
      // Must be true in production — rejectUnauthorized:false hides real
      // TLS problems and is a security risk. Gmail's cert is valid; if this
      // fails it means something else is wrong.
      rejectUnauthorized: true,

      // Minimum TLS version accepted. Gmail supports TLS 1.2+.
      minVersion: "TLSv1.2",
    },

    // Print every SMTP command/response to stdout so Render logs show the
    // exact point of failure (handshake, AUTH, DATA, etc.).
    logger: true,
    debug: true,
  };

  console.log(
    `[SMTP] Transporter built → ${SMTP_HOST}:${port} | secure=${isImplicitTLS} | requireTLS=${!isImplicitTLS}`
  );

  return nodemailer.createTransport(transportConfig);
};

// ─── Detailed SMTP error logger ───────────────────────────────────────────────
// Prints every field Nodemailer attaches to SMTP errors.
// This makes it trivially easy to tell:
//   ETIMEDOUT  → Render cannot reach the host (network block)
//   EAUTH      → wrong credentials / app-password not set
//   ECONNRESET → TLS negotiation failed
const logSmtpError = (label, error) => {
  console.error(`\n${"═".repeat(60)}`);
  console.error(`  SMTP ERROR — ${label}`);
  console.error(`${"─".repeat(60)}`);
  console.error(`  message      : ${error.message}`);
  console.error(`  code         : ${error.code}`);
  console.error(`  command      : ${error.command}`);
  console.error(`  response     : ${error.response}`);
  console.error(`  responseCode : ${error.responseCode}`);
  console.error(`${"─".repeat(60)}`);
  console.error("  Stack trace:");
  console.error(error.stack);
  console.error(`${"═".repeat(60)}\n`);

  // ── Network diagnosis hint ──────────────────────────────────────────────
  if (error.code === "ETIMEDOUT" && error.command === "CONN") {
    console.error(
      "[DIAGNOSIS] TCP connection to SMTP server timed out during initial connect.\n" +
        "  This is a NETWORK-LEVEL block — NOT a credentials or TLS issue.\n" +
        "  Render's free tier commonly blocks outbound SMTP on ports 25, 465, 587.\n" +
        "  Next steps:\n" +
        "    1. Try switching SMTP_PORT from 587 → 465 (SMTPS) and redeploy.\n" +
        "    2. Check Render's outbound firewall docs / upgrade to a paid plan.\n" +
        "    3. Use the /api/smtp-test endpoint to confirm via JSON.\n"
    );
  }

  if (error.code === "EAUTH") {
    console.error(
      "[DIAGNOSIS] SMTP authentication failed.\n" +
        "  Check that SMTP_PASS is a 16-character Gmail App Password\n" +
        "  (not your regular Gmail password) and that 2FA is enabled.\n"
    );
  }
};

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no Origin header (curl, Render health-checks, etc.).
      if (!origin) {
        callback(null, true);
        return;
      }
      if (FRONTEND_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "1mb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/health — basic liveness check
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-contact-api",
    env: ENV,
    smtpConfigured: Boolean(
      process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS
    ),
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/smtp-test
// ─────────────────────────────────────────────────────────────────────────────
// TEMPORARY diagnostic endpoint.
// Call this from your browser or curl immediately after deployment to confirm
// whether Render can reach smtp.gmail.com at all.
//
//   curl https://<your-render-service>.onrender.com/api/smtp-test
//
// Possible responses:
//   { ok: true,  message: "SMTP connection verified." }
//     → Network is open, credentials are correct. The problem is elsewhere.
//
//   { ok: false, code: "ETIMEDOUT", command: "CONN", ... }
//     → Render cannot establish a TCP connection. This is a network-level
//       block. No amount of configuration changes will fix it.
//
//   { ok: false, code: "EAUTH", ... }
//     → Network is open but credentials are wrong.
//
app.get("/api/smtp-test", async (_req, res) => {
  const transporter = buildTransporter();

  if (!transporter) {
    return res.status(503).json({
      ok: false,
      error: "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.",
    });
  }

  try {
    console.log("[smtp-test] Running transporter.verify() …");
    await transporter.verify();
    console.log("[smtp-test] ✓ SMTP connection verified successfully.");

    return res.json({
      ok: true,
      message: "SMTP connection verified. Gmail SMTP is reachable from this server.",
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
    });
  } catch (error) {
    logSmtpError("smtp-test endpoint", error);

    return res.status(500).json({
      ok: false,
      error: "SMTP verification failed.",
      // Safe fields to expose — never expose SMTP_PASS or full stack in HTTP response.
      code: error.code,
      command: error.command,
      message: error.message,
      response: error.response,
      responseCode: error.responseCode,
      diagnosis:
        error.code === "ETIMEDOUT" && error.command === "CONN"
          ? "TCP connection timed out. Render cannot reach the SMTP host on this port. This is a network-level block, not a configuration error."
          : error.code === "EAUTH"
          ? "Authentication failed. Check your Gmail App Password (SMTP_PASS)."
          : "Unknown SMTP error — see Render logs for full stack trace.",
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact — main contact form endpoint (unchanged functionality)
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    // 1. Normalise + validate input
    const payload = normalizeContactPayload(req.body);
    const validationError = validateContactPayload(payload);
    if (validationError) {
      return res.status(400).json({ ok: false, error: validationError });
    }

    // 2. Build transporter & guard against missing config
    const transport = buildTransporter();
    const targetEmail =
      process.env.CONTACT_TARGET_EMAIL || process.env.SMTP_USER;

    if (!transport || !targetEmail) {
      return res.status(503).json({
        ok: false,
        error:
          "Mail service is not configured. Add SMTP env vars to start sending emails.",
      });
    }

    // 3. Verify SMTP connectivity before attempting to send.
    //    This gives us a fast, descriptive failure instead of a 60-second timeout.
    console.log("[contact] Verifying SMTP connection …");
    await transport.verify();
    console.log("[contact] ✓ SMTP connection verified.");

    // 4. Send notification to portfolio owner
    await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
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

    // 5. Send auto-reply to the user
    await transport.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: payload.email,
      subject: `Thanks for reaching out, ${payload.name}!`,
      text: `Hi ${payload.name},\n\nThank you for contacting me! I have received your message and will get back to you very soon.\n\nIn the meantime, feel free to connect with me on LinkedIn: https://www.linkedin.com/in/vivek-chaurasiya-722037315\n\nBest regards,\nVivek Chaurasiya`,
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
      `[contact] ✓ Emails sent — to: ${targetEmail}, reply: ${payload.email}`
    );
    return res.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    logSmtpError("POST /api/contact", error);
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
