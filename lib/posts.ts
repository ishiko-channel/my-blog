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