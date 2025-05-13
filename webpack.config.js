const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const autoprefixer = require('autoprefixer');

const PAGES_DIR = './src/pug/pages/';
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

const config = {
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    clean: true,
    filename: './js/bundle.js',
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules[\/\\](?!(swiper|dom7|ssr-window)[\/\\])/],
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  // autoprefixer({ grid: true }),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        calc: false,
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/fonts',
          to: './fonts',
        },
        // {
        //   from: './src/favicon',
        //   to: './favicon',
        // },
        {
          from: './src/assets',
          to: './assets',
        },
      ],
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
        })
    ),
  ], //.concat(htmlPlugins), // Remove .concat(htmlPlugins)
};

module.exports = (env, argv) => {
  externals: {
    // ymaps: 'ymaps'
  }
  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
