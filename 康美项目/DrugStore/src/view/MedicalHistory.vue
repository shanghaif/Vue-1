<template>
  <div class="content-box smoking">
    <h5>疾病史<span>（含现病史和既往病史）</span></h5>
    <ul class="drinkingSelect"  id="mSelectList">
      <li id="0">无</li>
      <li v-for="item in diseaseList" v-bind:id="item.HealthTypeID">{{item.HealthTypeName}}</li>
    </ul>

    <textarea class="textarea" placeholder="可输入其他疾病，多个疾病用逗号隔开" v-model="UserDeseaseRemark"></textarea>

    <input type="submit" class="common-btn" value="保存" v-on:click="setPersonDeseaseData" />
  </div>
</template>

<script>
  import globalMixin from "../mixins/global";
  export default {
    name: "MedicalHistory",
    mixins: [globalMixin],
    data() {
      return {
        diseaseList: {},
        UserDeseaseRemark:"",
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
        this.mSelectList();
      });
    },
    methods: {
      mSelectList() {
        $("#mSelectList li").on("click",function () {
          let that = $(this);
          if(that.hasClass("active")) {
            that.removeClass("active");
            if(that.html() === "无") {
              that.siblings().removeClass("active").removeAttr("disabled");
            }
            if(that.html() === "高血压") {
              $("#gxy").hide();
            }
            if(that.html() === "糖尿病") {
              $("#diabetesBox").hide();
            }
          }
          else {
            if(that.attr("disabled") !== "disabled") {
              if(that.html() === "无") {
                that.siblings().removeClass("active").attr("disabled","disabled");
                $("#drinkingSelect li").removeClass("active");
                $("#diabetes li").removeClass("active");
                $("#gxy").hide();
                $("#diabetesBox").hide();
              }
              that.addClass("active");
              if(that.html() === "高血压") {
                $("#gxy").show();
              }
              if(that.html() === "糖尿病") {
                $("#diabetesBox").show();
              }
            }
          }
        });
      },

      //获取数据
      getData() {
        let that = this;
        return that.$fetch(that.$common.getMobileUrl(that.$api.HealthTypeApi))
          .then(function(res){
            if (res.IsSuccess === true) {
              that.diseaseList = res.ReturnData;
              that.$fetch(that.$common.getMobileUrl(that.$api.PersonDesease))
                  .then(function (r) {
                      if (r.IsSuccess == true) {
                          var data = r.ReturnData;
                          $(data.HealthCategoryIDs).each(function (i, n) {
                              $("#mSelectList").find("li[id='" + n + "']").addClass("active");
                          });
                          that.UserDeseaseRemark = data.UserDeseaseRemark;
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
      setPersonDeseaseData() {
        var ids = [];
        $("#mSelectList .active").each(function () {
            ids.push($(this).attr("id"));
        });

        let that = this;

        let upData={
          UserDeseaseRemark: that.UserDeseaseRemark,
          HealthCategoryIDs: ids,
        };
        return that.$fetch(that.$common.getMobileUrl(that.$api.PersonDesease), { method: 'POST', body: JSON.stringify(upData)})
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

</style>
