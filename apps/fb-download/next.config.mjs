// apps/fb-download/next.config.mjs
import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'fbdownload',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shared: `shared@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
        },
        // ❌ no exposes needed since fb-download doesn't share anything
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
  output: 'standalone',
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
