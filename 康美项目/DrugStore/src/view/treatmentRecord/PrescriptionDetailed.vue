<template>
    <div v-cloak>
      <div class="list" ref="topInfo">
        <div class="item">
          <div class="titleCf"> <h1 class="fontSize40">康美网络医院（康美医院）处方笺</h1></div>
          <table class="fontSize28 table_content">
            <tr>
              <td colspan="2">处方编号：<span>{{Data.RecipeFileID}}</span></td>
              <td>科室：<span>{{Data.DepartmentName}}</span></td>
            </tr>
            <tr>
              <td> 姓名：<span>{{Data.MemberName}}</span></td>
              <td>性别：
                <span v-if="Data.Gender==0">男</span>
                <span v-if="Data.Gender==1">女</span>
                <span v-if="Data.Gender==2">未知</span>
              </td>
              <td>年龄：<span>{{Data.Age}}</span></td>
            </tr>
            <tr>
              <td> 电话：<span>{{Data.Mobile}}</span></td>
            </tr>
            <tr>
              <td colspan="3"> 住址：<span>{{Data.Address}}</span></td>
            </tr>
            <tr>
              <td colspan="3"> 初步诊断：<span>{{Data.Diagnos}}</span></td>
            </tr>
            <tr>
              <td> 过敏史：<span>{{Data.AllergicRemark}}</span></td>
              <td colspan="2"> 开方日期：<span>{{Data.RecipeDate|dataFormat("yyyy-MM-dd")}}</span></td>
            </tr>
          </table>
          <h2 class="prescription_h2">RP</h2>
          
          <div class="drugs" v-for="(item,index) in Data.DrugList" v-if="Data.RecipeType==1">
            <h3 class="fontSize28">{{index+1}}.{{item.DrugName}}({{item.FootNote}}) {{item.EachDose}}{{item.UsageUnit}}</h3>
            <p class="fontSize28">剂数：{{item.TCMQuantity}}剂</p>
            <p class="fontSize28">制法：{{item.BoilWayTitle}}</p>
            <p class="fontSize28">用法：{{item.DecoctDesc}}，每日{{item.FreqTimes}}剂, 分{{item.Times}} 次服</p>
          </div>

          <div class="drugs" v-for="(item,index) in Data.DrugList" v-if="Data.RecipeType==2">
            <h3 class="fontSize28">{{index+1}}.{{item.DrugName}}</h3>
            <p class="fontSize28">{{item.Standard}}</p>
            <p class="fontSize28">用法Sig：{{item.EachDose}}{{item.UsageUnit}} {{item.DrugRouteName}} {{item.PerDayTimes}} </p>
          </div>

          <div class="blank fontSize28" ref="blank">以下空白</div>
        </div>
        <div class="doctor" ref="doctor">
          <table>
            <tr>
              <td width="50%" class="fontSize28">医生：<span>{{Data.DoctorName}}</span></td>
              <td class="fontSize28">审核医师：<span>{{Data.PharmacistExamine}}</span></td>
            </tr>
            <tr>
              <td class="fontSize28">调配医师/士：<span>{{Data.PharmacistAllocate}}</span></td>
              <td class="fontSize28">核对、发药药师：<span>{{Data.PharmacistApproveAndIssue}}</span></td>
            </tr>
          </table>
          <p>注：1.本处方针对患者本次问诊有效，限制本人使用；2.请尊医嘱服用。</p>
        </div>
      </div>

    </div>
</template>

<script>
  import globalMixin from "../../mixins/global";
    export default {
      name: "PrescriptionDetailed",
      mixins: [globalMixin],
      data() {
        return {
          Data:{}
        }
      },
      computed: {},
      watch: {},
      created() {

      },
      mounted() {
        this.getData();
        this.getHeight();
      },
      methods: {
        getHeight(){
          let orderH=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//获取屏幕高度
          let topInfo=this.$refs.topInfo.offsetHeight;
          let h=this.$refs.doctor.offsetHeight;
          this.$refs.doctor.style.marginTop=orderH-(topInfo+h)+'px';
          console.log(topInfo);
        },
        getData(){
            let that=this;
            var id=this.$common.getQueryVariable('id');
            return that.$fetch(that.$common.getMobileUrl(that.$api.GetPrescriptionApi+"?id="+id))
            .then(function(res){
             if(res.ReturnData)
             {
               that.Data=res.ReturnData;
             }
          })
        }

      },
    }
</script>

<style scoped>

</style>
