import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// ブログ記事の型定義（TypeScript用）
type Post = {
  slug: string;
  title: string;
  date: string;
};

export default function Home() {
  // 1. 記事が入っているフォルダの場所を取得
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  // 2. フォルダの中にあるファイル名を全部取得（例: ['first-post.md']）
  const fileNames = fs.readdirSync(postsDirectory);

  // 3. 各ファイルの中身を読み込んで、必要なデータを取り出す
  const posts: Post[] = fileNames.map((fileName) => {
    // ファイル名から ".md" を消して slug（URL用ID）にする
    const slug = fileName.replace(/\.md$/, '');
    
    // ファイルの場所
    const fullPath = path.join(postsDirectory, fileName);
    
    // ファイルの中身を読み込む
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matterでタイトルなどを解析
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
    };
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">最新記事一覧</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <Link href={`/blog/${post.slug}`} className="block">
              <h3 className="text-xl font-semibold text-blue-600">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{post.date}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}