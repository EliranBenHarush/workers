"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-[#0E0F0C] flex flex-col">
      {/* Header */}
      <header className="bg-[#0E0F0C]/95 backdrop-blur-sm border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center">
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
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-[#1B1D18] border border-white/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-8 sm:p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-[#CBF24D]/10 border border-[#CBF24D]/30 flex items-center justify-center">
              <span className="ms text-[#CBF24D]" style={{ fontSize: 44 }}>check_circle</span>
            </div>
          </div>
          <h1
            className="text-[22px] sm:text-[26px] mb-3"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
          >
            הפנייה נשלחה בהצלחה!
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#9A9C92] leading-relaxed mb-7">
            בעלי מקצוע באזורך יראו את הפנייה שלך ויצרו איתך קשר בהקדם.
            <br />
            בדרך כלל תקבל פניות תוך שעה.
          </p>

          {/* Info box */}
          <div className="bg-[#0E0F0C] border border-white/[0.07] rounded-xl p-4 mb-7 text-right">
            <p className="text-[13px] text-[#9A9C92] leading-relaxed">
              <span className="font-semibold text-[#F5F6F1]">מה קורה עכשיו?</span>
              <br />
              בעלי המקצוע הרלוונטיים יראו את פנייתך ויצרו קשר ישירות בטלפון.
            </p>
          </div>

          {jobId && (
            <p className="text-[11px] text-[#74766d] mb-5">מספר פנייה: {jobId}</p>
          )}

          <div className="space-y-3">
            <Link
              href="/post-job"
              className="flex items-center justify-center gap-2 w-full bg-[#CBF24D] text-[#12140C] font-bold py-3 rounded-xl hover:bg-[#B8DB38] transition-colors cursor-pointer text-[15px]"
            >
              <span className="ms" style={{ fontSize: 18 }}>add_circle</span>
              פרסם עבודה נוספת
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full border border-white/[0.1] text-[#9A9C92] font-medium py-3 rounded-xl hover:bg-[#1B1D18] transition-colors cursor-pointer text-[15px]"
            >
              <span className="ms" style={{ fontSize: 18 }}>home</span>
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function JobSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0E0F0C]" />}>
      <SuccessContent />
    </Suspense>
  );
}
