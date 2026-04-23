/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGithubActions ? process.env.BASE_PATH || '' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
}

export default nextConfig
