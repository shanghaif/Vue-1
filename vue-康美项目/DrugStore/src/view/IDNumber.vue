<template>
  <div class="phone-verification">
    <h4>欢迎您！</h4>
    <p v-show="!IsIDNumber" class="prompt">请输入身份证号</p>
    <input v-show="!IsIDNumber" type="text" v-model="number" class="phone-number" name="mobile" required />
    <p v-show="IsIDNumber" style="font-size:0.5em">您已绑定过档案</p>
    <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">输入有误，请重新输入身份证号！</p></div>
    <input type="submit" v-model="btnName " class="phone-number-btn" v-on:click="submitNumberData" />
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import globalMixin from "../mixins/global";
  export default {
    name: "IDNumber",
    mixins: [globalMixin],
    data() {
      return {
        number: "",
        openId: "",
        verificationWarning: false,
        IsIDNumber: false,
        btnName: "认证",
      }
    },
    computed: {
    },
    watch: {
      number(val) {
        if (!this.isIDNumber(val)) {
          this.verificationWarning = true;
        } else {
          this.verificationWarning = false;
        }
      }
    },
    created() {
      if (localStorage.getItem("IsIDNumber")) {
        this.IsIDNumber = true;
        this.btnName = "返回";
      }
    },
    mounted() {
      this.getOpenID();
    },
    methods: {
      getOpenID() {
        this.openId = localStorage.getItem("kmWechatOpenId") || "";
        if (!this.openId) {
          this.openId = this.$common.getQueryVariable("OpenId") || "";
        }
        if (this.openId) {
          localStorage.setItem("kmWechatOpenId", this.openId);
        } else {
          let changeUrl = encodeURIComponent(window.location.href);  //编码URL
          let redirect = this.$api.getWechatOpenId + changeUrl;
          window.location.href = redirect;
        }
      },
      isIDNumber(idnumber) {
        let myreg = /(^\d{17}[0-9Xx]$)|(^\d{15}$)/;
        return myreg.test(idnumber);
      },
      submitNumberData() {
        if (localStorage.getItem("IsIDNumber")) {
          this.gobackwechat();
          return;
        }

        if (!this.isIDNumber(this.number)) {
          this.verificationWarning = true;
          return;
        } else {
          this.verificationWarning = false;
        }

        let upData = {
          OpenId: this.openId,
          IDNumber: this.number,
        };

        let that = this;

        that.$fetch(that.$api.BindWechatIDNumber, { method: 'POST', body: JSON.stringify(upData) })
          .then(function (res) {

            if (res.ReturnCode === 20000 || res.ReturnCode === 40002) {
              localStorage.setItem("IsIDNumber", true);
              var msg = res.ReturnMessage;
              if (res.ReturnCode === 20000) {
                msg = "身份认证成功";
              }

              //that.$router.replace({ path: '/bingSucces' });
              //that.$router.replace({name: 'report'});
              //alert(msg);
              //that.gobackwechat();
              MessageBox.alert('身份认证成功').then(() => {
                that.gobackwechat();
              });
            }
            else {
              that.errorDialogeShow(res.ReturnMessage);
            }
          })
      }
    }
  }
</script>
<style scoped>

  html, body {
    background-color: #fff;
  }
</style>
