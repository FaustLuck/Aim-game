import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.resolve();
const mode = process.env.NODE_ENV;
const isProd = mode === "production";

const metaTags = {
  "viewport": {property: "viewport", content: "width=device-width, initial-scale=1.0"},
  "description": {property: "description", content: "Aim trainer проверь свои скорость и реакцию"},
  "keywords": {property: "keywords", content: "Aim, скорость, реакция"},
  "og:title": {property: "og:title", content: "Aim trainer"},
  "og:site_name": {property: "og:site_name", content: "MoGo"},
  "og:url": {property: "og:url", content: "https://faustluck.github.io/Aim-game/"},
  "og:description": {property: "og:description", content: "Aim trainer - проверь свои скорость и реакцию"},
  "og:image": {property: "og:image", content: path.resolve(__dirname, "src", "assets", "preview.png")},
  "og:image:type": {property: "og:image:type", content: "image/png"},
  "og:image:width": {property: "og:image:width", content: "200"},
  "og:image:height": {property: "og:image:height", content: "200"}
};

export default {
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    publicPath: isProd ? "./" : "",
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]"
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
      watch: true,
    }
  },
  stats: {
    children: true
  },
  ...(!isProd && { devtool: "source-map" }),
  mode,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  target: (isProd) ? "browserslist" : "web",
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        exclude: /node_module/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (isProd) ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env"
                ]
              }
            }
          },
          "sass-loader",
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "module",
      ...(isProd && {
        meta: metaTags,
        favicon: path.resolve(__dirname, "src", "assets", "icon.ico")
      })
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    })
  ]
};
