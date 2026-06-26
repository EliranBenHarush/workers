"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { JOB_CATEGORIES, CITIES, JobCategory } from "@/lib/types";

export default function ProfessionalRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    description: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleCategory = (cat: JobCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.email || !form.password) {
      setError("נא למלא את כל השדות");
      return;
    }
    if (selectedCategories.length === 0) {
      setError("נא לבחור לפחות תחום עיסוק אחד");
      return;
    }
    if (selectedCities.length === 0) {
      setError("נא לבחור לפחות עיר אחת");
      return;
    }
    if (form.password.length < 6) {
      setError("הסיסמה חייבת להיות לפחות 6 תווים");
      return;
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCred.user, { displayName: form.name });
      await setDoc(doc(db, "professionals", userCred.user.uid), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        categories: selectedCategories,
        cities: selectedCities,
        description: form.description,
        createdAt: serverTimestamp(),
      });
      router.push("/professional/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      if (firebaseError.code === "auth/email-already-in-use") {
        setError("כתובת האימייל כבר רשומה. נסה להתחבר.");
      } else {
        setError("שגיאה בהרשמה, נסה שוב");
      }
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
          <p className="text-[13px] text-[#6B7398]">
            כבר רשום?{" "}
            <Link href="/professional/login" className="text-[#2C3FB5] font-semibold hover:underline">
              כניסה
            </Link>
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2C3FB5] bg-[#EAEEFB] px-[14px] py-[7px] rounded-full">
            <ShieldCheck size={14} />
            שבועיים ניסיון חינם · ללא כרטיס אשראי
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(20,30,80,0.08)] border border-[#E3E7F4] p-6 sm:p-8">
          <h1
            className="text-[22px] sm:text-[26px] mb-1"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#0E1A3A" }}
          >
            הרשמה לבעלי מקצוע
          </h1>
          <p className="text-[14px] text-[#6B7398] mb-7">
            הצטרף וקבל לידים מלקוחות באזורך — שבועיים ניסיון חינם
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

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
                placeholder="לפחות 6 תווים"
                className={inputClass}
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-[13px] font-semibold text-[#0E1A3A] mb-2">
                תחומי עיסוק{" "}
                <span className="text-[#9AA3C4] font-normal">(ניתן לבחור כמה)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {JOB_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors cursor-pointer min-h-[40px] ${
                      selectedCategories.includes(cat)
                        ? "bg-[#2C3FB5] text-white border-[#2C3FB5]"
                        : "bg-white text-[#48527A] border-[#E3E7F4] hover:border-[#2C3FB5] hover:text-[#2C3FB5]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <label className="block text-[13px] font-semibold text-[#0E1A3A] mb-2">
                אזורי שירות{" "}
                <span className="text-[#9AA3C4] font-normal">(ניתן לבחור כמה)</span>
              </label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto border border-[#E3E7F4] rounded-xl p-3 bg-[#F5F7FC]">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => toggleCity(city)}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-colors cursor-pointer min-h-[36px] ${
                      selectedCities.includes(city)
                        ? "bg-[#2C3FB5] text-white border-[#2C3FB5]"
                        : "bg-white text-[#48527A] border-[#E3E7F4] hover:border-[#2C3FB5] hover:text-[#2C3FB5]"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-[13px] font-semibold text-[#0E1A3A] mb-1.5">
                תיאור קצר{" "}
                <span className="text-[#9AA3C4] font-normal">(אופציונלי)</span>
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="ניסיון, התמחויות, שירותים שאתה מציע..."
                rows={3}
                className={`${inputClass} resize-none`}
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
              className="w-full bg-[#2C3FB5] text-white font-bold py-[14px] rounded-xl hover:bg-[#2233a0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[16px] cursor-pointer"
            >
              {loading ? "נרשם..." : "הרשמה וכניסה לדשבורד"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
