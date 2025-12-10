import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-79ee03a4a23e4dbbb70c7d799d3cb786.r2.dev",
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
