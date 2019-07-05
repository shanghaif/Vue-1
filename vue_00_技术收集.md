##h5技术收集

#####一、vue-lazyload  vue图片懒加载插件



#####二、filters  vue.filter什么作用



#####三、动态绑定组件 


```
const app = new Vue({
    el: '#app',
    data: {},
    computed: {
        /* 动态绑定组件 */ 
        ViewComponent () {
            const matchingView = ''
            return matchingView
            ? require('./pages/' + matchingView + '.vue')
            : require('./pages/404.vue')
        }
    },
    render (h) {
        return h(this.ViewComponent)
    }
})

```


#####四、



#####五、
