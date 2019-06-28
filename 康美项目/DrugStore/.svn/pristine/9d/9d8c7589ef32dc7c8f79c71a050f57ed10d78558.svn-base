<template>
  <div>

    <!--导航-->
    <ul class="nav clearfix">
      <li v-for="(item , index) in tabNav" v-bind:class="{active: showBoxId === index}" v-on:click="changeBox(index)">{{item.text}}</li>
    </ul>
    <!--导航-->

    <ul class="content-box">

      <!--血压-->
      <li v-if="showBoxId === '0'">

        <div class="mid-cont">
          <h3>最近血压</h3>
          <ul>
            <li><p><span>收缩压</span><br/>{{allData.Systolic}}<span>mmol/L</span></p></li>
            <li><p><span>舒张压</span><br/>{{allData.Diastolic}}<span>mmol/L</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result == '正常',color3:allData.Result == '正常高值',color4:allData.Result == '轻度',color5:allData.Result == '中度',color6:allData.Result == '重度',color1:allData.Result == '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>血压趋势</h3>
          <div class="last-time">{{allData.LastTestTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="bloodChart" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 0}}">手动输入</router-link>
          <router-link :to="{name:'blood-pressure-report'}">查看报告</router-link>
        </div>

      </li>
      <!--血压-->

      <!--血糖-->
      <li v-if="showBoxId === '1'">
        <div class="mid-cont">
          <h3>最近血糖</h3>
          <ul>
            <li><p style="font-size: 0.4rem;color: #00cbe9">{{allData.SugarType}}</p></li>
            <li><p>{{allData.Sugar}}<span>mmol/L</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result === '正常',color3:allData.Result === '正常高值',color4:allData.Result === '轻度',color5:allData.Result === '中度',color6:allData.Result === '重度',color1:allData.Result === '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>血糖趋势</h3>
          <div class="last-time">{{allData.LastTestTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="bloodSugar" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 1}}">手动输入</router-link>
          <router-link :to="{name:'blood-oxygen-report'}">查看报告</router-link>
        </div>
      </li>
      <!--血糖-->

      <!--心率-->
      <li v-if="showBoxId === '2'">
        <div class="mid-cont">
          <h3>最近心率</h3>
          <ul>
            <li><p>{{allData.Rate}}<span>次/分</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result === '正常',color3:allData.Result === '正常高值',color4:allData.Result === '轻度',color5:allData.Result === '中度',color6:allData.Result === '重度',color1:allData.Result === '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>心率趋势</h3>
          <div class="last-time">{{allData.LastTestTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="heartRate" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 2}}">手动输入</router-link>
        </div>
      </li>
      <!--心率-->

      <!--步数-->
      <li v-if="showBoxId === '3'">
        <div class="mid-cont">
          <h3>最近步数</h3>
          <ul>
            <li><p>{{allData.Step}}<span>步</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result === '正常',color3:allData.Result === '正常高值',color4:allData.Result === '轻度',color5:allData.Result === '中度',color6:allData.Result === '重度',color1:allData.Result === '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>步数趋势</h3>
          <div class="last-time">{{allData.StepTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="stepCount" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 3}}">手动输入</router-link>
        </div>
      </li>
      <!--步数-->

      <!--血氧-->
      <li v-if="showBoxId === '4'">
        <div class="mid-cont">
          <h3>最近血氧</h3>
          <ul>
            <li><p>{{allData.Oxygen}}<span>%</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result === '正常',color3:allData.Result === '正常高值',color4:allData.Result === '轻度',color5:allData.Result === '中度',color6:allData.Result === '重度',color1:allData.Result === '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>血氧趋势</h3>
          <div class="last-time">{{allData.LastTestTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="bloodOxygen" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 4}}">手动输入</router-link>
        </div>
      </li>
      <!--血氧-->

      <!--肺活量-->
      <li v-if="showBoxId === '5'">
        <div class="mid-cont">
          <h3>最近肺活量</h3>
          <ul>
            <li><p>{{allData.VitalCapacity}}<span>ml</span></p></li>
            <li>
              <p v-bind:class="{color2:allData.Result === '呼吸功能正常',color3:allData.Result === '正常高值',color4:allData.Result === '轻度',color5:allData.Result === '中度',color6:allData.Result === '重度',color1:allData.Result === '偏低'}" class="blood-status">{{allData.Result}}</p>
            </li>
          </ul>
        </div>

        <div class="mid-cont">
          <h3>肺活量趋势</h3>
          <div class="last-time">{{allData.LastTestTime | dataFormat("yyyy-MM-dd")}}</div>
          <div ref="vitalCapacity" style="width:10rem; height:7rem; background-color:#fff; margin-top: 0.4rem" ></div>
        </div>

        <div class="btn-box">
          <router-link :to="{name:'manual',params:{ showId: 5}}">手动输入</router-link>
        </div>
      </li>
      <!--肺活量-->

    </ul>


  </div>
</template>


<script>
  import api from "../api/index";
  import globalMixin from "../mixins/global";
  export default {
    name: 'HealthNotes',
    mixins: [globalMixin],
    components: {
    },
    data() {
      return {
        showBoxId: "0",   //切换框
        tabNav: {
          "0": {
            "text":"血压"
          },
          "1": {
            "text":"血糖"
          },
          "2": {
            "text":"心率"
          },
          "3": {
            "text":"步数"
          },
          "4": {
            "text":"血氧"
          },
          "5": {
            "text":"肺活量"
          }
        },
        allData: {},
        charts:[]
      };
    },
    computed: {},
    created() {

    },
    mounted() {
      this.$common.getNewToken().then((token)=>{
        let getShow = this.$route.query.id;
        if(getShow) {
          this.$common.getToken().then(val => {
            this.getReport(getShow);
          });
        }
        else {
          this.$common.getToken().then(val => {
            if(val){
              this.getReport(0);
            }

          });
        }  
      });
    },
    methods: {
      //切换
      changeBox (i) {
        this.showBoxId = i;
        this.getReport(i);
      },

      //获取数据
      getReport(i) {
        let that = this;
        let showApi = "";
        if(i == 0) {
          showApi = that.$common.getMobileUrl(that.$api.BloodPressureApi);
        }
        else if(i == 1) {
          showApi = that.$common.getMobileUrl(that.$api.BloodSugarApi);
        }
        else if(i == 2) {
          showApi =that.$common.getMobileUrl( that.$api.HeartRateApi);
        }
        else if(i == 3) {
          showApi =that.$common.getMobileUrl( that.$api.StepApi);
        }
        else if(i == 4) {
          showApi = that.$common.getMobileUrl(that.$api.BloodOxygenApi);
        }
        else {
          showApi = that.$common.getMobileUrl(that.$api.VitalCapacityApi);
        }

        that.$fetch(showApi)
          .then(function(res){
            if (res.IsSuccess === true) {
              let data = res.ReturnData;
              that.allData = Object.assign({}, that.allData,data);
              if(data.CheckTimeList){
                for(var j=0;j< data.CheckTimeList.length;j++){
                  data.CheckTimeList[j]=that.$common.dataFormat( data.CheckTimeList[j],"yyyy-MM-dd");
                }
              }
               if(data.StepsTimeList){
                for(var j=0;j< data.StepsTimeList.length;j++){
                  data.StepsTimeList[j]=that.$common.dataFormat( data.StepsTimeList[j],"yyyy-MM-dd");
                }
              }

              if(i == 0) {
                let data1 = Object.assign({}, data1,{ name: "舒张压", data: data.DiastolicList,xData: data.CheckTimeList});
                let data2 = Object.assign({}, data2,{ name: "收缩压", data: data.SystolicList,});
                if(!that.charts[0]){
                  that.charts[0] = that.$echarts.init(that.$refs.bloodChart);
                }
                that.charts[0].setOption(that.$common.getCharts(data1,data2),true);
                if(!data.DiastolicList&&!data.SystolicList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
              else if(i == 1) {
                let data1 = Object.assign({}, data1,{ name: "血糖", data: data.SugarList,xData: data.CheckTimeList});
                if(!that.charts[1]){
                  that.charts[1] = that.$echarts.init(that.$refs.bloodSugar);
                }
                that.charts[1].setOption(that.$common.getCharts(data1),true);
                if(!data.SugarList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
              else if(i == 2) {
                let data1 = Object.assign({}, data1,{ name: "心率", data: data.RateList,xData: data.CheckTimeList});
                if(!that.charts[2]){
                  that.charts[2] = that.$echarts.init(that.$refs.heartRate);
                }
                that.charts[2].setOption(that.$common.getCharts(data1),true);
                if(!data.RateList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
              else if(i == 3) {
                let data1 = Object.assign({}, data1,{ name: "步数", data: data.StepsList,xData: data.StepsTimeList});
                if(!that.charts[3]){
                  that.charts[3] = that.$echarts.init(that.$refs.stepCount);
                }
                that.charts[3].setOption(that.$common.getCharts(data1),true);
                if(!data.StepsList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
              else if(i == 4) {
                let data1 = Object.assign({}, data1,{ name: "血氧", data: data.OxygenList,xData: data.CheckTimeList});
                if(!that.charts[4]){
                  that.charts[4] = that.$echarts.init(that.$refs.bloodOxygen);
                }
                that.charts[4].setOption(that.$common.getCharts(data1),true);
                if(!data.OxygenList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
              else {
                let data1 = Object.assign({}, data1,{ name: "肺活量", data: data.VitalCapacityList,xData: data.CheckTimeList});
                if(!that.charts[5]){
                  that.charts[5] = that.$echarts.init(that.$refs.vitalCapacity);
                }
                that.charts[5].setOption(that.$common.getCharts(data1),true);
                if(!data.VitalCapacityList) {
                  that.errorDialogeShow("暂无数据！");
                }
              }
            }
          })
      },

    }
  }


</script>

<style scoped>
  body {
    background-color: #f7f7f7;
  }
  .nav {
    background-color: #fff;
  }
  .nav li {
    width: 16.6%;
  }
</style>


