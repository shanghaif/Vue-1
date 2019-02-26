
import Vue from 'vue'
import routes from './routes'


const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname  // 获取文件名
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },

  render (h) {
    // alert(window.location.pathname);
    return h(this.ViewComponent)
  }

  /*
  render: h => h(App)     // => 是ES6的箭头语法
  
  [官方文档][1]：
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // tag name 标签名称
      this.$slots.default // 子组件中的阵列
    )
  }

  // ES5  
  (function (h) {  
    return h(App);  
  });  
  
  // ES6  
  h => h(App); 

   */
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
