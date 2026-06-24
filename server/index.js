import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = Number(process.env.PORT || 5000);
const FRONTEND_ORIGINS = (
  process.env.FRONTEND_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:8080,http://localhost:5173,http://localhost:4173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
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

app.use(
  cors({
    origin(origin, callback) {
      // Allow tools and non-browser clients without Origin header.
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
  }),
);
app.use(express.json({ limit: "1mb" }));

const createTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-contact-api",
    smtpConfigured: Boolean(
      process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER,
    ),
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const payload = normalizeContactPayload(req.body);
    const validationError = validateContactPayload(payload);
    if (validationError) {
      return res.status(400).json({
        ok: false,
        error: validationError,
      });
    }

    const transport = createTransport();
    const targetEmail =
      process.env.CONTACT_TARGET_EMAIL || process.env.SMTP_USER;

    if (!transport || !targetEmail) {
      return res.status(503).json({
        ok: false,
        error:
          "Mail service is not configured. Add SMTP env vars to start sending emails.",
      });
    }

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

    // Send auto-reply to the user
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

    return res.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return res
      .status(500)
      .json({ ok: false, error: "Failed to send message. Please try again." });
  }
});

app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({
      ok: false,
      error: "Invalid JSON payload.",
    });
  }

  if (err?.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      ok: false,
      error: "Request origin is not allowed.",
    });
  }

  console.error("Unhandled API error:", err);
  return res.status(500).json({
    ok: false,
    error: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
  console.log(`Allowed frontend origins: ${FRONTEND_ORIGINS.join(", ")}`);
});
