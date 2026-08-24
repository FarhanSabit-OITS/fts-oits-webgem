/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.run.app',
    '*.google.com',
    '*.googleusercontent.com',
    'localhost:3000',
  ],
};

export default nextConfig;
