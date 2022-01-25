module.exports = {
  webpack: {
    configure: {
      output: {
        filename: '[name].js'
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks (chunk) {
            return false
          }
        }
      }
    }
  },
  style: {
    postcss: {
      env: {
        autoprefixer: {
          cascade: true
        }
      }
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = '[name].css'
          return webpackConfig
        },
        options: {}
      }
    },
    {
      plugin: require('craco-plugin-scoped-css')
    }
  ]
}
