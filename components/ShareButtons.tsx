'use client';

import { useState } from 'react';

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  // シェア用URL
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
  
  // Instagramは直接シェアできないため、とりあえずトップページか自分のプロフィールを開く形にします
  // ※ 自分のプロフィールに飛ばしたい場合は 'https://www.instagram.com/あなたのアカウントID/' に書き換えてください
  const instagramUrl = 'https://www.instagram.com/';

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8 border-t border-yellow-100 mt-12">
      <p className="text-sm text-gray-400 font-bold tracking-widest uppercase">Share this post</p>
      
      <div className="flex gap-4">
        {/* X (Twitter) - 黒 */}
        <a 
          href={xUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl hover:opacity-80 transition shadow-sm"
          title="Xでシェア"
        >
          𝕏
        </a>

        {/* LINE - 緑 */}
        <a 
          href={lineUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#06C755] text-white flex items-center justify-center text-xl hover:opacity-80 transition shadow-sm font-bold"
          title="LINEでシェア"
        >
          L
        </a>

        {/* Instagram - グラデーション */}
        <a 
          href={instagramUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          // Instagram特有のグラデーションカラーを再現
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-xl hover:opacity-80 transition shadow-sm font-bold"
          title="Instagramを開く"
        >
          {/* カメラの絵文字、または 'Ig' などの文字 */}
          📸
        </a>

        {/* Copy Link - 白 */}
        <button 
          onClick={handleCopy}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition shadow-sm border ${
            copied 
              ? 'bg-yellow-400 text-white border-yellow-400' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
          title="リンクをコピー"
        >
          {copied ? '✨' : '🔗'}
        </button>
      </div>
      
      {copied && <p className="text-xs text-yellow-600 font-bold animate-pulse">Copied!</p>}
    </div>
  );
}