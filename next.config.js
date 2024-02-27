/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const config = {
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

const nextConfig = withPWA({
  dest: "public",
  disable: false,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
