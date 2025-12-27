/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['instagram.com', 'scontent.cdninstagram.com'],
  },
  // Limit workers to avoid resource issues
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;

