import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      underscore: 'lodash'
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: '**'
      }
    ],
    // Optimize images for mobile
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images
    minimumCacheTTL: 31536000,
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]'
      }
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'date-fns',
      'lucide-react',
      'react-icons',
    ],
  }
};

export default nextConfig;
