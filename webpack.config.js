const path = require('path');

module.exports = {
  mode: "development",
  entry: './client/src/app.js',
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js'
  }
};
