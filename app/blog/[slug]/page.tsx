import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 記事ページのプロパティ型定義
type Props = {
  params: Promise<{ slug: string }>;
};

// マークダウンをHTMLに変換する関数
async function getPostContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    date: data.date,
    contentHtml,
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
      </div>
      
      {/* 記事本文を表示するエリア */}
      {/* prose クラスが Tailwind Typography の魔法です */}
      <div 
        className="prose prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  );
}