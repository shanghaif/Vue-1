<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h3>{{ msg }}</h3>
    <g-header>
      <!-- LLLLL -->   <!-- 需要设置<slot>才能显示 -->
    </g-header>
    
  </div>
</template>

<script>

import GHeader from './component/header.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Vue App.vue'
    }
  },
  components: {
    GHeader,
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
