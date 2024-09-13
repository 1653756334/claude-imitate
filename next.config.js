/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
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
