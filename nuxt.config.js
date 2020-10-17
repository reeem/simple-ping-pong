const {resolve} = require('path');

module.exports = {
  head: {
    titleTemplate: 'Simple Ping Pong Play',
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0',
      },
    ],
  },
  build: {
    extend(config) {
      const projectSrc = resolve(__dirname, 'src/');
      config.resolve.alias['~src'] = projectSrc;
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
};
