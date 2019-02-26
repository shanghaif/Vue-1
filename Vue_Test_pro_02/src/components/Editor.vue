 <template>
  <div id="note-editor">
    <textarea
      placeholder="请输入"
      :value="activeNoteText"
      @input="EditNote_2"
      class="form-control">
    </textarea>
  </div>
</template>

<script>
import { editNote } from '../vuex/actions'
import { mapState,mapActions } from 'vuex'

export default {
  data(){
    return {
      textValue:"default text"
    }
  },
  computed:{

    ...mapState({
      activeNoteText: state => state.activeNote.text,
      // 传字符串参数 'activeNote' 等同于 `state => state.activeNote`
      activeNote:'activeNote',
    }),
  },
  methods:{
    EditNote(event){
      this.$store.commit('EDIT_NOTE',event.target.value)

      // 多参形式
      // this.$store.commit('EDIT_NOTE',{
      //   text:event.target.value,
      //   id:241,
      // })

      // 常量替代 Mutation 事件类型
      // 常量放在单独的文件中方便管理
      // this.$store.commit(addNote2)
    },


    EditNote_2(event){
      // 分发 Action ---- 通过 store.dispatch 方法触发
      this.$store.dispatch('EDIT_NOTE_Action',event.target.value);
      // editNote()
    },
    EditNote_3(event){
      // Actions 支持同样的载荷方式和对象方式进行分发
      // 以载荷形式分发
      this.$store.dispatch('EDIT_NOTE_Action_0', {
        amount: 10
      }),

      // 以对象形式分发
      this.$store.dispatch({
        type: 'EDIT_NOTE_Action_0',
        amount: 10
      })
    },
    ...mapActions([
        // 将 `this.EDIT_NOTE_Action_1(obj)` 映射为 `this.$store.dispatch('EDIT_NOTE_Action_1', obj)`
        'EDIT_NOTE_Action_1',
      ]),
  },
 
}
</script>
