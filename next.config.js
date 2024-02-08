/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // need to say which images we accept from different api endpoints
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'lh3.googleusercontent.com', 
      },
      {
        protocol: "https",
        hostname: 'files.stripe.com'
      },
    ]
  } 
}
module.exports = nextConfig

