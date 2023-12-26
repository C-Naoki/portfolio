/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog-under-construction',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
