import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
Vue.config.productionTip = false

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运⾏ `this.dataPromise.then(...)` 来执⾏其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});
export function createApp(context){
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    store,
    router,
    context,
    render:h=>h(App)
  })
  return {app,router,store}
}
