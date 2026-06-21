"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Upload } from "lucide-react";
import { products } from "@/data/products";

export default function QuoteForm() {
  const [form, setForm] = useState({
    product: "",
    quantity: "",
    area: "",
    budget: "",
    timeline: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.product) e.product = "Select a product";
    if (!form.area.trim()) e.area = "Area is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      if (file) body.append("designFile", file);

      const res = await fetch("/api/quote", { method: "POST", body });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-white/10 bg-luxury-black/50 px-4 py-3 text-sm text-luxury-cream placeholder:text-luxury-cream/30 focus:border-luxury-gold focus:outline-none";

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-16 text-center glass-panel"
        >
          <CheckCircle size={64} className="text-luxury-gold" />
          <h3 className="mt-6 font-display text-3xl text-luxury-cream">Quote Requested</h3>
          <p className="mt-2 max-w-md text-sm text-luxury-cream/60">
            Our team will prepare a customized quote and reach out within 48 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form onSubmit={handleSubmit} className="glass-panel space-y-6 p-8 md:p-12">
          {errors.form && <p className="text-sm text-red-400">{errors.form}</p>}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Product *</label>
              <select
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className={inputClass}
              >
                <option value="">Select marble</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
              {errors.product && <p className="mt-1 text-xs text-red-400">{errors.product}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Quantity</label>
              <input
                type="text"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className={inputClass}
                placeholder="e.g. 50 slabs"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Area (sq ft) *</label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className={inputClass}
                placeholder="e.g. 2000"
              />
              {errors.area && <p className="mt-1 text-xs text-red-400">{errors.area}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Budget</label>
              <input
                type="text"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={inputClass}
                placeholder="e.g. ₹5,00,000"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Timeline</label>
            <input
              type="text"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className={inputClass}
              placeholder="e.g. 3 months"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Upload Design</label>
            <label className="flex cursor-pointer items-center gap-3 border border-dashed border-white/20 px-4 py-6 transition-colors hover:border-luxury-gold/50">
              <Upload size={20} className="text-luxury-gold" />
              <span className="text-sm text-luxury-cream/60">
                {file ? file.name : "Upload floor plan or design (PDF, JPG, PNG)"}
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-luxury-cream/60">Phone *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Submit Quote Request"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
