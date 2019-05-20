<template>
  <div class="phone-verification">
    <h4>欢迎您！</h4>
    <p class="prompt">请输入手机号</p>
    <input type="text" v-model="number" class="phone-number" name="mobile" required />
    <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">输入有误，请重新输入11位手机号！</p></div>
    <input type="submit" value="下一步" class="phone-number-btn" v-on:click="submitNumberData" />
  </div>
</template>
<script>
  import globalMixin from "../mixins/global";
  export default {
    name: "PhoneNumber",
    mixins: [globalMixin],
    data() {
      return {
        number: "",
        verificationWarning: false,
        VerificationState: false,
      }
    },
    computed: {
    },
    watch: {
      number(newNumber) {
        this.isPoneAvailable(newNumber);
        this.addSpace(newNumber);
      }
    },
    created() {

    },
    mounted() {
      this.getOpenID();
    },
    methods: {
      getOpenID() {
        var openid = localStorage.getItem("kmWechatOpenId") || "";
        if (!openid) {
          openid = this.$common.getQueryVariable("OpenId") || "";
          if (!openid) {
            let changeUrl = encodeURIComponent(window.location.href);  //编码URL
            let redirect = this.$api.getWechatOpenId + changeUrl;
            window.location.href = redirect;
          }
        }
        if (openid) {
          localStorage.setItem("kmWechatOpenId", openid);
        }
      },
      //校验手机号
      isPoneAvailable() {
        let mobile = this.number.replace(/[^0-9]/ig, "");
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

        if (mobile.length === 0) {
          this.verificationWarning = true;
          return false;
        }
        if (mobile.length !== 11) {
          this.verificationWarning = true;
          return false;
        }
        if (!myreg.test(mobile)) {
          this.verificationWarning = true;
          return false;
        }
        this.verificationWarning = false;
        return true;
      },

      //在手机号码里面添加隔断
      addSpace(newNumber) {
        let value = newNumber;
        value = value.replace(/[^0-9]/ig, "");
        let arr = value.split('');
        if (arr.length >= 4) {
          arr.splice(3, 0, ' ');
        }
        if (arr.length >= 9) {
          arr.splice(8, 0, ' ');
        }
        value = arr.join('');
        this.number = value;
      },

      //第一次获取验证码
      submitNumberData() {
        let recordNo = this.$common.getQueryVariable('RecordNo');
        if (recordNo) {
          //this.$store.commit("updateRecordNo",recordNo);
          sessionStorage.setItem("RecordNo", recordNo);
        }

        let mobile = this.number;
        mobile = mobile.replace(/[^0-9]/ig, "");
        if (!this.isPoneAvailable(mobile)) {
          return false;
        }

        let that = this;

        that.$fetch(that.$api.phone + mobile)
          .then(function (res) {

            if (res.IsSuccess === true) {
              that.$store.commit('updateNumber', mobile);
              that.$router.replace({ path: '/verificationCode' });
            }
            else {
              that.errorDialogeShow(res.ReturnMessage);
            }
          })
      },

    }
  }
</script>
<style scoped>

  html, body {
    background-color: #fff;
  }
</style>
