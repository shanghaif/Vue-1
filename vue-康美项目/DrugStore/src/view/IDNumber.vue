<template>
  <div class="phone-verification">
    <h4>欢迎您！</h4>
    <p v-show="!IsBinding" class="prompt">请输入身份证号</p>
    <input v-show="!IsBinding" type="text" v-model="number" class="phone-number" name="mobile" />
    <p v-show="!IsBinding" class="prompt">请输入手机号</p>
    <input v-show="!IsBinding" type="text" v-model="phone" class="phone-number" name="phone" />
    <p v-show="IsBinding" style="font-size:0.5em">您已绑定过档案</p>
    <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">{{message}}！</p></div>
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
        phone: "",
        openId: "",
        verificationWarning: false,
        IsBinding: false,
        message: '',
        btnName: "认证",
      }
    },
    computed: {
    },
    watch: {
      number(val) {
        if (!this.isIDNumber(val)) {
          var str = '输入有误，请重新输入身份证';
          this.showMessage(str);
        } else {
          this.verificationWarning = false;
        }
      },
      phone(val) {
        val = val || '';
        if (val.length >= 11 &&  !this.IsPhone(val)) {
          var str = '输入有误，请重新输入手机号';
          this.showMessage(str);
        } else {
          this.verificationWarning = false;
        }
      }
    },
    created() {
      this.goBack();
    },
    mounted() {
      this.getOpenID();
      this.isBindPerson();
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
      goBack() {
        if (localStorage.getItem("IsBinding")) {
          this.IsBinding = true;
          this.btnName = "返回";
        }
      },
      isBindPerson() {
   
        if (!localStorage.getItem("IsBinding")) {
          let that = this;
          that.$fetch(that.$api.GetIsBindPerson + this.openId)
            .then(function (res) {

              if (res.ReturnCode === 20000) {       
                localStorage.setItem("IsBinding", true);
                that.goBack();
              }
            })
        }
      },
      showMessage(msg) {
        this.verificationWarning = true;
        this.message = msg;
      },
      isIDNumber(idnumber) {
        let myreg = /(^\d{17}[0-9Xx]$)|(^\d{15}$)/;
        return myreg.test(idnumber);
      },
      IsPhone(phone) {
        let phonereg = /(^1[3|4|5|7|8]\d{9}$)/;
        return phonereg.test(phone);
      },
      submitNumberData() {
        if (localStorage.getItem("IsBinding")) {
          this.gobackwechat();
          return;
        }
        if (!this.phone && !this.number) {
          var str = '身份证和手机号必填一项';
          this.showMessage(str);
          return;
        } else {
          this.verificationWarning = false;
        }

        if (this.number != '' && !this.isIDNumber(this.number)) {
          this.verificationWarning = true;
          return;
        } else {
          this.verificationWarning = false;
        }
        if (this.phone != '' && !this.IsPhone(this.phone)) {
          this.verificationWarning = true;
          return;
        } else {
          this.verificationWarning = false;
        }

        let upData = {
          OpenId: this.openId,
          IDNumber: this.number,
          Phone: this.phone
        };

        let that = this;

        that.$fetch(that.$api.BindWechatIDNumber, { method: 'POST', body: JSON.stringify(upData) })
          .then(function (res) {

            if (res.ReturnCode === 20000 || res.ReturnCode === 40002) {
              localStorage.setItem("IsBinding", true);
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
