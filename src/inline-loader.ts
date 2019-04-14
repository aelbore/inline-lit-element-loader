import { transpiler } from 'lit-element-transpiler'

export default function inlineLitElement(source, map) {
  const result = transpiler(this.resourcePath, source)
  this.callback(null, result.code, map)
}