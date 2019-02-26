<template>
  <main-layout>
    <p>Welcome home</p>

    <sheet-layout>
  		<p>Hello</p>
  	</sheet-layout>

  </main-layout>

  <!-- <div>Hello VUE.js</div> -->
  
</template>



<script>
	// 引入组件文件
  import MainLayout from '../layouts/Main.vue'
  import SheetLayout from '../components/Sheet.vue'
  // 输出组件以做引用
  export default {
    components: {
      MainLayout,   // 大小写做分割，生成<main-layout>自定义组件
      SheetLayout
    } 
  }
</script>

