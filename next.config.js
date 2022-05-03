/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['source.unsplash.com'],
  },
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig
