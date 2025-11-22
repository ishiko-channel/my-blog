import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ishiko-daily.com'; // あなたのドメイン
  const allPosts = getAllPosts();

  // 1. 記事ページのURLたち
  const postsUrls = allPosts.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // 2. 固定ページのURLたち
  const routes = [
    '',
    '/journal',
    '/profile',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // 合体して返す
  return [...routes, ...postsUrls];
}