/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files',
          outputPath: 'static/files',
        },
      },
    });
    return config;
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
