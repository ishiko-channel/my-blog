import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from 'next'; 
import { getPostData } from '@/lib/posts'; 
import ShareButtons from '@/components/ShareButtons';
import AuthorBox from '@/components/AuthorBox';

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO用のデータを自動生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  return {
    title: post.title, 
    description: `${post.date}の記録。カテゴリ: ${post.category}`,
    openGraph: {
      title: post.title,
      description: `${post.date}の記録`,
      images: post.image ? [post.image] : [], 
    },
  };
}

// 記事の中身をHTMLに変換する関数
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
    // 修正1: px-6 -> px-5 md:px-8 
    // スマホでの左右の余白を少し調整し、窮屈さをなくしました
    <article className="max-w-3xl mx-auto py-12 px-5 md:px-8">
      
      {/* ヘッダーエリア */}
      <div className="mb-8 text-center border-b border-yellow-100 pb-8">
        <div className="flex justify-center gap-3 mb-4 text-sm text-gray-500 font-mono">
          <time>{post.date}</time>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs border border-yellow-200">
            {post.category}
          </span>
        </div>
        
        {/* 修正2: text-3xl -> text-2xl md:text-4xl */}
        {/* スマホでタイトルがデカすぎて改行だらけになるのを防ぎます */}
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
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

      <div className="max-w-xl mx-auto">
        <AuthorBox />
      </div>
      
      {/* 本文エリア */}
      {/* 修正3: prose-lg -> prose md:prose-lg */}
      {/* スマホでは「標準サイズ」の文字にして、1行に多く文字が入るようにしました */}
      <div 
        className="prose prose-slate md:prose-lg mx-auto prose-headings:font-bold prose-a:text-yellow-600 hover:prose-a:text-yellow-500 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />

      <ShareButtons 
        title={`${post.title} | Ishiko's Daily Log`}
        url={`https://ishiko-daily.com/journal/${post.slug}`} 
      />
    </article>
  );
}