"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfessionalLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/professional/dashboard");
    } catch {
      setError("אימייל או סיסמה שגויים");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-white/[0.08] rounded-xl px-4 py-3 text-[#F5F6F1] placeholder-[#74766d] bg-[#0E0F0C] focus:outline-none focus:ring-2 focus:ring-[#CBF24D]/40 focus:border-[#CBF24D]/50 transition-all text-[15px]";

  return (
    <div className="min-h-screen bg-[#0E0F0C] flex flex-col">
      {/* Header */}
      <header className="bg-[#0E0F0C]/95 backdrop-blur-sm border-b border-white/[0.07]">
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
          <p className="text-[13px] text-[#9A9C92]">
            עדיין לא רשום?{" "}
            <Link href="/professional/register" className="text-[#CBF24D] font-semibold hover:underline">
              הרשמה חינם
            </Link>
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-[#1B1D18] border border-white/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-7 sm:p-10 w-full max-w-md">
          {/* Logo in card */}
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-2 mb-4"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 24, color: "#F5F6F1" }}
            >
              <span className="w-8 h-8 rounded-lg bg-[#CBF24D] flex items-center justify-center">
                <span className="ms text-[#12140C]" style={{ fontSize: 18 }}>handyman</span>
              </span>
              מקצוענים
            </div>
            <h1
              className="text-[20px] sm:text-[22px]"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, color: "#F5F6F1" }}
            >
              כניסה לבעלי מקצוע
            </h1>
            <p className="text-[13px] text-[#9A9C92] mt-1">ברוך הבא חזרה</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                אימייל
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                dir="ltr"
                className={`${inputClass} text-right`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-semibold text-[#c7c9c0] mb-1.5">
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••"
                className={inputClass}
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-[13px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#CBF24D] text-[#12140C] font-bold py-[14px] rounded-xl hover:bg-[#B8DB38] transition-colors disabled:opacity-50 text-[16px] cursor-pointer mt-2"
            >
              {loading ? "מתחבר..." : "כניסה"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
