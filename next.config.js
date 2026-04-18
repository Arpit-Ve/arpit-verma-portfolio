/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',      // enables static HTML export for Cloudflare Pages
  images: {
    unoptimized: true,   // required for static export
  },
  trailingSlash: true,   // better compatibility with Cloudflare routing
}

module.exports = nextConfig
