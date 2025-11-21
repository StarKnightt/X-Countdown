/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental app dir as it's stable in Next.js 14
  images: {
    domains: [],
  },
  // Optimize for single page application
  trailingSlash: false,
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig