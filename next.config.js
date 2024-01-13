/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "avatars.slack-edge.com" }],
  },
};

module.exports = nextConfig;
