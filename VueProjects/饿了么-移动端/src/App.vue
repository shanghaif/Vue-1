<template>
	<div>
		<transition :name="transitionName" mode="out-in">
			<!-- keep-alive ?? -->
			<keep-alive>
			    <router-view  class="child-view" v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition :name="transitionName" mode="out-in">
			<router-view  class="child-view" v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		
		<!-- 评分的图案 -->
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
		},
		data(){
			return {
				transitionName: 'slide-left'
			}
		},
		watch: {
			'$route' (to, from) {
				// const toDepth = to.path.split('/').length
				// const fromDepth = from.path.split('/').length
				// //用以区分页面是入栈还是出栈，暂时没用到
				// this.transitionName = toDepth < fromDepth ? 'router-fade' : 'router-fade'

				//根据是否是iOS滑动返回设置不同动画
				this.transitionName = !this.$store.state.allowAnimate ? 'router-none' : 'router-fade'
				// alert("transitionName ==" + this.transitionName);
			}
		},
		
	  }
 
</script>

<style lang="scss">
  	@import './style/common';
	
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
		opacity: 0;
	}

	//无动画转场
	.router-none-enter-active, .router-none-leave-active {
	  	
	}
	.router-none-enter, .router-none-leave-active {
		
	}

/* 
	transition的钩子函数：
	v-enter：定义上半场过渡的初始状态；在过渡开始前被添加，在过渡开始时会被移除
	v-enter-to：定义上半场过渡的结束状态；在过渡开始时被添加，在过渡完成时会被移除
	v-enter-active：这里包含了上面的v-enter、v-enter-to两个时间段，在这里可以对上半场过渡定义过渡时间、曲线等
	v-leave：定义下半场过渡的初始状态；在过渡开始前被添加，在过渡开始时会被移除
	v-leave-to：定义下半场过渡的结束状态；在过渡开始时被添加，在过渡完成时会被移除
	v-leave-active：这里包含了上面的v-leave、v-leave-to两个时间段，在这里可以对下半场过渡定义过渡时间、曲线等
*/
</style>

