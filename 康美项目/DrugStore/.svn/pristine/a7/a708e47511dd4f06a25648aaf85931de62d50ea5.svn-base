<template>
  <div class="dataTime">
    <div @click="openPicker"><span v-if="dataTime">{{ dataTime | formatDate }}</span><span v-else>请选择时间</span></div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value}年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="taxDate"
      @confirm="handleChange"/> <!--v-model="taxDate" 默认当前能看到的显示当前时间-->
  </div>
</template>

<script>
  import { formatDate } from '../filters'
  export default {
    name: 'DatePicker',
    filters: {
      formatDate(time) {
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    props:['dataTime'],
    data() {
      return {
        startDate: new Date(),
        time: null,
        taxDate: new Date(),
      }
    },
    mounted() {

    },
    methods: {
      openPicker() {
        this.$refs.picker.open()
        console.log(this.dataTime)
      },
      handleChange(value) {
        this.time = value
        this.$emit('showTime', formatDate(new Date(this.time), 'yyyy-MM-dd hh:mm:ss')) // 把值传给父级
      }
    }
  }
</script>

<style scoped>
  .dataTime >>>.picker-toolbar{
    bacakground-color:#f2f2f2 !important;
    padding:0 5%;
    margin:0 auto;
  }

  .dataTime  >>> .mint-datetime-cancel{
    text-align:left;
    color:#333;
  }
  .dataTime >>>.mint-datetime-confirm{  text-align:right}

</style>
