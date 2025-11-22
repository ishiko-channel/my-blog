import type { Metadata } from "next";
import "./globals.css";
import { Zen_Maru_Gothic } from "next/font/google";
// 作ったHeaderコンポーネントを読み込む
import Header from "@/components/Header";
import { GoogleAnalytics } from '@next/third-parties/google'

const zenMaru = Zen_Maru_Gothic({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Ishiko's Daily Log",
  description: "日常の記録とダイエット日記",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍋</text></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`bg-yellow-50 text-gray-700 min-h-screen flex flex-col ${zenMaru.className}`}>
        
        {/* Step 1で作ったヘッダーをここに配置 */}
        <Header />

        <main className="flex-grow w-full">
          {children}
        </main>

        <footer className="bg-yellow-100 text-yellow-800 py-10 text-center text-sm border-t border-yellow-200 mt-auto">
           <div className="flex justify-center gap-4 mb-4 font-medium">
            <a href="/" className="hover:text-yellow-600 transition">Home</a>
            <a href="/journal" className="hover:text-yellow-600 transition">Journal</a>
            <a href="/profile" className="hover:text-yellow-600 transition">Profile</a>
          </div>
          <p className="opacity-70">© 2025 My Daily Log.</p>
        </footer>

        <GoogleAnalytics gaId="G-VBQH368MR9" />
      </body>
    </html>
  );
}