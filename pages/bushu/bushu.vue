<template>
	<view class="bushu">
		<view class="content">
			<view class="btn" @click="bindGetwerun">
				请点击授权获取微信步数
			</view>
			<view class="data_list">
				<view class="data_list_item">
					<view class="data_list_item_num">
						{{werun_number}}
					</view>
					<view class="data_list_item_text">
						运动步数
					</view>
				</view>
				<view class="data_list_item">
					<view class="data_list_item_num">
						{{werunNumber}}
					</view>
					<view class="data_list_item_text">
						碳积分
					</view>
				</view>
				<view class="data_list_item">
					<view class="data_list_item_num">
						20
					</view>
					<view class="data_list_item_text">
						减排量
					</view>
				</view>
			</view>
			
		</view>
		<view class="desc_img">
			<image style="width: 720rpx;height: 574rpx;" mode="aspectFill" src="../../static/img/miaoshu.png"></image>
		</view>
		<view class="busu-bg">
			<image style="width: 750rpx;height: 100vh;" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/bushu.jpg" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	import {generalRequest,myRequest} from "../../utils/api.js"
	export default {
		data () {
			return {
				werun_number:"**",
				
			}
		},
		methods:{
			bindGetwerun() { //获取微信步数
			let _this = this;
				uni.authorize({
					scope: 'scope.werun',
					success() {
						wx.getWeRunData({
							success(res) {
								console.log(res)
								// 拿 encryptedData 到开发者后台解密开放数据
								const encryptedData = res.encryptedData
								const iv = res.iv
								generalRequest({
									url:"/wxminiprogram/getWeRunData",
									method:"POST",
									data:{
										encryptedData:encryptedData,
										iv:iv,
										openid:uni.getStorageSync('openid').openid
									}
									
								})
								.then((res) => {
									let list = res.data.data.stepInfoList;
									
									_this.werun_number = list[list.length-1].step
									console.log(list[list.length])
								})
								.catch(err => {
									throw Error (err)
								})
								// wx.cloud.init();
								// wx.cloud.callFunction({
								// 	name: 'jianhang',
								// 	data: {
								// 		weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
								// 		obj: {
								// 			//shareInfo: wx.cloud.CloudID('yyy'), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
								// 		}
								// 	}
								// }).then(res => {
								// 	console.log(res);
								// })
							},
							fail(err) {
								console.log(err.errMsg)
							}
						})
					}
				})
			},
		},
		computed:{
			werunNumber(){
				let num = 0;
				if (this.werun_number < 6000) {
					num = 0
				}else if (this.werun_number < 8000 && this.werun_number >6000 ) {
					num =  15
				}else if (this.werun_number > 8000) {
					num =  20
				}else {
					num = "**"
				}
				return num
			}
		}
	}
</script>

<style lang="scss">
	.bushu {
		overflow: hidden;
		height: 100vh;
		.busu-bg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
		.desc_img {
			width: 750rpx;
			display: flex;
			justify-content: center;
			position: relative;
			z-index: 8;
			margin-top: 40rpx;
		}
		.content {
			position: relative;
			top: 0;
			left: 0;
			z-index: 10;
			padding: 30vh 100rpx 0;
			.btn {
				width: 540rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				background-color: #4C9D71;
				border-radius: 32rpx;
				color: #FFFFFF;
				margin: 0 auto;
			}
			.data_list {
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #FFFFFF;
				margin-top: 34rpx;
				.data_list_item {
					text-align: center;
					.data_list_item_num {
						font-size: 40rpx;
					}
					.data_list_item_text {
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
