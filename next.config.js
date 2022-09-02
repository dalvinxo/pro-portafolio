/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CI: "Deploy",
    NEXT_PUBLIC_NOTION_SECRECT: "Desde el modo desarrollo",
    NOTION_SECRECT: process.env.NOTION_SECRECT,
    NOTION_SECRECT_: "Intentando acceder"
  }
}

module.exports = nextConfig
