"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
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

  const inputClass = "w-full border border-[#E3E7F4] rounded-xl px-4 py-3 text-[#0E1A3A] placeholder-[#9AA3C4] bg-white focus:outline-none focus:ring-2 focus:ring-[#2C3FB5] focus:border-transparent transition-shadow text-[15px]";

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E3E7F4]">
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
          <p className="text-[13px] text-[#6B7398]">
            עדיין לא רשום?{" "}
            <Link href="/professional/register" className="text-[#2C3FB5] font-semibold hover:underline">
              הרשמה חינם
            </Link>
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(20,30,80,0.08)] border border-[#E3E7F4] p-7 sm:p-10 w-full max-w-md">
          {/* Logo in card */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-[9px] mb-4" style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 24, color: "#0E1A3A" }}>
              <span className="w-[32px] h-[32px] rounded-lg bg-[#2C3FB5] flex items-center justify-center text-white">
                <ShieldCheck size={18} />
              </span>
              מקצוענים
            </div>
            <h1
              className="text-[20px] sm:text-[22px]"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, color: "#0E1A3A" }}
            >
              כניסה לבעלי מקצוע
            </h1>
            <p className="text-[13px] text-[#6B7398] mt-1">ברוך הבא חזרה</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
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
              <label htmlFor="password" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
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
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-[13px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C3FB5] text-white font-bold py-[14px] rounded-xl hover:bg-[#2233a0] transition-colors disabled:opacity-50 text-[16px] cursor-pointer mt-2"
            >
              {loading ? "מתחבר..." : "כניסה"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
