const htmlWebackPlugin = require("html-webpack-plugin")
const path = require("path")
const config = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    module:{

    },
    plugins:[
        new htmlWebackPlugin({
            template: "./index.html"
        })
    ],
    mode: "development"
}
module.exports = config