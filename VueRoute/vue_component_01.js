document.write("<script language=javascript src=\"http://cdn.bootcss.com/vue-router/2.0.3/vue-router.js\"></script>");
// var new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","vue.js");
// document.body.appendChild(new_element);

// Define a new component called todo-item
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo','todo_2'],
  template: '<li>{{ todo.text }} jjjjjj</li>'
});

// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return { // 一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

function showAlert() {
	window.alert('122122121212');
}

    var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        }     
    });

    var app1 = new Vue({
        el:'#app-1',
        data:{
          message:'You load the page on' + new Date()
        }
      });

      var app2 = new Vue({
        el:'#app-2',
        data:{
          seem:true
        }
      });

      var app3 = new Vue({
        el:'#app-3',
        data:{
          todos:[
            {text:'text 11111'},
            {text:'text 22222'},
            {text:'text 33333'}
          ]
        }
      });

      var app4 = new Vue({
        el:'#app-4',
        data:{
          message:'Hello Vue.js'
        },
        methods:{
          reverseMessage:function () {
            // body...
            this.message = this.message.split('').reverse().join('');
            showAlert();
          }
        }
      });

      var app5 = new Vue({
        el:'#app-5',
        data:{
          message:'Hello Vue.js'
        }
      });


      var data = {message:22};
      app5.data = data;

      var app6 = new Vue({
        el:'#app-6',
        data:{
          message:'Hello Vue.js',
          checkedNames: []
        }
      });

  var app7 = new Vue({
      el: '#app-7',
      data: {
        groceryList: [
            { text: 'Vegetables1' },
            { text: 'Cheese' },
            { text: 'Whatever else humans are supposed to eat' }
        ]
      }
  });

