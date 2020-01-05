import { transpiler } from 'lit-element-transpiler'
import { minifyHTMLLiterals } from 'minify-html-literals'

export default function inlineLitElement(source, map) {
  if (!this.resourcePath.includes('node_modules')) {
    const minify = minifyHTMLLiterals(source, { fileName: this.resourcePath })
    const result = transpiler(this.resourcePath, minify ? minify.code: source)
    return this.callback(null, result.code, map)
  }
  return this.callback(null, source, map)
} 