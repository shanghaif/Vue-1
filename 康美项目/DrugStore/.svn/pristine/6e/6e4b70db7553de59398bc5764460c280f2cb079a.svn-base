<template>
    <div class="content-box">
      <div class="index-banner"><img src="../assets/img/banner.jpg" /></div>

      <table class="index-list">
        <tr >
          <td rowspan="2">
            <router-link :to="{name:'health-notes'}">
              <img src="../assets/img/icon-index-j.jpg" />
              <h5>健康记录</h5>
              <p>随时查看指标趋势</p>
            </router-link>
          </td>
          <td>
            <router-link :to="{name:'report'}">
              <h5>健康评估</h5>
              <p>了解自身健康问题</p>
              <img src="../assets/img/icon-index-b.jpg" />
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <router-link :to="{name:''}">
              <h5>在线问诊</h5>
              <p>有问必答<br/>为您排忧解难</p>
              <img src="../assets/img/icon-index-z.jpg" />
            </router-link>
          </td>
        </tr>
      </table>

      <div class="complete">
        <router-link :to="{name:'health-file'}">
          <img src="../assets/img/icon-index-bag.jpg" />
          <img src="../assets/img/index-text.jpg" />
          <div class="time-graph">
            <canvas id="time-graph-canvas" width="160" height="160"></canvas>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "Index",
      mixins: [globalMixin],
      data() {
        return {
          complete: null,
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
        this.$common.getToken().then(val => {
          if(val){
            this.getComplete().then(()=> {
              this.makePercent(this.complete);
            });
          }
        });

      },
      methods: {
        makePercent(val) {
          let time_canvas = document.getElementById("time-graph-canvas");
          this.$common.drawMain(time_canvas, val, "#008dfd", "#eef7e4");
        },

        getComplete() {
          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetWeChatPersonCompleteApi))
            .then(function(res){
              if (res.IsSuccess === true) {
                that.complete = res.ReturnData.DataIntegrity;
              }
            })
        },

      }
    }
</script>

<style scoped>

</style>
