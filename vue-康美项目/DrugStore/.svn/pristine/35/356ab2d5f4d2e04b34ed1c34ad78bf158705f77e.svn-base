<template>
    <div class="content-box" v-cloak>
      <LifeHabitSelectionItem v-for="(item,index) in dataArr" :key="index" :itemData="item" :indexInList="index" v-on:listenToItem="itemEvent"></LifeHabitSelectionItem>

      <input type="submit" class="common-btn" value="保存" v-on:click="setSavePersonDrink" />

    </div>
</template>

<script>
  import Vue from 'vue'
  import globalMixin from "../mixins/global";
  import LifeHabitSelectionItem from "./LifeHabitSelectionItem"    
  export default {
      name: "drinkingSmoking",
      mixins: [globalMixin],
      data() {
        return {
          dataArr :[
            { "id_key":"CM37.15",
              "key":"IsSmoking",
              "title":"你吸烟吗?",
              "value":"-1"
            },
            { "id_key":"CM33.002",
              "key":"IsDrink",
              "title":"您饮酒吗?",
              "value":"-1"
            },
            { "id_key":"CM33.13",
              "key":"WeeklyDrink",
              "title":"您平均每周喝几次酒?",
              "value":"-1"
            },
            { "id_key":"CM37.11",
              "key":"SpiritDailyDrink",
              "title":"您平均每次喝多少量？(只填写您常喝的酒类)",
              "stitle":"白酒",
              "value":"-1"
            },
            { "id_key":"CM37.12",
              "key":"YellowWineDailyDrink",
              "stitle":"黄酒",
              "value":"-1"
            },
            { "id_key":"CM37.13",
              "key":"RedWineDailyDrink",
              "stitle":"红酒",
              "value":"-1"
            },
            { "id_key":"CM37.14",
              "key":"BeerDailyDrink",
              "stitle":"啤酒",
              "value":"-1"
            }
          ],
          LifeStyleID :"",
          tempDataArr:[],
        }
      },
      computed: {
      },
      components: {
        LifeHabitSelectionItem
      },
      watch: {
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

                that.getSavePersonDrink();
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //获取吸烟饮酒数据
        getSavePersonDrink() {
          let that = this;
          that.$fetch(that.$common.getMobileUrl(that.$api.GetPersonDrinkSmokingApi))
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
                    "stitle":itemData.stitle,
                    "value":itemData.value,
                    "answer":itemData.answer
                  });

                  that.tempDataArr = that.dataArr.slice(0, 7);
                }

                //从不饮酒、已戒酒、未选择
                if (parseInt(that.dataArr[1].value) > 1 || parseInt(that.dataArr[1].value) <= -1) {
                  that.dataArr.splice(2, 5);
                  //alert('message?: DOMString');
                }
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //提交吸烟饮酒数据
        setSavePersonDrink() {
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
          that.$fetch(that.$common.getMobileUrl(that.$api.SavePersonDrinkSmokingApi), { method: 'POST', body: JSON.stringify(upData)})
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
          // console.log('indexInList==' + indexInList);
          // console.log('itemCode==' + itemCode);
          //选择从不饮酒或者已戒酒
          if (indexInList == 1 && (itemCode == 2 || itemCode == 3)) {
            //修改dataArr数据
            this.dataArr.splice(2, 5);
          }else if (indexInList == 1 && itemCode != 3) {
            this.dataArr = this.tempDataArr.slice(0, 7);
          }

        }
      }
    }
</script>

<style scoped>

</style>
