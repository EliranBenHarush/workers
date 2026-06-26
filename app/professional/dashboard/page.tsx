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
import { ShieldCheck, MapPin, Phone, Inbox, LogOut, Briefcase, SendHorizontal } from "lucide-react";

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
      <div className="min-h-screen bg-[#F5F7FC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2C3FB5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B7398] text-[14px]">טוען לידים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      {/* Header */}
      <header className="bg-white border-b border-[#E3E7F4] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-[16px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-[9px]"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 20, color: "#0E1A3A" }}
          >
            <span className="w-[28px] h-[28px] rounded-lg bg-[#2C3FB5] flex items-center justify-center text-white">
              <ShieldCheck size={16} />
            </span>
            <span className="hidden sm:inline">מקצוענים</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[13px] sm:text-[14px] text-[#6B7398] hidden sm:block">
              שלום, {profile?.name}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-[13px] text-[#6B7398] hover:text-red-500 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">יציאה</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-7 sm:mb-8">
          <div className="bg-white rounded-xl p-4 border border-[#E3E7F4] shadow-[0_2px_8px_rgba(20,30,80,0.05)] text-center">
            <div
              className="text-[28px] sm:text-[32px] mb-0.5"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#2C3FB5" }}
            >
              {jobs.length}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#6B7398]">לידים פתוחים</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E3E7F4] shadow-[0_2px_8px_rgba(20,30,80,0.05)] text-center">
            <div
              className="text-[28px] sm:text-[32px] mb-0.5"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#1A8F4C" }}
            >
              {expressedInterest.size}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#6B7398]">פניות שלחתי</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#E3E7F4] shadow-[0_2px_8px_rgba(20,30,80,0.05)] text-center col-span-2 sm:col-span-1">
            <div className="text-[14px] sm:text-[15px] font-bold text-[#0E1A3A] mb-0.5 truncate">
              {profile?.cities.slice(0, 2).join(", ")}
              {(profile?.cities.length ?? 0) > 2 && " +עוד"}
            </div>
            <div className="text-[12px] sm:text-[13px] text-[#6B7398]">אזורי שירות</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E3E7F4] mb-5 sm:mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "all"
                ? "border-[#2C3FB5] text-[#2C3FB5]"
                : "border-transparent text-[#6B7398] hover:text-[#0E1A3A]"
            }`}
          >
            <Briefcase size={15} />
            כל הלידים ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("interested")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 text-[13px] sm:text-[14px] font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "interested"
                ? "border-[#2C3FB5] text-[#2C3FB5]"
                : "border-transparent text-[#6B7398] hover:text-[#0E1A3A]"
            }`}
          >
            <SendHorizontal size={15} />
            פניות שלחתי ({expressedInterest.size})
          </button>
        </div>

        {/* Jobs list */}
        {displayedJobs.length === 0 ? (
          <div className="text-center py-14 sm:py-16 bg-white rounded-2xl border border-[#E3E7F4]">
            <div className="flex justify-center mb-4">
              <Inbox size={52} className="text-[#C9D1F4]" strokeWidth={1.2} />
            </div>
            <h3 className="text-[16px] font-bold text-[#0E1A3A] mb-2">
              {activeTab === "all" ? "אין לידים כרגע" : "עדיין לא שלחת פניות"}
            </h3>
            <p className="text-[13px] text-[#9AA3C4] max-w-xs mx-auto leading-relaxed">
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
                  className={`bg-white rounded-2xl border border-[#E3E7F4] shadow-[0_2px_8px_rgba(20,30,80,0.05)] p-4 sm:p-6 border-r-4 ${
                    alreadyInterested ? "border-r-[#1A8F4C]" : "border-r-[#2C3FB5]"
                  }`}
                >
                  {/* Tags row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="bg-[#EAEEFB] text-[#2C3FB5] text-[11px] sm:text-[12px] font-semibold px-2.5 py-1 rounded-full">
                      {job.category}
                    </span>
                    <span className="flex items-center gap-1 bg-[#F5F7FC] text-[#6B7398] text-[11px] sm:text-[12px] px-2.5 py-1 rounded-full border border-[#E3E7F4]">
                      <MapPin size={10} />
                      {job.city}
                    </span>
                    {job.createdAt && (
                      <span className="text-[11px] text-[#9AA3C4]">
                        {timeAgo(job.createdAt)}
                      </span>
                    )}
                    {alreadyInterested && (
                      <span className="bg-[#E4F6EC] text-[#1A8F4C] text-[11px] sm:text-[12px] font-semibold px-2.5 py-1 rounded-full">
                        ✓ פנית
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#3A4263] text-[13px] sm:text-[14px] leading-relaxed mb-3">
                    {job.description}
                  </p>

                  {/* Footer row: name + action */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <p className="text-[12px] sm:text-[13px] text-[#9AA3C4]">
                      פרסם: {job.name}
                    </p>
                    {alreadyInterested ? (
                      <a
                        href={`tel:${job.phone}`}
                        className="flex items-center gap-2 bg-[#1A8F4C] text-white text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-[#158040] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Phone size={14} />
                        {job.phone}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleInterest(job)}
                        className="bg-[#2C3FB5] text-white text-[13px] font-semibold px-4 py-2 rounded-xl hover:bg-[#2233a0] transition-colors whitespace-nowrap cursor-pointer"
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
