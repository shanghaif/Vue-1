<template>
  <div id="app">
    <toolbar></toolbar>
    <notes-list></notes-list>
    <editor></editor>
  </div>
</template>

<script>

import Toolbar from './Toolbar.vue'
import NotesList from './NotesList.vue'
import Editor from './Editor.vue'

import { mapState,mapGetters } from 'vuex'
import store01 from '../vuex/store01'

export default {
  data(){
    return{
      myCount:6,
      localCount: 7,
    }
  },
  // main.js 已经注入过, this.store的值是父组件的store
  store01,
  components: {
    Toolbar,
    NotesList,
    Editor
  },
  /* mapState函数把state直接映射到我们的组件中。
    使用mapState之前要先引入它。它两种用法，接受一个对象或接受一个数组
  */
  computed: mapState([ // 数组
    // 'count'直接映射到state对象中的count,它相当于 this.$store01.state.count
    'count',
    'userInfo'
  ]),
  computed:{
    userInfo_store(){
      return this.$store.state.userInfo
    } ,
    userInfo_store01(){
      return store01.state.userInfo
    } ,
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      //写法1 组件内的每一个属性函数都会获得一个默认参数state, 然后通过state 直接获取它的属性更简洁
      userInfo_mapState:state=>state.userInfo ,
      //写法2 传字符串参数 'userInfo' 等同于 `state => state.userInfo`
      userInfoAlias: 'userInfo',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        console.log(typeof state.count + '11111')
        return state.count + this.localCount
      },
    }),
    ...mapGetters({
      notesCount:'notesCount',

    }),
  },
  
  created(){  
      // console.log(this.userInfo_store01);
      // console.log(typeof this.userInfo_store01)
  }
}
</script>
