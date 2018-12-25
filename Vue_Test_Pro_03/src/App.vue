<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button type="button" @click='buttonClicked'>Button</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    buttonClicked:function(){
      // alert('111111')
      // 尝试切换组件
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
