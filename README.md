# inline-lit-element-loader
Webpack loader to inline LitElement external styles and decorators

Getting Started
------------
  ```
  git clone https://github.com/aelbore/inline-lit-element-loader.git
  npm install
  ```

Installation
------------
  ```
    npm install --save-dev inline-lit-element-loader
  ```

## Setup
* `hello-world.css`
  ```css
  h1 {
    color: red;
  }
  ```

* `hello-world.js`
  ```javascript
  import { LitElement, html } from 'lit-element'
  import './hello-world.css'

  class HelloWorld extends LitElement {

    static get properties() {
      return {
        message: { type: String }
      }
    }

    render() {
      return html `<h1>Hello ${this.message}</h1>`
    }

  }

  customElements.define('hello-world', HelloWorld)  
  ```
* `webpack.config.js`
  ```javascript
  const path = require('path')

  const TerserPlugin = require('terser-webpack-plugin')
  const CopyPlugin = require('copy-webpack-plugin');

  const INPUT_FILE = path.resolve('./demo/hello-world/hello-world.js')
  const OUTPUT_FILE = path.resolve('./dist/demo/hello-world/hello-world.js')

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
          test: /\.(js|ts)$/,
          exclude: /\.(css|scss)$/,
          loader: 'inline-lit-element-loader'
        }
      ]
    },
    plugins: [ plugins.copy() ],
    optimization: {
      minimizer: [  plugins.terser()  ]
    }
  }
  ```

 * output of your `hello-world.js`
   ```javascript
    import { LitElement, html, css } from 'lit-element'

    class HelloWorld extends LitElement {

      static get properties() {
        return {
          message: { type: String }
        }
      }

      render() {
        return html `<h1>Hello ${this.message}</h1>`
      }

      static get styles() {
        return css `h1 { color: red; }`
      }

    }

    customElements.define('hello-world', HelloWorld)  
   ```

 * Run demo app 
  ```
  npm run serve
  ```
* Go to browser then `http://localhost:3000/demo/hello-world`
<br />

## Support Sass
  ```
    npm install --save-dev node-sass
  ```
<br />

## Use Lit-Element-Transpiler
  ```
  git submodule init
  git submodule update --remote

  npm run link.transpiler
  ```