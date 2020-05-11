const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry:{
        main: "./src/main.js"
    },
    output:{
        filename: "js/main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            // 压缩 html
            minify:{
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    //生产模式  自动压缩js代码
    mode: "production"
}