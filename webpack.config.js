const path =require('path')

module.exports ={
    mode:'development',
    entry:'./src/app.ts',
    output: {
        filename:'bundler.js',
        path: path.resolve(__dirname,'dist'),
        publicPath:'dist'
        
    },
    devtool: 'inline-source-map',
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
    }
}