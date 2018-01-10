const webpack=require('webpack');
const path=require('path');

const extractTextPlugin=require('extract-text-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');

let htmlTemplate1=function(name,title){
    return {
        hash:true,
        template:'./src/view/'+name+'.html',
        filename:'view/'+name+'.html',
        chunks:[name,'common'],
        title:title
    }
}


let config={
    entry:{
        'common':'./src/page/common/index.js',
        'index':'./src/page/index/index.js',
        'list':'./src/page/list/index.js',
        'detail':'./src/page/detail/index.js',
        'user-login':'./src/page/user-login/index.js',
        'user-register':'./src/page/user-register/index.js',
        'user-center':'./src/page/user-center/index.js',
        'user-center-update':'./src/page/user-center-update/index.js',
        'user-pass-reset':'./src/page/user-pass-reset/index.js',
        'result':'./src/page/result/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js',
        publicPath:'/dist/'
    },
    resolve:{
        alias:{
            util:__dirname+'/src/util',
            service:__dirname+'/src/service',
            page:__dirname+'/src/page',
            image:__dirname+'/src/image',
            node_modules:__dirname+'/node_modules',
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    use:['css-loader'],
                    fallback:'style-loader'
                })
            },
            {
                test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'image/'
                    }
                }]
            },
            {
                test:/\.string$/,
                use:['html-loader']
            }
        ]
    },
    plugins:[
        // new webpack.ProvidePlugin({
        //     $:"jquery"
        // }),
        new extractTextPlugin('css/[name].css'),
        new htmlPlugin(htmlTemplate1('index','首页')),
        new htmlPlugin(htmlTemplate1('list','商品列表页')),
        new htmlPlugin(htmlTemplate1('detail','商品详情页')),
        new htmlPlugin(htmlTemplate1('user-login','登陆页')),
        new htmlPlugin(htmlTemplate1('user-register','用户注册')),
        new htmlPlugin(htmlTemplate1('user-pass-reset','重置密码')),
        new htmlPlugin(htmlTemplate1('user-center','个人中心')),
        new htmlPlugin(htmlTemplate1('user-center-update','修改个人信息')),
        new htmlPlugin(htmlTemplate1('result','结果返回页')),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        })
    ]
    // devServer:{
    //     contentBase:path.resolve(__dirname,'dist/view')
    // }
};
module.exports=config;