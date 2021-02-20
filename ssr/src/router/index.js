import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import home from '../pages/home/home'

export  function createRouter(){
    return new Router({
        mode:'history',
        routes:[
            {
                path:'/',component:{ render: h => h(home) },
            },
            {
                path:'/detail',component:{ render: h => h('div', 'detail page') }
            }
        ]
    })
}
