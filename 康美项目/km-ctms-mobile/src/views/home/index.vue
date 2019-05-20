<template>
  <div class="home">
    <banner />
    <list-one />
    <list-two />
    <list-health />
  </div>
</template>

<script>
import Banner from './components/Banner'
import ListOne from './components/ListOne'
import ListTwo from './components/ListTwo'
import ListHealth from './components/ListHealth'

export default {
  name: 'Home',
  components: {
    Banner, ListOne, ListTwo, ListHealth
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$store.state.app.pageTitle = '全程健康管理';
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{background:#fafafa}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
