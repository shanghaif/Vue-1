// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  //创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上 有以下3种方式
  template: '<App/>' // render: h => h(App) // .$mount('#app'); 
})
