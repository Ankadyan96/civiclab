/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.datakeep.civicdays.in',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;