import {createApp} from './main.js'

//返回一个函数, 接收请求上下文, 返回创建的vue实例
export default context =>{
    return new Promise((resolve,reject)=>{

        const {app,router,store} = createApp(context)

        router.push(context.url)
//   router 就绪，返回结果
        router.onReady(()=>{
          // 获取当前页的所有组件
            const matchedComponents = router.getMatchedComponents()
            // 若无匹配组件 则说明路由地址错误 抛出错误
            if(!matchedComponents.length){
                reject({code:404})
            }
              // 所有组价中的asyncData的数据预取完后
            Promise.all(
                matchedComponents.map(Component=>{
                    if(Component.asyncData){
                        Component.asyncData(
                            {
                                store,
                                router:router.currentRoute
                            }
                        )
                    }
                })
            ).then(()=>{
                 // 所有预取钩⼦ resolve 后，
                // store 已经填充⼊渲染应⽤所需状态
                // 将状态附加到上下⽂，且 `template` 选项⽤于 renderer 时，
                // 状态将⾃动序列化为 `window.__INITIAL_STATE__`，并注⼊ HTML。
                context.state = store.state
                resolve(app)
            }).catch(reject)
        },reject)

    })
}
