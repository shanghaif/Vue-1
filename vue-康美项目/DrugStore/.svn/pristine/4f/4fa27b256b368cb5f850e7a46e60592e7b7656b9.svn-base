<template>
  <div class="phone-verification">
    <h4>欢迎您！</h4>
    <div v-show="!IsBinding">
      <p class="prompt">请选择</p>
      <mt-radio v-model="value"
                :options="options">
      </mt-radio>
      <div v-if="value=='1'">
        <p class="prompt">请输入身份证号</p>
        <input type="text" v-model="number" class="phone-number" name="mobile" />
      </div>
      <div v-if="value=='2'">
        <p class="prompt">请输入手机号</p>
        <input type="text" v-model="phone" class="phone-number" name="phone" />
      </div>
    </div>
    <p v-show="IsBinding" style="font-size:0.5em">您已绑定过档案</p>
    <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">{{message}}！</p></div>
    <input type="submit" v-model="btnName " class="phone-number-btn" v-on:click="submitNumberData" />
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Radio } from 'mint-ui';
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
        options: [
          {
            label: '身份证',
            value: '1',
          },
          {
            label: '手机号',
            value: '2'
          }
        ],
        value: '1'
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
        this.phone="";
      },
      phone(val) {
        val = val || '';
        if (val.length >= 11 && !this.isPhone(val)) {
          var str = '输入有误，请重新输入手机号';
          this.showMessage(str);
        } else {
          this.verificationWarning = false;
        }
        this.number="";
      },
      value(val) {
        this.verificationWarning = false;
        this.message = '';
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
        this.value = this.$common.getQueryVariable("v") || '1';

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
      isPhone(phone) {
        let phonereg = /(^1[3|4|5|7|8]\d{9}$)/;
        return phonereg.test(phone);
      },
      //提交绑定
      submitNumberData() {
     
        if (localStorage.getItem("IsBinding")) {
          this.gobackwechat();
          return;
        }

        if (this.value == '1') {

          this.bindIDNumber();

        } else if ((this.value == '2')) {

          this.sendverificationCode();

        } 
      },
      //绑定身份证
      bindIDNumber() {
        if (!this.number) {
          var str = '请重新输入身份证';
          this.showMessage(str);
          return;
        }
        else if (!this.isIDNumber(this.number)) {
          this.verificationWarning = true;
          return;
        }
        else {
          this.verificationWarning = false;
        }

        let upData = {
          OpenId: this.openId,
          IDNumber: this.number
        };

        let that = this;

        that.$fetch(that.$api.BindWechatIDNumber, { method: 'POST', body: JSON.stringify(upData) })
          .then(function (res) {

            if (res.ReturnCode === 20000 || res.ReturnCode === 40002) {
              localStorage.setItem("IsBinding", true);

              MessageBox.alert('身份认证成功').then(() => {
                that.gobackwechat();
              });
            }
            else {
              that.errorDialogeShow(res.ReturnMessage);
            }
          })
      },
      //绑定手机号，发送验证码
      sendverificationCode() {

        if (!this.phone) {
          var str = '请重新输入手机号码';
          this.showMessage(str);
          return;
        } else if (!this.isPhone(this.phone)) {
          this.verificationWarning = true;
          this.showMessage("请重新输入正确的手机号码");
          return;
        } else {
          this.verificationWarning = false;
        }

        let that = this;
        that.$fetch(that.$api.phone + this.phone+"&OpenId="+ this.openId+"&falg=1")
          .then(function (res) {

            if (res.IsSuccess === true) {
              that.$store.commit('updateNumber', that.phone);
              that.$router.replace({ path: '/verificationCode', query: { type: 2 } });
            }
            else {
              var msg=res.ReturnMessage;
              if(res.ReturnCode===41100)
              {
                msg="手机号无效";
              } else if(res.ReturnCode===41300)
              {
                msg="手机号对应档案已绑定其他微信号";
              }else if(res.ReturnCode===41400)
              {
                msg="此手机号无对应档案，请重新输入";
              }
              that.errorDialogeShow(msg);
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
