/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  rewrites() {
    return [
      {
        source: "/",
        destination: "/dashboard",
      },
    ];
  },
};

export default nextConfig;
