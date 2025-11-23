import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import ShareButtons from '@/components/ShareButtons';

function getCategoryColor(category: string) {
  switch (category) {
    case 'Diet': return 'bg-green-100 text-green-700 border-green-200';
    case 'Tech': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Design': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Life': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export default function Home() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 2);

  return (
    <div className="min-h-screen pb-20">
      {/* ヒーローセクション (変更なし) */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image src="/hero-bg.png" alt="Hero Background" fill className="object-cover opacity-40 blur-[1px]" priority />
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-900/20 mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-yellow-50 via-yellow-50/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/80 backdrop-blur-sm border border-yellow-200 text-yellow-700 text-xs font-medium mb-6 shadow-sm">
            Diet & Life
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight drop-shadow-sm">
            心と体を整える、<br />
            いしこの日常ログ。
          </h1>
          <p className="text-lg text-gray-700 mb-10 leading-relaxed font-medium drop-shadow-sm">
            食べたもの、感じたこと、<br />そして少しずつの変化を大切に。<br />気まぐれ更新な秘密基地的ブログです。
          </p>
          <Link href="/profile" className="inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-500 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md">
            Profileを見る
          </Link>
        </div>
      </section>

      {/* 最新の記事一覧 (ここを修正！) */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-700">Recent Journal</h2>
          <Link href="/journal" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
            記事一覧へ →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-yellow-100 flex flex-col h-full">
              <Link href={`/journal/${post.slug}`} className="flex flex-col h-full">
                
                {/* 画像エリア：画像があれば表示、なければアイコン */}
                <div className="h-48 relative bg-yellow-50 overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20 group-hover:scale-110 transition">
                      🍋
                    </div>
                  )}
                  {/* 日付バッジを画像の上に載せる */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                    {post.date}
                  </div>
                </div>
                
                {/* テキストエリア */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                     <span className={`inline-block text-xs px-2 py-1 rounded-md border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <div className="mt-auto text-right">
                    <span className="text-yellow-600 text-sm font-medium group-hover:underline">Read more →</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="max-w-xl mx-auto px-6 pb-20">
        <ShareButtons 
          title="Ishiko's Daily Log - 心と体を整える、日々の記録。"
          url="https://ishiko-daily.com" 
        />
      </section>
    </div>
  );
}