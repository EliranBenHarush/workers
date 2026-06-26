"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldCheck } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E3E7F4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-[18px] flex items-center">
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
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(20,30,80,0.08)] border border-[#E3E7F4] p-8 sm:p-10 max-w-md w-full text-center">
          <div className="flex justify-center mb-5">
            <CheckCircle2 size={68} className="text-[#1A8F4C]" strokeWidth={1.5} />
          </div>
          <h1
            className="text-[22px] sm:text-[26px] mb-3"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#0E1A3A" }}
          >
            הפנייה נשלחה בהצלחה!
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#6B7398] leading-relaxed mb-7">
            בעלי מקצוע באזורך יראו את הפנייה שלך ויצרו איתך קשר בהקדם.
            <br />
            בדרך כלל תקבל פניות תוך שעה.
          </p>

          {/* Trust indicators */}
          <div className="bg-[#F5F7FC] rounded-xl p-4 mb-7 text-right">
            <p className="text-[13px] text-[#6B7398] leading-relaxed">
              <span className="font-semibold text-[#0E1A3A]">מה קורה עכשיו?</span>
              <br />
              בעלי המקצוע הרלוונטיים יראו את פנייתך ויצרו קשר ישירות בטלפון.
            </p>
          </div>

          {jobId && (
            <p className="text-[11px] text-[#9AA3C4] mb-5">מספר פנייה: {jobId}</p>
          )}

          <div className="space-y-3">
            <Link
              href="/post-job"
              className="block w-full bg-[#2C3FB5] text-white font-bold py-3 rounded-xl hover:bg-[#2233a0] transition-colors cursor-pointer text-[15px]"
            >
              פרסם עבודה נוספת
            </Link>
            <Link
              href="/"
              className="block w-full border border-[#E3E7F4] text-[#48527A] font-medium py-3 rounded-xl hover:bg-[#F5F7FC] transition-colors cursor-pointer text-[15px]"
            >
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
    <Suspense fallback={<div className="min-h-screen bg-[#F5F7FC]" />}>
      <SuccessContent />
    </Suspense>
  );
}
