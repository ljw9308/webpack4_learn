const htmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = {
    entry: {
        main: "./src/main.js",
    },
    output:{
        filename: "js/main.js",
        path: path.resolve(__dirname ,"dist"),
    },
    module:{
        rules:[
            /*
                语法检查：  eslint-loader eslint
                注意：只检查自己写的源代码，第三方的库是不用检查的
                设置检查规则
                pagage.json中eslintConfig中设置
                "eslintConfig": {
                    "extends": "airbnb-base"
                }
                airbnb -->  eslint-config-airbnb-base  eslint-plugin-import  eslint
            */ 
            // {
            //     test: /\.js$/,
            //     exclude:"/node_modules/",
            //     use: [
                   
            //         // {
            //         //     loader: 'babel-loader',
            //         //     options:{
            //         //       presets:["es2015"]
            //         //     },
            //         // },
            //         {
            //             loader: "eslint-loader",
            //             options:{
            //                 // 自动修复eslint错误
            //                 fix: true
            //             }
            //         }
            //     ]
            // }

            /*
              js兼容性处理：babel-loader  @babel/core  @babel/preset-env
                1. 基本js兼容性处理  --> @babel/preset-env
                   问题：只能转换基本语法，如promise不能转换
                2. 全部js兼容性处理 --> @babel/polyfill
                   问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积就大了
                3. 需要做兼容性处理的，就按需加载  --> core-js
            */ 
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            // 预设：指示babel做怎么样的兼容性处理
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        //按需加载
                                        useBuiltIns: 'usage',
                                        //指定core-js版本
                                        corejs:{
                                            version: 3 
                                        },
                                        //指定兼容性做到那个版本的浏览器
                                        targets:{
                                            chrome: "60",
                                            firefox: "60",
                                            ie: "9",
                                            safari: "10",
                                            edge: "17",
                                        } 
                                    }
                                ]
                            ]
                        }
                    }
                  ]
              }  
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: "index.html"
        })
    ],
    mode: "development"
}