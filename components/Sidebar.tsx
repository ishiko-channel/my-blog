import Link from 'next/link';

type CategoryCount = { name: string; count: number; };
type MonthlyCount = { month: string; count: number; };

type Props = {
  categories: CategoryCount[];
  months: MonthlyCount[];
  // 追加: 今選ばれている値を受け取る
  currentCategory?: string;
  currentMonth?: string;
};

export default function Sidebar({ categories, months, currentCategory, currentMonth }: Props) {
  return (
    <aside className="bg-[#fffdf9] p-6 border-2 border-orange-100 shadow-md transform -rotate-1 space-y-10 relative z-10">
      
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/50 rotate-3 blur-[1px]"></div>

      {/* プロフィール */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src="/profile.jpg" alt="Ishiko" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Ishiko</p>
            <Link href="/profile" className="text-xs text-yellow-600 hover:underline">
              View Profile
            </Link>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          日々の記録とダイエットの進捗。<br/>
          心と体を整えるライフスタイルを模索中。
        </p>
      </div>

      {/* カテゴリーリスト */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-orange-200 pb-2">
          Category
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => {
            // 判定: 今このカテゴリが選ばれているか？
            const isActive = currentCategory === cat.name;
            return (
              <li key={cat.name}>
                <Link 
                  // 選ばれていたら解除(/journal)、そうでなければ絞り込み
                  href={isActive ? '/journal' : `/journal?category=${cat.name}`} 
                  className={`flex items-center justify-between py-2 text-sm transition group border-b border-dashed border-orange-200 last:border-0 ${
                    isActive ? 'text-yellow-700 font-bold bg-yellow-50/50 -mx-2 px-2 rounded-lg' : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* 選ばれていたら丸印をつける */}
                    {isActive && <span className="text-[10px] text-yellow-500">●</span>}
                    {cat.name}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-md shadow-sm transition ${
                    isActive ? 'bg-yellow-400 text-white' : 'bg-white text-orange-600 group-hover:text-yellow-600'
                  }`}>
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 月別アーカイブ */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-orange-200 pb-2">
          Archive
        </h3>
        <ul className="space-y-1">
          {months.map((m) => {
            // 判定: 今この月が選ばれているか？
            const isActive = currentMonth === m.month;
            return (
              <li key={m.month}>
                <Link 
                  href={isActive ? '/journal' : `/journal?month=${m.month}`} 
                  className={`flex items-center justify-between py-2 text-sm transition group border-b border-dashed border-orange-200 last:border-0 ${
                    isActive ? 'text-yellow-700 font-bold bg-yellow-50/50 -mx-2 px-2 rounded-lg' : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="text-[10px] text-yellow-500">●</span>}
                    {m.month}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-md transition ${
                     // 月アーカイブはシンプルに文字色だけで差をつける
                    isActive ? 'text-yellow-700 font-bold' : 'text-gray-400 group-hover:text-yellow-600'
                  }`}>
                    {m.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </aside>
  );
}