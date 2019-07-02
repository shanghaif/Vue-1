<template>
  <div class="content-box smoking">
    <LifeHabitSelectionItem v-for="(item,index) in dataArr" :key="index" :itemData="item" :indexInList="index" v-on:listenToItem="itemEvent"></LifeHabitSelectionItem>

    <input type="submit" class="common-btn" value="保存" v-on:click="setPersonEatHabit" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import globalMixin from "../mixins/global";
  import LifeHabitSelectionItem from "./LifeHabitSelectionItem"
    export default {
      name: "EatingHabits",
      mixins: [globalMixin],
      data() {
        return {
          dataArr :[
            { "id_key":"CM33.014",
              "key":"WeeklyVegetables",
              "title":"您一周会有几天吃新鲜蔬菜?",
              "value":"-1"
            },
            { "id_key":"CM33.015",
              "key":"DailyVegetables",
              "title":"每天大概吃多少?(1碟蔬菜约150g)",
              "value":"-1"
            },
            { "id_key":"CM33.016",
              "key":"WeeklyFruit",
              "title":"您一周会有几天吃新鲜水果?",
              "value":"-1"
            },
            { "id_key":"CM33.017",
              "key":"DailyFruit",
              "title":"每天大概吃多少?",
              "value":"-1"
            },
            { "id_key":"CM33.018",
              "key":"WeeklyMeat",
              "title":"您一周会有几天吃禽/瘦肉?",
              "value":"-1"
            },
            { "id_key":"CM33.019",
              "key":"DailyMeat",
              "title":"每天大概吃多少?(1碟荤菜约100g)",
              "value":"-1"
            },
            { "id_key":"CM33.006",
              "key":"DailySalt",
              "title":"每天食盐摄入量?(1啤酒盖盐约6g)",
              "value":"-1"
            }
          ],
          LifeStyleID :"",
        }
      },
      computed: {
      },
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

                that.getPersonEatHabit();
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //获取饮食数据
        getPersonEatHabit() {
          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetPersonEatHabitApi))
            .then(function(res){
              if (res.IsSuccess === true) {
                let getData = res.ReturnData;

                that.LifeStyleID = getData.LifeStyleID;
                for (var i = 0; i < that.dataArr.length; i++) {
                  var itemData = that.dataArr[i];
                  let key = itemData.key;
                  if (getData[key] != null) {
                    itemData.value = getData[key];
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
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //提交饮食数据
        setPersonEatHabit() {
          let that = this;
          var upData = new Object();
          for(var i = 0, length1 = this.dataArr.length; i < length1; i++){
            let item = this.dataArr[i];
            let key = item.key;
            let value = item.value;
            if (value != -1) {
              upData[key] = value;
            }
          }
          if (Object.getOwnPropertyNames(upData).length <= 0) {
            this.errorDialogeShow('请至少选择一项'); return;
          }

          upData.LifeStyleID = this.LifeStyleID;
          that.$fetch(that.$common.getMobileUrl(that.$api.SavePersonEatHabitApi), { method: 'POST', body: JSON.stringify(upData)})
            .then(function(res){
              if (res.IsSuccess === true) {
                that.errorDialogeShow("保存成功");
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //选项点击事件
        itemEvent(indexInList,itemCode) {
          console.log('indexInList==' + indexInList);
          console.log('itemCode==' + itemCode);

        }

      }
    }
</script>

<style scoped>

</style>
