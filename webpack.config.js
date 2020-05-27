const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtactPlugin = require("mini-css-extract-plugin");
module.exports = {
    //需要打包的输入文件
    entry: {
        index1: "./src/index.js"
    },
    //需要打包的输出文件
    output: {
        filename:"[name].js", //[name].js代表输出文件的名字，这里是index1.js
        path:__dirname+"/dist" //__dirname代表当前的绝对路径（这里不能相对路径，只能用绝对路径）
    },
    module: {
        rules: [
            {
                test: /\.css$/, //正则表达式，匹配以.css结尾的文件
                use:["style-loader","css-loader"] //使用什么loader,注意是从右向左解析,css-loader的作用读取解析css,
                                                  //style-loader的作用将css代码转成style形式插入js文件中
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options: {
                            limit:8192
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/, //正则表达式，匹配以.css结尾的文件
                use:["css-loader","sass-loader"] //使用什么loader,注意是从右到左解析，sass-loader的作用读取解析scss,
                                                  //css-loader的作用将css转化成CommonJS模块
            },
        ]
    },
    plugins:[
        //生成html入口文件的插件
        new HtmlWebpackPlugin({
            title: "My App", //标题名字
            filename: "./index.html", //打包后生成的html名字
            template: "./src/temp.html", //模板，可省略
        }),
        //全局的自定义变量的插件
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("5fa3b9"),//在任何地方都可以直接用VERSION这个常量
            "process.env.NODE_ENV": JSON.stringify("999999999999"),//在任何地方都可以直接用process.env.NODE_ENV这个常量
        }),
        //将css分包打包
        new MiniCssExtactPlugin({
            filename:"[name].css",  //[name]  就是原来css文件那个名字
            chunkFilename:"[id].css" //块id
        })
    ]
}