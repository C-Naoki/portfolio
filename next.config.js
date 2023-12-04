/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
