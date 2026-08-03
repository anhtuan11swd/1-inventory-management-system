/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "*.ufs.sh",
        protocol: "https",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
