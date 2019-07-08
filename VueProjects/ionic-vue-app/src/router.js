import Vue from 'vue'
import Home from './views/Home.vue'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/list',
    //   name: 'list',
    //   // route level code-splitting
    //   // this generates a separate chunk (list.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/List.vue')
    // },
    {
      path: '/imageCard',
      name: 'imageCard',
      component: () => import(/* webpackChunkName: "about" */ './views/ImageCard.vue')
    }
  ]
})
