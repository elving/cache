import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
  debug: false,

  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: false
  },

  entry: './app/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?optional[]=runtime&stage=0', 'eslint'],
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(
        'css-loader!autoprefixer-loader!stylus-loader'
      ),
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': '"production"' }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      minimize: true,
      compress: { warnings: false }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('app.css')
  ],

  resolve: {
    extensions: ['', '.js', '.styl'],
    modulesDirectories: ['app', 'node_modules']
  },

  node: {
    fs: 'empty'
  }
};
