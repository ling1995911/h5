import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as filters from './filters/index' // 全局filter

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
