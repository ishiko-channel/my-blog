import Link from 'next/link';

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      
      {/* --- 1. メインプロフィールカード --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-yellow-100 overflow-hidden mb-6">
        
        {/* カバー背景 */}
        <div className="h-32 bg-gradient-to-r from-yellow-200 to-orange-100 relative">
          <div className="absolute top-4 right-6 text-2xl opacity-50">✨</div>
        </div>

        {/* プロフィール情報 */}
        <div className="px-8 pb-8 relative">
          {/* 画像エリア（中央寄せ） */}
          <div className="text-center -mt-16 mb-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-yellow-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden mx-auto">
                <img 
                  src="/profile.jpg" 
                  alt="Ishikoのプロフィール" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Onlineバッジ */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 border-4 border-white rounded-full"></div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Ishiko</h1>
            <p className="text-yellow-600 font-medium">Data Analyst / Learner</p>
          </div>

          {/* 自己紹介文 */}
          <p className="text-gray-600 leading-relaxed text-sm mb-8 text-center">
            JTCに勤めるしがない20代の若手データアナリスト。<br />
            日々の想いをダイエットの記録を綴ります。<br />
            現在、このサイトは公開しつつも絶賛開発中！
          </p>

          {/* --- 経歴タイムライン --- */}
          <div className="max-w-sm mx-auto mb-10">
            <h2 className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Career History</h2>
            
            <div className="relative border-l-2 border-gray-100 ml-3 pl-8 space-y-8">
              
              {/* 経歴 1 (追加: 大学) */}
              <div className="relative">
                {/* タイムラインの点 */}
                <div className="absolute -left-[39px] top-1 w-5 h-5 bg-yellow-100 border-2 border-yellow-400 rounded-full z-10"></div>
                
                <div className="text-xs text-gray-400 font-mono mb-1">2017.04</div>
                <h3 className="font-bold text-gray-700">某国立大学に入学</h3>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                    Mathematics
                  </span>
                </div>
              </div>
              
              {/* 経歴 2 (SIer) */}
              <div className="relative">
                <div className="absolute -left-[39px] top-1 w-5 h-5 bg-yellow-100 border-2 border-yellow-400 rounded-full z-10"></div>
                
                <div className="text-xs text-gray-400 font-mono mb-1">2021.04</div>
                <h3 className="font-bold text-gray-700">SIerに新卒入社</h3>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                    Data Analyst
                  </span>
                </div>
              </div>

              {/* 経歴 3 (JTC - 現在) */}
              <div className="relative">
                {/* ここだけ現在進行形として色を濃くしています */}
                <div className="absolute -left-[39px] top-1 w-5 h-5 bg-yellow-400 border-2 border-yellow-200 rounded-full z-10 shadow-sm"></div>
                
                <div className="text-xs text-yellow-600 font-bold font-mono mb-1">2025.07</div>
                <h3 className="font-bold text-gray-800">JTCに転職</h3>
                <div className="mt-2">
                  <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md font-medium border border-blue-100">
                    Data Analyst
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Current</p>
              </div>

            </div>
          </div>
          {/* --- 経歴ここまで --- */}

          {/* SNSリンク */}
          <div className="flex justify-center gap-3 border-t border-gray-50 pt-8">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-yellow-400 hover:text-white transition">
              𝕏
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-800 hover:text-white transition">
              🐙
            </a>
            <Link href="/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-400 hover:text-white transition">
              🏠
            </Link>
          </div>
        </div>
      </div>

      {/* --- 2. ステータス・ウィジェット --- */}
      <div className="grid grid-cols-2 gap-4">
        {/* 左：ダイエット目標 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-yellow-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl mb-3">🥗</div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Diet Goal</div>
          <div className="text-2xl font-bold text-gray-800">15<span className="text-sm text-gray-500 ml-1">%</span></div>
          <div className="text-xs text-green-600 mt-1 font-medium">体脂肪率</div>
        </div>

        {/* 右：現在のフォーカス */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-yellow-100 flex flex-col items-center text-center hover:shadow-md transition">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl mb-3">💻</div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Focus</div>
          <div className="text-xl font-bold text-gray-800">Data Analytics</div>
          <div className="text-xs text-blue-600 mt-1 font-medium">本職＆勉強中</div>
        </div>
      </div>
    </div>
  );
}