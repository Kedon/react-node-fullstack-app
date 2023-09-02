const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:5002/',
  },
  devServer: {
    port: 5002,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        chatwebRemote: 'chatweb@http://localhost:5003/remoteEntry.js',
        remoteAuth: 'auth@http://localhost:5001/remoteEntry.js',
        remoteOmnyve: 'omnyve@http://localhost:8080/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
