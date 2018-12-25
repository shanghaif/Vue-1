import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import Home from './pages/Home.vue';
import Page2 from './pages/Page2.vue';
import Page3 from './pages/Page3.vue';

//开启debug模式
Vue.config.debug = true;

// 定义组件(简写形式)
const TestConponent = {template: '<div><h3>这是一个测试组件</h3></div>'};


// 注册两个插件
Vue.use(VueRouter);
Vue.use(VueResource);
// var app=Vue.extend(App);

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/page2', component: Page2},
  { path: '/test', component: TestConponent},
];

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: routes
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  // el: '#app',
  router: router,
  
  render: h => h(App)
}).$mount('#app');
