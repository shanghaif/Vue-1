<template>
	<div>
		<transition :name="transitionName">
			<!-- keep-alive ?? -->
			<keep-alive>
			    <router-view  class="child-view" v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition :name="transitionName">
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
	
	//透明度渐变动画转场
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-to {
		opacity: 0;
	}


	//无动画转场
	.router-none-enter-active, .router-none-leave-active {}
	.router-none-enter, .router-none-leave-active {}

/* 
	在进入/离开的过渡中，会有 6 个 class 切换：
	v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
	v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
					这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
	v-enter-to: (2.1.8版及以上) 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
	
	v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
	v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。
					这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
	v-leave-to: (2.1.8版及以上) 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
*/
</style>

