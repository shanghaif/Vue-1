import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

/** 
 * 实验代码
 * 1. 取消滑动返回后还是会执行一遍的动画
 * 2. 禁止部分页面的返回
*/
let touchMoveTime = Date.now()
window.addEventListener('touchmove', function(){
	touchMoveTime = Date.now()
})
router.beforeEach((to,from,next)=>{
	if ((Date.now() - touchMoveTime) < 377) { // ios滑动切换
		store.state.allowAnimate = false;
	}else{
		store.state.allowAnimate = true;
	}
	// alert("allowAnimate ==" + store.state.allowAnimate);

	// if(from.path.indexOf('msite') != -1 && to.path.indexOf('city') != -1){
	// 	next(false)
	// 	return;
	// }
	next();
})

new Vue({
	router,
	store,
}).$mount('#app')

