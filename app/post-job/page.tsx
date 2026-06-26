"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";
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

  const inputClass = "w-full border border-[#E3E7F4] rounded-xl px-4 py-3 text-[#0E1A3A] placeholder-[#9AA3C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#2C3FB5] focus:border-transparent transition-shadow text-[15px]";

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E3E7F4] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-[18px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-[9px]"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: "#0E1A3A" }}
          >
            <span className="w-[28px] h-[28px] rounded-lg bg-[#2C3FB5] flex items-center justify-center text-white">
              <ShieldCheck size={16} />
            </span>
            מקצוענים
          </Link>
          <Link href="/" className="text-[14px] text-[#6B7398] hover:text-[#2C3FB5] transition-colors">
            חזרה לדף הבית
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 sm:py-12">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2C3FB5] bg-[#EAEEFB] px-[14px] py-[7px] rounded-full">
            <ShieldCheck size={14} />
            פרסום חינמי · ללא התחייבות
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(20,30,80,0.08)] border border-[#E3E7F4] p-6 sm:p-8">
          <h1
            className="text-[22px] sm:text-[26px] mb-1"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#0E1A3A" }}
          >
            פרסם עבודה
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#6B7398] mb-7">
            מלא את הפרטים ובעלי מקצוע באזורך יפנו אליך
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
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
              <label htmlFor="phone" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
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
              <label htmlFor="category" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
                סוג בעל מקצוע
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as JobCategory })}
                className={inputClass}
              >
                <option value="">בחר קטגוריה...</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
                עיר
              </label>
              <select
                id="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={inputClass}
              >
                <option value="">בחר עיר...</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
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
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-[13px] sm:text-[14px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C3FB5] text-white font-bold py-[14px] rounded-xl hover:bg-[#2233a0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[16px] cursor-pointer"
            >
              {loading ? "שולח..." : "פרסם עבודה בחינם"}
            </button>

            <div className="flex items-center justify-center gap-2 text-[12px] text-[#9AA3C4]">
              <Lock size={12} />
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
      <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2C3FB5] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PostJobForm />
    </Suspense>
  );
}
