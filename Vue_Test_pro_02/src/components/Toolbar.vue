<template>
  <div id="toolbar">
    <i @click="addNote" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite" class="glyphicon glyphicon-star"
      :class="{starred: activeNote.favorite}"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
import { addNote, deleteNote, toggleFavorite } from '../vuex/actions'

export default {
  computed:{
      activeNote(){
        return this.$store.state.activeNote
      }
  },
  methods:{
    addNote: function(){
      alert(this.activeNote.favorite)
      this.$store.commit('ADD_NOTE')
    },
    deleteNote: function(){
      this.$store.commit('DELETE_NOTE')
    },
    toggleFavorite: function(){
      this.$store.commit('TOGGLE_FAVORITE')
    }
  },
  // vuex: {
  //   getters: {
  //     activeNote: state => state.activeNote
  //   },
  //   actions: {
  //     addNote,
  //     deleteNote,
  //     toggleFavorite
  //   }
  // }
}
</script>
