<template>
	<view class="tanDetail">
		<view class="top">
			<view class="top-main">
				<view class="num_now">
					<view class="num">
						{{currentNum}}
					</view>
					<view class="text">
						个人碳积分当前数量
					</view>
				</view>
				<view class="num_now">
					<view class="num">
						{{totalNum}}
					</view>
					<view class="text">
						个人碳积分累计数量
					</view>
				</view>
				<view class="desc">
					该用户的碳积分均来自于通过绿建碳宝记录的低碳行为，碳减排量等同于绿宝产生的能量
				</view>
			</view>
			<view class="top-bg">
				<image style="width: 750rpx; height: 676rpx;" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/Group%2034.png"
				 mode=""></image>
			</view>
		</view>
		<view class="main"  >
			<view class="charts"  >
				<view class="charts_title">

				</view>
				<view class="charts_main" id="lineCanvas" style="height: 480rpx;">
					<!-- <canvas
					 style="width: 375px; height: 400px;"
					 canvas-id="lineCanvas"
					 binderror="canvasIdErrorCallback"
					 @touchstart="touchHandler"
					 disable-scroll="true" 
					></canvas> -->

					<!-- <mpvue-echarts :echarts="echarts" :onInit="onInit"></mpvue-echarts> -->
					<mpvue-echarts class="ec-canvas" @onInit="get_charts_data" canvasId="line" ref="lineChart" />
				</view>
			</view>
			<view class="list">
				<view class="dynamic_list">
					<view class="dynamic_list_item" v-for="(item,index) in type_list" :key="index">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.behaviorNameEn"
							 mode=""></image>
							<text>{{item.behaviorName}}</text>
						</view>
						<view class="dynamic_list_item_right">
							<!-- <view>
								获得碳币 <text class="num_text">5</text>个
							</view> -->
							<view>
								<text class="num_text">{{item.num}}</text>积分
							</view>
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
	var wxCharts = require('../../static/js/wxcharts-min');
	var lineChart = null;;
	var windowW = 0;

	import * as echarts from "../../components/echarts/echarts.simple.min.js";
	import mpvueEcharts from "../../components/mpvue-echarts/src/echarts.vue"


	export default {
		data() {
			return {
				// echarts,
				currentNum:0,
				totalNum:0,
				type_list:[],
				series_data:[],
				series_time:[]
			}
		},
		components: {
			mpvueEcharts
		},
		methods: {
			touchHandler: function(e) {
				console.log(lineChart.getCurrentDataIndex(e));
				lineChart.showToolTip(e, {
					// background: '#7cb5ec',
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},

			lineInit(e) {
				let _this = this;
				var option = {
					xAxis: {
						type: 'category',
						data: _this.series_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: _this.series_time,
						type: 'line'
					}]
				};
				let {
					width,
					height
				} = e;
				let canvas = this.$refs.lineChart.canvas;
				echarts.setCanvasCreator(() => canvas);
				console.log(canvas)
				
				console.log(width)
				
				console.log(height)
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				lineChart.on('click', function (params){  
                    console.log(params)  
                })  
				canvas.setChart(lineChart);
				lineChart.setOption(option);
				this.$refs.lineChart.setChart(lineChart);
				
					
			},
		
			
			touchStart(e){
				console.log(e)
			},
			touchMove(e){
				console.log(e)
			},
			get_total_num () {
				generalRequest({
						url: "/carboncoindetail/personalIntegral",
						data: {
							timeType: 1,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						
						let data = res.data.data;
						this.currentNum = data.currentIntegral
						this.totalNum = data.cumulativeIntegral
					})
					.catch(err => {
						throw Error(err)
					})

			},
			get_list (time) {
				generalRequest({
						url: "/carboncoindetail/currentIntegralByBehavior",
						data: {
							
							createTime: new Date().getTime(),
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						
						let data = res.data.data;
						let recent_news_list = [];
						data.map((item, index) => {						
							item.behaviorNameEn = '../../static/img/index/dynamic-' + item.behaviorNameEn + '.png';
							recent_news_list.push(item)
						})
						this.type_list = recent_news_list;
					})
					.catch(err => {
						throw Error(err)
					})
			},
			// /carboncoindetail/personalIntegralByTime
			get_charts_data (e) {
				let {
					width,
					height
				} = e;
				console.log(e)
				let lineChart = echarts.init(canvas, null, {
					
					height: height,
					width: width,
				});
				let canvas = this.$refs.lineChart.canvas;
				echarts.setCanvasCreator(() => canvas);
				lineChart.on('click', function (params){
				    console.log(params)  
				})  
				generalRequest({
						url: "/carboncoindetail/personalIntegralByTime",
						data: {
							timeType: 3,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						let data = res.data.data;
						this.series_time = data.date;
						this.series_data = data.integral;
						let _this = this;
						var option = {
							xAxis: {
								type: 'category',
								data: _this.series_data
							},
							yAxis: {
								type: 'value'
							},
							series: [{
								data: _this.series_time,
								type: 'line'
							}]
						};
						
					
						console.log(canvas)
						
						console.log(width)
						
						console.log(height)
						

						
						canvas.setChart(lineChart);
						lineChart.setOption(option);
						this.$refs.lineChart.setChart(lineChart);
					})
					.catch(err => {
						throw Error(err)
					})
			}
		},

		onLoad: function() {
			this.get_total_num();
			this.get_list();
			this.get_charts_data();
			// 屏幕宽度
			//    this.setData({
			//      imageWidth: wx.getSystemInfoSync().windowWidth
			//    }) ;
			//    console.log(this.data.imageWidth) ;

			//    //计算屏幕宽度比列
			//    windowW = this.data.imageWidth/375;
			//    console.log(windowW);



		},
		onShow: function() {
			// let windowWidth = 320;
			// try {
			// 	let res = wx.getSystemInfoSync();
			// 	console.log(res)
			// 	windowWidth = res.screenWidth - 20;
			// } catch (e) {
			// 	// do something when get system info failed
			// }
			// new wxCharts({
			// 	canvasId: 'lineCanvas',
			// 	type: 'line',
			// 	categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			// 	series: [{
			// 		name: '碳积分',
			// 		data: [1, 10, 30, 10, 4, 8, 50],
			// 		color: "#4C9D71",
			// 		symbol: 'circle'
			// 		// format: function (val) {
			// 		//     return val.toFixed(2) + '万';
			// 		// }
			// 	}],
			// 	yAxis: {
			// 		// title: '成交金额 (万元)',
			// 		// format: function (val) {
			// 		//     return val.toFixed(2);
			// 		// },
			// 		min: 0,
			// 		gridColor: '#f3f3f3'
			// 	},
			// 	xAxis: {
			// 		disableGrid: true,
			// 	},
			// 	width: windowWidth,
			// 	height: 180,
			// 	legend: false,
			// 	extra: {
			// 		// lineStyle: 'curve'
			// 	}
			// });


			// new wxCharts({
			//     extra: {
			//         lineStyle: 'curve'
			//     }
			// });
		}
	}
</script>

<style lang="scss">
	.top {
		width: 750rpx;
		position: relative;

		.top-main {
			position: relative;
			z-index: 9;
			padding: 60rpx 48rpx 60rpx;

			.num_now {
				height: 200rpx;
				display: flex;
				flex-flow: column;
				justify-content: center;
				// align-items: center;
				color: #FFFFFF;

				.num {
					font-size: 72rpx;
				}

				.text {
					font-size: 24rpx;
				}
			}

			.desc {
				color: #FFFFFF;
				text-align: center;
				line-height: 40rpx;
			}
		}

		.top-bg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
		}
	}

	.main {
		background-color: #F8F8F8;
		padding: 0 16rpx;

		.charts {
			position: relative;
			width: 100%;
			height: 400rpx;
			top: -24rpx;
			z-index: 9;
			background: #FFFFFF;
			border-radius: 32rpx;

			.charts_title {

				box-shadow: inset 0px -1rpx 0px rgba(0, 0, 0, 0.06);


			}
		}

		.num_text {
			color: #4C9D71;
			margin: 0 10rpx;
		}

		.list {
			padding-bottom: 40rpx;

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
						justify-content: flex-end;
					}
				}
			}
		}

	}
</style>
