import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog",
  description: "プログラミング学習のアウトプットブログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {/* ヘッダー */}
        <header className="bg-yellow-400 text-white py-5 shadow-md">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            {/* ロゴ（クリックするとトップに戻る） */}
            <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
              My Blog
            </Link>

            {/* ナビゲーションメニュー */}
            <nav>
              <ul className="flex space-x-6 text-sm font-medium">
                <li>
                  <Link href="/" className="hover:text-blue-200 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-blue-200 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-200 transition">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ（ここにpage.tsxの中身が入ります） */}
        <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-gray-800 text-white py-4 text-center text-sm">
          © 2025 Ishiko. All rights reserved.
        </footer>
      </body>
    </html>
  );
}