const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

const INPUT_FILE = path.resolve(`./demo/decorators/counter/counter.js`)
const OUTPUT_FILE = path.resolve(`./dist/demo/decorators/counter/counter.js`)

const HTML_FILE = path.join(path.dirname(INPUT_FILE), 'index.html')
const OUTPUT_HTML_FILE = path.join(path.dirname(OUTPUT_FILE), 'index.html')

const plugins = {
  terser() {
    return new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        ecma: 6,
        output: { comments: false }
      }
    })      
  },
  copy() {
    return new CopyPlugin([
      { from: HTML_FILE, to: OUTPUT_HTML_FILE }
    ])    
  }
}

module.exports = {
  entry: INPUT_FILE,
  devtool: 'source-map',
  output: {
    path: path.dirname(OUTPUT_FILE),
    filename: path.basename(OUTPUT_FILE)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'inline-lit-element-loader'
      },
      { 
        test: /\.(css|scss)$/, 
        loader: 'ignore-loader' 
      }
    ]
  },
  plugins: [ plugins.copy() ],
  optimization: {
    minimizer: [  plugins.terser()  ]
  }
}