const path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports ={
    mode:'production',
    entry:'./src/app.ts',
    output: {
        filename:'bundler.js',
        path: path.resolve(__dirname,'dist'),
        publicPath:'dist'
        
    },
    module:{
        rules:[{
            test:/\.ts$/,
            use:'ts-loader',
            exclude:/node_modules/
        }]
    },
    resolve:{
        extensions:['.ts','.js'],
        alias:{
            models:path.resolve(__dirname,'src/models/')
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'ProjectManager',
            template:'index.html'
          }),

    ]
}