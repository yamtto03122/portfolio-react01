

module.exports = {
    reactStrictMode: true,
    env: {
      NAME: process.env.NAME,
    }
}

/** @type {import('next').NextConfig} */
const repo = "portfolio-react01"; // 레포 이름

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // ✅ 프로젝트 페이지면 basePath 필요
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

module.exports = nextConfig;

