import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Clock } from "lucide-react";
import { EMAIL_ADDRESS } from "@/data/siteLinks";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY;

      if (!web3FormsKey) {
        // Fallback natively to mailto: if no API key is provided
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        setSubmitStatus({
          type: "success",
          text: "Opening your email client... Thank you!",
        });
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
        
        // Hide success message automatically after 5s
        setTimeout(() => setSubmitStatus(null), 5000);
        return;
      }

      // Seamless background submission using Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to send your message right now.");
      }

      setSubmitStatus({
        type: "success",
        text: "Thank you for your message! I will get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      
      // Hide success message automatically after 5s
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8"
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
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
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
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitStatus && (
                  <p
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus.text}
                  </p>
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
