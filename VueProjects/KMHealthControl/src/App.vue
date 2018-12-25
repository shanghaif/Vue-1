<template>
  <div id="app">
    <router-view/>

    <loading v-if="this.$store.state.loading.show" ></loading>
    <ErrorDialoge v-if="this.$store.state.errorDialoge.show"></ErrorDialoge>

  </div>
</template>

<script>
  import Loading from "./components/Loading";
  import ErrorDialoge from "./components/ErrorDialoge";
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {},
  components: {
    Loading,
    ErrorDialoge
  },
  mounted() {
    this.getWindowWidth();
  },
  methods: {
    getWindowWidth() {
      let w = $(window).width()/10;
      if(w >= 76.8) {
        $("html").css("font-size","76.8px");
      }
      else {
        $("html").css("font-size",w +"px");
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
}
  * {
    list-style: none;
    outline: none;
  }
</style>
