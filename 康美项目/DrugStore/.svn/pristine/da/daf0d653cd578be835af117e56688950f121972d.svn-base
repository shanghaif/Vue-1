<template>
  <div class="box" v-cloak>
   <div v-if="PhysicalExam.length!=0"  class="exam_bg">
    <div class="yearList" v-for="item in PhysicalExam">
      <p v-html="item.Year"></p>
        <ul v-for="PhyExam in item.PhyExamList">
          <li v-on:click="toQueryUrl('exam-detail',{id:PhyExam.PhysicalExaminationID})">
            <h2>{{PhyExam.PhysicalExaminationTime | dataFormat("MM-dd")}}</h2>
            <div>
              <p v-html="PhyExam.Hospital"></p>
              
              <selectCode :kmcode="code" :kmvalue="PhyExam.DataSourceType"/>
            </div>
         </li>
        </ul>
     </div>
     <router-link to="/examDetail">
       <div class="reportBtn">手录报告</div>
     </router-link>
   </div>
    <div class="noRecord" v-else>
      <img src="../../assets/img/noRecord.png">
      <p>您还没有体检记录，请填写体检指标数据</p>
      <router-link to="/examDetail">
        <div class="reportBtn">手录报告</div>
      </router-link>
    </div>
  </div>
</template>

<script>
    import globalMixin from "../../mixins/global";
    import selectCode from "@/components/selectCode";
    export default {
      name: "examList",
      mixins: [globalMixin],
      components: { selectCode },
      data() {
        return {
          PhysicalExam:[],
          code:"M00.001"
        }
      },
      computed: {},
      watch: {},
      created() {
      },
      mounted() {
         this.GetPhysicalExamYearList();
      },
      methods: {
        GetPhysicalExamYearList(){
          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.GetPhysicalExamYearList))
            .then(function (res) {
               that.PhysicalExam=res.ReturnData;
            })
        }
      },
    }
</script>

<style scoped>
  .box{width:100%;}
  a{color:#111111}
.exam_bg{background:rgba(0,141,253,1);text-align:left;padding:0.5rem 0.4rem;min-height:93.6vh;height:100%;}
.yearList{margin-bottom:0.3rem}
  .yearList>p{color:#fff;font-size:0.5rem}
  .yearList>ul{background:#fff;border-radius: 6px;margin-top:0.3rem}
.yearList>ul>li{display:flex;display:-webkit-flex;width:90%;align-items: center;height:2rem;padding-left:0.4rem;padding-right:0.4rem}
.yearList>ul>li>h2{flex:1;font-size:1rem}
.yearList>ul>li>div{width:58%;}
.yearList>ul>li>div>p{font-size:0.4rem;line-height:0.7rem;overflow: hidden;text-align:right;
  white-space: nowrap;text-overflow:ellipsis}
.yearList>ul>li>div>span{font-size:0.32rem;display:block;text-align:right}
  .reportBtn{background-color:#fff;border-radius: 6px;width:100%;font-size:0.6rem;text-align:center;margin-top:0.4rem;line-height:1.5rem}
  .noRecord{width:90%;margin:0.8rem auto}
  .noRecord>img{width:4rem;height:2.5rem}
  .noRecord>p{font-size:0.5rem}
  .noRecord .reportBtn{background-color:#008dfd;color:#fff;margin-top:20%}
</style>
