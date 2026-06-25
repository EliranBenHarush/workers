import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="he" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
