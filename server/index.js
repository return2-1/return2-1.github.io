const express = require('express')
const app = express()

// 导入vue 构造函数
const Vue = require('vue')

// 获取绝对路径
const resolve = dir => require('path').resolve(__dirname,dir)

//1 开放dist/client目录，关闭默认下载index页选项，不然到不了后面路由
app.use(express.static(resolve('../dist/client'),{index:false}))

//2 createBundleRenderer⽤于获取渲染器
const { createBundleRenderer } = require("vue-server-renderer");

// 3 获取服务端打包文件地址
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json")

//4 创建渲染器
const renderer = createBundleRenderer(bundle,{
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template: require('fs').readFileSync(resolve("../public/index.html"), "utf8"), // 宿主⽂件
    clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

app.get('*',async (req,res)=>{
    try {
        // 设置url和title两个重要参数
        const context = {
            title:'ssr test',
            url:req.url
        }
        const html = await renderer.renderToString(context);
        res.send(html)
    }catch (err){
        res.status(500).send('Internal Server Error' +'\n'+ err)
    }

})
app.listen(3000,()=>{console.log('server start port: 3000')})
