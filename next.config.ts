import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // emit a static ./out folder for shared hosting (Hostinger)
  images: { unoptimized: true }, // no image-optimization server on static hosting
  trailingSlash: true, // folder-per-route so Apache/LiteSpeed serves clean URLs
};

export default nextConfig;
