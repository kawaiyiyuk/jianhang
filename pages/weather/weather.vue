<template>
	<view class="weather">
		<view class="nowBg">
			<!-- <image class="img_item" src="../../static/img/weather/weatherBg.jpg" mode="scaleToFill"></image> -->
			<image class="img_item" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/weatherBg.jpg" mode="scaleToFill"></image>
		</view>
		<view class="now" v-if="is_show">
			
			<view class="nowTempNum">
				{{tempNow}}
			</view>
			<view  class="dayTempNum">
				{{threeDayList[0].tempMin}}°～{{threeDayList[0].tempMax}}° {{tempNowTest}}
			</view>
			
			<view class="map">
				<u-icon name="map-fill" size="36rpx"></u-icon>
				<text class="map-place">{{adm1}}</text>
				<text >{{adm2}}</text>
			</view>
			
			<view class="weather_status">
				<view class="status_item">
					<view class="status_item_text">体感温度</view>
					<view class="status_item_num">{{feelsLike}}°</view>
				</view>
				<view class="status_item">
					<view class="status_item_text">空气质量</view>
					<view class="status_item_num">{{category}}</view>
				</view>
				<view class="status_item">
					<view class="status_item_text">灾害预警</view>
					<view class="status_item_num">{{type}}</view>
				</view>
			</view>
		</view>
		<view class="three_day">
			<view class="day_line" v-for="(item,index) in threeDayList" :key="index">
				<view class="date line-li">
					{{item.fxDate}}
				</view>
				<view class="temperature line-li">
					{{item.tempMin}}° ~ {{item.tempMax}}°
				</view>
				<view class="weather_type_icon line-li">
					<view class="icon">
						<i :class="'qi-' + item.iconDay"></i>
					</view>
				</view>
				<view class="weather_type line-li">
					{{item.textDay}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	// const BaseUrl = "https://devapi.qweather.com/"
	const BaseUrl = "https://api.qweather.com/"
	// const key = "9a5b8c73afd044978f2c6d19a3188625"
	const key = "3227b6748fda4b88a499b475dc8a50f3"
	export default {
		data() {
			return {
				threeDayList:[
					
				],
				tempNow:'',
				tempNowTest:'',
				is_show:false,
				adm1:"",
				adm2:"",
				feelsLike:"",//体感温度
				category:"",//空气质量
				type:""
				
			};
		},
		methods: {
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;

						uni.hideLoading();
						console.log(code)

						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息

					},
					fail: function(err) {
						console.log(err)
					}
				});

			},
			bindGetLocation(e) { //获取定位信息
				let that = this;
				wx.showLoading(
					{title :'加载中…'}
				);
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						wx.getLocation({
							type: 'wgs84',
							success: function(res) {
								// https://devapi.qweather.com/v7/weather/now?
								let longitude = res.longitude;
								let latitude = res.latitude;



								uni.request({ //获取位置信息
									url: 'https://geoapi.qweather.com/v2/city/lookup?key=' + key + '&location=' +
										longitude + ',' + latitude, //仅为示例，并非真实接口地址。
									data: {
										//text: 'uni.request'
									},
									header: {
										//'custom-header': 'hello' //自定义请求头信息
									},
									success: (res) => {
										console.log(res.data);
										that.adm1 = res.data.location[0].name;
										that.adm2 = res.data.location[0].adm1;
										uni.request({ //获取实时天气
											url: BaseUrl + 'v7/weather/now?key=' + key + '&location=' +
												res.data.location[0].id, //仅为示例，并非真实接口地址。
											data: {
												//text: 'uni.request'
											},
											header: {
												//'custom-header': 'hello' //自定义请求头信息
											},
											success: (res) => {
												console.log("实时天气:", res.data);
												// alert(res.data)
												that.tempNow = res.data.now.temp + '°';
												that.tempNowTest = res.data.now.text;
												that.feelsLike = res.data.now.feelsLike;
												// that.$refs.uToast.show({
												// 	title: res.data.now.temp,
												// 	type: 'success',
												// 	// url: '/pages/user/index'
												// })
												//this.text = 'request success';
											}
										});
										uni.request({ //获取三天天气
											url: BaseUrl + 'v7/weather/3d?key=' + key + '&location=' +
												res.data.location[0].id, //仅为示例，并非真实接口地址。
											data: {
												//text: 'uni.request'
											},
											header: {
												//'custom-header': 'hello' //自定义请求头信息
											},
											success: (res) => {
												console.log('三日天气:', res.data);
												that.threeDayList = res.data.daily;
												that.is_show = true;
												wx.hideLoading()
											},
											
										});
										uni.request({ //获取空气质量
											url: BaseUrl + 'v7/air/now?key=' + key + '&location=' +
												res.data.location[0].id, //仅为示例，并非真实接口地址。
											data: {
												//text: 'uni.request'
											},
											header: {
												//'custom-header': 'hello' //自定义请求头信息
											},
											success: (res) => {
												console.log('空气质量:', res.data);
												// alert(res.data)
												that.category = res.data.now.category;
												// that.$refs.uToast.show({
												// 	title: res.data.now.temp,
												// 	type: 'success',
												// 	// url: '/pages/user/index'
												// })
												//this.text = 'request success';
											}
										});
										uni.request({ //获取灾害预警
											url: BaseUrl + 'v7/warning/now?key=' + key + '&location=' +
												res.data.location[0].id, //仅为示例，并非真实接口地址。
											data: {
												//text: 'uni.request'
											},
											header: {
												//'custom-header': 'hello' //自定义请求头信息
											},
											success: (res) => {
												console.log('灾害预警:', res.data);
												// alert(res.data)
												if ( res.data.warning.length > 0) {
													that.type = res.data.warning[0].typeName;
												}else {
													that.type = "暂无"
												}
												
												// that.$refs.uToast.show({
												// 	title: res.data.now.temp,
												// 	type: 'success',
												// 	// url: '/pages/user/index'
												// })
												//this.text = 'request success';
											}
										});
									}
								});

								
								
								
								console.log('当前位置的经度：' + res.longitude);
								console.log('当前位置的纬度：' + res.latitude);
							}
						})
					}
				})
			},
			bindGetwerun() { //获取微信步数
				uni.authorize({
					scope: 'scope.werun',
					success() {
						wx.getWeRunData({
							success(res) {
								console.log(res)
								// 拿 encryptedData 到开发者后台解密开放数据
								const encryptedData = res.encryptedData
								// 或拿 cloudID 通过云调用直接获取开放数据
								const cloudID = res.cloudID;

								wx.cloud.init();
								wx.cloud.callFunction({
									name: 'jianhang',
									data: {
										weRunData: wx.cloud.CloudID(cloudID), // 这个 CloudID 值到云函数端会被替换
										obj: {
											//shareInfo: wx.cloud.CloudID('yyy'), // 非顶层字段的 CloudID 不会被替换，会原样字符串展示
										}
									}
								}).then(res => {
									console.log(res);
								})
							},
							fail(err) {
								console.log(err.errMsg)
							}
						})
					}
				})
			},
		},
		onLoad() {
			this.bindGetLocation();
		}
	}
</script>

<style lang="scss">
	.weather {
		display: flex;
		flex-flow: column;
		height: 100vh;
		.icon {
			color:#4C9D71 ;
		}
		.now {
			// background-color: red;
			//background: url(../../static/img/weather/weatherBg.png) no-repeat center center;
			flex: 1 0 auto;
			position: relative;
			z-index: 5;
			text-align: center;
			color: #FFFFFF;
			.nowTempNum {
				margin: 10vh auto 0;
				width: 274rpx;
				height: 236rpx;
				font-size: 200rpx;
				color: #FFFFFF;
				font-weight: bold;
				
				
			}
			.dayTempNum {
				font-size: 32rpx;
				margin-top: 10rpx;
			}
			.map {
				margin-top: 3vh;
				.map-place {
					margin: 0 20rpx 0 10rpx;
				}
			}
			
			.weather_status {
				margin-top: 5vh;
				display: flex;
				justify-content:space-around;
				.status_item{
					width: 192rpx;
					height: 232rpx;
					border: 1px solid #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					flex-flow: column;
					justify-content: center;
					align-items: center;
					
					.status_item_text{
						font-size: 24rpx;
						text-align: center;
					}
					.status_item_num {
						font-size: 48rpx;
						font-weight: bold;
					}
				}
			}
		}

		
		.nowBg {
			width: 750rpx;
			height: 80vh;
			position: absolute;
			z-index: 1;
			.img_item {
				width: 100%;
				height: 100%;
			}
		}
		.three_day {
			width: 750rpx;
			height: 406rpx;
			position: absolute;
			bottom: 0;
			background: #FFFFFF;
			border-radius: 40rpx 40rpx 0px 0px;
			z-index: 10;
			padding: 40rpx 30rpx;

			.day_line {
				display: flex;

				.line-li {
					width: 30%;
					height: 84rpx;
					line-height: 84rpx;
					text-align: center;
					justify-content: center;
					align-items: center;
				}
				.weather_type_icon {
					width: 10%;
				}
			}
		}

	}
</style>
