<template>
  <div class="content-box">
    <h5>家族病史<span> 您的父母亲、兄弟姐妹、祖父母是否患有以下疾病?</span></h5>
    <ul class="selections_ul" id="fSelectList">
      <li id="0">无</li>
      <li v-for="(item,index) in diseaseList" v-bind:id="item.HealthTypeID" :key="index">{{item.HealthTypeName}}</li>
    </ul>

    <div id="gxyBox" class="switchItemBox" style="display: none">
      <h4>是否父母都有高血压史？</h4>
      <ul class="switch_ul" id="gxy_ul">
        <li>是</li>
        <li>否</li>
      </ul>
    </div>

    <div id="diabetesBox" class="switchItemBox" style="display: none">
      <h4>是否父母都有糖尿病史？</h4>
      <ul class="switch_ul" id="diabetes_ul">
        <li>是</li>
        <li>否</li>
      </ul>
    </div>

    <div style="height: 5px;"></div>
    <h5>疾病史<span> 您是否有以下疾病?</span></h5>
    <ul class="selections_ul" id="dSelectList">
      <li id="0">无</li>
      <li v-for="(item,idx) in diseaseList" v-bind:id="item.HealthTypeID" :key="idx">{{item.HealthTypeName}}</li>
    </ul>

    <input type="submit" class="common-btn" value="保存" v-on:click="setFamiliyData" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import globalMixin from "../mixins/global";
    export default {
    name: "HealthHistory",
    mixins: [globalMixin],
    data() {
      return {
        diseaseList: {},
        BothDiabetes: false,
        BothHypertensive: false,
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
      this.getData().then(()=> {
        this.fSelectList();
        this.dSelectList();
        this.selectList();
      });
    },
    methods: {

      //家庭病史
      fSelectList() {
        $("#fSelectList").delegate("li","click",function(event){
          var that = $(event.target);
          if(that.hasClass("active")) {
            that.removeClass("active");
            if(that.html() === "无") {
              that.siblings().removeClass("active").removeAttr("disabled");
            }
            if(that.html() === "高血压") {
              $("#gxyBox").hide();
            }
            if(that.html() === "糖尿病") {
              $("#diabetesBox").hide();
            }
          }
          else if(that.html() === "无") { 
            if ($("#fSelectList #0").hasClass("active")){
              return;
            }
            else if(that.attr("disabled") !== "disabled") {
              if(that.html() === "无") {
                that.siblings().removeClass("active").attr("disabled","disabled");
                $("#gxy_ul li").removeClass("active");
                $("#diabetes_ul li").removeClass("active");
                $("#gxyBox").hide();
                $("#diabetesBox").hide();
              }
              that.addClass("active");
              if(that.html() === "高血压") {
                $("#gxyBox").show();
              }
              if(that.html() === "糖尿病") {
                $("#diabetesBox").show();
              }
            }
          }else {
               $("#fSelectList #0").removeClass("active").removeAttr("disabled");
               that.addClass("active");
               if(that.html() === "高血压") {
                  $("#gxyBox").show();
               }
               if(that.html() === "糖尿病") {
                  $("#diabetesBox").show();
               }
          }
        });
      },

      //个人病史
      dSelectList() {
        $("#dSelectList").delegate("li","click",function(event){ 
          let that = $(event.target);
          if(that.hasClass("active")) {
            that.removeClass("active");
            if(that.html() === "无") {
              that.siblings().removeClass("active").removeAttr("disabled");
            }
          }
          else if(that.html() === "无") { 
            if ($("#dSelectList #0").hasClass("active")){
              return;
            }
            else if(that.attr("disabled") !== "disabled") {
              if(that.html() === "无") {
                that.siblings().removeClass("active").attr("disabled","disabled");
              }
              that.addClass("active");
            }
          }else{
               $("#dSelectList #0").removeClass("active").removeAttr("disabled");
               that.addClass("active");
          }
        });
      },


      //家庭高血压、糖尿病单选
      selectList() {
        let that = this;
        $("#gxy_ul li").on("click",function () {
          if($(this).html() === "是") {
            that.BothHypertensive = true;
          }
          else {
            that.BothHypertensive = false;
          }
          $(this).addClass("active").siblings().removeClass("active");
        });
        $("#diabetes_ul li").on("click",function () {
          if($(this).html() === "是") {
            that.BothDiabetes = true;
          }else {
            that.BothDiabetes = false;
          }
          // that.BothDiabetes = $(this).html() === "是";
          $(this).addClass("active").siblings().removeClass("active");
        });
      },


      //获取数据
      getData() {
        let that = this;
        return that.$fetch(that.$common.getMobileUrl(that.$api.HealthTypeApi))
          .then(function(res){
            if (res.IsSuccess === true) {
              that.diseaseList = res.ReturnData;
              that.$fetch(that.$common.getMobileUrl(that.$api.HealthHistoryApi))
              .then(function (r) {

                  if (r.IsSuccess == true) {
                      var data = r.ReturnData;
                      $(data.FHealthCategoryIDs).each(function (i, n) {
                          $("#fSelectList").find("li[id='" + n + "']").addClass("active");
                      });
                      $(data.DHealthCategoryIDs).each(function (i, n) {
                          $("#dSelectList").find("li[id='" + n + "']").addClass("active");
                      });

                      var li_t = $("#fSelectList :contains('糖尿病')");
                      if (li_t.attr("class") == "active") {
                          $("#diabetesBox").show();
                      }
                      var li_g = $("#fSelectList :contains('高血压')");
                      if (li_g.attr("class") == "active") {
                          $("#gxyBox").show();
                      }

                      //是否父母都有糖尿病史 true：是，false 否
                      that.BothDiabetes = data.BothDiabetes;
                      if (that.BothDiabetes) {
                          $("#diabetes_ul :contains('是')").addClass("active");
                      } else if (that.BothDiabetes === false) {
                          $("#diabetes_ul :contains('否')").addClass("active");
                      }

                      //是否父母都有高血压史 true：是，false 否
                      that.BothHypertensive = data.BothHypertensive;
                      if (that.BothHypertensive) {
                          $("#gxyBox :contains('是')").addClass("active");
                      } else if (that.BothHypertensive === false) {
                          $("#gxyBox :contains('否')").addClass("active");
                      }

                  }
              })
            }
          })
          .catch(function(error){
            console.log(error);
            that.errorDialogeShow(error);
          });
      },

      //提交家族数据
      setFamiliyData() {
          var fIDs = [], dIDs = [];
        $("#fSelectList .active").each(function () {
            fIDs.push($(this).attr("id"));
        });
        $("#dSelectList .active").each(function () {
            dIDs.push($(this).attr("id"));
        });

        let that = this;

        let upData={
          BothDiabetes: that.BothDiabetes,
          BothHypertensive: that.BothHypertensive,
          FHealthCategoryIDs: fIDs,
          DHealthCategoryIDs: dIDs,
        };
        that.$fetch(that.$common.getMobileUrl(that.$api.HealthHistoryApi), { method: 'POST', body: JSON.stringify(upData)})
          .then(function(res){
            if (res.IsSuccess === true) {
                that.errorDialogeShow("保存成功！");
            }
          })
          .catch(function(error){
            console.log(error);
            that.errorDialogeShow(error);
          });
      },

    }
}
</script>

<style scoped>
div {
  width: 92%;
  margin: 0 auto;
  padding-top: 0.2rem;
}
div h4 {
  font-size: 0.4rem;
  color: #666;
  text-align: left;
  line-height: 0.6rem;
  font-weight: normal;
  display: inline-block;
  vertical-align: middle;
}

.switchItemBox {
  margin-left: -30px;
  height: 36px;
  padding-top: 0.1rem;
}

#gxyBox {
  margin-top: -10px;
}

.selections_ul {
  margin: 0;
  text-align: left;
  font-size: 0;
}
.switch_ul {
  margin: 0;
  text-align: left;
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
}

li {
  display: inline-block;
  padding: 0 0.25rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #888;
  border: solid 1px #d5d5d5;
  text-align: center;
  font-size: 0.3733333333333333rem;
  border-radius: 0.4rem;
  position: relative;
  margin: 0.2rem 0.2rem 0.15rem 0;
  cursor: pointer;
}
li:last-child {
  margin-right: 0;
}
li.active {
  border: solid 1px #008dfd;
  color: #008dfd;
}
li.active:before {
  content: '';
  width: 0.32rem;
  height: 0.32rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
  background-color: #008dfd;
  border-radius: 50%;
}
li.active:after {
  content: '';
  width: 0.2133333333333333rem;
  height: 0.1066666666666667rem;
  position: absolute;
  top: 1px;
  right: 1px;
  opacity: 1;
  border: 1px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}


</style>
