import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 0. 最好提前在你的 store 中初始化好所有所需属性
// 如果没有提前声明,可以一下两种方式
// 1. 对象上添加新属性
// Vue.set(state.userInfo, 'newProp', 123)
// 2. 新对象替换老对象
// state.userInfo = { ...state.userInfo, newProp: 123 }

const state = {
  notes: [{id:102,text:'笔记——01',favorite:false},{id:103,text:'笔记——02',favorite:true}],
  activeNote: {
    id:101,
    favorite:true,
    text:"默认值"
  },
  userInfo: { phone:13641472570 },//用户信息
  orderList: [{orderno:'12212'},{orderno:'321244'}],//订单列表
  count: 3,
}

const mutations = {
  ADD_NOTE (state) {
    // alert('store add')
    const newNote = {
      id:state.notes.length,
      text: 'New note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  // 向store.commit传入额外的参数，即mutation 的载荷（payload）
  // this.$store.commit('EDIT_NOTE',"an object")
  EDIT_NOTE (state, text) {
    alert(text);
    state.activeNote.text = text
  },

  DELETE_NOTE (state) {
    state.notes.$remove(state.activeNote)
    state.activeNote = state.notes[0]
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) {
    state.activeNote = note
  }
}

// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
// 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
// 当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了
const actions = {
  // 简写模式,模拟异步
  EDIT_NOTE_Action ({ commit }) {
    setTimeout(() => {
      commit('EDIT_NOTE')
    }, 1000)
  },
  // 标准模式
  EDIT_NOTE_Action_0 (context, text){
    context.commit('EDIT_NOTE');
  },
  // 简写模式
  EDIT_NOTE_Action_1 ({ commit }) {
    commit('EDIT_NOTE')
  }
}

/*
async function testSync() {
      const response = await new Promise(resolve => {
          setTimeout(() => {
              resolve({message:"async await test..."});
           }, 2000);
      });
      console.log(response);
 }
 testSync();
*/

export default new Vuex.Store({
  state,
  mutations,
  actions,
  // store 中定义“getter”（可以认为是 store 的计算属性）。
  // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  getters:{
      // Getter会暴露为store.getters对象，可以以属性的形式访问这些值：
      // store.getters.favoriteNotes
      favoriteNotes:state=>{
        return state.notes.filter(note=>note.favorite)
      },
      favoriteNotesCount:(state,getters)=>{
        return getters.favoriteNotes.length
      },
      activeNoteText:state=>state.activeNote.text,
      favoriteNotes_2:state=>state.notes.filter(note=>note.favorite),
      notesCount:state=>state.notes.length,
      // 通过方法访问
      // 也可以通过让 getter 返回一个函数，来实现给 getter 传参。
      // 在对 store 里的数组进行查询时非常有用。
      // 组件里访问: this.$store.getters.getTodoById(2)
      getNoteById:(state)=>(id)=>{
        return state.notes.find(note=>note.id === id)
      },
      notes: state => state.notes,
      activeNote: state => state.activeNote,
  }
})
