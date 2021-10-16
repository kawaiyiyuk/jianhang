<template>
	<view class="chose_url">
		<view class="main">
			<view class="top">
				<view class="top-title">
					请选择您的{{type}}归属
				</view>
				<view>
					填写信息注册后，继续使用微信
				</view>
			</view>
			<view class="url_list">
				<!-- <view class="url_list_item" @click="link_to('/pages/webView/webView?src='+url.city)"> -->
				<view class="url_list_item" @click="copytext(url.city)">
					南昌市{{type}}
				</view>
				<!-- <view class="url_list_item" @click="link_to('/pages/webView/webView?src='+url.province)"> -->
				<view class="url_list_item" @click="copytext(url.province)">
					江西省{{type}}
				</view>
			</view>
			<view class="clean">
				取消
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				type:"公积金",
				url:{
					city:"",
					province:""
				}
			}
		},
		methods:{
			link_to(page) {
				uni.navigateTo({
					url: page
				})
			},
			copytext(url){
				let that = this;
				wx.setClipboardData({
				  data:url,
				  success (res) {
					console.log(res) 
				    wx.getClipboardData({
				      success (res) {
				        wx.showToast({
						  title: '已复制到剪切板'
						})
				      },
					  duration:2000
				    })
				  }
				})
			},
			finish_task(num,text) { //去完成任务
				generalRequest({
						url: "/carboncoindetail/save",
						data: {
							behaviorType: num,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						// console.log(res)
						let data = res.data.data;
						this.get_recent_news();
						this.copytext(text)
					})
					.catch(err => {
						throw Error(err)
					})
			},
		},
		
		onLoad:function (options) {
			if (options.urlName == 'gjj') {
				this.type = "公积金";
				this.url.city = "http://ncgjj.nc.gov.cn";
				this.url.province = "http://www.jxzfgjj.com/Index.shtml";
			}else {
				this.type = "社保";
				this.url.city = "http://rsj.nc.gov.cn";
				this.url.province = "https://gftjis.jxzwfww.gov.cn/jisgft/front/login.do?uuid=CHkhBwIuXSNl&gotourl=aHR0cDovL3p3ZncucnN0LmppYW5neGkuZ292LmNuOjgwODEvanhybHp5L2luZGV4Lmh0bWw=&type=1";
			}
		}
	}
</script>

<style lang="scss">
	.chose_url {
		width: 750rpx;
		height: 100vh;
		background-color: #f8f8f8;
		.main {
			width: 640rpx;
			height: 592rpx;
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
			.url_list {
				.url_list_item {
					text-align: center;
					height: 112rpx;
					line-height: 112rpx;
					text-align: center;
					color: #4C9D71;
					font-size: 34rpx;
					font-weight: 500;
					border-top: 2rpx solid #f8f8f8;
				
				}
			}
			.clean {
				text-align: center;
				height: 112rpx;
				line-height: 112rpx;
				text-align: center;
				color: #999999;
				font-size: 34rpx;
				font-weight: 500;
				border-top: 2rpx solid #f8f8f8;
			}
		}
	}
</style>
