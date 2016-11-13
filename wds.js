import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.conf.js'
new WebpackDevServer(webpack(config), config.devServer).listen(3000)
