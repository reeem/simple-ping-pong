const {resolve} = require('path');

module.exports = {
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
