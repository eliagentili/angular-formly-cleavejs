import { join } from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'egAngularFormlyCleavejs',
  },
  externals: {
    angular: 'angular',
    'angular-formly': 'angular-formly',
    'api-check': {
      root: 'apiCheck',
      amd: 'api-check',
      commonjs2: 'api-check',
      commonjs: 'api-check'
    },
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include },
      { test: /\.html$/, 'loader': 'raw', include },
    ]
  }
}