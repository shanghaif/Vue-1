<template>
	<div>
		<hr>
		<p>
			<router-link to="/home"> Home </router-link>
			<router-link to="/page2"> Page2 </router-link>
			<router-link to="/test"> TestComponent </router-link>
		</p>
		<hr>
		<!-- <slot></slot> -->
    	<router-view class="view"></router-view>
	</div>
	
</template> 

<script>
	
</script>

<style>
	h1 {
		color: red;
		font-size: 15px
	}
</style>