<template>
  <div class="exam_input"  v-cloak>
     <div class="inputList1">
       <ul>
         <li><span class="red">*</span>体检机构<input v-model="Data.Hospital" type="text"/></li>
         <li><span class="red">*</span>体检日期<date-picker class="data-input" @showTime="showTime" :data-time="Data.PhysicalExaminationTime"/></li>
         <li><span class="red">*</span>总检医生<input type="text" v-model="Data.DoctorName"/></li>
       </ul>
     </div>
    <h2>主要指标识别</h2>
    <div class="inputList1 inputList2">
      <ul>
        <li><div>身高</div><input type="text" v-model="Data.Height"/><label>cm</label></li>
        <li><div>体重</div><input type="text" v-model="Data.Weight"/><label>kg</label></li>
        <li><div>腰围</div><input type="text" v-model="Data.Waist"/><label>cm</label></li>
        <li><div>心率</div><input type="text" v-model="Data.HeartRate"/><label>次/分</label></li>
        <li><div>收缩压(高压)</div><input type="text" v-model="Data.SystolicPressure"/><label>mmHg</label></li>
        <li><div>舒张压(低压)</div><input type="text" v-model="Data.DiastolicPressure"/><label>mmHg</label></li>
        <li><div>空腹血糖(GLU)</div><input type="text" v-model="Data.GLU"/><label>mmol/L</label></li>
        <li><div>总胆固醇(TC)</div><input type="text" v-model="Data.TC"/><label>mmol/L</label></li>
        <li><div>甘油三酯(TG)</div><input type="text" v-model="Data.TG"/><label>mmol/L</label></li>
        <li><div>高密度脂蛋白<br/>(HDL)</div><input type="text" v-model="Data.HDL"/><label>mmol/L</label></li>
        <li><div>低密度脂蛋白<br/>(LDL)</div><input type="text" v-model="Data.LDL"/><label>mmol/L</label></li>
      </ul>
    </div>
    <button id="new_yan" @click="save()" class="saveBtn" :disabled="isDisableFn">保存</button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import DatePicker from '../../components/dataPicker'
    export default {
      name: "examDetail",
      components: { DatePicker },
      data(){
        return{
          isDisable:true,
          Data:{
            PhysicalExaminationID:0,
            Hospital:null,
            PhysicalExaminationTime:null,
            DoctorName:null,
            Height:null,
            Weight:null,
            Waist:null,
            HeartRate:null,
            SystolicPressure:null,
            DiastolicPressure:null,
            GLU:null,
            TC:null,
            TG:null,
            HDL:null,
            LDL:null
          }

        }
      },
      computed:{
        isDisableFn(){
          if(!this.Data.Hospital||!this.Data.PhysicalExaminationTime || !this.Data.DoctorName){
            return this.isDisable=true
          }else{
            return this.isDisable=false
          }
        }
      },
      mounted(){
        this.Data.PhysicalExaminationID = this.$common.getQueryVariable('id') || 0;
        if( this.Data.PhysicalExaminationID >0){
          this.get();
        }
      },
      methods: {
        showTime(time) {
          this.Data.PhysicalExaminationTime=time
        },
        get(){
          let that = this;
          return that.$fetch(that.$common.getMobileUrl(that.$api.PhysicalExam+ that.Data.PhysicalExaminationID ))
            .then(function (res) {
               that.Data=res.ReturnData;
            })
        },
        save(){
          let that = this;

          that.$fetch(that.$common.getMobileUrl(that.$api.SavePersonPhyExam), { method: 'POST', body: JSON.stringify(that.Data) })
            .then(function (res) {
              if (res.ReturnData === true) {
                Toast({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 2000
                })
                that.$router.push({name: 'exam-list'});
              }
            })

        }
      }
    }
</script>

<style scoped>

  button[disabled] {
    color: white !important;
    background-color:#008dfd !important;
    opacity: 0.3;
  }
  .exam_input{text-align:left}
  .exam_input>h2{font-size:0.5rem;text-align:center;line-height:1.2rem;border-bottom:#efefef;background-color:#f5f5f5}
.inputList1{font-size:0.4rem;}
.red{padding-right:0.2rem}
  .inputList1>ul>li{display:flex;align-items:center;cwidth:90%;border-bottom:1px solid #efefef;padding:0.4rem 0.4rem;}
  .inputList1>ul>li>div{width:30%;}
  .inputList1>ul>li>input{margin-left:0.3rem;height:0.7rem;flex:1;border:none;}
  .inputList1>ul>li>label{width:12%;text-align:right;}
  .data-input{margin-left:0.3rem}
  .inputList2>ul>li>input{text-align:right;padding-right:0.2rem}
  .saveBtn{margin:0.8rem 0.4rem;width:90%;border:none;background-color:#008dfd;font-size:0.4rem;text-align:center;color:#fff;border-radius: 20px;line-height:1rem;}
</style>
