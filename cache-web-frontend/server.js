import config from './webpack.development.config.babel';
import server from 'webpack-dev-server';
import webpack from 'webpack';

new server(webpack(config), {
  hot: true,
  stats: { colors: true },
  publicPath: config.output.publicPath,
  historyApiFallback: true
}).listen(3000, 'localhost', (err, result) => {
  if (err) console.error(err);
  console.log('Server listening at http://localhost:3000/');
});
