import { symlinkDir, exec } from 'aria-build'

(async function() {
  await exec('npm run bundle')
  await symlinkDir('./dist', './node_modules/inline-lit-element-loader')
})()