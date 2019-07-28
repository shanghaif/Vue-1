<template>
  <mt-header fixed :title="pageTitle" class="title">
    <router-link slot="left" to="">
      <mt-button icon="back" @click.native="routerGoBack"/>
    </router-link>
  </mt-header>
</template>

<script>
export default {
  name: 'HeaderNavbar',
  props: {
    pageTitle: {
      type: String,
      default() {
        return null
      }
    }
  },
  methods:{
    routerGoBack(){
      this.$router.go(-1)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/varibles';
  .mint-header.title {
    font-size: 17px;
  }

  .mint-header.title.is-fixed {
    @include respond-to(iPhone_X_Xs iPhone_XsMax iPhone_XR){
      padding-top: 60px;
      padding-bottom: 20px;
    }
    @include respond-to(iPhone5 iPhone6_7_8 iPhone6P_7P_8P){
      padding-top: 44px;
      padding-bottom: 20px;
    }
  }
</style>
