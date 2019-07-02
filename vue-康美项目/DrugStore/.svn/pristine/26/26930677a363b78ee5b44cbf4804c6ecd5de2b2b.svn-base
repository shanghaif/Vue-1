<template>
    <div>
      <p v-if="ReturnData.length==0" style="font-size:15px">暂无数据</p>
      <table class="treatmentList" v-if="ReturnData.length>0">
         <tr v-for="item in ReturnData">
          <td>
            <h3>问诊记录时间</h3>
            <p>{{item.VisitingTime|dataFormat("yyyy-MM-dd")}}</p>
          </td>
          <td>
            <div class="btn" v-on:click="toQueryUrl('treatment-record-see',{id:item.TreatmentRecordID})">查&nbsp;看</div>
          </td>
        </tr>
        
      </table>
    </div>
</template>

<script>
  import globalMixin from "../../mixins/global";
    export default {
      name: "TreatmentRecordList",
      mixins: [globalMixin],
      data() {
        return {
          ReturnData:{}
        }
      },
      computed: {},
      watch: {},
      created() {
      },
      mounted() {
        this.$common.getNewToken().then((token)=>{
          this.$common.getToken().then(t => {
            if(t){
              this.getData();
            }
          });
        });
      },
      methods: {
        getData(){
          let that=this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetTreatmentRecordListApi))
          .then(function(res){
            if(res.ReturnData){
              that.ReturnData=res.ReturnData;
            }
          })
        }
      },
    }
</script>

<style scoped>

</style>
