<template>
    <div class="content-box">

      <div class="blue">
        <div class="animate-box">
          <div class="circleProgress_wrapper">
            <div class="wrapper right">
              <div class="circleProgress rightcircle"></div>
            </div>
            <div class="wrapper left">
              <div class="circleProgress leftcircle"></div>
            </div>
          </div>
          <div class="point" v-bind:data-afterContent="userInfor.DataIntegrity + '%'"></div>
          <div class="score"><h6>{{userInfor.Name}}</h6><p><template v-if="userInfor.Gender == 1">男</template><template v-else>女</template>，{{userInfor.Birthday}}</p></div>
        </div>
      </div>

      <ul class="health-file">
        <li class="row-background" v-for="item in healthFile" v-on:click="toUrl(item.to)">
          <div class="ul-center">
            <ul>
              <li class="li01"><img v-bind:src="item.img" class="listImg"></li>
              <li class="li02">
                <div class="centerStyle">
                  <div class="lileft" v-html="item.text"></div>
                  <div class="completion-bar">
                    <div class="bar-grad1" v-bind:style="{width:item.percent + '%'}"></div>
                  </div>
                  <div class="liright" v-html="item.percent + '%'"></div>
                </div>
              </li>
              <li class="li03">
                <img src="../assets/img/arrow.jpg" />
              </li>
            </ul>
          </div>
        </li>
      </ul>

    </div>

</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "HealthFile",
      mixins: [globalMixin],
      data() {
        return {
          userInfor: {
            Name: "",
            Gender: "0",
            Birthday: null,
            DataIntegrity: null,
          },
          healthFile: {
            "0": {
              text:"基础档案",
              img: require("../assets/img/folder.png"),
              percent: "",
              to: "/basicFile"
            },
            "1": {
              text:"生活习惯",
              img: require("../assets/img/coffee.png"),
              percent: "",
              to: "/livingHabit"
            },
            "2": {
              text:"健康史",
              img: require("../assets/img/pulse.png"),
              percent: "",
              to: "/healthHistory"
            },
            "3": {
              text:"体检数据",
              img: require("../assets/img/medical-record.png"),
              percent: "",
              to: "/examList"
            },
          }
        }
      },
      computed: {
      },
      watch: {
      },
      beforeCreate() {
      },
      created() {

      },
      mounted() {
        this.$common.getNewToken().then((token)=>{
          this.$common.getToken().then(val => {
            if(val){
              this.getWeChat().then(()=> {
                        this.paitingCircle(this.userInfor.DataIntegrity);
                      });
            }
          });
        });
      },
      methods: {

        //获取信息
        getWeChat() {

          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetWeChatPersonCompleteApi))
            .then(function(res){
              if (res.IsSuccess === true) {
                let getData = res.ReturnData;
                that.healthFile[0].percent = getData.BasicInfo;
                that.healthFile[1].percent = getData.LifeStyle;
                that.healthFile[2].percent = getData.HealthInfo;
                that.healthFile[3].percent = getData.PhysicalExamination;

                //岁数
                let age = 0;
                var today=new Date();
                var todayYear=today.getFullYear();
                var todayMonth=today.getMonth()+1;
                var todayDay=today.getDate();

                let birthday = new Date();
                if(getData.Birthday){
                  birthday = new Date(getData.Birthday);
                }
              let birthdayYear=birthday.getFullYear();
              let birthdayMonth=birthday.getMonth();
              let birthdayDay=birthday.getDate();
              if(todayMonth*1-birthdayMonth*1<0){
                  age = (todayYear*1-birthdayYear*1)-1;
                }
                else {
                  if(todayDay-birthdayDay>=0){
                    age = (todayYear*1-birthdayYear*1);
                  }
                  else{
                    age = (todayYear*1-birthdayYear*1)-1;
                  }
                }
                let name = res.ReturnData.Name;
                if (name.length > 3){
                  name = name.slice(0,3)+ '...';
                }
                that.userInfor = Object.assign({}, that.userInfor, getData,{Birthday: age ,Name:name});
              }
            })
        },

        //转圈动画
        paitingCircle(data) {
          let style = null,
            circleProgressLoad_left,
            circleProgressLoad_right,
            pointscroll,
            pointscrollx;

          let bl = data * 360 / 100;

          style = document.createElement('style');
          style.setAttribute('type', 'text/css');
          document.head.appendChild(style);

          if (data <= 50) {
            circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, bl / 2 + 45, bl + 45);
            pointscroll = this.createAnimate("pointscroll", 0, bl / 2, bl);
            pointscrollx = this.createAnimate("pointscrollx", 360, 360 - bl / 2, 360-bl);
            style.sheet.insertRule(circleProgressLoad_left, 0);
            style.sheet.insertRule(pointscroll, 1);
            style.sheet.insertRule(pointscrollx, 2);
          } else {
            circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, 225, 225);
            circleProgressLoad_right = this.createAnimate("circleProgressLoad_right", 45, 45, bl + 45 - 180);
            pointscroll = this.createAnimate("pointscroll", 0, 180, bl);
            pointscrollx = this.createAnimate("pointscrollx", 360, 180, 360-bl);
            style.sheet.insertRule(circleProgressLoad_left, 0);
            style.sheet.insertRule(circleProgressLoad_right, 1);
            style.sheet.insertRule(pointscroll, 2);
            style.sheet.insertRule(pointscrollx, 3);
          }
        },

        //修改动画
        createAnimate: function (name, val1, val2, val3) {
          let token = null,
            animat = null;

          // 判断是否是webkit浏览器内核
          token = window.WebKitCSSKeyframesRule ? '-webkit-' : '';
          // 添加keyframes动画的样式
          animat = '@' + token + 'keyframes ' + name + '{0%{transform: rotateZ(' + val1 + 'deg);}50%{transform: rotateZ(' + val2 + 'deg);}100%{transform: rotateZ(' + val3 + 'deg);}}';

          return animat;
        },

      }
    }
</script>

<style scoped>

</style>
