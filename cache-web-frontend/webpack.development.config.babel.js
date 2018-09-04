import path from 'path';
import webpack from 'webpack';

module.exports = {
  debug: true,

  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?optional[]=runtime&stage=0', 'eslint'],
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader',
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin('NODE_ENV')
  ],

  resolve: {
    extensions: ['', '.js', '.styl'],
    modulesDirectories: ['app', 'node_modules']
  },

  node: {
    fs: 'empty'
  }
};
