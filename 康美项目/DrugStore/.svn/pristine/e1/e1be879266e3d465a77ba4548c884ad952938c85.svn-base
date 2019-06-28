<template>
  <div>
    <p style="font-size:15px;">OpenId:{{kmWechatOpenId}}</p>
    <p style="font-size:15px;">Token:{{token}}</p>
    <p style="font-size:15px;">MobileUrl:{{MobileUrl}}</p>
    <button v-on:click="clear()" style="width:100%;height:10%;font-size:30px;">清除</button>
  </div>
</template>

<script>
  import globalMixin from "../mixins/global";
  export default {
    name: "localStorage",
    mixins: [globalMixin],
    data() {
      return {
        kmWechatOpenId: '',
        token: '',
        MobileUrl: '',
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      this.kmWechatOpenId = localStorage.getItem("kmWechatOpenId");
      this.token = localStorage.getItem("token");
      this.MobileUrl = localStorage.getItem("MobileUrl");
     
    },
    methods: {
      clear() {
        var c = this.$common.getQueryVariable('clear');
        if (c == 1) {
          localStorage.clear();
        } else {
          localStorage.removeItem("kmWechatOpenId");
          localStorage.removeItem("token");
          localStorage.removeItem("MobileUrl");
          localStorage.removeItem("IsIDNumber");
        }

        alert("清除成功");
      }
    },
  }
</script>

<style scoped>
</style>
