/*
    loader:  1.下载  2.使用（配置）
    plugins: 1.下载  2.引入   3.使用
*/
const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

const config = {
    entry:{
        main: "./src/main.js"
    },
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    module:{
        rules:[
            { 
                test:/\.css$/,
                //使用那些loader处理
                //use 数组中的执行顺序：从右到左，从下到上 一次执行
                use: [
                    "style-loader",   //创建style标签，将js中得样式资源插入进行，添加到header生效
                    "css-loader",     //将css文件变成commonjs模块加载到js中，里边内容是样式字符串
                ]
            },
            { 
                test:/\.scss$/,
                use: [
                    "style-loader",  
                    "css-loader",
                    "sass-loader"     
                ]
            },
            
            // url-loader依赖于file-loader
            // url-loader工作分两种情况：
            // 1.文件大小小于limit参数，url-loader将会把文件转为DataURL；
            // 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options:{
                    // 图片大于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度变慢   ）
                    limit: 8 * 1024,
                    // 给图片重命名
                    // [hash:10] 取图片hash值的前10位
                    // [ext] 取文件的原来的拓展名
                    name: "[name].[hash:10].[ext]",
                    // 输出目录
                    outputpath: "images"
                }
            },

            // 处理html文件中的img图片（负责引入img，从而被url-loader进行处理）
            {
                test: /\.(html)$/,
                loader: "html-loader"
            },

            // 处理字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash:10].[ext]",
                    outputpath: "font"
                }
            }
        ]
    },
    plugins:[
        // html-webpack-plugin
        // 功能：默认创建一个空的html，自动引入打包输出的资源（css/js）
        // 需求：需要有结构的html文件
        new htmlWebpackPlugin({
            // 复制模板文件，自动引入打包输出的资源（css/js）
            template: "./index.html"
        })
        
    ],
    mode: "development",  //development 或 production 

    // webpack-dev-server
    // 开发服务器 devServe: 用来自动化（自动编译，自动打开浏览器，自动刷新页面）
    // 特点：自会在内存中编译打包，不会有任何输出
    // 启动devServer的指令: npx webpack-dev-server 
    devServer:{ 
        // 项目构建后的路径， 开发服务器从哪里提供内容
        contentBase: path.resolve(__dirname ,"dist"),
        // 启用gzip 压缩
        compress: true,
        // 端口
        port: "3003",
        // 自动打开浏览器
        open: true
    }
}
module.exports = config