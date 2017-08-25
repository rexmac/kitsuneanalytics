import ExtractTextPlugin from "extract-text-webpack-plugin";

exports.modifyWebpackConfig = ({ config, stage }) => {
  const cssModulesConf = `css?modules&minimize&importLoaders=1`;
  const cssModulesConfDev = `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`;

  switch (stage) {
    case `develop`: {
      config.loader(`css`, {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        loaders: [`style`, `css`, `postcss`],
      });

      config.loader(`cssModules`, {
        test: /\.module\.s?css$/,
        loaders: [`style`, cssModulesConfDev, `postcss`],
      });

      /*
      config.merge({
        postcss(wp) {
          return [
            require(`postcss-import`)({ addDependencyTo: wp }),
            require(`postcss-cssnext`)({ browsers: program.browserslist }),
            require(`postcss-browser-reporter`),
            require(`postcss-reporter`),
          ]
        },
      });
      */
      return config
    }

    case `build-css`: {
      config.loader(`css`, {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        loader: ExtractTextPlugin.extract([`css?minimize`, `postcss`]),
      });

      config.loader(`cssModules`, {
        test: /\.module\.s?css$/,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `postcss`]),
      });

      /*
      config.merge({
        postcss: [
          require(`postcss-import`)(),
          require(`postcss-cssnext`)({
            browsers: program.browserslist,
          }),
        ],
      });
      */

      return config
    }

    case `build-html`: {
      config.loader(`css`, {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        loader: `null`,
      });

      config.loader(`cssModules`, {
        test: /\.module\.s?css$/,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `postcss`]),
      });

      return config
    }

    case `build-javascript`: {
      config.loader(`css`, {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        loader: `null`,
      });

      config.loader(`cssModules`, {
        test: /\.module\.s?css$/,
        loader: ExtractTextPlugin.extract(`style`, [cssModulesConf, `postcss`]),
      });

      return config
    }

    default: {
      return config
    }
  }
};