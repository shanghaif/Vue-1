<template>
    <div class="content-box">
      <div class="bind-report">
        <img src="../assets/img/archives.png" />
        <p>您是否确定要将此新游客档案合并入您的档案？</p>
        <input type="submit" value="确定" class="blue-btn" v-on:click="integrationReport"/>
        <input type="submit" value="取消" class="gray-btn" v-on:click="cancelIntegration"/>
      </div>
    </div>
</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "IntegrationReport",
      mixins: [globalMixin],
      data() {
        return {
        }
      },
      computed: {
      },
      watch: {
      },
      created() {
        this.$common.redirectToIndex();
      },
      mounted() {
      },
      methods: {

        //整合档案
        integrationReport() {
          let that = this;
          let phone = that.$common.getQueryVariable('phone') || 0;
          that.$axios({
            url: that.$api.DataIntegrationApi,
            method: "post",
            headers: {
              "token": that.$common.getLocalWxToken().access_token,
            },
            data: {
              OpenId: that.$common.getLocalWxToken().openid,
              Phone: phone,
              RecordNo: that.$store.state.recordNo
            }
          })
            .then(function(res){
              //console.log(res);

              if(res.data.IsSuccess === true) {
                that.errorDialogeShow("整合成功!");
                that.$router.replace({path: '/'});
              }
              if(res.data.IsSuccess === false) {
                that.errorDialogeShow(res.data.ReturnMessage);
              }
            })
        },

        //取消整合
        cancelIntegration() {
          this.$router.replace({path: '/'});
        }
      },

    }
</script>

<style scoped>

</style>
