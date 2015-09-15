import defaults from 'defaults';

export default function getConfig(opts){
  var defaultOpts = {
    production: false,
    assetsUrl: 'http://localhost:8081/public',
    mainUrl: 'http://localhost:8080',
    hot: false,
    watch: true,
    entry: [
      './src/client',
    ],

    test: false,
    devServer: true,
    node: false,
  };

  if (opts.devPages) {
    defaultOpts.assetsUrl = 'http://localhost:9081/public';
    defaultOpts.mainUrl = 'http://localhost:9080';
  }

  var config = defaults(opts, defaultOpts);
  return config;
}
