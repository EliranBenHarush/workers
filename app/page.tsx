import Link from "next/link";

const CATEGORIES = [
  { icon: "bolt", label: "חשמלאי" },
  { icon: "water_drop", label: "שרברב" },
  { icon: "handyman", label: "שיפוצניק" },
  { icon: "format_paint", label: "צבעי" },
  { icon: "ac_unit", label: "מזגנים" },
  { icon: "grass", label: "גינון" },
  { icon: "cleaning_services", label: "ניקיון" },
  { icon: "local_shipping", label: "הובלות" },
];

const REVIEWS = [
  { initial: "ד", name: "דנה ל׳", location: "רמת גן", text: "תוך שעה היו לי 4 הצעות מחשמלאים. בחרתי, נקבע, נגמר. בדיוק מה שחיפשתי." },
  { initial: "י", name: "יוסי מ׳", location: "חיפה", text: "כבעל מקצוע, הלידים פה איכותיים. אני סוגר עבודות בלי לרדוף אחרי אף אחד." },
  { initial: "מ", name: "מירב כ׳", location: "באר שבע", text: "הכל שקוף — דירוגים, ביקורות, מחירים. הרגשתי בטוחה לבחור." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0F0C]">
      {/* Header */}
      <header className="bg-[#0E0F0C]/95 backdrop-blur-sm border-b border-white/[0.07] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 21, color: "#F5F6F1" }}
          >
            <span className="w-8 h-8 rounded-lg bg-[#CBF24D] flex items-center justify-center">
              <span className="ms text-[#12140C]" style={{ fontSize: 18 }}>handyman</span>
            </span>
            מקצוענים
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/professional/login"
              className="text-[13px] sm:text-[14px] text-[#9A9C92] hover:text-[#F5F6F1] transition-colors hidden sm:block"
            >
              כניסה לבעלי מקצוע
            </Link>
            <Link
              href="/post-job"
              className="bg-[#CBF24D] text-[#12140C] font-bold text-[13px] sm:text-[14px] px-4 py-2.5 rounded-xl hover:bg-[#B8DB38] transition-colors"
            >
              פרסם עבודה
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#1B1D18] border border-white/[0.08] text-[#CBF24D] text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CBF24D]" />
            +1,200 בעלי מקצוע פעילים
          </div>
          <h1
            className="text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.08] mb-5"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
          >
            מה צריך<br />
            <span style={{ color: "#CBF24D" }}>לתקן היום?</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#9A9C92] mb-8 max-w-lg leading-relaxed">
            מוצאים את בעל המקצוע הנכון באזורך — חשמלאים, שרברבים, שיפוצניקים ועוד. מהיר, אמין, חינם.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <Link
              href="/post-job"
              className="flex-1 flex items-center gap-3 bg-[#1B1D18] border border-white/[0.08] rounded-xl px-4 py-3.5 hover:border-white/20 transition-colors cursor-pointer"
            >
              <span className="ms text-[#74766d]" style={{ fontSize: 20 }}>search</span>
              <span className="text-[15px] text-[#74766d]">איזה שירות אתם צריכים?</span>
            </Link>
            <Link
              href="/post-job"
              className="bg-[#CBF24D] text-[#12140C] font-bold text-[15px] px-6 py-3.5 rounded-xl hover:bg-[#B8DB38] transition-colors text-center whitespace-nowrap"
            >
              פרסם עבודה בחינם
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-18">
        <h2
          className="text-[18px] sm:text-[20px] mb-5"
          style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, color: "#F5F6F1" }}
        >
          בחר תחום
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {CATEGORIES.map(({ icon, label }) => (
            <Link
              key={label}
              href={`/post-job?category=${encodeURIComponent(label)}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl bg-[#1B1D18] border border-white/[0.06] flex items-center justify-center group-hover:border-[#CBF24D]/40 group-hover:bg-[#232520] transition-all">
                <span className="ms text-[#CBF24D]" style={{ fontSize: 24 }}>{icon}</span>
              </div>
              <span className="text-[11px] sm:text-[12px] text-[#c7c9c0] font-medium text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-white/[0.06] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2
            className="text-[22px] sm:text-[28px] mb-8 text-center"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
          >
            3 צעדים לעבודה גמורה
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: "edit_note", step: "צעד 1", title: "מתארים את העבודה", desc: "ממלאים טופס קצר — קטגוריה, עיר ותיאור. לוקח דקה." },
              { icon: "groups", step: "צעד 2", title: "מקבלים פניות", desc: "בעלי מקצוע מאומתים פונים אליכם עם הצעות מחיר." },
              { icon: "handshake", step: "צעד 3", title: "בוחרים ומסכמים", desc: "משווים, בוחרים את המתאים — והעבודה מתבצעת." },
            ].map(({ icon, step, title, desc }) => (
              <div key={step} className="bg-[#1B1D18] border border-white/[0.07] rounded-2xl p-5 sm:p-6">
                <span className="ms text-[#CBF24D] mb-4 block" style={{ fontSize: 28 }}>{icon}</span>
                <div
                  className="text-[12px] font-bold mb-1.5"
                  style={{ color: "#CBF24D", fontFamily: "var(--font-rubik)" }}
                >
                  {step}
                </div>
                <div
                  className="text-[17px] sm:text-[18px] mb-2"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 700, color: "#F5F6F1" }}
                >
                  {title}
                </div>
                <div className="text-[13px] sm:text-[14px] text-[#9A9C92] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-7">
            <h2
              className="text-[22px] sm:text-[28px]"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
            >
              לקוחות מספרים
            </h2>
            <div className="text-[14px] text-[#9A9C92]">
              <span style={{ color: "#CBF24D" }}>★★★★★</span> 4.8 מתוך 5 · 9,200 ביקורות
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#1B1D18] border border-white/[0.07] rounded-2xl p-5 sm:p-6">
                <div className="mb-3 text-[14px]" style={{ color: "#CBF24D" }}>★★★★★</div>
                <p className="text-[14px] leading-[1.65] text-[#c7c9c0] mb-5">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full bg-[#232520] border border-white/[0.08] flex items-center justify-center font-bold text-[14px] shrink-0"
                    style={{ color: "#CBF24D" }}
                  >
                    {r.initial}
                  </span>
                  <div>
                    <div className="font-semibold text-[14px] text-[#F5F6F1]">{r.name}</div>
                    <div className="text-[12px] text-[#74766d]">{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 text-center">
            {[
              { num: "1,200+", label: "בעלי מקצוע" },
              { num: "8,500+", label: "עבודות בוצעו" },
              { num: "26", label: "ערים בישראל" },
              { num: "4.9★", label: "דירוג ממוצע" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-[30px] sm:text-[36px]"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#CBF24D" }}
                >
                  {stat.num}
                </div>
                <div className="text-[13px] text-[#9A9C92]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="py-12 sm:py-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-[#CBF24D] rounded-2xl p-6 sm:p-8">
            <span className="ms text-[#12140C] mb-3 block" style={{ fontSize: 28 }}>build</span>
            <h3
              className="text-[22px] sm:text-[26px] mb-2"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#12140C" }}
            >
              צריכים בעל מקצוע?
            </h3>
            <p className="text-[15px] text-[#3a3d2e] leading-relaxed mb-6">פרסמו את העבודה בחינם וקבלו הצעות עוד היום.</p>
            <Link
              href="/post-job"
              className="inline-block text-[14px] font-bold text-[#CBF24D] bg-[#12140C] px-5 py-3 rounded-xl hover:bg-[#1d1f15] transition-colors cursor-pointer"
            >
              פרסום עבודה ←
            </Link>
          </div>
          <div className="bg-[#1B1D18] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
            <span className="ms text-[#CBF24D] mb-3 block" style={{ fontSize: 28 }}>person_add</span>
            <h3
              className="text-[22px] sm:text-[26px] mb-2"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#F5F6F1" }}
            >
              בעלי מקצוע?
            </h3>
            <p className="text-[15px] text-[#9A9C92] leading-relaxed mb-6">קבלו לידים רלוונטיים באזור שלכם, בזמן אמת.</p>
            <Link
              href="/professional/register"
              className="inline-block text-[14px] font-bold text-[#12140C] bg-[#CBF24D] px-5 py-3 rounded-xl hover:bg-[#B8DB38] transition-colors cursor-pointer"
            >
              הצטרפות כבעל מקצוע ←
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center gap-2 sm:justify-between text-[13px] text-[#74766d]">
          <div
            className="flex items-center gap-2"
            style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 17, color: "#9A9C92" }}
          >
            <span className="w-6 h-6 rounded-md bg-[#CBF24D] flex items-center justify-center">
              <span className="ms text-[#12140C]" style={{ fontSize: 14 }}>handyman</span>
            </span>
            מקצוענים
          </div>
          <span>© 2026 כל הזכויות שמורות</span>
        </div>
      </footer>
    </div>
  );
}
