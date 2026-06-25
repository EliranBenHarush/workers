import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">מקצוענים</h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/professional/login" className="text-gray-600 hover:text-blue-600">
              כניסה לבעלי מקצוע
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              מצא בעל מקצוע מהיר ואמין
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              פרסם עבודה בחינם וקבל הצעות מבעלי מקצוע באזורך תוך דקות
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/post-job"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                אני מחפש בעל מקצוע →
              </Link>
              <Link
                href="/professional/register"
                className="bg-blue-500 border-2 border-white text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-blue-400 transition-colors"
              >
                אני בעל מקצוע
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">
              איך זה עובד?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "פרסם עבודה",
                  desc: "תאר את העבודה שאתה צריך, בחר קטגוריה ועיר",
                  icon: "📝",
                },
                {
                  step: "2",
                  title: "קבל הצעות",
                  desc: "בעלי מקצוע רלוונטיים באזורך יראו את הפנייה שלך",
                  icon: "📞",
                },
                {
                  step: "3",
                  title: "בחר ובצע",
                  desc: "השווה בין בעלי המקצוע ובחר את המתאים ביותר",
                  icon: "✅",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">
              קטגוריות פופולריות
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "חשמלאי", icon: "⚡" },
                { name: "שרברב", icon: "🔧" },
                { name: "נגר", icon: "🪵" },
                { name: "צבעי", icon: "🎨" },
                { name: "מזגנים", icon: "❄️" },
                { name: "גינון", icon: "🌿" },
                { name: "ניקיון", icon: "🧹" },
                { name: "הובלות", icon: "🚛" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/post-job?category=${encodeURIComponent(cat.name)}`}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-blue-300 border border-gray-200 transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <div className="font-medium text-gray-700">{cat.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA for professionals */}
        <section className="bg-blue-50 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              אתה בעל מקצוע?
            </h3>
            <p className="text-gray-600 mb-6">
              הצטרף לפלטפורמה וקבל לידים חמים מלקוחות באזורך — ללא עמלות, בתשלום חודשי קבוע
            </p>
            <Link
              href="/professional/register"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors inline-block"
            >
              הרשמה בחינם לשבועיים ניסיון
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 px-4 text-center text-sm">
        <p>© 2025 מקצוענים. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
