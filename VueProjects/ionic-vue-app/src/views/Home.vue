<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Hello World</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-nav class="ion-padding">
      <h1>Welcome To @ionic/vue</h1>
      <img alt="Vue logo" src="../assets/logo.png">
      <ion-button @click="nextPage()">
        Go to NextPage
      </ion-button>
    </ion-nav>
  </div>
</template>

<script>
import './List.js'
export default {
  name: "home",
  methods: {
    nextPage(){
      // 路由跳转
      // this.$router.push('/detail')

      // 导航跳转，链接不变化
      const nav = document.querySelector('ion-nav');
      nav.push('list-component');
    }
  },
};
</script>