"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  LogOut,
  Trash2,
  Eye,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ContactInquiry, QuoteRequest, MarbleProduct } from "@/types";

type Tab = "dashboard" | "products" | "inquiries" | "quotes";

interface Analytics {
  totalInquiries: number;
  newInquiries: number;
  totalQuotes: number;
  newQuotes: number;
  totalProducts: number;
  recentInquiries: ContactInquiry[];
  recentQuotes: QuoteRequest[];
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [products, setProducts] = useState<MarbleProduct[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "indian" as MarbleProduct["category"],
    subcategory: "White Marble",
    description: "",
    texture: "/textures/white-marble.jpg",
    finish: "Polished",
    dimensions: "120 × 240 cm",
  });

  const headers = { Authorization: `Bearer ${password}` };

  const login = async () => {
    const res = await fetch("/api/admin/products", { headers });
    if (res.ok) {
      setAuthenticated(true);
      sessionStorage.setItem("admin_auth", password);
      loadData();
    } else {
      alert("Invalid password");
    }
  };

  const loadData = async () => {
    const auth = sessionStorage.getItem("admin_auth") || password;
    const h = { Authorization: `Bearer ${auth}` };

    const [aRes, iRes, qRes, pRes] = await Promise.all([
      fetch("/api/admin/analytics", { headers: h }),
      fetch("/api/admin/inquiries", { headers: h }),
      fetch("/api/admin/quotes", { headers: h }),
      fetch("/api/admin/products", { headers: h }),
    ]);

    if (aRes.ok) setAnalytics(await aRes.json());
    if (iRes.ok) setInquiries(await iRes.json());
    if (qRes.ok) setQuotes(await qRes.json());
    if (pRes.ok) setProducts(await pRes.json());
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved) {
      setPassword(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, tab]);

  const addProduct = async () => {
    const auth = sessionStorage.getItem("admin_auth") || password;
    const product: MarbleProduct = {
      id: `prod-${Date.now()}`,
      ...newProduct,
      application: ["Flooring"],
      images: [newProduct.texture],
    };
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth}` },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      setNewProduct({ ...newProduct, name: "", description: "" });
      loadData();
    }
  };

  const deleteProduct = async (id: string) => {
    const auth = sessionStorage.getItem("admin_auth") || password;
    await fetch(`/api/admin/products?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth}` },
    });
    loadData();
  };

  const updateInquiryStatus = async (id: string, status: ContactInquiry["status"]) => {
    const auth = sessionStorage.getItem("admin_auth") || password;
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth}` },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-luxury-black px-4">
        <div className="w-full max-w-md glass-panel p-8">
          <h1 className="mb-6 font-display text-3xl text-luxury-cream">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Enter admin password"
            className="mb-4 w-full border border-white/10 bg-luxury-black px-4 py-3 text-luxury-cream focus:border-luxury-gold focus:outline-none"
          />
          <button onClick={login} className="btn-primary w-full">Login</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "products" as Tab, label: "Products", icon: Package },
    { id: "inquiries" as Tab, label: "Inquiries", icon: MessageSquare },
    { id: "quotes" as Tab, label: "Quotes", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-luxury-black">
      <div className="border-b border-white/10 bg-luxury-charcoal px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-display text-2xl text-luxury-cream">
            NeelMarble <span className="text-luxury-gold">Admin</span>
          </h1>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }}
            className="flex items-center gap-2 text-sm text-luxury-cream/60 hover:text-luxury-gold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <nav className="hidden w-48 shrink-0 space-y-2 md:block">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                tab === t.id ? "bg-luxury-gold/10 text-luxury-gold" : "text-luxury-cream/60 hover:text-luxury-cream"
              }`}
            >
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1">
          <div className="mb-6 flex gap-2 md:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2 text-xs uppercase ${tab === t.id ? "text-luxury-gold" : "text-luxury-cream/60"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "dashboard" && analytics && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Inquiries", value: analytics.totalInquiries },
                  { label: "New Inquiries", value: analytics.newInquiries },
                  { label: "Total Quotes", value: analytics.totalQuotes },
                  { label: "Products", value: analytics.totalProducts },
                ].map((s) => (
                  <div key={s.label} className="glass-panel p-6">
                    <p className="text-3xl font-display text-luxury-gold">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-luxury-cream/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "products" && (
            <div className="space-y-8">
              <div className="glass-panel p-6">
                <h3 className="mb-4 text-lg text-luxury-cream">Add Product</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border border-white/10 bg-luxury-black px-4 py-2 text-sm text-luxury-cream" />
                  <input placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="border border-white/10 bg-luxury-black px-4 py-2 text-sm text-luxury-cream" />
                </div>
                <button onClick={addProduct} className="btn-primary mt-4 text-xs">Add Product</button>
              </div>
              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center justify-between glass-panel p-4">
                    <div>
                      <p className="text-luxury-cream">{p.name}</p>
                      <p className="text-xs text-luxury-cream/40">{p.category} · {p.subcategory}</p>
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "inquiries" && (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="glass-panel p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-luxury-cream">{inq.fullName}</p>
                      <p className="text-xs text-luxury-cream/40">{inq.email} · {inq.phone}</p>
                      <p className="mt-2 text-sm text-luxury-cream/60">{inq.message}</p>
                      <p className="mt-1 text-xs text-luxury-cream/30">{formatDate(inq.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs uppercase ${inq.status === "new" ? "text-luxury-gold" : "text-luxury-cream/40"}`}>{inq.status}</span>
                      {inq.status === "new" && (
                        <button onClick={() => updateInquiryStatus(inq.id, "read")} className="text-luxury-cream/60 hover:text-luxury-gold">
                          <Eye size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {inquiries.length === 0 && <p className="text-luxury-cream/40">No inquiries yet.</p>}
            </div>
          )}

          {tab === "quotes" && (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div key={q.id} className="glass-panel p-4">
                  <p className="font-medium text-luxury-cream">{q.product}</p>
                  <p className="text-xs text-luxury-cream/40">{q.email} · {q.phone}</p>
                  <p className="mt-2 text-sm text-luxury-cream/60">
                    Area: {q.area} · Qty: {q.quantity || "N/A"} · Budget: {q.budget || "N/A"}
                  </p>
                  <p className="mt-1 text-xs text-luxury-cream/30">{formatDate(q.createdAt)}</p>
                </div>
              ))}
              {quotes.length === 0 && <p className="text-luxury-cream/40">No quote requests yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
