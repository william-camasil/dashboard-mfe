// header-app/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ModuleFederationPlugin from webpack
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// import dependencies from package.json, which includes react and react-dom
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/entry.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "dashboard_mfe", // This application named 'dashboard_mfe'
      filename: "remoteEntry.js", // output a js file
      exposes: {
        // which exposes
        "./DashboardScreen": "./src/App", // a module 'DashboardScreen' from './src/App'
      },
      shared: {
        // and shared
        ...dependencies, // some other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web",
};
