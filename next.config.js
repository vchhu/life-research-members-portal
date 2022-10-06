/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This lil guy breaks a lot of stuff in production build
  swcMinify: false,
};

module.exports = nextConfig;
