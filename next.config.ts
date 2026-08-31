import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WebGL / R3F canvases don't tolerate Strict Mode's dev double-mount
  // (renderer gets disposed then re-read). Disable to avoid the churn.
  reactStrictMode: false,
};

export default nextConfig;
