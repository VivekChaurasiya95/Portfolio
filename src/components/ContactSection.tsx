import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Clock, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAIL_ADDRESS } from "@/data/siteLinks";

// ─── EmailJS configuration ────────────────────────────────────────────────────
// All values come from Vite environment variables (import.meta.env).
// Never hard-code IDs here — set them in .env (locally) or in Vercel's
// "Environment Variables" dashboard (production).
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env
  .VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmitStatus {
  type: "success" | "error";
  text: string;
}

interface EmailJSError {
  status?: number;
  text?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

const validateForm = (data: FormData): string | null => {
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name) return "Please enter your name.";
  if (name.length > 120) return "Name is too long (max 120 characters).";
  if (!email) return "Please enter your email address.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!message) return "Please enter a message.";
  if (message.length > 4000) return "Message is too long (max 4000 characters).";
  return null;
};

// ─── EmailJS helpers ──────────────────────────────────────────────────────────
const checkEmailJSConfig = (): string | null => {
  if (!EMAILJS_SERVICE_ID) return "VITE_EMAILJS_SERVICE_ID is not set.";
  if (!EMAILJS_TEMPLATE_ID) return "VITE_EMAILJS_TEMPLATE_ID is not set.";
  if (!EMAILJS_PUBLIC_KEY) return "VITE_EMAILJS_PUBLIC_KEY is not set.";
  return null;
};

/**
 * Send the main notification email to the portfolio owner.
 * Template variables expected: {{from_name}}, {{from_email}}, {{message}}
 */
const sendContactEmail = (data: FormData): Promise<void> =>
  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name.trim(),
        from_email: data.email.trim(),
        message: data.message.trim(),
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    .then(() => undefined);

/**
 * Send the auto-reply email to the visitor.
 * Template variables expected: {{to_name}}, {{to_email}}
 * (Email is sent TO the visitor — configure "To Email" as {{to_email}} in
 *  your EmailJS template settings.)
 */
const sendAutoReply = (data: FormData): Promise<void> => {
  if (!EMAILJS_AUTOREPLY_TEMPLATE_ID) {
    // Auto-reply is optional — if the template ID is absent, skip silently.
    return Promise.resolve();
  }
  return emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_AUTOREPLY_TEMPLATE_ID,
      {
        to_name: data.name.trim(),
        to_email: data.email.trim(),
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    .then(() => undefined);
};

// ─── Component ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Client-side validation
    const validationError = validateForm(formData);
    if (validationError) {
      setSubmitStatus({ type: "error", text: validationError });
      return;
    }

    // Check EmailJS env vars are configured
    const configError = checkEmailJSConfig();
    if (configError) {
      if (import.meta.env.DEV) {
        console.error("[ContactForm] EmailJS config error:", configError);
      }
      setSubmitStatus({
        type: "error",
        text: "Mail service is not configured. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 1. Send notification to portfolio owner
      await sendContactEmail(formData);

      // 2. Send auto-reply to visitor (non-blocking failure — don't fail
      //    the whole submission if just the auto-reply errors out)
      try {
        await sendAutoReply(formData);
      } catch (autoReplyError) {
        // Log in dev but don't surface to user — the main email succeeded.
        if (import.meta.env.DEV) {
          console.warn("[ContactForm] Auto-reply failed:", autoReplyError);
        }
      }

      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus({
        type: "success",
        text: "✔ Message sent successfully!",
      });

      // Auto-clear success message after 5 s
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      // Detailed logging in development only
      if (import.meta.env.DEV) {
        const ejsErr = error as EmailJSError;
        console.error("[ContactForm] EmailJS error:", {
          status: ejsErr?.status,
          text: ejsErr?.text,
          raw: error,
        });
      }

      setSubmitStatus({
        type: "error",
        text: "❌ Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 relative z-10 bg-background/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Get In Touch
              </span>
            </motion.div>

            <h2 className="section-heading mb-6">
              <span className="text-foreground">Let's</span>{" "}
              <span className="text-gradient">Connect</span>
            </h2>

            <p className="section-subheading mb-10 max-w-md">
              Have a project in mind or just want to say hello? I'd love to hear
              from you.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-secondary/10">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-foreground">
                    Gwalior, Madhya Pradesh, India
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-accent">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Response Time
                  </p>
                  <p className="text-foreground">Usually within 24 hours</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8"
              noValidate
            >
              <div className="space-y-6">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    maxLength={120}
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    maxLength={4000}
                    className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Status message */}
                {submitStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus.text}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
