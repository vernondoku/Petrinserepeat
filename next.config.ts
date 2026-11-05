import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // static HTML — no server needed; deploys anywhere (Vercel, Cloudflare Pages)
  trailingSlash: true,       // /pricing/ style URLs, matches the old WordPress paths
  images: { unoptimized: true }, // static export can't run the image optimizer; we ship pre-sized media instead
  reactStrictMode: true,
};

export default nextConfig;
