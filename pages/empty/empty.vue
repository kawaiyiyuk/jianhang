<template>
	<view class="chose_url">
		<view class="main">
			<view class="top">
				<view class="top-title">
					敬请期待
				</view>
				<view>
					此功能暂未上线
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			
		},
		
	}
</script>

<style lang="scss">
	.chose_url {
		width: 750rpx;
		height: 100vh;
		background-color: #f8f8f8;
		.main {
			width: 640rpx;
			height: 256rpx;
			border-radius: 16rpx;
			background-color: #FFFFFF;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -296rpx;
			margin-left: -320rpx;
			.top {
				font-size: 34rpx;
				color: rgba(0,0,0,.5);
				text-align: center;
				padding: 64rpx 48rpx;
				.top-title {
					font-size: 34rpx;
					color: #000000;
					font-weight: bold;
					margin-bottom: 32rpx;
				}
			}
			
		}
	}
</style>
