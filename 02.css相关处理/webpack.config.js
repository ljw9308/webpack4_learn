const htmlWebpackPlugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin")  //提取css文件插件
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin") //压缩css插件
const path = require("path")
process.env.NODE_EVN = "development"
const config = {
    entry:{
        main: "./src/main.js"
    },
    output:{
        path: path.resolve(__dirname ,"dist"),
        filename: "main.js"
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    // 替换 style-loader， 作用：提取js中的css成单独文件
                    miniCssExtractPlugin.loader,

                    //使用loader的默认配置
                    "css-loader",

                    /* 
                        css 兼容性处理：postcss -->postcss-loader postcss-preset-env
                        帮postcss找到package.json中的browserslist里边的配置，通过配置加载指定的css兼容性样式
                        browserslist:{
                            //开发环境 --> 设置node环境变量：process.env.NODE_EVN = development 
                            "development": [
                                "last 1 chrome version",  //最近的版本
                                "last 1 firefox version",
                                "last 1 safari version"
                            ],
                            //默认是生产环境
                            "production": [
                                ">0.2%",  //大部分浏览器
                                "not dead",  //已经死的浏览器
                                "not op_mini all"  //欧朋_mini 浏览器 
                            ]
                        }
                    */
                   //修改loader的配置
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => {
                               require("postcss-preset-env")() 
                            },
                            // config: {
                            //     path: 'postcss.config.js'
                            // }
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: "index.html"
        }),
        new miniCssExtractPlugin({
            //输出文件重命名
            filename:"css/[name].css",
            chunkFilename:"[id].css"
        }),
        //压缩css插件
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode: "development"
}

module.exports = config