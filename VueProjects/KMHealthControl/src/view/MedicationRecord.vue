<template>
    <div>
      1
    </div>
</template>

<script>
  import globalMixin from "../mixins/global";
    export default {
      name: "MedicationRecord",
      mixins: [globalMixin],
      data() {
        return {}
      },
      computed: {},
      watch: {},
      created() {
      },
      mounted() {
        this.redirectToIndex();
      },
      methods: {},
    }
</script>

<style scoped>

</style>
