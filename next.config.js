/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  async redirects() {
    return [
      // {
      //   source: "/",
      //   destination: "/home",
      //   permanent: true,
      // },
    ];
  },
};


export default nextConfig;
