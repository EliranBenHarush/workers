import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["hebrew", "latin"], weight: ["400","500","600","700","800"], variable: "--font-rubik" });
const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: ["400","500","600","700","800"], variable: "--font-heebo" });

export const metadata: Metadata = {
  title: "מקצוענים - פלטפורמת בעלי מקצוע",
  description: "מצא את בעל המקצוע המושלם באזורך",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`h-full ${rubik.variable} ${heebo.variable}`}>
      <body className="min-h-full flex flex-col bg-[#F5F7FC] text-[#0E1A3A] antialiased" style={{ fontFamily: "var(--font-heebo), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
