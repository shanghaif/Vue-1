<template>
  <span>
    {{kmtext}}
  </span>
</template>

<script>
    import gdata from "../mixins/global_data"
    export default {
      name: "SelectCode",
      data() {
        return {
          kmtext:null
        }
      },
      props:{
        kmcode: String,
        kmvalue:String
      },
      computed: {},
      watch: {},
      created() {
      },
      mounted() {
      
        this.get(this.kmcode,this.kmvalue);
      },
      methods: {
        get(code,val){
     
          this.kmtext=gdata.dictionarys[code][val].ItemName;

          // let that = this;   
          // let data={ ItemTypes:["S00.001"]};
          // that.$fetch(that.$common.getMobileUrl(that.$api.GetDictionary), { method: 'POST', body: JSON.stringify(data) })
          //   .then(function (res) {
          //     if (res.ReturnData) {
               
          //     }
          //   })
           
        }
      },
    }
</script>

<style scoped>

</style>
