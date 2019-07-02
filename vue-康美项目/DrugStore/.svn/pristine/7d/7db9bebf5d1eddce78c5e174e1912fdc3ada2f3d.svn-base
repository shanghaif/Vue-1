<template>
  <div class="content-box smoking">
    <LifeHabitSelectionItem v-for="(item,index) in dataArr" :key="index" :itemData="item" :indexInList="index" :maxItems="index==dataArr.length-1 ? 3 : 1" v-on:listenToItem="itemEvent"></LifeHabitSelectionItem>
    
    <input type="submit" class="common-btn" value="保存" v-on:click="setPersonSport"/>

  </div>
</template>

<script>
  import Vue from 'vue'
  import globalMixin from "../mixins/global";
  import LifeHabitSelectionItem from "./LifeHabitSelectionItem"

  export default {
    name: "Labor",
    mixins: [globalMixin],
    data() {
      return {
        dataArr :[
            { "id_key":"CM33.003",
              "key":"IsExercise",
              "title":"您的工作性质是?",
              "value":"-1"
            },
            { "id_key":"CM33.11",
              "key":"WeeklyExercise",
              "title":"您每周锻炼次数?",
              "value":"-1"
            },
            { "id_key":"CM33.12",
              "key":"ExerciseMinutes",
              "title":"平均每次锻炼时间?",
              "value":"-1"
            },
            { "id_key":"CM33.005",
              "key":"ExerciseState",
              "title":"您锻炼的自我感觉是?",
              "value":"-1"
            },
            { "id_key":"SportTemplate",
              "key":"SportTemplate",
              "title":"您经常进行的3种运动项目是?",
              "value":[]
            },
          ],
          LifeStyleID :"",
          exerciseModeArr :[], //经常进行的<=3项运动
        SportTemplates:[],
      }
    },
    computed: {},
    components: {
        LifeHabitSelectionItem
      },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
      this.loadSelectionData();
    },
    computed:{
    },
    methods: {

      //根据指定id获取题目
        loadSelectionData(){
          let that = this;
          let upData = new Array();
          that.dataArr.forEach(function (value,i) {
            upData.push(value.id_key);
          });

          return that.$fetch(that.$common.getMobileUrl(that.$api.GetLifeHabitSelectionItemsAPI),{ method: 'POST', body: JSON.stringify({"ItemTypes":upData})})
            .then(function(res){
              if (res.IsSuccess === true) {
                let getData = res.ReturnData;
                for (var i = 0; i < that.dataArr.length; i++) {
                  var itemData = that.dataArr[i];
                  let idKey = itemData.id_key;
                  that.dataArr[i].answer = getData[idKey];
                }

                that.getPersonSport();
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

      //获取运动数据
      getPersonSport() {
        let that = this;
        return that.$fetch(that.$common.getMobileUrl(that.$api.GetPersonSportApi))
          .then(function (res) {
            if (res.IsSuccess === true) {
              let getData = res.ReturnData;

              that.LifeStyleID = getData.LifeStyleID;
              for (var i = 0; i < that.dataArr.length; i++) {
                var itemData = that.dataArr[i];

                if (i < that.dataArr.length-1) {
                  let key = itemData.key;
                  if (getData[key] != null) {
                    itemData.value = getData[key];
                  }
                }else{
                  var exerciseModeValueArr = new Array();
                  let value = getData.ExerciseMode;
                  let value2 = getData.ExerciseMode2;
                  let value3 = getData.ExerciseMode3;
                  if (value != null) { exerciseModeValueArr.push(value+''); }
                  if (value2 != null) { exerciseModeValueArr.push(value2+''); }
                  if (value3 != null) { exerciseModeValueArr.push(value3+''); }
                  itemData.value = exerciseModeValueArr;
                }

                Vue.set(that.dataArr,i,{
                  "id_key":itemData.id_key,
                  "key":itemData.key,
                  "title":itemData.title,
                  "value":itemData.value,
                  "answer":itemData.answer
                });
                
              }
            }
          })
      },

      //提交运动数据
      setPersonSport() {
        let that = this;
        var upData = new Object();
        for(var i = 0, length1 = this.dataArr.length; i < length1-1; i++){
          let item = this.dataArr[i];
          let key = item.key;
          let value = item.value;
          if (value != -1) {
            upData[key] = value;
          }
        }
        //经常进行的3种运动项目
        let lastItemData = this.dataArr[this.dataArr.length-1];
        let valueArr = lastItemData.value;
        let exerciseModeTitleArr = ["ExerciseMode","ExerciseMode2","ExerciseMode3"];
        for(var i = 0, length1 = valueArr.length; i < length1; i++){
          let key = exerciseModeTitleArr[i];
          upData[key] = valueArr[i];
        }

        if (Object.getOwnPropertyNames(upData).length <= 0) {
          this.errorDialogeShow('请至少选择一项'); return;
        }

        upData.LifeStyleID = this.LifeStyleID;
        that.$fetch(that.$common.getMobileUrl(that.$api.SavePersonSportApi), {
          method: 'POST',
          body: JSON.stringify(upData)
        })
          .then(function (res) {
            if (res.IsSuccess === true) {
              that.errorDialogeShow("保存成功！");
            }
          })
      },

      //选项点击事件
        itemEvent(indexInList,itemCode) {
          console.log('indexInList==' + indexInList);
          console.log('itemCode==' + itemCode);

        }

      // //获取运动模板
      // getSportTemplate(){
      //     let that = this;
      //     that.$fetch(that.$common.getMobileUrl(that.$api.GetSportTemplateApi))
      //       .then(function(res){
      //         if (res.IsSuccess) {
      //           let getdata = res.Data;
      //           let arr = [];
      //            $.each(getdata, function (i, d) {
      //                 arr.push({
      //                     name: d.SportName,
      //                     value: d.SportTemplateID
      //                 });
      //             });
      //             that.SportTemplates = arr;
      //         }
      //       })
      //       .catch(function(error){
      //         console.log(error);
      //         that.errorDialogeShow(error);
      //       });
      // },
    }
  }
</script>

<style scoped>
  .pc-box {
    width: 4.44rem;
    text-align: right;
    float: right;
    font-size: 0.4rem;
    height: 0.7733333333333333rem;
    line-height: 0.7733333333333333rem;
    border: solid 1px #d5d5d5;
    outline: none;
    border-radius: 4px;
    color: #333;
  }
</style>
