var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    SERVER: '"http://brp.dev.cloudyigou.com/gateway"',
    IMAGE_UPLOAD: '"http://brp.dev.cloudyigou.com/gateway/upload"',
    IMAGE_DOWNLOAD: '"http://dfs.dev.cloudyigou.com/dfs/"',
})
