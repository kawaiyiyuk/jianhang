<template>
	<view>

		<view class="calculator">
			<view class="calculator-list">
				<view class="calculator_left">
					<view class="calculator_left_item" :class="[item.active_num == active ? 'calculator_left_item_active':'']" v-for="(item,index) in category_list"
					 @click="changeNum(item)" :key="item.active_num">
						{{item.name}}
					</view>
				</view>
				<view class="calculator_right">
					<view class="calculator_right_wrap" v-for="(item,index) in data_list" :key="item.key">
						<view class="calculator_right_main_one calculator_right_main" v-if="item.active == active">
							<view @click="changeType(item_child,index_child)" :class="[index_child == active_child?'calculator_right_main_active':'']"
							 class="calculator_right_main_item" v-for="item_child,index_child in item.child_list" :key="item_child.child_key">
								<!-- <image src="../../static/shi01.png" mode=""></image> -->
								<u-image class="item_img" width="120rpx" height="120rpx" :src="item_child.imgUrl"></u-image>
								<view class="img_text">{{item_child.name}}</view>
							</view>
						</view>
					</view>

				</view>
			</view>

			<view class="calculator-result">
				<view class="result-top">
					<view class="title">
						{{activeName}}
					</view>
					<view class="text">
						<text class="text_one">选择类型进行碳排放计算</text><br>
						<text class="text_two">以二氧化碳为表魂计算碳排放量</text>
					</view>
					<view class="icon">
						<u-image width="64rpx" height="64rpx" src="" mode=""></u-image>
					</view>
				</view>

				<view class="result_input" v-show="compute_show">
					<view class="type_name">
						{{activeObj.name}}
					</view>

					<view class="input_wrap" v-show="compute_show">
						<input class="input_number" v-model="input_value" type="number" placeholder="请输入数量" />
						<text class="input_text">{{activeObj.unit}}</text>
					</view>
				</view>

				<view class="btn_group" v-show="compute_show">
					<view class="del_btn" @click="input_value = null">删除</view>
					<view class="compute_btn" @click="sum_num">计算</view>
				</view>

				<view class="result_model" v-if="result_show">
					<view>碳排放量：<text class="co_num">{{co2_num}}</text> KG CO2</view>
					<view class="result_model_desc">
						{{activeObj.text}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				active_child: null,
				activeName: "衣", //选中后大类名称
				data_list: [{
						child_list: [{
								imgUrl: require('../../static/img/calculator/yi01.png'),
								name: "涤纶织物",
								clickName: "y_dlzw",
								child_key: "y_dlzw",
								unit: "kg",
								co2_num: 25.70,
								text: "理性购买，经常整理衣柜，把不需要的衣服送给需要的人"
							},
							{
								imgUrl: require('../../static/img/calculator/yi02.png'),
								name: "纯棉T恤",
								clickName: "y_cmtx",
								child_key: "y_cmtx",
								unit: "件",
								co2_num: 7.00,
								text: "理性购买，经常整理衣柜，把不需要的衣服送给需要的人"
							},
							{
								imgUrl: require('../../static/img/calculator/yi03.png'),
								name: "洗衣液",
								clickName: "y_xiy",
								child_key: "y_xiy",
								unit: "L",
								co2_num: 0.80,
								text: "少用洗衣机，手洗更环保"
							}
						],
						key: "yi",
						active: 1
					},
					{
						child_list: [{
								imgUrl: require('../../static/img/calculator/shi01.png'),
								name: "白酒",
								clickName: "s_bj",
								child_key: "s_bj",
								unit: "kg",
								co2_num: 1.76,
								text: "为了自己的健康，请适量饮酒"
							},
							{
								imgUrl: require('../../static/img/calculator/shi02.png'),
								name: "啤酒",
								clickName: "s_pj",
								child_key: "s_pj",
								unit: "瓶",
								co2_num: 0.22,
								text: "为了自己的健康，请适量饮酒"
							},
							{
								imgUrl: require('../../static/img/calculator/shi03.png'),
								name: "吸烟",
								clickName: "s_xiyan",
								child_key: "s_xiyan",
								unit: "包",
								co2_num: 0.02,
								text: "为了自己的健康，请适量不吸或少吸烟"
							},
							{
								imgUrl: require('../../static/img/calculator/shi04.png'),
								name: "羊肉",
								clickName: "s_yangrou",
								child_key: "s_yangrou",
								unit: "kg",
								co2_num: 39.20,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi05.png'),
								name: "牛肉",
								clickName: "s_niurou",
								child_key: "s_niurou",
								unit: "kg",
								co2_num: 27.00,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi06.png'),
								name: "猪肉",
								clickName: "s_zhurou",
								child_key: "s_zhurou",
								unit: "kg",
								co2_num: 12.10,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi07.png'),
								name: "炸鸡",
								clickName: "s_zhaji",
								child_key: "s_zhaji",
								unit: "kg",
								co2_num: 1.80,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi08.png'),
								name: "鸡蛋",
								clickName: "s_jidan",
								child_key: "s_jidan",
								unit: "kg",
								co2_num: 4.80,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi09.png'),
								name: "土豆",
								clickName: "s_tudou",
								child_key: "s_tudou",
								unit: "kg",
								co2_num: 2.90,
								text: "多吃蔬菜有益身体健康，但是请不要暴饮暴食"
							},
							{
								imgUrl: require('../../static/img/calculator/shi10.png'),
								name: "米饭",
								clickName: "s_mifan",
								child_key: "s_mifan",
								unit: "kg",
								co2_num: 2.70,
								text: "淀粉是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi11.png'),
								name: "花生",
								clickName: "s_huasheng",
								child_key: "s_huasheng",
								unit: "kg",
								co2_num: 2.50,
								text: "干果类食品含有大量的营养成分，适当食用有益健康"
							},
							{
								imgUrl: require('../../static/img/calculator/shi12.png'),
								name: "酸奶",
								clickName: "s_suannai",
								child_key: "s_suannai",
								unit: "kg",
								co2_num: 2.20,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi13.png'),
								name: "西兰花",
								clickName: "s_xilanhua",
								child_key: "s_xilanhua",
								unit: "kg",
								co2_num: 2.00,
								text: "多吃蔬菜有益身体健康，但是请不要暴饮暴食"
							},
							{
								imgUrl: require('../../static/img/calculator/shi14.png'),
								name: "豆腐",
								clickName: "s_doufu",
								child_key: "s_doufu",
								unit: "kg",
								co2_num: 2.00,
								text: "多吃豆制品有益身体健康，但是请不要暴饮暴食"
							},
							{
								imgUrl: require('../../static/img/calculator/shi15.png'),
								name: "牛奶",
								clickName: "s_niunai",
								child_key: "s_niunai",
								unit: "kg",
								co2_num: 1.90,
								text: "蛋白质是身体不可或缺的能量，但请注意营养均衡，荤素搭配"
							},
							{
								imgUrl: require('../../static/img/calculator/shi16.png'),
								name: "西红柿",
								clickName: "s_xihongshi",
								child_key: "s_xihongshi",
								unit: "kg",
								co2_num: 1.10,
								text: "多吃蔬菜有益身体健康，但是请不要暴饮暴食"
							},
							{
								imgUrl: require('../../static/img/calculator/shi17.png'),
								name: "扁豆",
								clickName: "s_biandou",
								child_key: "s_biandou",
								unit: "kg",
								co2_num: 0.90,
								text: "多吃蔬菜有益身体健康，但是请不要暴饮暴食"
							},

						],
						key: "shi",
						active: 2
					},
					{
						child_list: [{
								imgUrl: require('../../static/img/calculator/zhu01.png'),
								name: "煤",
								clickName: "z_mei",
								child_key: "z_mei",
								unit: "吨",
								co2_num: 1970.00,
								text: "节约能源，提高能源使用效率，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu02.png'),
								name: "用电",
								clickName: "z_yongdian",
								child_key: "z_yongdian",
								unit: "度",
								co2_num: 1.00,
								text: "节约能源，关闭常明灯，保护环境，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu03.png'),
								name: "用水",
								clickName: "z_yongshui",
								child_key: "z_yongshui",
								unit: "立方米",
								co2_num: 0.91,
								text: "节约能源，关闭长流水，保护环境，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu04.png'),
								name: "煤气",
								clickName: "z_meiqi",
								child_key: "z_meiqi",
								unit: "立方米",
								co2_num: 0.71,
								text: "节约能源，提高能源使用效率，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu05.png'),
								name: "天然气",
								clickName: "z_tianranqi",
								child_key: "z_tianranqi",
								unit: "立方米",
								co2_num: 2.19,
								text: "节约能源，提高能源使用效率，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu06.png'),
								name: "集中供暖",
								clickName: "z_jigong",
								child_key: "z_jigong",
								unit: "平米/天",
								co2_num: 0.13,
								text: "采取集中供暖不仅经济方便，而且大大减少了二氧化碳排放"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu07.png'),
								name: "蜂窝煤",
								clickName: "z_fengwo",
								child_key: "z_fengwo",
								unit: "块",
								co2_num: 3.30,
								text: "节约能源，提高能源使用效率，从我们自己做起"
							},
							{
								imgUrl: require('../../static/img/calculator/zhu08.png'),
								name: "液化气",
								clickName: "z_yehuaqi",
								child_key: "z_yehuaqi",
								unit: "立方米",
								co2_num: 5.48,
								text: "节约能源，提高能源使用效率，从我们自己做起"
							},


						],
						key: "zhu",
						active: 3
					},
					{
						child_list: [{
								imgUrl: require('../../static/img/calculator/xing01.png'),
								name: "飞机",
								clickName: "x_feiji",
								child_key: "x_feiji",
								unit: "公里",
								co2_num: 0.275,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing02.png'),
								name: "火车",
								clickName: "x_huoche",
								child_key: "x_huoche",
								unit: "公里",
								co2_num: 0.0086,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing03.png'),
								name: "轮船",
								clickName: "x_lunchuan",
								child_key: "x_lunchuan",
								unit: "公里",
								co2_num: 0.010,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing04.png'),
								name: "地铁",
								clickName: "x_ditie",
								child_key: "x_ditie",
								unit: "站",
								co2_num: 0.10,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing05.png'),
								name: "公共汽车",
								clickName: "z_ggqc",
								child_key: "z_ggqc",
								unit: "公里",
								co2_num: 0.013,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing06.png'),
								name: "高耗油汽车",
								clickName: "z_gyhqc",
								child_key: "z_gyhqc",
								unit: "公里",
								co2_num: 0.41,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing07.png'),
								name: "中耗油汽车",
								clickName: "z_zyhqc",
								child_key: "z_zyhqc",
								unit: "公里",
								co2_num: 0.297,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},
							{
								imgUrl: require('../../static/img/calculator/xing08.png'),
								name: "低耗油汽车",
								clickName: "z_dyhqc",
								child_key: "z_dyhqc",
								unit: "公里",
								co2_num: 0.27,
								text: "请合理安排出行方式，尽量选择公共交通出行"
							},

						],
						key: "xing",
						active: 4
					},
					{
						child_list: [{
								imgUrl: require('../../static/img/calculator/yong01.png'),
								name: "纸制品",
								clickName: "x_feiji",
								child_key: "x_feiji",
								unit: "kg",
								co2_num: 3.50,
								text: "纸质品生产中会造成大量的环境污染，请避免浪费"
							},
							{
								imgUrl: require('../../static/img/calculator/yong02.png'),
								name: "塑料袋",
								clickName: "x_huoche",
								child_key: "x_huoche",
								unit: "个",
								co2_num: 0.001,
								text: "塑料袋生产中会造成大量的环境污染，请避免浪费"
							},
							{
								imgUrl: require('../../static/img/calculator/yong03.png'),
								name: "一次性筷子",
								clickName: "x_lunchuan",
								child_key: "x_lunchuan",
								unit: "双",
								co2_num: 0.001,
								text: "一次性筷子生产中会造成大量的环境污染，请避免浪费"
							},
							{
								imgUrl: require('../../static/img/calculator/yong04.png'),
								name: "洗发水",
								clickName: "x_ditie",
								child_key: "x_ditie",
								unit: "双",
								co2_num: 0.0161,
								text: "洗发水生产中会造成大量的环境污染，请避免浪费"
							},
							{
								imgUrl: require('../../static/img/calculator/yong05.png'),
								name: "玫瑰",
								clickName: "z_ggqc",
								child_key: "z_ggqc",
								unit: "支",
								co2_num: 0.183,
								text: "浪漫固然重要，环境更重要"
							},
							{
								imgUrl: require('../../static/img/calculator/yong06.png'),
								name: "城市垃圾",
								clickName: "z_gyhqc",
								child_key: "z_gyhqc",
								unit: "kg",
								co2_num: 2.06,
								text: "垃圾回收可以变废为宝，请注意回收利用"
							},


						],
						key: "yong",
						active: 5
					},
				],
				activeObj: {}, //选中后小内容
				compute_show: false, //显示输入条
				result_show: false, //显示计算结果
				category_list: [{
						name: "衣",
						active_num: "1"
					},
					{
						name: "食",
						active_num: "2"
					},
					{
						name: "住",
						active_num: "3"
					},
					{
						name: "行",
						active_num: "4"
					},
					{
						name: "用",
						active_num: "5"
					},
				],
				input_value: null, //input的值
				co2_num: null, //计算出来的co2数量

			};
		},
		methods: {
			showResult(name) {
				console.log(name)
			},
			changeNum(item) { //选择大类
				this.active = item.active_num;
				this.activeName = item.name;

				this.input_value = null;
				this.result_show = false;
				this.active_child = null
			},
			changeType(item,index) { //选择小类
				this.activeObj = item;
				this.compute_show = true;
				//初始化
				this.result_show = false;
				this.input_value = null;
				
				
				//添加active
				this.active_child = index;
				
			},
			sum_num() {
				if (!this.input_value) {
					return false
				};
				this.result_show = true;
				this.co2_num = ( Math.round((this.input_value * this.activeObj.co2_num) * 100) / 100).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.calculator {
		height: 100vh;
		// overflow: hidden;
		display: flex;
		flex-flow: column;

		.calculator-list {
			display: flex;
			overflow-y: scroll;
			position: relative;
			// flex: 1 0 auto;
			height: 52vh;

			.calculator_left {
				background-color: #FFFFFF;
				box-sizing: border-box;

				.calculator_left_item {
					width: 168rpx;
					height: 88rpx;
					line-height: 88rpx;
					color: #909999;
					text-align: center;
					border-bottom: 2rpx solid #E9E9E9;
					border-left: 8upx solid transparent;
					box-sizing: border-box;
				}

				.calculator_left_item_active {
					border-left: 8upx solid #4C9D71;
					box-sizing: border-box;
				}
			}

			.calculator_right {
				// flex: 1 0 auto;
				padding: 24rpx;
				width: 100%;
				background-color: #F8F8F8;
				overflow-y: scroll;

				.calculator_right_wrap {
					overflow-y: scroll;

					.calculator_right_main {
						// display: flex;
						flex-wrap: wrap;
						align-items: center;
						justify-content: space-around;
						height: 100%;
						overflow-y: scroll;
						.u-image__image {
							border: 1px solid transparent;
						}
						.calculator_right_main_item {
							width: 120rpx;
							// height: 120rpx;
							// background-color: #FFFFFF;
							display: inline-block;
							// justify-content: space-around;
							margin-right: 16rpx;
							margin-bottom: 24rpx;

							&:nth-child(4n) {
								margin-right: 0
							}

							.img_text {
								font-size: 24rpx;
								text-align: center;
								color: #000000;
								margin-top: 8rpx;

							}

							// flex: 1 0 auto;
						}


					}
					.calculator_right_main_active {
						.u-image__image {
							border: 1px solid #4C9D71;
						}
					}
				}

			}
		}

		.calculator-result {
			width: 100%;
			// height: 720rpx;
			height: 50vh;
			position: absolute;
			bottom: 0;
			border-top: 2rpx solid #f3f3f3;
			border-radius: 40rpx 40rpx 0px 0px;
			z-index: 10;
			background-color: #FFFFFF;
			padding: 40rpx;

			.result-top {
				display: flex;
				align-items: center;
				width: 100%;

				.title {
					width: 96rpx;
					height: 96rpx;
					line-height: 96rpx;
					text-align: center;
					font-size: 48rpx;
					border: 4rpx solid #4C9D71;
					color: #4C9D71;
					border-radius: 50%;
					// flex: 1 0 auto;
				}

				.text {
					margin: 0 64rpx;

					.text_one {
						color: #333333;
						font-size: 28rpx;
					}

					.text_two {
						color: #999999;
						font-size: 24rpx;
					}
				}

				.icon {
					flex: 1 0 auto;
				}
			}

			,
			.result_input {
				text-align: center;

				.type_name {
					margin: 32rpx 0 16rpx 0;
				}

				.input_wrap {
					width: 400rpx;
					height: 88rpx;
					line-height: 88rpx;
					background-color: #F3F3F3;
					border-radius: 200rpx;
					display: flex;
					margin: 0 auto;
					padding: 0 40rpx;
					box-sizing: border-box;
					.input_number {
						width: 80%;
						height: 88rpx;
						line-height: 88rpx;
						text-align: center;
					}
					.input_text {
						flex: 1 0 auto;
					}
				}
			}

			.btn_group {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 44rpx 0 20rpx;

				.del_btn {
					width: 152rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
					background: #FFFFFF;
					border: 2rpx solid #F3F3F3;
					font-size: 28rpx;
					color: #999999;
					border-radius: 200rpx;
					margin-right: 60rpx;

				}

				.compute_btn {
					width: 152rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
					background: #4C9D71;
					border-radius: 200rpx;
					color: #FFFFFF;
					font-size: 28rpx;
				}
			}

			.result_model {
				.co_num {

					font-size: 48rpx;
					color: #4C9D71;
					margin: 0 10rpx;
				}

				.result_model_desc {
					color: #999999;
					font-size: 24rpx;
					line-height: 40rpx;
				}
			}
		}
	}
</style>
