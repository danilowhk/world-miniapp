import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove or comment out the devServer configuration
  // devServer: {
  //   https: true
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'microphone=self' // Allow microphone only on same origin
          }
        ],
      },
    ]
  }
}

export default nextConfig;
