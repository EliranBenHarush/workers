"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection, query, where, onSnapshot, doc, getDoc, addDoc, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Job, Professional } from "@/lib/types";

type JobWithId = Job & { id: string };

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "עכשיו";
  if (diff < 3600) return `לפני ${Math.floor(diff / 60)} דקות`;
  if (diff < 86400) return `לפני ${Math.floor(diff / 3600)} שעות`;
  return `לפני ${Math.floor(diff / 86400)} ימים`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Professional | null>(null);
  const [jobs, setJobs] = useState<JobWithId[]>([]);
  const [expressedInterest, setExpressedInterest] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "interested">("all");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/professional/login");
        return;
      }
      setUser(u);

      const profDoc = await getDoc(doc(db, "professionals", u.uid));
      if (!profDoc.exists()) {
        router.push("/professional/register");
        return;
      }
      const profData = profDoc.data() as Professional;
      setProfile(profData);

      const jobsQuery = query(
        collection(db, "jobs"),
        where("status", "==", "open")
      );

      const unsubJobs = onSnapshot(jobsQuery, (snapshot) => {
        const allJobs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt:
            d.data().createdAt instanceof Timestamp
              ? d.data().createdAt.toDate()
              : null,
        })) as JobWithId[];

        const filtered = allJobs
          .filter(
            (j) =>
              profData.categories.includes(j.category) &&
              profData.cities.includes(j.city)
          )
          .sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
        setJobs(filtered);
        setLoading(false);
      });

      const interestsQuery = query(
        collection(db, "interests"),
        where("professionalId", "==", u.uid)
      );
      const unsubInterests = onSnapshot(interestsQuery, (snap) => {
        const ids = new Set(snap.docs.map((d) => d.data().jobId as string));
        setExpressedInterest(ids);
      });

      return () => {
        unsubJobs();
        unsubInterests();
      };
    });

    return () => unsubAuth();
  }, [router]);

  const handleInterest = async (job: JobWithId) => {
    if (!user || !profile || expressedInterest.has(job.id)) return;
    await addDoc(collection(db, "interests"), {
      jobId: job.id,
      professionalId: user.uid,
      professionalName: profile.name,
      professionalPhone: profile.phone,
      createdAt: serverTimestamp(),
    });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const displayedJobs =
    activeTab === "all"
      ? jobs
      : jobs.filter((j) => expressedInterest.has(j.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0F0C] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#CBF24D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#9A9C92] text-[14px]">טוען לידים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0F0C]">
      {/* Header */}
      <header className="bg-[#0E0F0C]/95 backdrop-blur-sm border-b border-white/[0.07] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: "#F5F6F1" }}
          >
            <span className="w-8 h-8 rounded-lg bg-[#CBF24D] flex items-center justify-center">
              <span className="ms text-[#12140C]" style={{ fontSize: 18 }}>handyman</span>
            </span>
            <span className="hidden sm:inline">מקצוענים</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[13px] sm:text-[14px] text-[#9A9C92] hidden sm:block">
              שלום, {profile?.name}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-[13px] text-[#9A9C92] hover:text-red-400 transition-colors cursor-pointer"
            >
              <span className="ms" style={{ fontSize: 16 }}>logout</span>
              <span className="hidden sm:inline">יציאה</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-7 sm:mb-8">
          <div className="bg-[#1B1D18] border border-white/[0.07] rounded-xl p-4 text-center">
            <div
              className="text-[28px] sm:text-[32px] mb-0.5"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#CBF24D" }}
            >
              {jobs.length}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#9A9C92]">לידים פתוחים</div>
          </div>
          <div className="bg-[#1B1D18] border border-white/[0.07] rounded-xl p-4 text-center">
            <div
              className="text-[28px] sm:text-[32px] mb-0.5"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#4ADE80" }}
            >
              {expressedInterest.size}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#9A9C92]">פניות שלחתי</div>
          </div>
          <div className="bg-[#1B1D18] border border-white/[0.07] rounded-xl p-4 text-center col-span-2 sm:col-span-1">
            <div className="text-[14px] sm:text-[15px] font-bold text-[#F5F6F1] mb-0.5 truncate">
              {profile?.cities.slice(0, 2).join(", ")}
              {(profile?.cities.length ?? 0) > 2 && " +עוד"}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#9A9C92]">אזורי שירות</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.07] mb-5 sm:mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "all"
                ? "border-[#CBF24D] text-[#CBF24D]"
                : "border-transparent text-[#9A9C92] hover:text-[#F5F6F1]"
            }`}
          >
            <span className="ms" style={{ fontSize: 16 }}>work</span>
            כל הלידים ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("interested")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "interested"
                ? "border-[#CBF24D] text-[#CBF24D]"
                : "border-transparent text-[#9A9C92] hover:text-[#F5F6F1]"
            }`}
          >
            <span className="ms" style={{ fontSize: 16 }}>send</span>
            פניות שלחתי ({expressedInterest.size})
          </button>
        </div>

        {/* Jobs list */}
        {displayedJobs.length === 0 ? (
          <div className="text-center py-14 sm:py-16 bg-[#1B1D18] border border-white/[0.07] rounded-2xl">
            <div className="flex justify-center mb-4">
              <span className="ms text-[#74766d]" style={{ fontSize: 52 }}>inbox</span>
            </div>
            <h3 className="text-[16px] font-bold text-[#F5F6F1] mb-2">
              {activeTab === "all" ? "אין לידים כרגע" : "עדיין לא שלחת פניות"}
            </h3>
            <p className="text-[13px] text-[#74766d] max-w-xs mx-auto leading-relaxed">
              {activeTab === "all"
                ? "לידים חדשים יופיעו כאן בזמן אמת"
                : "לחץ על 'אני מעוניין' בליד כלשהו כדי לפנות ללקוח"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {displayedJobs.map((job) => {
              const alreadyInterested = expressedInterest.has(job.id);
              return (
                <div
                  key={job.id}
                  className={`bg-[#1B1D18] rounded-2xl border border-white/[0.07] p-4 sm:p-6 border-r-4 ${
                    alreadyInterested ? "border-r-[#4ADE80]" : "border-r-[#CBF24D]"
                  }`}
                >
                  {/* Tags row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="bg-[#CBF24D]/10 text-[#CBF24D] text-[11px] sm:text-[12px] font-semibold px-2.5 py-1 rounded-full border border-[#CBF24D]/20">
                      {job.category}
                    </span>
                    <span className="flex items-center gap-1 bg-[#0E0F0C] text-[#9A9C92] text-[11px] sm:text-[12px] px-2.5 py-1 rounded-full border border-white/[0.07]">
                      <span className="ms" style={{ fontSize: 12 }}>location_on</span>
                      {job.city}
                    </span>
                    {job.createdAt && (
                      <span className="text-[11px] text-[#74766d]">
                        {timeAgo(job.createdAt)}
                      </span>
                    )}
                    {alreadyInterested && (
                      <span className="bg-[#4ADE80]/10 text-[#4ADE80] text-[11px] sm:text-[12px] font-semibold px-2.5 py-1 rounded-full border border-[#4ADE80]/20">
                        ✓ פנית
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#c7c9c0] text-[13px] sm:text-[14px] leading-relaxed mb-3">
                    {job.description}
                  </p>

                  {/* Footer row: name + action */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-[12px] sm:text-[13px] text-[#74766d]">
                      פרסם: {job.name}
                    </p>
                    {alreadyInterested ? (
                      <a
                        href={`tel:${job.phone}`}
                        className="flex items-center gap-2 bg-[#4ADE80] text-[#0a1f12] text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-[#22c55e] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span className="ms" style={{ fontSize: 14 }}>call</span>
                        {job.phone}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleInterest(job)}
                        className="bg-[#CBF24D] text-[#12140C] text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-[#B8DB38] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        אני מעוניין
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
