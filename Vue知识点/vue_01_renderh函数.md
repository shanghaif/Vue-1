##动态绑定组件 


```
const app = new Vue({
    el: '#app',

    /* 创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上 
       有以下3种方式
         1. template: '<App/>' 
         2. render: h => h(App) 
         3. .$mount('#app'); 
    */
    render (h) {
        return h(App)
    }
    
    /*
    render: h => h(App)     // => 是ES6的箭头语法
    
    // ES5  
    (function (h) {  
        return h(App);  
    });  
    
    // ES6  
    h => h(App); 
    */
})

/*  
render函数官方文档：
render: function (createElement) {
    return createElement(
        'h' + this.level,   // tag name 标签名称
        this.$slots.default // 子组件中的阵列
    )
}
*/
```
