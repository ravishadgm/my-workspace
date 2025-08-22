import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shared",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Shared": "./src/index.js",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
  sassOptions: {
    additionalData: `@use "../../styles/variable" as *;`,
  },
  output: "standalone",
};

export default nextConfig;
