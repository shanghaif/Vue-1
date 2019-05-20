<template>
    <div class="content-box drinking" v-cloak>
      <h4>你饮酒吗？</h4>
      <ul class="drinkingSelect">
        <li v-on:click="selectStatus(0)" v-bind:class="{active:isActive ===0}">饮酒</li>
        <li v-on:click="selectStatus(1)" v-bind:class="{active:isActive ===1}">已戒酒</li>
        <li v-on:click="selectStatus(2)" v-bind:class="{active:isActive ===2}">从不饮酒</li>
      </ul>

      <div v-if="drinkInfo ===0">
        <h4>您平均每周喝几次酒？</h4>
        <ul class="drinkingSelect">
        <li v-bind:class="{active: WeeklyDrink == '1'}" v-on:click="selectList(1,'1')">1-2次</li>
        <li v-bind:class="{active: WeeklyDrink == '3'}" v-on:click="selectList(1,'3')">3-5次</li>
        <li v-bind:class="{active: WeeklyDrink == '6'}" v-on:click="selectList(1,'6')">>5次</li>
       </ul>
        <h4>您平均每次喝多少量？(只填写您常喝的酒类)</h4>
        <ul class="drinkInfo">
          <li class="clearfix">
            <p>白酒</p>
            <ul class="drinkingSelect">
              <li v-bind:class="{active: SpiritDailyDrink == '0.5'}" v-on:click="selectList(2,'0.5')">&lt;0.5两</li>
              <li v-bind:class="{active: SpiritDailyDrink == '0.8'}" v-on:click="selectList(2,'0.8')">0.5-1两</li>
              <li v-bind:class="{active: SpiritDailyDrink == '2'}" v-on:click="selectList(2,'2')">>1两</li>
            </ul>
          </li>
          <li class="clearfix">
            <p>黄酒</p>
            <ul class="drinkingSelect">
              <li v-bind:class="{active: YellowWineDailyDrink == '1'}" v-on:click="selectList(3,'1')">&lt;2两</li>
              <li v-bind:class="{active: YellowWineDailyDrink == '2'}" v-on:click="selectList(3,'2')">2-3两</li>
              <li v-bind:class="{active: YellowWineDailyDrink == '4'}" v-on:click="selectList(3,'4')">>3两</li>
            </ul>
          </li>
          <li class="clearfix">
            <p>红酒</p>
            <ul class="drinkingSelect">
              <li v-bind:class="{active: RedWineDailyDrink == '100'}" v-on:click="selectList(4,'100')">&lt;200ml</li>
              <li v-bind:class="{active: RedWineDailyDrink == '200'}" v-on:click="selectList(4,'200')">200-300ml</li>
              <li v-bind:class="{active: RedWineDailyDrink == '300'}" v-on:click="selectList(4,'300')">>300ml</li>
            </ul>
          </li>
          <li class="clearfix">
            <p>啤酒</p>
            <ul class="drinkingSelect">
              <li v-bind:class="{active: BeerDailyDrink == '250'}" v-on:click="selectList(5,'250')">&lt;500ml</li>
              <li v-bind:class="{active: BeerDailyDrink == '750'}" v-on:click="selectList(5,'750')">500-1000ml</li>
              <li v-bind:class="{active: BeerDailyDrink == '1000'}" v-on:click="selectList(5,'1000')">>1000ml</li>
            </ul>
          </li>
        </ul>
      </div>

      <input type="submit" class="common-btn" value="保存" v-on:click="setSavePersonDrink" />

    </div>
</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "Drinking",
      mixins: [globalMixin],
      data() {
        return {
          LifeStyleID: null,
          drinkInfo: null,
          isActive: null,
          WeeklyDrink: null,
          SpiritDailyDrink: null,
          BeerDailyDrink: null,
          RedWineDailyDrink: null,
          YellowWineDailyDrink: null,
          WeeklyDrink:null
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
        this.getSavePersonDrink();
      },
      methods: {
        selectStatus(i) {
          this.isActive = i;
          this.drinkInfo = i;
        },
        selectList(x,i) {
          switch (x) {
            case 1:
              this.WeeklyDrink = i;
              break;
            case 2:
              this.SpiritDailyDrink = i;
              break;
            case 3:
              this.YellowWineDailyDrink = i;
              break;
            case 4:
              this.RedWineDailyDrink = i;
              break;
            case 5:
              this.BeerDailyDrink = i;
              break;
          }
        },

        //获取饮酒数据
        getSavePersonDrink() {
          let that = this;
          that.$fetch(that.$common.getMobileUrl(that.$api.GetPersonDrinkApi))
            .then(function(res){
              if (res.IsSuccess === true) {
                let getData = res.ReturnData;

                that.drinkInfo = getData.IsDrink - 1;
                that.isActive = getData.IsDrink - 1;
                that.LifeStyleID = getData.LifeStyleID;
                if(that.isActive === 0) {
                  that.WeeklyDrink = getData.WeeklyDrink;
                  that.SpiritDailyDrink = getData.SpiritDailyDrink;
                  that.BeerDailyDrink = getData.BeerDailyDrink;
                  that.RedWineDailyDrink = getData.RedWineDailyDrink;
                  that.YellowWineDailyDrink = getData.YellowWineDailyDrink;
                }
              }
            })
            .catch(function(error){
              console.log(error);
              that.errorDialogeShow(error);
            });
        },

        //提交饮酒数据
        setSavePersonDrink() {
          let that = this;
          let upData = {
            LifeStyleID: null,
            IsDrink: null,
            RedWineDailyDrink: null,
            SpiritDailyDrink: null,
            WeeklyDrink:null,
            YellowWineDailyDrink: null,
            BeerDailyDrink: null,
            OtherDrinkName: null,
          };
          if(that.isActive === 0) {
            upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 1,WeeklyDrink:that.WeeklyDrink,RedWineDailyDrink: that.RedWineDailyDrink, SpiritDailyDrink: that.SpiritDailyDrink, YellowWineDailyDrink: that.YellowWineDailyDrink,BeerDailyDrink: that.BeerDailyDrink});
          }
          if(that.isActive === 1) {
            upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 2});
          }
          if(that.isActive === 2) {
            upData = Object.assign({}, upData,{ LifeStyleID: that.LifeStyleID, IsDrink: 3});
          }
          console.log(upData);

          that.$fetch(that.$common.getMobileUrl(that.$api.SavePersonDrinkApi), { method: 'POST', body: JSON.stringify(upData)})
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
      }
    }
</script>

<style scoped>

</style>
