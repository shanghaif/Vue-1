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
      },
      mounted() {
      },
      methods: {
        //整合档案
        integrationReport() {
          let that = this;

          let openId = that.$common.getQueryVariable('OpenId') || "";
          let phone = that.$common.getQueryVariable('Phone') || "";
          let recordNo = that.$common.getQueryVariable('RecordNo') || "";
          let upData= {
              OpenId: openId,
              Phone: phone,
              RecordNo: recordNo
            };

          that.$fetch(that.$api.DataIntegrationApi, { method: 'POST', body: JSON.stringify(upData)})
            .then(function(res){

              if(res.IsSuccess === true) {
                that.errorDialogeShow("整合成功!");
                that.$router.replace({path: '/report',query:{RecordNo:res.ReturnData}});
              }
              if(res.IsSuccess === false) {
                that.errorDialogeShow(res.ReturnMessage);
              }
            })
        },

        //取消整合
        cancelIntegration() {
          window.close();
          WeixinJSBridge.call('closeWindow');
        }
      },

    }
</script>

<style scoped>

</style>
