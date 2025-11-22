import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

function getCategoryColor(category: string) {
  switch (category) {
    case 'Diet': return 'bg-green-100 text-green-700 border-green-200';
    case 'Tech': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Design': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Life': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Journal</h1>
        <p className="text-gray-500 text-sm">日々の記録と思い出</p>
      </div>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group bg-white p-4 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-md transition flex flex-col md:flex-row gap-6 items-center md:items-stretch">
            
            {/* 画像エリア (サムネイル) */}
            <Link href={`/journal/${post.slug}`} className="block w-full md:w-48 h-48 md:h-auto flex-shrink-0 relative rounded-xl overflow-hidden bg-yellow-50">
              {post.image ? (
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                  📖
                </div>
              )}
            </Link>

            {/* テキストエリア */}
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="flex items-center gap-3 mb-2 text-sm">
                <time className="text-gray-400 font-mono">{post.date}</time>
                <span className={`px-2 py-0.5 rounded text-xs border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>
              
              <Link href={`/journal/${post.slug}`}>
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition mb-3 leading-snug">
                  {post.title}
                </h2>
              </Link>
              
              {/* もし記事に「説明文(description)」があればここに表示できますが、今回は省略 */}
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                クリックして記事の続きを読む...
              </p>

              <div className="mt-auto">
                 <Link href={`/journal/${post.slug}`} className="text-yellow-600 text-sm font-bold hover:underline">
                  Read Article
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}