import Link from "next/link";
import {
  ShieldCheck, Search, Zap, Droplets, Hammer, PaintRoller,
  Wind, Sprout, Sparkles, Truck, Wrench, HardHat, KeyRound,
  Monitor, Ellipsis, PencilLine, Users, Handshake,
} from "lucide-react";

const CATEGORIES = [
  { icon: Zap, label: "חשמלאי" },
  { icon: Droplets, label: "שרברב" },
  { icon: Hammer, label: "נגר" },
  { icon: PaintRoller, label: "צבעי" },
  { icon: Wind, label: "מזגנים" },
  { icon: Sprout, label: "גינון" },
  { icon: Sparkles, label: "ניקיון" },
  { icon: Truck, label: "הובלות" },
  { icon: Wrench, label: "אינסטלטור" },
  { icon: HardHat, label: "שיפוצניק" },
  { icon: KeyRound, label: "מנעולן" },
  { icon: Monitor, label: "טכנאי מחשבים" },
  { icon: Ellipsis, label: "אחר" },
];

const REVIEWS = [
  { initial: "ד", name: "דנה ל׳", location: "רמת גן", text: "תוך שעה היו לי 4 הצעות מחשמלאים. בחרתי, נקבע, נגמר. בדיוק מה שחיפשתי." },
  { initial: "י", name: "יוסי מ׳", location: "שרברב · חיפה", text: "כבעל מקצוע, הלידים פה איכותיים. אני סוגר עבודות בלי לרדוף אחרי אף אחד." },
  { initial: "מ", name: "מירב כ׳", location: "באר שבע", text: "הכל שקוף — דירוגים, ביקורות, מחירים. הרגשתי בטוחה לבחור." },
];

export default function Home() {
  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#F5F7FC]">

      {/* ── NAV ── */}
      <header className="bg-white border-b border-[#E3E7F4] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-10 py-[18px] flex items-center justify-between">
          <div className="flex items-center gap-[34px]">
            <div className="flex items-center gap-[9px]" style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 22, color: "#0E1A3A" }}>
              <span className="w-[30px] h-[30px] rounded-lg bg-[#2C3FB5] flex items-center justify-center text-white">
                <ShieldCheck size={18} />
              </span>
              מקצוענים
            </div>
            <nav className="hidden md:flex gap-[26px] text-[15px] font-medium text-[#48527A]">
              <a href="#how" className="hover:text-[#2C3FB5] transition-colors">איך זה עובד</a>
              <a href="#categories" className="hover:text-[#2C3FB5] transition-colors">קטגוריות</a>
              <Link href="/professional/register" className="hover:text-[#2C3FB5] transition-colors">לבעלי מקצוע</Link>
            </nav>
          </div>
          <div className="flex items-center gap-[14px]">
            <Link href="/professional/login" className="text-[15px] font-semibold text-[#2C3FB5] hover:underline">כניסה</Link>
            <Link href="/post-job" className="text-[15px] font-bold text-white bg-[#2C3FB5] px-5 py-[10px] rounded-[10px] hover:bg-[#2233a0] transition-colors">
              פרסום עבודה
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2C3FB5] bg-[#EAEEFB] px-[14px] py-[7px] rounded-full mb-[22px]">
            <ShieldCheck size={15} />
            כל בעלי המקצוע מאומתים
          </div>
          <h1 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 52, lineHeight: 1.08, letterSpacing: -1, marginBottom: 18, color: "#0E1A3A" }}>
            מוצאים בעל מקצוע אמין —<br />
            <span style={{ color: "#2C3FB5" }}>בלי כאב ראש.</span>
          </h1>
          <p className="text-[19px] leading-relaxed text-[#48527A] mb-8 max-w-[480px]">
            מפרסמים את העבודה בחינם ומקבלים פניות מבעלי מקצוע מאומתים באזור שלכם — תוך דקות.
          </p>

          {/* Search bar */}
          <Link href="/post-job" className="flex items-center gap-[10px] bg-white p-[10px] rounded-[14px] border border-[#E3E7F4] shadow-[0_10px_30px_rgba(20,30,80,0.07)] max-w-[520px] mb-8 hover:shadow-[0_10px_40px_rgba(44,63,181,0.15)] transition-shadow">
            <div className="flex-1 flex items-center gap-[10px] px-[14px]">
              <Search size={20} className="text-[#9AA3C4]" />
              <span className="text-[16px] text-[#9AA3C4]">איזה שירות אתם צריכים?</span>
            </div>
            <span className="text-[16px] font-bold text-white bg-[#2C3FB5] px-[26px] py-[12px] rounded-[9px]">
              חיפוש
            </span>
          </Link>

          {/* Stats */}
          <div className="flex gap-[26px]">
            {[
              { value: "12,400+", label: "בעלי מקצוע" },
              { value: "85,000+", label: "עבודות בוצעו" },
              { value: "4.8★", label: "דירוג ממוצע" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-[26px]">
                <div>
                  <div style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 26, color: "#0E1A3A" }}>{s.value}</div>
                  <div className="text-[13px] text-[#7A83A6]">{s.label}</div>
                </div>
                {i < 2 && <div className="w-px h-10 bg-[#E3E7F4]" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right: hero visual + floating card */}
        <div className="relative hidden md:block">
          <div className="rounded-[18px] overflow-hidden border border-[#E3E7F4] shadow-[0_24px_60px_rgba(20,30,80,0.14)]">
            <div className="h-[340px] bg-[repeating-linear-gradient(135deg,#E9EDF8,#E9EDF8_11px,#F2F5FC_11px,#F2F5FC_22px)] flex items-center justify-center">
              <span className="font-mono text-[13px] text-[#8A93B2]">[ תמונת בעל מקצוע בעבודה ]</span>
            </div>
          </div>
          {/* Floating lead card */}
          <div className="absolute -bottom-6 -right-6 w-[268px] bg-white rounded-[14px] p-4 shadow-[0_18px_44px_rgba(20,30,80,0.18)] border border-[#EDF0F9] animate-bounce" style={{ animationDuration: "3s" }}>
            <div className="flex items-center justify-between mb-[10px]">
              <span className="inline-flex items-center gap-[6px] text-[11px] font-bold text-[#1A8F4C] bg-[#E4F6EC] px-[9px] py-1 rounded-full">
                <span className="w-[6px] h-[6px] rounded-full bg-[#1A8F4C] inline-block" />
                ליד חדש
              </span>
              <span className="text-[11px] text-[#9AA3C4]">לפני 2 דק׳</span>
            </div>
            <div className="font-bold text-[15px] mb-1 text-[#0E1A3A]">התקנת מזגן · תל אביב</div>
            <div className="text-[13px] text-[#6B7398] leading-relaxed mb-3">דרושה התקנת מזגן עילי בסלון, קומה 3...</div>
            <div className="text-[13px] font-bold text-white bg-[#2C3FB5] text-center py-[9px] rounded-lg">אני מעוניין</div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="bg-white border-t border-[#E3E7F4] py-[58px]">
        <div className="max-w-6xl mx-auto px-10">
          <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 30, marginBottom: 6, color: "#0E1A3A" }}>
            כל בעל מקצוע, במקום אחד
          </h2>
          <p className="text-[16px] text-[#6B7398] mb-8">בחרו קטגוריה והתחילו לקבל הצעות עוד היום</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[14px]">
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href={`/post-job?category=${encodeURIComponent(label)}`}
                className="bg-white border border-[#E3E7F4] rounded-[14px] p-5 flex flex-col items-center gap-3 cursor-pointer hover:border-[#2C3FB5] hover:shadow-[0_8px_24px_rgba(44,63,181,0.12)] transition-all"
              >
                <span className="w-[46px] h-[46px] rounded-[12px] bg-[#EAEEFB] text-[#2C3FB5] flex items-center justify-center">
                  <Icon size={24} />
                </span>
                <span className="text-[14px] font-semibold text-[#0E1A3A] text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-[60px]">
        <div className="max-w-6xl mx-auto px-10">
          <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 30, textAlign: "center", marginBottom: 34, color: "#0E1A3A" }}>
            3 צעדים לעבודה גמורה
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: PencilLine, step: "צעד 1", title: "מתארים את העבודה", desc: "ממלאים טופס קצר — קטגוריה, עיר ותיאור. לוקח דקה." },
              { icon: Users, step: "צעד 2", title: "מקבלים פניות", desc: "בעלי מקצוע מאומתים פונים אליכם עם הצעות מחיר." },
              { icon: Handshake, step: "צעד 3", title: "בוחרים ומסכמים", desc: "משווים, בוחרים את המתאים — והעבודה מתבצעת." },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-white border border-[#E3E7F4] rounded-[16px] p-7">
                <div className="w-[48px] h-[48px] rounded-[12px] bg-[#EAEEFB] text-[#2C3FB5] flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <div style={{ fontFamily: "var(--font-rubik)", fontSize: 13, fontWeight: 700, color: "#2C3FB5", marginBottom: 6 }}>{step}</div>
                <div className="font-bold text-[19px] mb-2 text-[#0E1A3A]">{title}</div>
                <div className="text-[15px] text-[#6B7398] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-white border-t border-[#E3E7F4] py-[58px]">
        <div className="max-w-6xl mx-auto px-10">
          <div className="flex items-end justify-between mb-7">
            <h2 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 30, color: "#0E1A3A" }}>לקוחות מספרים</h2>
            <div className="flex items-center gap-2 text-[15px] text-[#6B7398]">
              <span className="text-[#F5A623]">★★★★★</span>
              4.8 מתוך 5 · 9,200 ביקורות
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-[#E3E7F4] rounded-[14px] p-6">
                <div className="text-[#F5A623] mb-3">★★★★★</div>
                <p className="text-[15px] leading-[1.65] text-[#3A4263] mb-4">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-[10px]">
                  <span className="w-9 h-9 rounded-full bg-[#EAEEFB] text-[#2C3FB5] flex items-center justify-center font-bold text-[14px]">
                    {r.initial}
                  </span>
                  <div>
                    <div className="font-semibold text-[14px] text-[#0E1A3A]">{r.name}</div>
                    <div className="text-[12px] text-[#9AA3C4]">{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-[60px]">
        <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#2C3FB5] rounded-[18px] p-10 text-white">
            <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 26, marginBottom: 10 }}>צריכים בעל מקצוע?</h3>
            <p className="text-[16px] text-[#C9D1F4] leading-relaxed mb-6">פרסמו את העבודה בחינם וקבלו הצעות עוד היום.</p>
            <Link href="/post-job" className="inline-block text-[16px] font-bold text-[#2C3FB5] bg-white px-[26px] py-[13px] rounded-[10px] hover:bg-[#EAEEFB] transition-colors">
              פרסום עבודה →
            </Link>
          </div>
          <div className="bg-[#0E1A3A] rounded-[18px] p-10 text-white">
            <h3 style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, fontSize: 26, marginBottom: 10 }}>בעלי מקצוע?</h3>
            <p className="text-[16px] text-[#A9B2D6] leading-relaxed mb-6">קבלו לידים רלוונטיים באזור שלכם, בזמן אמת.</p>
            <Link href="/professional/register" className="inline-block text-[16px] font-bold text-[#0E1A3A] bg-white px-[26px] py-[13px] rounded-[10px] hover:bg-[#EAEEFB] transition-colors">
              הצטרפות כבעל מקצוע →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-[#E3E7F4] py-[30px]">
        <div className="max-w-6xl mx-auto px-10 flex items-center justify-between text-[13px] text-[#9AA3C4]">
          <div className="flex items-center gap-2" style={{ fontFamily: "var(--font-rubik)", fontWeight: 800, color: "#0E1A3A", fontSize: 17 }}>
            <span className="w-6 h-6 rounded-[6px] bg-[#2C3FB5] flex items-center justify-center text-white">
              <ShieldCheck size={14} />
            </span>
            מקצוענים
          </div>
          <span>© 2026 כל הזכויות שמורות</span>
        </div>
      </footer>

    </div>
  );
}
