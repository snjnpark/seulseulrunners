/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF 및 WebP 포맷 활성화
  },
};

module.exports = nextConfig;
