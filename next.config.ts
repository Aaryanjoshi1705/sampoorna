import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const repo = isGithubActions && process.env.GITHUB_REPOSITORY 
  ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') 
  : '';

const basePath = repo ? `/${repo}` : '';

const nextConfig: NextConfig = {
  // WebGL / R3F canvases don't tolerate Strict Mode's dev double-mount
  reactStrictMode: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
