import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

console.log(
  `process.env.NODE_ENV == "development" ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '/market'`,
  process.env.NODE_ENV == "development" ? '' : process.env.NEXT_PUBLIC_BASE_PATH || '/market'
);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/404",
        destination: "/error/404",
        permanent: false,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: process.env.NODE_ENV == "development" ? '' : process.env.NEXT_PUBLIC_BASE_PATH ?? '/govicapital',
  assetPrefix: process.env.NODE_ENV == "development" ? '' : process.env.NEXT_PUBLIC_BASE_PATH ?? '/govicapital',
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};


export default nextConfig;


// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "pub-79ee03a4a23e4dbbb70c7d799d3cb786.r2.dev",
//       },
//     ],
//   },
// };

// export default withFlowbiteReact(nextConfig);
