"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { JOB_CATEGORIES, CITIES, JobCategory } from "@/lib/types";

function PostJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category") as JobCategory | null;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: preselectedCategory || ("" as JobCategory | ""),
    city: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.category || !form.city || !form.description) {
      setError("נא למלא את כל השדות");
      return;
    }
    if (!/^0\d{8,9}$/.test(form.phone.replace(/\D/g, ""))) {
      setError("מספר טלפון לא תקין");
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        name: form.name,
        phone: form.phone,
        category: form.category,
        city: form.city,
        description: form.description,
        status: "open",
        createdAt: serverTimestamp(),
      });
      router.push(`/job-success?id=${docRef.id}`);
    } catch (err) {
      console.error(err);
      setError("שגיאה בשמירת הפנייה, נסה שוב");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-white/[0.08] rounded-xl px-4 py-3 text-[#F5F6F1] placeholder-[#74766d] bg-[#1B1D18] focus:outline-none focus:ring-2 focus:ring-[#CBF24D]/40 focus:border-[#CBF24D]/50 transition-all text-[15px]";

  return (
    <div className="min-h-screen bg-[#0E0F0C]">
      {/* Header */}
      <header className="bg-[#0E0F0C]/95 backdrop-blur-sm border-b border-white/[0.07] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: "#F5F6F1" }}
          >
            <span className="w-8 h-8 rounded-lg bg-[#CBF24D] flex items-center justify-center">
              <span className="ms text-[#12140C]" style={{ fontSize: 18 }}>handyman</span>
            </span>
            מקצוענים
          </Link>
          <Link href="/" className="text-[14px] text-[#9A9C92] hover:text-[#F5F6F1] transition-colors">
            חזרה לדף הבית
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 sm:py-12">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#CBF24D] bg-[#CBF24D]/10 border border-[#CBF24D]/20 px-3 py-1.5 rounded-full">
            <span className="ms" style={{ fontSize: 14 }}>verified</span>
            פרסום חינמי · ללא התחייבות
          </div>
        </div>

        <div className="bg-[#1B1D18] border border-white/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6 sm:p-8">
          <h1
            className="text-[22px] sm:text-[26px] mb-1"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
          >
            פרסם עבודה
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#9A9C92] mb-7">
            מלא את הפרטים ובעלי מקצוע באזורך יפנו אליך
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                שם מלא
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="ישראל ישראלי"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                טלפון
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="050-0000000"
                dir="ltr"
                className={`${inputClass} text-right`}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                סוג בעל מקצוע
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as JobCategory })}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" style={{ background: "#1B1D18" }}>בחר קטגוריה...</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#1B1D18" }}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                עיר
              </label>
              <select
                id="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" style={{ background: "#1B1D18" }}>בחר עיר...</option>
                {CITIES.map((city) => (
                  <option key={city} value={city} style={{ background: "#1B1D18" }}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                תיאור העבודה
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="תאר מה צריך לתקן / לבצע, כמה שיותר פרטים..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-[13px] sm:text-[14px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CBF24D] text-[#12140C] font-bold py-[14px] rounded-xl hover:bg-[#B8DB38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[16px] cursor-pointer"
            >
              {loading ? "שולח..." : "פרסם עבודה בחינם"}
            </button>

            <div className="flex items-center justify-center gap-2 text-[12px] text-[#74766d]">
              <span className="ms" style={{ fontSize: 14 }}>lock</span>
              הפרטים נשמרים בצורה מאובטחת ויועברו רק לבעלי מקצוע רלוונטיים
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function PostJobPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0E0F0C] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#CBF24D] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PostJobForm />
    </Suspense>
  );
}
