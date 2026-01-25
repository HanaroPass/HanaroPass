import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'blog.kakaocdn.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'w7.pngwing.com' },
      { protocol: 'https', hostname: 'w1.pngwing.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'i.namu.wiki' },
      { protocol: 'https', hostname: 'static.cdnlogo.com' },
      { protocol: 'https', hostname: 'corp.musinsa.com' },
      { protocol: 'https', hostname: 'e7.pngegg.com' },
      { protocol: 'https', hostname: 'www.brandb.net' },
      { protocol: 'https', hostname: 'img.favpng.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
    ],
  },
};

export default nextConfig;
