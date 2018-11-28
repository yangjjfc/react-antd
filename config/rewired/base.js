const { injectBabelPlugin } = require('./react-app-rewired.js');
const WebpackBar = require('webpackbar');

let add_Antd = function (config) {
    return injectBabelPlugin([
        'import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }
    ],config)
}
module.exports = {
    "WebpackBar": WebpackBar,
    "add_Antd":add_Antd
}