import webpack from 'webpack';
import defaults from 'defaults';
import url from 'url';
import path from 'path';

export default function makeWebpackConfig(opts){
  const FLAGS = {
    __DEV__: !opts.production,
    __PROD__: !!opts.production,
  };

  // rough config
  var config = {
    devtool: 'eval',
    entry: [],
    output: {
      path: path.join(__dirname, '..', 'dist'),
      publicPath: opts.assetsUrl,
      filename: 'bundle.js',
    },
    externals: [],
    module: {
      loaders: []
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: String(!opts.production),
        __PROD__: String(!!opts.production),
        'process.env.NODE_ENV': JSON.stringify(opts.production ? 'production' : 'development'),
      })
    ],
  };

  // mostly used for tests
  if (opts.node) {
    config.target = 'node';
    const node_modules = require('fs').readdirSync('node_modules').filter((x) => x !== '.bin');
    config.externals.push(...node_modules);
    config.output.libraryTarget = 'commonjs2';
    config.devtool = 'source-map';
  }

  const baseAssetUrl = url.format(Object.assign(url.parse(opts.assetsUrl), {pathname: ''}));

  // if it's not a single build, we're using webpack-dev-server
  if (opts.watch) {
    config.entry.push('webpack-dev-server/client?' + baseAssetUrl);
  }
  if (opts.hot) {
    config.entry.push('webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  config.entry.push(...opts.entry);

  const dirs = {
    src: [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'dev', 'dev-pages'),
    ],
  };
  const jsLoaderConfig = {
    test: /\.js$/,
    loaders: ['babel'],
    include: dirs.src,
  };

  if (opts.hot) {
    jsLoaderConfig.loaders.unshift('react-hot');
  }

  // eval devtool is no good in production
  // also minify the code
  if (opts.production) {
    config.devtool = 'source-map';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }));
  }

  config.module.loaders.push(jsLoaderConfig);

  config.module.loaders.push({
    test: /\.less$/,

    // we can't use style-loader in node because there's no dom so it errors
    loaders: opts.node
      ? ['null-loader']
      : ['style-loader', 'css-loader', 'less-loader'],
    include: dirs.src,
  });

  return config;
}
