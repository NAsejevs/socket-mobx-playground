const {
    override,
    addWebpackPlugin,
    addWebpackModuleRule
  } = require("customize-cra");
  
  const {TypedCssModulesPlugin} = require('typed-css-modules-webpack-plugin');
  
  module.exports = override(
    addWebpackModuleRule({
        test: /\.pcss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },
                },
            },
        ],
    }),
    addWebpackPlugin(new TypedCssModulesPlugin({
        globPattern: 'src/**/*.pcss',
    }))
  );
