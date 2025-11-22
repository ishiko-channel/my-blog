import Link from 'next/link';

export default function AuthorBox() {
  return (
    <Link href="/profile" className="block mb-10 group">
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-yellow-50/80 border border-yellow-200 hover:bg-yellow-100/80 hover:border-yellow-300 transition duration-300">
        
        {/* アイコン画像 */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img 
              src="/profile.jpg" 
              alt="Ishiko" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* テキスト情報 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Written by</p>
            <div className="h-px w-8 bg-yellow-200"></div>
          </div>
          <p className="font-bold text-gray-800 text-sm group-hover:text-yellow-700 transition">
            Ishiko <span className="font-normal text-gray-500 text-xs ml-1">/ DataAnalyst</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
            心と体を整えるライフスタイルを模索中。
          </p>
        </div>

      </div>
    </Link>
  );
}