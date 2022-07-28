/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
     " https://lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig
