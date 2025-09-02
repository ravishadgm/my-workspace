import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.plugins.push(

      new NextFederationPlugin({
        name: "shared",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./common": "./src/common/index.js",
          "./layout": "./src/layout/index.js",
          "./components": "./src/components/index.js",
          "./other": "./src/other/index.js",
          "./icons": "./src/icons/index.js",
          "./hooks": "./src/hooks/index.js",
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
