const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Для анализа бандла

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash:8].js', // Добавляем хеш для кэширования
    clean: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/Berlio_new_site/' : '/',
    assetModuleFilename: 'assets/[hash][ext][query]', // Общий путь для ассетов
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader', // Добавляем postcss для автопрефиксов
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/, // Добавляем webp
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash:8][ext]', // Хеширование имен файлов
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:8][ext]',
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
              filename: 'assets/icons/[name].[contenthash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // Алиас для удобных импортов
    },
  },
  plugins: [
    ...(isProd ? [new CleanWebpackPlugin()] : []),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './public/favicon.svg',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/assets'),
          to: 'assets',
          globOptions: {
            ignore: ['**/*.DS_Store'], // Игнорируем служебные файлы
          },
        },
      ],
    }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new BundleAnalyzerPlugin({ // Анализатор бандла (можно отключить)
      analyzerMode: process.env.NODE_ENV === 'production' ? 'disabled' : 'static',
      openAnalyzer: false,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // Разделение vendor и app кода
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single', // Выносим runtime в отдельный файл
  },
  devServer: {
    static: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'public'),
    ],
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false, // Не показывать предупреждения в браузере
      },
    },
  },
  performance: {
    hints: false, // Отключаем предупреждения о размере бандла в dev
    maxEntrypointSize: 512000, // Увеличиваем лимит для entrypoint
    maxAssetSize: 512000, // Увеличиваем лимит для ассетов
  },
};