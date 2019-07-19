<template>
  <div class="phone-verification">
    <h4>输入验证码</h4>
    <p class="prompt">我们已向 {{number}} 发送了验证码 (<span v-html="time"></span>)</p>

    <ul class="verification-box">
      <li>
        <input type="text" name="verification" maxlength="4" v-model="VfCode" autofocus="autofocus" required/>
      </li>
      <li><span v-bind:class="{active:isActive === 0}"></span><span v-bind:class="{active:isActive === 1}"></span><span v-bind:class="{active:isActive === 2}"></span><span v-bind:class="{active:isActive === 3}"></span></li>
    </ul>

    <!-- <div style="height: 36px;margin-top: 10px"><p v-if="verificationWarning" class="warning-red">请输入正确的验证码！</p></div> -->
    <input type="submit" value="下一步" class="phone-number-btn" v-on:click="submitVfData" ref="VfDataBtn"/>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
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
          ///this.vf();
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
              //this.$refs.VfDataBtn.focus();
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
      
          if(!this.VfCode){
            this.errorDialogeShow("请输入验证码");
            return false;
          }
          let vfNumber = this.VfCode.trim();

          if(vfNumber === ""||vfNumber.length != 4){
            this.errorDialogeShow("请输入正确的验证码");   
            return false;
          }
          return true;
        },

        //提交验证码
        submitVfData() {
          let that = this;

          //验证验证码为空
          if(!that.vf()) {
            return;
          }
          let upData={
              OpenId: that.$common.getOpenId(),
              Phone: that.$store.state.number,
              RecordNo: sessionStorage.getItem("RecordNo"),
              VerificationCode:  that.VfCode
          };


          var type = this.$common.getQueryVariable('type');

          if (type == 2) {//直接绑定

            let pData = {
              OpenId: upData.OpenId,
              Phone: upData.Phone,
              VerificationCode: upData.VerificationCode
            };

            that.$fetch(that.$api.BindWechatIDNumber, { method: 'POST', body: JSON.stringify(pData) })
              .then(function (res) {

                if (res.ReturnCode === 20000 || res.ReturnCode === 40002) {
                  localStorage.setItem("IsBinding", true);

                  MessageBox.alert('身份认证成功').then(() => {
                    that.gobackwechat();
                  });
                }
                else {
                  that.errorDialogeShow(res.ReturnMessage);
                  if (res.ReturnCode!==40009) {
                    that.$router.replace({ path: '/idNumber', query: { v: 2 } });
                  }
                }
              })

          } else {//扫APP码绑定
            that.$fetch(that.$api.phoneVf, { method: 'POST', body: JSON.stringify(upData) })
              .then(function (res) {
                //比对成功跳转到绑定成功页面
                if (res.IsSuccess === true) {
                  sessionStorage.removeItem("RecordNo");
                  that.$store.state.login = true;
                  that.$router.replace({ path: '/bingSucces' });
                }
                else {
                  that.inforWarning(res.ReturnMessage, that.$store.state.number);
                }
              })
          }       
        },

        //错误信息处理
        inforWarning(mes,phone) {
          switch (mes) {
            case "微信重复请求":
              this.$router.push({ name: 'error', query: { err: "微信操作超时"}});
              break;
            case "此档案不属于您":
            case "档案不存在":
              this.$router.push({name: 'error', query:{ err: mes}});
              break;
            default:
              this.errorDialogeShow(mes);
              break;
          }
        },

        //点击重新发送
        againGetInfor() {
          let that = this;
          that.$fetch(that.$api.phone + that.$store.state.number)
            .then(function(res){
              if(res.IsSuccess == true) {
                that.setTime(60);
              }
              if(res.IsSuccess == false) {
                that.errorDialogeShow(res.ReturnMessage);
              }
            })
        }
      }

    }
</script>

<style scoped>

</style>
