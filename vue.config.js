const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/todos': {
        target: 'http://localhost:5000'
      }
    }
  },
  outputDir: path.resolve(__dirname, './server/public')
}
