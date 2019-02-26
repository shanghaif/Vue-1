import Vue from 'vue'
import store from './vuex/store'
import App from './components/App.vue'

Vue.config.productionTip = false

Vue.component('component01', {
  	template: '<li>1233321</li>'
 })

new Vue({
  el: 'app',
  store,
  components: { App }
})


