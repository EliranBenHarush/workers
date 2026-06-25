"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
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

      // Listen for jobs matching this professional's categories and cities
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

        // Filter client-side by this professional's categories & cities, sort newest first
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

      // Load interests already expressed
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">טוען לידים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            מקצוענים
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">
              שלום, {profile?.name}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              יציאה
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600">{jobs.length}</div>
            <div className="text-sm text-gray-500 mt-1">לידים פתוחים</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="text-3xl font-bold text-green-600">
              {expressedInterest.size}
            </div>
            <div className="text-sm text-gray-500 mt-1">פניות שלחתי</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center col-span-2 sm:col-span-1">
            <div className="text-lg font-bold text-gray-700">
              {profile?.cities.slice(0, 2).join(", ")}
              {(profile?.cities.length ?? 0) > 2 && " +עוד"}
            </div>
            <div className="text-sm text-gray-500 mt-1">אזורי שירות</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            כל הלידים ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("interested")}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "interested"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            פניות שלחתי ({expressedInterest.size})
          </button>
        </div>

        {/* Jobs list */}
        {displayedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {activeTab === "all" ? "אין לידים כרגע" : "עדיין לא שלחת פניות"}
            </h3>
            <p className="text-gray-400 text-sm">
              {activeTab === "all"
                ? "לידים חדשים יופיעו כאן בזמן אמת"
                : "לחץ על 'אני מעוניין' בליד כלשהו כדי לפנות ללקוח"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedJobs.map((job) => {
              const alreadyInterested = expressedInterest.has(job.id);
              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl shadow-sm p-6 border-r-4 ${
                    alreadyInterested ? "border-green-500" : "border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                          {job.category}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                          📍 {job.city}
                        </span>
                        {job.createdAt && (
                          <span className="text-xs text-gray-400">
                            {timeAgo(job.createdAt)}
                          </span>
                        )}
                        {alreadyInterested && (
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            ✓ פנית
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {job.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        פרסם: {job.name}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 items-end shrink-0">
                      {alreadyInterested ? (
                        <a
                          href={`tel:${job.phone}`}
                          className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          📞 {job.phone}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleInterest(job)}
                          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          אני מעוניין
                        </button>
                      )}
                    </div>
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
