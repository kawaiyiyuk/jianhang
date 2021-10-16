<template>
	<view class="invitation">
		<view class="invitation_bg">
			<!-- <image style="width: 750rpx; height: 100vh;" mode="widthFix" src="../../static/img/yaoqing/Mask-Group.jpg"></image> -->
			<image style="width: 750rpx; height: 100vh;" mode="widthFix" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/Mask-Group.jpg"></image>
			<!-- <image style="width: 750rpx; height: 100vh;" mode="widthFix" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/Group%2034.png"></image> -->
		</view>
		<view class="invitation-content">
			<view class="invitation-content-top">
				邀请好友
			</view>
			<view class="invitation-main">
				<view class="invitation-main-title">邀请好友一起集碳币，为环保做贡献吧！</view>
				<view class="btn-group">
					<view class="btn" @click="show_mycode = true">我的邀请码</view>
					<view class="btn" @click="show_input_code = true">输入邀请码</view>
				</view>
			</view>
		</view>

		<u-popup v-model="show_mycode" mode="center" border-radius="14">
			<view class="pop-model">
				<view class="top">
					您的邀请码
				</view>
				<view class="code">
					{{user_code}}
				</view>
				<view class="copy" @click="copytext">
					复制
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show_input_code" mode="center" border-radius="14">
			<view class="pop-model">
				<view class="top">
					输入邀请码
				</view>
				<view class="code_input">
					<input class="input_value" v-model="code" type="text" placeholder="请填写您的邀请码">
				</view>
				<view class="code_input_btngroup">
					<view class="clean" @click="show_input_code = false">
						取消
					</view>
					<view class="disline">

					</view>
					<view class="sure" @click="submit_code">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
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
				show_mycode: false,
				show_input_code: false,
				user_code: "F231FNUAOI",
				code: ""
			}
		},
		methods: {
			copytext() {
				let that = this;
				wx.setClipboardData({
					data: that.user_code,
					success(res) {
						console.log(res)
						wx.getClipboardData({
							success(res) {
								wx.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
			},
			submit_code() {
				this.show_input_code = false;
				let _this = this;
				console.log(_this.code)
				generalRequest({
						url: "/carboncoindetail/save",
						data: {
							behaviorType: 7,
							userId: uni.getStorageSync('userid').userid,
							invitationCode: _this.code
						}
					})
					.then((res) => {
						console.log(res.data.data);

						let data = res.data.data;
						if (data) { //code真实存在
							this.$refs.uToast.show({
								title: '提交成功',
								type: 'success',
								url: '/pages/index/index'
							})
						}else {
							this.$refs.uToast.show({
								title: '验证码无效',
								type: 'error',
							})
						}


					})
					.catch(err => {
						throw Error(err)
					})
			},
			get_author() { //获取用户是否授权
				generalRequest({
						url: "/user/detail",
						data: {
							id: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						let data = res.data.data;
						this.user_code = data.invitationCode
			
			
					})
					.catch(error => {
						throw Error(error)
					})
			},
			onLoad:function () {
				this.get_author()
			}
		}
	}
</script>

<style lang="scss">
	.invitation {
		position: relative;
		height: 100vh;
		overflow-y: hidden;
	}

	.invitation_bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.invitation-content {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 10;
		width: 720rpx;
		height: 492rpx;
		border-radius: 32rpx;
		background: #FFFFFF;

		margin-top: -246rpx;
		margin-left: -360rpx;

		.invitation-content-top {
			border-top-right-radius: 32rpx;
			border-top-left-radius: 32rpx;
			background-color: #FFFFFF;
			box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.06);
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			border: 1px solid #f3f3f3;
			text-indent: 40rpx;

		}

		.invitation-main {
			.invitation-main-title {
				font-size: 28rpx;
				text-align: center;
				margin-top: 80rpx;
			}

			.btn-group {
				display: flex;
				justify-content: space-around;
				margin-top: 80rpx;

				.btn {
					width: 236rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
					background-color: #4C9D71;
					color: #FFFFFF;
					border-radius: 32rpx;
				}
			}
		}
	}

	.pop-model {
		width: 640rpx;
		height: 608rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		overflow-y: hidden;

		.top {
			text-align: center;
			font-size: 34rpx;
			color: #000000;
			line-height: 2;
			margin-top: 40rpx;
		}

		.code {
			width: 544rpx;
			height: 306rpx;
			line-height: 306rpx;
			text-align: center;
			background-color: #E5E5E5;
			margin: 40rpx auto;
			color: #000000;
			font-size: 64rpx;
		}

		.copy {
			height: 110rpx;
			line-height: 110rpx;
			font-size: 34rpx;
			color: #4C9D71;
			text-align: center;
			border-top: 2rpx solid #e5e5e5;
		}

		.code_input {
			padding: 0 48rpx;
			margin-top: 140rpx;

			.input_value {
				height: 60rpx;
				border-bottom: 2rpx solid #e5e5e5;
			}
		}

		.code_input_btngroup {
			width: 100%;
			display: flex;
			justify-content: space-around;
			position: absolute;
			bottom: 0;
			// height: 110rpx;
			border-top: 2rpx solid #e5e5e5;
			font-size: 34rpx;

			.clean {
				width: 49%;
				text-align: center;
				height: 110rpx;
				line-height: 110rpx;
				color: #000000;
			}

			.sure {
				width: 49%;
				height: 110rpx;
				text-align: center;
				line-height: 110rpx;
				color: #576B95;
				;
			}

			.disline {
				width: 2rpx;
				background-color: #e5e5e5;

			}
		}
	}
</style>
