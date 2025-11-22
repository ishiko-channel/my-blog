import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// 型定義に image (任意) を追加
export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image?: string; // 画像はあってもなくてもOK（?マーク）
};

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category || 'Note',
      image: data.image || null, // 画像があれば設定、なければnull
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 特定の記事1つの中身を取得する関数
export function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      category: data.category || 'Note',
      image: data.image || null,
    };
  }

  // カテゴリーごとの記事数を集計する関数
export function getCategoryCounts(posts: Post[]) {
    const counts: { [key: string]: number } = {};
    posts.forEach((post) => {
      const category = post.category || 'Other';
      counts[category] = (counts[category] || 0) + 1;
    });
    // オブジェクトを配列に変換して返す
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }
  
  // 月ごとの記事数を集計する関数 (YYYY-MM)
  export function getMonthlyCounts(posts: Post[]) {
    const counts: { [key: string]: number } = {};
    posts.forEach((post) => {
      // 日付 "2025-11-22" から "2025-11" を取り出す
      const month = post.date.slice(0, 7);
      counts[month] = (counts[month] || 0) + 1;
    });
    // 日付の降順（新しい順）にソートして返す
    return Object.entries(counts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => b.month.localeCompare(a.month));
  }