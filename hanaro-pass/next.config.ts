import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
