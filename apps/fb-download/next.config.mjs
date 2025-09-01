
import NextFederationPlugin from '@module-federation/nextjs-mf';

const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net", // allow all fbcdn subdomains
      },
    ],
  },

  webpack(config) {

    // config.module.rules.push({
    //   test: /\.map$/,
    //   type: 'asset/source',
    // });

    config.plugins.push(
      new NextFederationPlugin({
        name: 'fbdownload',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          shared: `shared@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
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
  staticPageGenerationTimeout: 300,

};

export default nextConfig;
