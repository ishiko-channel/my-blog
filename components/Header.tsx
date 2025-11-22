'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "600"] });

export default function Header() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
    const baseClass = "flex items-center gap-1 px-4 py-2 rounded-full border shadow-sm transition duration-300";

    if (isActive) {
      return `${baseClass} bg-yellow-400 text-white border-yellow-400`;
    } else {
      // ボタンの背景は「白」のままにするのがポイント！ベージュのヘッダーの上で白が映えます。
      return `${baseClass} bg-white text-gray-600 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300`;
    }
  };

  return (
    // ここを変更！ bg-white -> bg-orange-50 (ベージュ)
    <header className="bg-orange-50/80 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-yellow-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        
        {/* ロゴ */}
        <Link 
          href="/" 
          className={`flex items-center gap-2 text-2xl text-gray-800 hover:opacity-70 transition tracking-tight ${fredoka.className}`}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-sm">
            <span className="text-sm transform -rotate-12">🍋</span>
          </div>
          <span className="font-semibold text-gray-800">
            My Daily Log
          </span>
        </Link>

        {/* メニュー */}
        <nav>
          <ul className={`flex space-x-3 text-sm font-medium ${fredoka.className}`}>
            <li>
              <Link href="/" className={getLinkClass('/')}>
                <span>🏠</span><span className="hidden md:inline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/journal" className={getLinkClass('/journal')}>
                <span>📖</span><span className="hidden md:inline">Journal</span>
              </Link>
            </li>
            <li>
            <Link href="/profile" className={getLinkClass('/profile')}>
                <span>👤</span><span className="hidden md:inline">Profile</span>
            </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}