/** @type {import('next').NextConfig} */
const isElectron = process.env.ELECTRON === "1";

const nextConfig = {
  reactStrictMode: true,
  output: isElectron ? "export" : "standalone",
  trailingSlash: isElectron,
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: isElectron ? undefined : ["pg", "@netlify/database"],
  },
};

module.exports = nextConfig;
