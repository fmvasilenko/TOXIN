const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  root: __dirname,
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR);

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
    cards: `${PATHS.src}/pages/cards/cards.js`,
    formElements: `${PATHS.src}/pages/form-elements/form-elements.js`,
    landing: `${PATHS.src}/pages/landing/landing.js`,
    searchRoom: `${PATHS.src}/pages/search-room/search-room.js`,
    roomDetails: `${PATHS.src}/pages/room-details/room-details.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/TOXIN/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
    }, {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
          },
        },
      ],
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/fonts/[name].[ext]',
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../..',
          },
        },
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.root}/postcss.config.js` } },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}/${page}.pug`,
      filename: `./${page}.html`,
      inject: false,
    })),
  ],
};
