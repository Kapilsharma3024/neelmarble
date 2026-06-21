"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { projectTypes } from "@/data/products";

interface ContactFormProps {
  variant?: "contact" | "inline";
}

export default function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.projectType) e.projectType = "Select project type";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setForm({ fullName: "", email: "", phone: "", company: "", projectType: "", message: "" });
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-white/10 bg-luxury-black/50 px-4 py-3 text-sm text-luxury-cream placeholder:text-luxury-cream/30 focus:border-luxury-gold focus:outline-none transition-colors";

  return (
    <div className={variant === "contact" ? "glass-panel p-8 md:p-12" : ""}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle size={64} className="text-luxury-gold" />
            </motion.div>
            <h3 className="mt-6 font-display text-3xl text-luxury-cream">Thank You</h3>
            <p className="mt-2 text-sm text-luxury-cream/60">
              Your inquiry has been received. We&apos;ll respond within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-secondary mt-8 text-xs"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {errors.form && (
              <p className="text-sm text-red-400">{errors.form}</p>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputClass}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className={inputClass}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Project Type *</label>
              <select
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className={inputClass}
              >
                <option value="">Select type</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.projectType && <p className="mt-1 text-xs text-red-400">{errors.projectType}</p>}
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Message *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className={inputClass}
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Inquiry"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
