<template>
	<view class="moretan">
		<view class="dynamic_list">
			
				<view class="item_wrap" v-for="(item,index) in recent_news_list" :key="index">
					<view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.behaviorNameEn" mode=""></image>
							<text>{{item.behaviorName}}</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">{{item.num}}</text>分
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import {
		generalRequest,
		myRequest
	} from "../../utils/api.js"
	
	export default {
		data () {
			return {
				recent_news_list:[]
			}
		},
		
		methods:{
			get_recent_news() { //获取最新动态
				generalRequest({
						url: "/carboncoindetail/currentIntegralByBehavior",
						data: {
							timeType: 1,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						let data = res.data.data;
			
						data.forEach((item, index) => {
							item.behaviorNameEn = '../../static/img/index/dynamic-' + item.behaviorNameEn + '.png'
						})
						this.recent_news_list = data;
						// console.log(res);
					})
					.catch(err => {
						throw Error(err)
					})
			},
			onLoad:function () {
				this.get_recent_news()
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.num_text {
		color: #4C9D71;
		margin: 0 10rpx;
	}
	.dynamic_list {
		background-color: #FFFFFF;
		padding: 0 48rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	
		.dynamic_list_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 114rpx;
			 border-bottom: 2rpx solid #f8f8f8;
			.dynamic_list_item_left {
				display: flex;
				align-items: center;
				width: 50%;
			}
	
			.dynamic_list_item_right {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>
