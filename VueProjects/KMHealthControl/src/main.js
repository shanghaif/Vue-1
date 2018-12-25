// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from "vuex";
import Router from 'vue-router';
import axios from "axios";
import router from "./router";
import store from './store';
import echarts from 'echarts';
import $ from 'jquery';


import qs from "qs"
import api from './api';
import globalMixin from "./mixins/global";
import common from "./common/common";
import "./assets/css/style.css";



Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$common = common;

Vue.use(Vuex);
Vue.use(Router);


//配置请求信息
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET,POST';



Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};



// 添加请求拦截器
axios.interceptors.request.use(function (config) {

  //配置token
  let str = config.url;
  let reg = RegExp(/hmmobile/);
  if(reg.exec(str)){
    let token = localStorage.getItem("token");
    if(token) {
      config.headers.token = JSON.parse(token).Token;
    }
  }

  store.commit('updateLoadingShow');

  //在发送请求之前,参数格式转换
  if(config.method == "post"){
    config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {

  // 请求错误
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  store.commit("updateLoadingHide");
  // 响应数据
  return response;
}, function (error) {

  store.commit("updateLoadingHide");

  console.log(error);
  globalMixin.errorDialogeShow("请求错误：" + error.response.status);
  switch (error.response.status) {
    case 401:
      router.push({path: '/'});
      break;
    case 404:
      router.push({path: '/error?error=' + error.response.status + ":" + error.response.statusText});
      break;
    case 500:
      router.push({path: '/error?error=' + error.response.status + ":" + error.response.statusText});
      break;
  }
  // 响应错误
  return Promise.reject(error);
});


//路由拦截
router.beforeEach((to, from, next) => {

  //禁止直接进入验证码和绑定成功页面
  if(to.name === "verification-code"){
    if(from.name !== "phone-number") {
      next({
        path: "/phoneNumber",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  if(to.name === "bing-succes"){
    if(from.name !== "verification-code") {
      next({
        path: "/phoneNumber",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }

  //添加页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  let wxToken = localStorage.getItem("wxToken");
  let token = localStorage.getItem("token");
  //判断是否已经绑定
  if(!to.meta.requireAuth) {
    next();
  }
  else if(wxToken && token) {   // 判断绑定状态
    next();
  }
  else if(store.state.login === true) {   // 判断绑定状态
    next();
  } else {
    next({
      path: "/phoneNumber",
      query: {
        redirect: to.fullPath
      }
    });
  }


});

new Vue({
  el: '#app',
  router,
  store,
  mixins: [globalMixin],
  components: { App },
  template: '<App/>'
});


