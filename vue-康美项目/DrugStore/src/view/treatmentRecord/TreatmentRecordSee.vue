<template>
    <div>
      <div class="fontSize28">
        <ul class="ul_flex">
          <li>
            <h2>订单号</h2>
            <p>{{ReturnData.OutpatientNum}}</p>
          </li>
          <li>
            <h2>问诊时间</h2>
            <p>{{ReturnData.VisitingTime|dataFormat("yyyy-MM-dd")}}</p>
          </li>
          <li>
            <h2>接诊医生</h2>
            <p>{{ReturnData.Doctor}}</p>
          </li>
          <li>
            <h2>药品过敏</h2>
            <p>
              <label style="padding-right:0.3rem">
               <input name="No" type="radio" value="0" style="padding-right:0.2rem;vertical-align:middle" v-model="ReturnData.DrugAllergy" />无
             </label>
              <label>
                <input name="Yes" type="radio" value="1" style="padding-right:0.2rem;vertical-align:middle" v-model="ReturnData.DrugAllergy" />有
              </label>
            </p>
          </li>
        </ul>
        <div class="textarea_flex">
          <div> <h2>过敏信息</h2> <p> <textarea rows="2">{{ReturnData.DrugAllergyHistory}}</textarea></p></div>
          <div> <h2>病情描述</h2> <p> <textarea rows="2">{{ReturnData.Diseases}}</textarea></p></div>
          <div> <h2>现病史</h2> <p> <textarea rows="2">{{ReturnData.DiseasesHistory}}</textarea></p></div>
          <div> <h2>初步诊断</h2> <p> <textarea rows="2">{{ReturnData.Opinion}}</textarea></p></div>
        </div>
        <div class="seeList">
          <ul>
            <li v-for="item in ReturnData.PrescriptionList"  v-on:click="toQueryUrl('prescription-detailed',{id:item.PrescriptionID})">
              <h4>{{item.RecipeDate|dataFormat("yyyy-MM-dd")}}</h4>
              <p>处方</p>
              <span>&gt</span>
            </li>
            
        </ul>
      </div>

      </div>
      </div>
</template>

<script>
  import globalMixin from "../../mixins/global";
    export default {
      name: "TreatmentRecordSee",
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
        this.getData();
      },
      methods: {
          getData(){
            let that=this;
            var id=this.$common.getQueryVariable('id');
            return that.$fetch(that.$common.getMobileUrl(that.$api.GetTreatmentRecordApi+"?id="+id))
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
