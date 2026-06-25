"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          הפנייה נשלחה בהצלחה!
        </h2>
        <p className="text-gray-500 mb-8">
          בעלי מקצוע באזורך יראו את הפנייה שלך ויצרו איתך קשר בהקדם.
          <br />
          בדרך כלל תקבל פניות תוך שעה.
        </p>
        {jobId && (
          <p className="text-xs text-gray-300 mb-6">מספר פנייה: {jobId}</p>
        )}
        <div className="space-y-3">
          <Link
            href="/post-job"
            className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            פרסם עבודה נוספת
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function JobSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <SuccessContent />
    </Suspense>
  );
}
