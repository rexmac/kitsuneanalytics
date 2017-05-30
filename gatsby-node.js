/*
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import stylelintPlugin from 'stylelint-webpack-plugin';

exports.modifyWebpackConfig = (config, stage) => {
  const cssModulesConf = 'css?modules&minimize&importLoaders=1';
  const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`;

  switch (stage) {
    config.removeLoader('cssModules');
    config.removeLoader('sassModules');

    case 'develop':
      config.loader('cssModules', {
        test: /\.module\.(s?css)$/,
        loaders: ['style', cssModulesConfDev, 'postcss'],
      });
      config.loader('sassModules', {
        test: /\.module\.sass/,
        loaders: ['style', cssModulesConfDev, 'sass'],
      });
      return config;
    case 'build-css':
      config.loader('cssModules', {
        test: /\.module\.(s?css)$/,
        loader: ExtractTextPlugin.extract('style', [
          cssModulesConf,
          'postcss',
        ]),
      });
      config.loader('sassModules', {
        test: /\.module\.sass/,
        loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'sass']),
      });
      return config;
  }
  return config;
};
*/
