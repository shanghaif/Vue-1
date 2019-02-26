<template>
  <a
    v-bind:href="href"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
  import routes from '../routes'

  export default {
    // 组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
    props: {
      href: String,
      required: true
    },
    computed: {
      isActive () {
        return this.href === this.$root.currentRoute
      }
    },
    methods: {
      go (event) {
        // 通知浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。例如，如果 type 属性是 "submit"，通过调用该方法，可以阻止提交表单
        event.preventDefault()
        this.$root.currentRoute = this.href
        // HTML5里引用了新的API，就是history.pushState和history.replaceState，就是通过这个接口做到无刷新改变页面URL
        window.history.pushState(
          null,
          routes[this.href],
          this.href
        )
      }
    }
  }
</script>

<style scoped>
  .active {
    color: cornflowerblue;
  }
</style>
