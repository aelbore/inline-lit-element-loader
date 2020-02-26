import { transform, MagicString } from 'lit-element-transpiler'
import { minifyHTMLLiterals } from 'minify-html-literals'
import { getOptions } from 'loader-utils';

async function inlineLitElement(source, map) {
  const callback = this.async()
  if (!this.resourcePath.includes('node_modules')) {
    const options = getOptions(this)
    const minify = minifyHTMLLiterals(source, { fileName: this.resourcePath })
    const result = await transform(this.resourcePath, 
      minify ? minify.code: source, 
      { 
        cssOptions: { 
          ...(options ?? {}) 
        } 
      })
    return callback(null, result.code, map)
  }
  const magicString = new MagicString(source)
  return callback(null, magicString.toString(), magicString.generateMap({ hires: true }))
} 

module.exports = inlineLitElement