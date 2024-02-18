/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["k.kakaocdn.net", "assets.community.lomography.com"],
  },
};
