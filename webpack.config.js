const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/Berlio_new_site/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
          },
          {
            type: 'asset/resource',
            generator: {
              filename: 'assets/icons/[name][ext][query]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.svg',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/assets'),
          to: 'assets',
        },
      ],
    }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
  devServer: {
    static: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'public'),
    ],
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: {
      index: '/Berlio_new_site/index.html',
    },
  },
  mode: process.env.NODE_ENV || 'development',
};