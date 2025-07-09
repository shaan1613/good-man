import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      }
    ],
    domains: ['img.clerk.com'],
    loader: 'default',
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const sentryOptions = {
  org: "soumen-or",
  project: "javascript-nextjs",

  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  hideSourceMaps: process.env.NODE_ENV === 'production',

  widenClientFileUpload: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",

  dryRun: process.env.NODE_ENV !== 'production',
  setCommits: { auto: true },
};

export default withSentryConfig(nextConfig, sentryOptions);
