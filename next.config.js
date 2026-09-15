/** @type {import('next').NextConfig} */
const isElectron = process.env.ELECTRON === "1";

const nextConfig = {
  reactStrictMode: true,
  output: isElectron ? "export" : "standalone",
  trailingSlash: isElectron,
  images: { unoptimized: true },
  serverExternalPackages: isElectron ? undefined : ["pg"],
};

module.exports = nextConfig;
