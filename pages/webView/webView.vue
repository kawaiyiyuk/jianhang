<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				src:""
			}
		},
		methods:{
			
		},
		 onLoad: function (option) {
			 this.src = option.src
		    console.log(option.src)   // {type: "1"}
		  }
	}
</script>

<style lang="scss">
</style>
