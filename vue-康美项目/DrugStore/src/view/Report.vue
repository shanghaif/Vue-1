<template>
  <div>
    <!--导航-->
    <ul class="nav clearfix">
      <li v-for="(item , index) in tabNav" v-bind:class="{active: showBoxId === index}" v-on:click="changeBox(index)">{{item.text}}</li>
    </ul>
    <!--导航-->

    <ul class="content-box">
      <!--健康风险-->
      <li v-show="showBoxId === '0'">
        <div class="textTitle" v-html="textTitle[0].text"></div>
        <div class="animate-box">
          <div class="circleProgress_wrapper">
            <div class="wrapper right">
              <div class="circleProgress rightcircle"></div>
            </div>
            <div class="wrapper left">
              <div class="circleProgress leftcircle"></div>
            </div>
          </div>
          <div class="point"></div>
          <div class="score" v-html="score"><h6>53</h6><p>优秀</p></div>
        </div>
        <div class="heighter" v-html="PersonDeseaseCategory">高于同年龄平均水平<span>30%</span></div>
        <div class="textTitle">主要危险因素：</div>
        <ul class="risk-factor">
          <li><p>风险因素</p><p>本次结果</p><p>正常参考</p></li>
          <li v-for="item in riskFactor"><p>{{item.FactorName}}</p><p style="color: #333" v-if="item.Status === 2">{{item.Result}}</p><p v-else>{{item.Result}}</p><p>{{item.Remark}}</p></li>
        </ul>
        <!-- <p class="warning-gray" v-html="bz">   -->
        <p class="warning-gray">
          注：您本次评估的健康档案信息完整度为{{complete}}%，评估时间为{{DeseaseCategoryTime}}。<span v-if="complete<100">信息越完整，评估越精准！建议完善信息后再次评估。</span>
        </p>
      </li>
      <!--健康风险-->
      <!--调理建议-->
      <li v-show="showBoxId === '1'">
        <div class="textTitle" v-html="textTitle[1].text"></div>
        <ul class="health-product">
          <li v-for="item in healthProduct" class="clearfix" @click="gotoProductURL(item.ProductURl)">
            <div class="img-box"><img v-bind:src="item.Image" /></div>
            <h6>{{item.ProductName}}</h6>
            <p>{{item.Specifications}}</p>
            <p>{{item.Remark}}</p>
            <div class="price-box" v-if="item.Price"><h6>￥{{item.Price || '-'}}<strike>{{item.originalcost ? '￥'+item.originalcost : ''}}</strike><span>已卖出{{item.Salesvolume || '-'}}件</span></h6></div>
          </li>
        </ul>
      </li>
      <!--调理建议-->
      <!--运动建议-->
      <li v-show="showBoxId === '2'" id="sport-advice">
        <div class="textTitle" v-html="textTitle[2].text"></div>
        <ul class="motion-plan">
          <li v-for="item in motionPlan">
            <p>{{item.WeekName}}</p>
            <img v-bind:src="item.SportIcon" />
            <p v-html="item.long"></p>
          </li>
        </ul>
        <p class="conclusion">按照上述安排进行锻炼，您本周可通过运动消耗热量： <span>{{sportKcal.power}}</span> Kcal，相当于减少脂肪：<span>{{sportKcal.fat}}</span>g</p>
        <div style="background-color: #f5f5f5;height: 10px"></div>
        <div class="textTitle">运动流程</div>
        <p class="conclusion">
          1. 准备活动：进行5分钟左右速度稍慢的快走，并活动全身关节。<br />
          2.  主体部分：按照运动计划进行;<br />
          <template v-for="item in minPlan">
            {{item.WeekName}}：{{item.SportName}}({{item.SportTimeMin}}-{{item.SportTimeMax}}分钟);
            <br />
          </template>
          3.  整理活动;<br />
          慢走3分钟(防止突然停止运动所造成的肢体瘀血，回心血量 下降，从而引起晕厥或心律失常)
        </p>
      </li>
      <!--运动建议-->
      <!--饮食建议-->
      <li v-show="showBoxId === '3'" id="food">
        <div class="textTitle">您目前的体重指数<span>{{textTitle[3].BMI}}</span>kg/m²，属于<span>{{textTitle[3].BMIDescription}}</span>。<br />为您推荐每日饮食热量供给量：<span>{{textTitle[3].DietCalory}}</span>kcal</div>
        <ul class="food-ratio">
          <li v-for="item in foodRatio"><h6>{{item.kind}}</h6><p>{{item.percent}}</p></li>
        </ul>
        <div class="food-power">{{textTitle[3].DietCalory}}<br /><span>kcal</span></div>
        <div style="background-color: #f5f5f5;height: 10px"></div>
        <div class="foot-title">常见食物举例</div>
        <div class="foot-title">谷薯类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/rice1.png" />
            <p>大米<span>{{foodCon.Rice}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/rice2.png" />
            <p>馒头<span>{{foodCon.SteamedBun }}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/rice3.png" />
            <p>红薯<span>{{foodCon.Potato }}</span>两</p>
          </li>
        </ul>
        <div class="foot-title">蔬菜类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/vegetables1.png" />
            <p>番茄<span>{{foodCon.ChineseCabbage }}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/vegetables2.png" />
            <p>南瓜<span>{{foodCon.Pumpkin }}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/vegetables3.png" />
            <p>胡萝卜<span>{{foodCon.Carrot}}</span>两</p>
          </li>
        </ul>
        <div class="foot-title">肉蛋类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/meat1.png" />
            <p>牛肉<span>{{foodCon.Meat}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/meat2.png" />
            <p>鸡蛋<span>{{foodCon.Egg}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/meat3.png" />
            <p>鱼<span>{{foodCon.Fish}}</span>两</p>
          </li>
        </ul>
        <div class="foot-title">豆奶类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/milk1.png" />
            <p>牛奶<span>{{foodCon.Milk}}</span>ml</p>
          </li>
          <li>
            <img src="../assets/img/milk2.png" />
            <p>南方豆腐<span>{{foodCon.Tofu}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/milk3.png" />
            <p>豆腐干<span>{{foodCon.DriedTofu}}</span>两</p>
          </li>
        </ul>
        <div class="foot-title">水果类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/fruits1.png" />
            <p>苹果<span>{{foodCon.Apple}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/fruits2.png" />
            <p>香蕉<span>{{foodCon.Banana}}</span>两</p>
          </li>
          <li>
            <img src="../assets/img/fruits3.png" />
            <p>西瓜<span>{{foodCon.Watermelon}}</span>两</p>
          </li>
        </ul>
        <div class="foot-title">油脂类</div>
        <ul class="food-quantity">
          <li>
            <img src="../assets/img/grease.png" />
            <p>各种植物油和动物油<span>{{foodCon.Oil}}</span>汤匙（<span>10g</span>汤匙）</p>
          </li>
        </ul>
        <p class="warning-red">*每日食盐摄入量＜6g，水1500-1700毫升</p>
      </li>
      <!--饮食建议-->
    </ul>

    <!--完善档案-->
    <router-link :to="{name:'basic-file'}" class="file-btn"><span>完</span><span>善</span><br /><span>档</span><span>案</span></router-link>
    <!--完善档案-->
  </div>
</template>

<script>
  import api from "../api/index";
  import globalMixin from "../mixins/global";
  import { types } from 'util';
  export default {
    name: 'Report',
    mixins: [globalMixin],
    components: {

    },
    data() {
      return {
        tabNav: {
          "0": {
            "text": "健康风险"
          },
          "1": {
            "text": "调理建议"
          },
          "2": {
            "text": "运动建议"
          },
          "3": {
            "text": "饮食建议"
          }
        },
        showBoxId: "0",   //切换框
        textTitle: {
          "0": {
            "text": "综合评分："
          },
          "1": {
            "text": "保健品"
          },
          "2": {
            "text": '<img src="' + require("../assets/img/sportIcon.png") + '"/>' + "您最近一周的有氧运动计划"
          },
          "3": {
          },

        },
        score: "",
        riskFactor: {},   //风险因素
        PersonDeseaseCategory: "",  //个人健康评分
        bz: "", //评估时间
        healthProduct: {    //保健品
        },
        motionPlan: {    //运动计划
        },
        minPlan: {},
        sportKcal: {
          power: 1000,
          fat: 850,
        },
        foodRatio: [],    //饮食计划
        foodCon: {},
        complete: 0,
        ReportObj: [],
        DeseaseCategoryTime: new Date(),
      };
    },
    computed: {},
    created() {
      this.$common.getToken().then(t => {
        if (t) {
          this.getReport();
        }
      });
    },
    mounted() {
    },
    methods: {
      //切换
      changeBox(i) {
        this.showBoxId = i;
      },
      //获取报告内容
      getReport: function (r, o) {
        r = this.$common.getQueryVariable('RecordNo') || "";
        o = this.$common.getOpenId() || "";

        let that = this;
        that.$fetch(that.$api.getReport + "?RecordNo=" + r + "&OpenId=" + o)
          .then(function (res) {
            that.ReportObj = res.Data.ReturnData;
            that.complete = res.DataIntegrity;
            if (res.Data.IsSuccess === true) {

              let d = that.uniq(that.ReportObj.FactorRecordList); //去重
              that.riskFactor = Object.assign({}, that.riskFactor, d);//危险因素

              that.healthRisk(that.ReportObj.PersonDeseaseCategory);//健康风险

              //去掉T字母
              let time1 = new Date().format(that.ReportObj.PersonDeseaseCategory.ModifiedTime);
              let b = time1.split("T");
              let s = b[1];
              let z = s.split(":", 3);

              //that.bz = "您本次评估的健康档案信息完整度为" + that.ReportObj.PersonDeseaseCategory.PhysiologicalHealth + "%，评估时间为" + that.$common.dataFormat(that.ReportObj.PersonDeseaseCategory.ModifiedTime,"yyyy-MM-dd hh:mm:ss")+ "。信息越完整，评估越精准！建议完善信息后再次评估";
              if (that.ReportObj.PersonDeseaseCategory.DeseaseCategoryTime) {
                that.DeseaseCategoryTime = that.$common.dataFormat(that.ReportObj.PersonDeseaseCategory.DeseaseCategoryTime, "yyyy-MM-dd hh:mm:ss");
              }
              setTimeout(function () {
                //调理建议
                that.healthProduct = {
                  ...that.ReportObj.Dimensions
                };

                //运动建议
                that.sportAdvice(that.ReportObj.SportAdvice);

                //饮食建议前半部
                that.dietAdvice(that.ReportObj.DietAdvice);

                that.foodCon = that.ReportObj.DietAdviseDetail;

              }, 1000);
            }
            else {

              if (res.Data.ReturnCode === 40002) {
                var returnRecordNo = res.RecordNo;
                if (returnRecordNo) {
                  that.$router.replace({ name: 'phone-number', query: { RecordNo: returnRecordNo } });
                } else {
                  that.$router.replace({ name: 'error', query: { err: "对不起，未发现档案！" } });
                }
              } else {
                that.errorDialogeShow(res.Data.ReturnMessage);
              }
            }
          })
      },

      //健康风险
      healthRisk: function (data) {
        let style = null,
          circleProgressLoad_left,
          circleProgressLoad_right,
          pointscroll;

        this.score = "<h6>" + data.HealthScore + "</h6><p>" + data.HealthGrade + "</p>";
        if (data.AgeRisk > 0) {
          this.PersonDeseaseCategory = '高于同年龄平均水平 <span class="red">' + data.AgeRisk + '%</span>';
        }
        else {
          this.PersonDeseaseCategory = '低于同年龄平均水平 <span class="green">' + Math.abs(data.AgeRisk) + '%</span>'
        }

        let bl = data.HealthScore * 360 / 100;

        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        document.head.appendChild(style);

        if (data.HealthScore <= 50) {
          circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, bl / 2 + 45, bl + 45);
          pointscroll = this.createAnimate("pointscroll", 0, bl / 2, bl);
          style.sheet.insertRule(circleProgressLoad_left, 0);
          style.sheet.insertRule(pointscroll, 1);
        } else {
          circleProgressLoad_left = this.createAnimate("circleProgressLoad_left", 45, 225, 225);
          circleProgressLoad_right = this.createAnimate("circleProgressLoad_right", 45, 45, bl + 45 - 180);
          pointscroll = this.createAnimate("pointscroll", 0, 180, bl);
          style.sheet.insertRule(circleProgressLoad_left, 0);
          style.sheet.insertRule(circleProgressLoad_right, 1);
          style.sheet.insertRule(pointscroll, 2);
        }
      },

      //去重
      uniq: function (oldArr) {
        let allArr = [];
        $.each(oldArr, function (i, v) {
          let flag = true;
          if (allArr.length > 0) {
            $.each(allArr, function (n, m) {
              if (allArr[n].FactorName === oldArr[i].FactorName) {
                flag = false;
              }
            });
          }
          if (flag) {
            allArr.push(oldArr[i]);
          }
        });
        return allArr;
      },

      sportAdvice(data) {
        if (data.IsAssess == false) {
          let sportHtml = "";
          for (let i in data.EvaluateErrorList) {
            let z = Number(i) + 1;
            sportHtml += "<br/>(" + z + ")" + data.EvaluateErrorList[i];
          }
          $("#sport-advice").html('<p class="bc">为了科学地为您制定运动计划，您需要完善您的健康档案信息。请完善您的：' + sportHtml + '</p>');
          return;
        }

        let motionPlan = {
          "0": {
            WeekName: "周一",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "1": {
            WeekName: "周二",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "2": {
            WeekName: "周三",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "3": {
            WeekName: "周四",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "4": {
            WeekName: "周五",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "5": {
            WeekName: "周六",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
          "6": {
            WeekName: "周日",
            SportName: "",
            SportIcon: require("../assets/img/sport/noSport.png"),
            long: "",
          },
        };
        let soportData = {
          WeekName: "",
          SportName: "",
          SportIcon: "",
          long: "",
        };

        this.minPlan = {
          ...data.SportWeekPlanDetailList
        };

        for (let i in data.SportWeekPlanDetailList) {
          soportData = {
            ...data.SportWeekPlanDetailList[i]
          };

          switch (soportData.WeekName) {
            case "周一":
              motionPlan[0] = {
                ...soportData
              };
              motionPlan[0].long = motionPlan[0].SportTimeMin + "-" + motionPlan[0].SportTimeMax + "<br/>min";
              motionPlan[0].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周二":
              motionPlan[1] = {
                ...soportData
              };
              motionPlan[1].long = motionPlan[1].SportTimeMin + "-" + motionPlan[1].SportTimeMax + "<br/>min";
              motionPlan[1].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周三":
              motionPlan[2] = {
                ...soportData
              };
              motionPlan[2].long = motionPlan[2].SportTimeMin + "-" + motionPlan[2].SportTimeMax + "<br/>min";
              motionPlan[2].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周四":
              motionPlan[3] = {
                ...soportData
              };
              motionPlan[3].long = motionPlan[3].SportTimeMin + "-" + motionPlan[3].SportTimeMax + "<br/>min";
              motionPlan[3].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周五":
              motionPlan[4] = {
                ...soportData
              };
              motionPlan[4].long = motionPlan[4].SportTimeMin + "-" + motionPlan[4].SportTimeMax + "<br/>min";
              motionPlan[4].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周六":
              motionPlan[5] = {
                ...soportData
              };
              motionPlan[5].long = motionPlan[5].SportTimeMin + "-" + motionPlan[5].SportTimeMax + "<br/>min";
              motionPlan[5].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
            case "周日":
              motionPlan[6] = {
                ...soportData
              };
              motionPlan[6].long = motionPlan[6].SportTimeMin + "-" + motionPlan[6].SportTimeMax + "<br/>min";
              motionPlan[6].SportIcon = require("../assets/" + soportData.SportIcon);
              break;
          }
          soportData = "";
        }

        this.motionPlan = Object.assign({}, this.motionPlan, motionPlan);

        this.sportKcal.power = data.Calory;
        this.sportKcal.fat = data.Fat;
      },

      dietAdvice(data) {
        if (data.Tip != null) {
          $("#food").html('<p class="bc">为了科学地为您制定饮食计划，您需要完善您的健康档案信息。请完善您的<span style="color:red;margin:0 4px;">' + data.Tip + '</span>信息。</p>');
          return;
        }
        if (data.Tip === null || data.Tip === "") {
          this.textTitle[3] = Object.assign({}, this.textTitle[3], { BMI: data.BMI, BMIDescription: data.BMIDescription, DietCalory: data.DietCalory });

          let foodData = [
            {
              kind: "谷薯类",
              percent: data.Potato + "%"
            },
            {
              kind: "肉蛋类",
              percent: data.MeatEgg + "%"
            },
            {
              kind: "豆奶类",
              percent: data.SoyMilk + "%"
            },
            {
              kind: "蔬菜类",
              percent: data.Vegetables + "%"
            },
            {
              kind: "水果类",
              percent: data.Fruits + "%"
            },
            {
              kind: "油脂类",
              percent: data.Fats + "%"
            },
          ];
          this.foodRatio = {
            ...foodData
          };
        }
      },

      // 跳转到商品详情外部链接
      // 例："http://testkmjkzx.kmwlyy.com/web/shop/wx/auth/in?action=DETAIL&data=1adc0ba12d9b4f97834908bbfdceda80&groupId=a28dc233c40944b9b689f110dfb11a26&orgId=ZSZG"
      gotoProductURL: function (url) {
        if (!!url) {
          window.location.href = url;
        }
      },

      // 修改动画
      createAnimate: function (name, val1, val2, val3) {
        let token = null,
          animat = null;

        // 判断是否是webkit浏览器内核
        token = window.WebKitCSSKeyframesRule ? '-webkit-' : '';
        // 添加keyframes动画的样式
        animat = '@' + token + 'keyframes ' + name + '{0%{transform: rotateZ(' + val1 + 'deg);}50%{transform: rotateZ(' + val2 + 'deg);}100%{transform: rotateZ(' + val3 + 'deg);}}';

        return animat;
      },
      getComplete() {
        let that = this;
        return that.$fetch(that.$common.getMobileUrl(that.$api.GetWeChatPersonCompleteApi))
          .then(function (res) {
            if (res.IsSuccess === true) {
              that.complete = res.ReturnData.DataIntegrity;
            }
          })
      },
    }
  }


</script>
<style scoped>

  .health-product {
    width: 100%;
    max-width: 10rem;
    margin: 0 auto;
  }

  .health-product li {
    width: 96%;
    height: 2.333333333rem;
    margin: 0.4rem auto;
    text-align: left;
  }

  .health-product li:nth-child(1) {
    margin-top: 0;
  }

  .health-product li .img-box {
    width: 30%;
    height: 2.133333333333333rem;
    border-radius: 0.1066666666666667rem;
    border: solid 1px #d2d2d2;
    display: inline-block;
    float: left;
    overflow: hidden;
  }

  .health-product li .img-box img {
    width: auto;
    height: 100%;
    margin: 0 auto;
    display: table-cell;
    text-align: center;
    vertical-align: center;
  }

  .health-product li h6 {
    width: 69%;
    display: inline-block;
    float: left;
    font-size: 0.4rem;
    font-weight: normal;
    line-height: 0.55rem;
    text-indent: 0.2666666666666667rem;
  }

  .health-product li p {
    width: 69%; 
    display: inline-block;
    float: right;
    font-size: 0.32rem;
    line-height: 0.55rem;
    color: #999;
    text-indent: 0.2666666666666667rem;
    white-space: nowrap;
    overflow: hidden;
  }

  .score h6 {
    font-size: 1.333333333333333rem;
  }

  .score p {
    font-size: 0.3466666666666667rem;
  }

  /* .clearfix > h6 {
    white-space: nowrap;
    overflow: hidden;
  } */

  .clearfix > .price-box {
    display: inline;
    float: left;
    width: 69%;
  }

  .clearfix > .price-box > h6 {
    width: 100%;
    line-height: 0.7rem;
    /* top: -25%; */
    /* transform: translateY(25%); */
    color: #ff4848;
  }

  .clearfix > .price-box > h6 > strike {
    color: #999;
    font-size: 0.3466666666666667rem;
    margin-left: 0.1rem;
  }

  .clearfix > .price-box > h6 > span {
    float: right;
    text-align: right;
    font-size: 0.32rem;
    color: #999;
    margin-right: 5%;
  }
</style>

