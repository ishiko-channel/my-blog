import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from 'next'; // 型定義を追加
import { getPostData } from '@/lib/posts'; // さっき作った関数

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. ここが重要！SEO用のデータを自動生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  return {
    title: post.title, // ブラウザのタブが「記事タイトル」になる
    description: `${post.date}の記録。カテゴリ: ${post.category}`,
    openGraph: {
      title: post.title,
      description: `${post.date}の記録`,
      images: post.image ? [post.image] : [], // 記事に画像があればSNSシェア時にも表示
    },
  };
}

// 記事の中身をHTMLに変換する関数（中身は以前と同じですが、getPostDataを使うように整理）
async function getPostContent(slug: string) {
  const post = getPostData(slug);
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return {
    ...post,
    contentHtml,
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      {/* ヘッダーエリア */}
      <div className="mb-8 text-center border-b border-yellow-100 pb-8">
        <div className="flex justify-center gap-3 mb-4 text-sm text-gray-500 font-mono">
          <time>{post.date}</time>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs border border-yellow-200">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
          {post.title}
        </h1>

        {/* アイキャッチ画像があれば表示 */}
        {post.image && (
          <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-sm mb-6">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* 本文エリア */}
      <div 
        className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-a:text-yellow-600 hover:prose-a:text-yellow-500 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  );
}