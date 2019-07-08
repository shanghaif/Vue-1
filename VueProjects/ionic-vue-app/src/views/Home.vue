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
        Take Picture Now
      </ion-button>
    </ion-nav>
  </div>
</template>

<script>
import About from './List.js'
export default {
  name: "home",
  methods: {
    nextPage(){
      // this.$router.push('/detail')

      const nav = document.querySelector('ion-nav');
      nav.push('list-component');
    }
  },
};
</script>