import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/": ["./src/jsons/**/*"], // Example: include all files in the 'data' directory
  },
};

export default nextConfig;
