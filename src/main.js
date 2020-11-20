import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"

import toast from "components/common/Toast"

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//两个无关的组件进行通信，可以使用事件总线，默认情况下$bus没有值
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟问题
FastClick.attach(document.body);

//图片懒加载
Vue.use(LazyLoad,{
  error: require('./assets/images/common/error.png'),
  loading: require('./assets/images/common/loading.jpg'),
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
