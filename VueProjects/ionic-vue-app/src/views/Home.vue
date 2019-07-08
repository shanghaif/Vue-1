<template>
  <div class="ion-page">
    <ion-nav>
      <ion-header>
        <ion-toolbar>
          <!-- 导航后退按钮不显示，不懂。。。 -->
          <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Hello World</ion-title>
        </ion-toolbar>
      </ion-header>
      <h1>Welcome To @ionic/vue</h1>
      <img alt="Vue logo" src="../assets/logo.png">
      <ion-button @click="navNextPage()">
        Nav to NextPage
      </ion-button>
      <ion-button @click="routeNextPage()">
        Route to NextPage
      </ion-button>
    </ion-nav>
  </div>
</template>

<script>
import './List.js'

export default {
  name: "home",
  methods: {

    // 导航跳转，链接不变化
    navNextPage(){
      const nav = document.querySelector('ion-nav');
      nav.push('list-component');
    },

    // 路由跳转
    routeNextPage(){
      this.$router.push('/imageCard')
    }
  },
};
</script>