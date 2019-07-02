<template>
    <div>
      <ul class="living-habit">
        <li class="row-background" v-for="item in liveData"  v-on:click="toUrl(item.to)" >
          <div class="ul-center">
            <ul>
              <li class="li01"><img v-bind:src="item.img" class="listImg"></li>
              <li class="li02">
                <div class="centerStyle">
                  <div class="lileft" v-html="item.text"></div>
                  <div class="liright" v-html="item.percent"></div>
                  <div class="completion-bar">
                    <div class="bar-grad1" v-bind:style="{width:item.percent + '%'}"></div>
                  </div>
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
      name: "LivingHabit",
      mixins: [globalMixin],
      data() {
        return {
          liveData: {
            "0": {
              text:"饮食习惯",
              img: require("../assets/img/life1@2x.png"),
              percent: "",
              to: "/eatingHabits"
            },
            "1": {
              text:"体力活动与运动",
              img: require("../assets/img/life2@2x.png"),
              percent: "",
              to: "/labor"
            },
            "2": {
              text:"吸烟饮酒",
              img: require("../assets/img/life3@2x.png"),
              percent: "",
              to: "/Drinking&Smoking"
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
        this.getLivingHabit();
      },
      methods: {
        getLivingHabit() {
          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetLifeComplete))
            .then(function(res){
              that.liveData[0].percent = res.ReturnData.Diet;
              that.liveData[1].percent = res.ReturnData.Motion;
              that.liveData[2].percent = res.ReturnData.SmokeDrink;
            });
        }
      }
    }
</script>

<style scoped>

</style>
