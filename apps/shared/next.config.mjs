// apps/shared/next.config.mjs
import NextFederationPlugin from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shared',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Header': './src/components/Header.js', // 👈 you can expose more components here
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
  output: 'standalone',
};

export default nextConfig;
