module.exports = {
    publicPath: './',
    //devServer相关配置 若存在跨域信息 可在这里使用proxy进行处理
    devServer:{
        port:3333,  //启动的端口号
        open:true
    },
    css: {
        //css预设器配置项
        loaderOptions:{
            sass:{
                prependData: `@import "@/assets/scss/_variable.scss";`  //这里使用prependData 所有的新版本都改为使用prependData
            }
        }
    }
}