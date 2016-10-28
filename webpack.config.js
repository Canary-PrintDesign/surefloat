var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'development')),
  __DEBUG__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'debug')),
  __BUILD__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'build')),
  __VERSION__:     (new Date().getTime().toString())
});

var siteConfig = {
  entry: {
    main: [
      './source/assets/styles/main.scss',
      './source/assets/scripts/main.js'
    ],
  },

  resolve: {
    root: __dirname + '/source/assets/scripts',
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'assets/scripts/[name].bundle.js',
  },

  module: {
    loaders: [
      // Load JS
      {
        test: /source\/assets\/scripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        },
      },

      { test: require.resolve('jquery'), loader: 'expose?$' },

      // Load SCSS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?sourceMap"
        )
      },

      // Embed small pngs as data uri
      // url-loader falls back to file-loader when image is too big
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "url-loader?limit=100000&name=../images/[name].[ext]"
      },
    ],
  },

  node: {
    console: true
  },

  plugins: [
    definePlugin,
    new Clean(['.tmp']),
    new ExtractTextPlugin("assets/styles/main.bundle.css"),
    new webpack.optimize.CommonsChunkPlugin("main", "assets/scripts/main.bundle.js"),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
  ],
};

module.exports = siteConfig;
