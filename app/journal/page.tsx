import Link from 'next/link';
import { getAllPosts, getCategoryCounts, getMonthlyCounts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

function getCategoryColor(category: string) {
  switch (category) {
    case 'Diet': return 'bg-green-100 text-green-700 border-green-200';
    case 'Tech': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Design': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Life': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

type Props = {
  searchParams: Promise<{
    category?: string;
    month?: string;
  }>;
};

export default async function JournalPage({ searchParams }: Props) {
  const { category, month } = await searchParams;
  const allPosts = getAllPosts();

  // フィルタリングロジック
  let filteredPosts = allPosts;

  if (category) {
    filteredPosts = allPosts.filter((post) => post.category === category);
  } else if (month) {
    filteredPosts = allPosts.filter((post) => post.date.startsWith(month));
  }

  const categories = getCategoryCounts(allPosts);
  const months = getMonthlyCounts(allPosts);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Journal</h1>
        <p className="text-gray-500 text-sm">日々の記録と思い出</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* メインコンテンツ */}
        <div className="lg:col-span-8 space-y-8">

          {/* 【変更】ここに「解除ボタン」がありましたが、削除しました！シンプル！ */}

          {/* 記事が0件だった場合のメッセージ */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500">該当する記事は見つかりませんでした。</p>
              <Link href="/journal" className="text-yellow-600 text-sm font-bold hover:underline mt-2 inline-block">
                すべての記事に戻る
              </Link>
            </div>
          )}

          {/* 記事リスト */}
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group bg-white p-5 rounded-3xl shadow-sm border border-yellow-100 hover:shadow-lg transition flex flex-col md:flex-row gap-6 items-start">
              
              <Link href={`/journal/${post.slug}`} className="block w-full md:w-56 flex-shrink-0 relative rounded-2xl overflow-hidden bg-yellow-50 aspect-[16/9] md:aspect-square">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                    📖
                  </div>
                )}
              </Link>

              <div className="flex-1 flex flex-col h-full py-1">
                <div className="flex items-center gap-3 mb-3 text-sm">
                  <time className="text-gray-400 font-mono text-xs">{post.date}</time>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
                
                <Link href={`/journal/${post.slug}`}>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>
                
                <div className="mt-auto pt-2">
                   <Link href={`/journal/${post.slug}`} className="inline-flex items-center gap-1 text-yellow-600 text-sm font-bold hover:gap-2 transition-all">
                    Read Article <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* サイドバーエリア */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            {/* 【変更】現在の選択状態(category, month)をサイドバーに渡す */}
            <Sidebar 
              categories={categories} 
              months={months} 
              currentCategory={category} 
              currentMonth={month}
            />
          </div>
        </div>

      </div>
    </div>
  );
}