/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: './dist',
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search/page/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
