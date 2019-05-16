
import { clean, TSRollupConfig, build, copyReadmeFile, copyPackageFile } from 'aria-build'

(async function() {
  const pkg = require('../package.json')

  const options: TSRollupConfig = {
    input: 'src/inline-loader.ts',
    external: [
      'typescript', 
      ...Object.keys(pkg.dependencies)
    ],
    output: {
      file: 'dist/inline-loader.js',
      format: 'cjs'
    },
    tsconfig: {
      compilerOptions: {
        declaration: true
      }
    }
  }

  const pkgOptions = {
    main: 'inline-loader.js',
    typings: 'inline-loader.d.ts',
    module: 'inline-loader.js'
  }

  await clean('dist')
  await build(options)
  await Promise.all([ copyReadmeFile(), copyPackageFile(pkgOptions) ])
})()