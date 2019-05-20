<template>
  <div id="app">
    <!-- 过渡动效 -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

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
    return {
      transitionName:''//过渡动效名
    };
  },
  watch:{
    //过渡动效
    $route(to, from) {
      if(to.path=='/'){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
    }
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
  min-height:100%;
  color: #2c3e50;
  background-color: #fff;
}
  * {
    list-style: none;
    outline: none;
  }

/* 过渡动效 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
/* 过渡动效 */

</style>
