<template>
  <div class="error-dialoge" v-html="this.$store.state.errorDialoge.text"></div>
</template>

<script>
    export default {
      name: "ErrorDialoge",
      data() {
        return {};
      },
      computed: {},
      components: {},
      mounted() {},
      methods: {}
    }
</script>

<style scoped>

</style>
