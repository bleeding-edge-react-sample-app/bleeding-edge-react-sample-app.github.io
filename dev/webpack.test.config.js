import getConfig from './getConfig';
import makeWebpackConfig from './makeWebpackConfig';
import fs from 'fs';

module.exports = makeWebpackConfig(
  getConfig({
    test: true,
    devServer: false,
    node: true,
  })
);
