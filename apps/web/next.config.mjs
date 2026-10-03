/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

if (!basePath && isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || '';
  if (repo && !repo.endsWith('.github.io')) {
    basePath = `/${repo}`;
  }
}

const nextConfig = {
  reactStrictMode: true,
  ...(isGithubActions ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
