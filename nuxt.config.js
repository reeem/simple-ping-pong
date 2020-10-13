module.exports = {
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
