<template>
  <div class="phone-verification">
    <h4>输入验证码</h4>
    <p class="prompt">我们已向 {{number}} 发送了验证码 (<span v-html="time"></span>)</p>

    <ul class="verification-box">
      <li>
        <input type="tel" name="verification" maxlength="4" v-model="VfCode"  required autofocus="autofocus" />
      </li>
      <li><span v-bind:class="{active:isActive === 0}"></span><span v-bind:class="{active:isActive === 1}"></span><span v-bind:class="{active:isActive === 2}"></span><span v-bind:class="{active:isActive === 3}"></span></li>
    </ul>

    <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">请输入正确的验证码！</p></div>
    <input type="submit" value="下一步" class="phone-number-btn" v-on:click="submitVfData" ref="VfDataBtn"/>
  </div>
</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "VerificationCode",
      mixins: [globalMixin],
      data() {
        return {
          number: null,
          verificationWarning: false,
          time: "60秒",
          VfCode: null,
          isActive: 0,
        }
      },
      computed: {
      },
      watch: {
        VfCode(val) {
          this.vf();
          let len = val.length;
          switch (len) {
            case 0:
              this.isActive = 0;
              break;
            case 1:
              this.isActive = 1;
              break;
            case 2:
              this.isActive = 2;
              break;
            case 3:
              this.isActive = 3;
              break;
            case 4:
              this.isActive = 4;
              this.$refs.VfDataBtn.focus();
              break;
          }
        },
      },
      beforeCreate() {
      },
      created() {
        this.number = this.$store.state.number;
      },
      mounted() {
          //倒计时
        this.setTime(60);
      },
      methods: {
        //验证码校验
        vf: function () {
          let vfNumber = this.VfCode.trim();

          if(vfNumber === "") {
            this.verificationWarning = true;
            return false;
          }
          else if(vfNumber.length != 4) {
            this.verificationWarning = true;
            return false;
          }
          else {
            this.verificationWarning = false;
            return true;
          }
        },

        //提交验证码
        submitVfData() {
          let that = this;
          let vfNumber = that.VfCode;

          //验证验证码为空
          if(!that.vf()) {
            return;
          }

          that.$axios({
            method: 'post',
            url: that.$api.phoneVf,
            data: {
              "OpenId": that.$common.getLocalWxToken().openid,
              "phone": that.$store.state.number,
              "RecordNo": that.$store.state.recordNo,
              "VerificationCode": vfNumber
            },
            headers:{
              "token": that.$common.getLocalWxToken().access_token
            }
          })
            .then(function(res){
              //比对成功跳转到绑定成功页面
              if(res.data.IsSuccess === true) {
                that.$store.state.login = true;
                that.$router.replace({path: '/bingSucces'});
              }
              if(res.data.IsSuccess === false) {
                that.inforWarning(res.data.ReturnMessage,that.$store.state.number);
              }
            })
        },

        //错误信息处理
        inforWarning(mes,phone) {
          switch (mes) {
            case "微信重复请求":
              this.$router.push({name: 'error', query:{ err: mes}});
              break;
            case "手机号码已绑定":
              this.errorDialogeShow("手机号码已绑定,请整合档案！");
              this.$router.push({name: 'integration-report',query:{ phone: phone}});
              break;
            case "验证码已过期":
              this.errorDialogeShow(mes);
              break;
            case "验证码错误":
              this.errorDialogeShow(mes);
              break;
            case "此档案不属于您":
              this.$router.push({name: 'error', query:{ err: mes}});
              break;
            case "档案不存在":
              this.$router.push({name: 'error', query:{ err: mes}});
              break;
            case "RecordNo不能为空":
              this.$router.push({name: 'error', query:{ err: "RecordNo不能为空"}});
              break;
          }
        },

        //点击重新发送
        againGetInfor() {
          let that = this;
          that.$axios.get(that.$api.phone + that.$store.state.number,{
            headers:{
              "token": that.$common.getLocalWxToken().access_token,
            }
          })
            .then(function(res){
              if(res.data.IsSuccess == true) {
                that.setTime(60);
              }
              if(res.data.IsSuccess == false) {
                that.errorDialogeShow(res.data.ReturnMessage);
              }
            })
        },


      }

    }
</script>

<style scoped>

</style>
