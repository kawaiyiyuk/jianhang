<template>
	<view class="morelist">
		<view class="dynamic_list_wrap">
			<view class="tabbar">
				<view class="tabbar_item" :class="[ranking? '':'active']" @click="ranking = false">
					<text class="item_text">当前排行榜</text>
				</view>
				<view class="disline">

				</view>
				<view class="tabbar_item" :class="[ranking? 'active':'']" @click="ranking = true">
					<text class="item_text">累计排行榜</text>
				</view>
			</view>
			<view class="dynamic_list" v-show="!ranking">
				<!-- 当前排行榜 -->
				<view class="dynamic_list_item" v-for="(item,index) in dynamic_list_now" :key="index">
					<view class="dynamic_list_item_left">
						<image v-if="index == 0" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/jin.png"></image>
						<image v-if="index == 1" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/yin.png"></image>
						<image v-if="index == 2" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/tong.png"></image>
						<text v-if="index >2 " style="width: 64rpx; height: 64rpx;line-height: 64rpx;font-size:32rpx;margin-right: 12rpx;text-align: center;">4</text>
						<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.avatarUrl"
						 mode=""></image>
						<text>{{item.nickName}}</text>
					</view>
					<view class="dynamic_list_item_right">
						<view>
							{{item.num}}
						</view>
					</view>
				</view>

			</view>

			<view class="dynamic_list" v-show="ranking">
				<!-- 累计排行榜 -->
				<view class="dynamic_list_item" v-for="(item,index) in dynamic_list_his" :key="index">
					<view class="dynamic_list_item_left">
						<image v-if="index == 0" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/jin.png"></image>
						<image v-if="index == 1" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/yin.png"></image>
						<image v-if="index == 2" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/tong.png"></image>
						<text v-if="index >2 " style="width: 64rpx; height: 64rpx;line-height: 64rpx;font-size:32rpx;margin-right: 12rpx;text-align: center;">4</text>
						<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.avatarUrl"
						 mode=""></image>
						<text>{{item.nickName}}</text>
					</view>
					<view class="dynamic_list_item_right">
						<view>
							{{item.num}}
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
		data() {
			return {
				ranking: false,
				dynamic_list_now: [
				],
				dynamic_list_his: [
				],
			}
		},
		methods:{
			get_tail() { //获取当前排行榜
				generalRequest({
						url: "/carboncoindetail/page",
						data: {
							timeType: 1,
							size: 10,
							current: 1,
						}
					})
					.then((res) => {
						let data = res.data.data;
						this.dynamic_list_now = data.records
						console.log(res)
					})
					.catch(error => {
			
					})
					
				generalRequest({
					url: "/carboncoindetail/page",
					data: {
						size: 10,
						current: 1,
					}
				})
				.then((res) => {
					let data = res.data.data;
					this.dynamic_list_his = data.records
					console.log(res)
				})
				.catch(error => {
				
				})
			},
			onLoad:function () {
				this.get_tail();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic_list_wrap {
		background-color: #FFFFFF;
		padding: 0 48rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.tabbar {
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1px solid #f8f8f8;

			.disline {
				width: 2rpx;
				height: 70%;
				background: rgba(0, 0, 0, 0.06);
				margin-top: 16rpx;
			}

			.tabbar_item {
				width: 50%;
				text-align: center;

				.item_text {
					padding-bottom: 18rpx;
					font-size: 28rpx;
					border-bottom: 4rpx solid #333333;
					opacity: .3;
				}
			}

			.active {
				.item_text {
					padding-bottom: 18rpx;
					font-size: 28rpx;
					border-bottom: 4rpx solid #4C9D71;
					color: #4C9D71;
					opacity: 1;
					font-weight: bold;

				}
			}
		}

		.dynamic_list {
			.dynamic_list_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 114rpx;
				border-bottom: 2rpx solid #f8f8f8;

				.dynamic_list_item_left {
					display: flex;
					align-items: center;
					width: 70%;
				}

				.dynamic_list_item_right {
					width: 30%;
					text-align: right;

				}
			}
		}
	}

	.dynamic-top {
		display: flex;
		justify-content: space-between;
		padding: 0 48rpx;
		margin-bottom: 14rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
		}

		.desc {
			.num {
				color: #4C9D71;
				margin: 0 10rpx;
			}
		}
	}

	.dynamic_list_more {
		width: 750rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FFFFFF;
		box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.06);
		border-top: 1px solid #f8f8f8;
		border-radius: 0px 0px 16px 16px;
		font-size: 24rpx;
		color: #4C9D71;
	}
</style>
