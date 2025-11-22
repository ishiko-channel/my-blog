import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  date: string;
  category?: string; // カテゴリがあれば表示（今回は仮定）
};

export default function Home() {
  // 記事取得ロジック（以前と同じ）
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts: Post[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      category: 'Tech', // 仮のカテゴリ
    };
  });

  return (
    <div className="min-h-screen">
      {/* 1. ヒーローセクション（現代的なトップ画面） */}
      <section className="relative bg-gray-900 text-white py-32 px-6 text-center overflow-hidden">
        {/* 背景の装飾（うっすらと光るグラデーション） */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-r from-blue-800 to-purple-800 blur-3xl transform -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Tech & Aesthetics
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            技術と日常、そして美学。<br />
            思考の断片をコードと共に紡ぐ場所。
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
          >
            私について
          </Link>
        </div>
      </section>

      {/* 2. 記事一覧エリア（カードデザイン） */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Latest Writings</h2>
          <span className="text-gray-500 text-sm">全 {posts.length} 記事</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                {/* サムネイル代わりのグラデーションエリア */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center group-hover:scale-105 transition duration-500">
                  <span className="text-4xl opacity-20">📝</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md font-medium">
                      {post.category}
                    </span>
                    <time className="text-gray-400 text-sm">{post.date}</time>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    クリックして記事を読む...
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}