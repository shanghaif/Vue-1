<template>
	<div>
		<h3>-----首页-----</h3>
		<slot></slot>

		<ul>
			<li v-for="model in articles">
				<!-- <label for='作者:'>{{model.title}}</label><br/> -->
				<v-cell :todo="model.title"></v-cell>
			</li>
		</ul>
		
	</div>
</template>

<script>

	// 局部组件
	const VCell = {props: ['todo'],template: '<div><li>VCell组件 {{todo}}</li></div>'};

	export	default {
		data() {
			return {
				author:'gary',
				articles:[],
			}
		},
		components:{
			VCell
		},
		mounted: function() {
    		this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        	headers: {

        	},
        	emulateJSON: true
    		}).then(function(response) {
      			// 这里是处理正确的回调
        		this.articles = response.data.subjects
        		// this.articles = response.data["subjects"] 也可以
        		console.log(this.articles)
    		}, function(response) {
       	 		// 这里是处理错误的回调
        		console.log(response)
    		});
  		}
	}
</script>

<style>
	
</style>