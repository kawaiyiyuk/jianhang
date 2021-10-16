<template>
	<view class="content">

		<view class="header">
			<view class="header-top">
				<view class="weather" @click="link_to('/pages/weather/weather')">
					<view class="weather_num">
						{{tempNow}}
					</view>
					<view class="weather_location">
						<view>{{adm1}}</view>
						<view>{{tempNowTest}}</view>
					</view>
				</view>

				<view class="header_pic">
					<view class="pic" @click="link_to('/pages/tanDetail/tanDetail')">
						<open-data style="width: 96rpx; height: 96rpx;border-radius: 50%;" class="pic_img" type="userAvatarUrl"></open-data>
						<!-- <image style="width: 96rpx; height: 96rpx;border-radius: 50%;" src="../../static/img/index/pic.jpeg" mode=""></image> -->
					</view>
					<view class="currency_num">
						<view class="num">
							{{currentNum}}
						</view>
						<view class="text">
							今日碳积分
						</view>
					</view>
				</view>
				<view class="strategy" @click="link_to('/pages/strategy/strategy')">
					<image style="width: 20rpx; height: 24rpx;margin-right: 10rpx;" src="../../static/img/index/gonglue.png" mode=""></image>
					<text>攻略</text>
					<!-- pages/strategy/strategy -->
				</view>
			</view>
			<view class="heaader_list">
				<view class="heaader_list_item" @click="show = true">
					<image style="width: 64rpx;height:68rpx;" src="../../static/img/index/list-icon-one.png" mode=""></image>
					<view>
						<text class="header_list_text">任务</text>
					</view>
				</view>
				<view class="heaader_list_item" @click="link_to('/pages/empty/empty')">
					<image style="width: 64rpx;height:68rpx;" src="../../static/img/index/list-icon-two.png" mode=""></image>
					<view>
						<text class="header_list_text">碳积分兑换</text>
					</view>
				</view>
				<view class="heaader_list_item" @click="link_to('/pages/empty/empty')">
					<image style="width: 64rpx;height:68rpx;" src="../../static/img/index/list-icon-three.png" mode=""></image>
					<view>
						<text class="header_list_text">绿宝商城</text>
					</view>
				</view>
				<view class="heaader_list_item" @click="link_to('/pages/calculator/index')">
					<image style="width: 64rpx;height:68rpx;" src="../../static/img/index/list-icon-four.png" mode=""></image>
					<view>
						<text class="header_list_text">碳计算器</text>
					</view>
				</view>
				<view class="heaader_list_item" @click="link_to('/pages/tanDetail/tanDetail')">
					<image style="width: 64rpx;height:68rpx;" src="../../static/img/index/list-icon-five.png" mode=""></image>
					<view>
						<text class="header_list_text">碳积分明细</text>
					</view>
				</view>
			</view>

			<view class="data_list">
				<view class="data_list_item">
					<view class="data_list_item_num">{{Math.floor(totalNum/100)}}</view>
					<view class="data_list_item_text">当前碳币</view>
				</view>
				<view class="data_list_item">
					<view class="data_list_item_num">{{Math.floor(currentNum/100)}}</view>
					<view class="data_list_item_text">今日碳币</view>
				</view>
				<view class="data_list_item">
					<view class="data_list_item_num">**g</view>
					<view class="data_list_item_text">碳减排量</view>
				</view>
				<!-- 				<view class="data_list_item">
					<view class="data_list_item_num">**g</view>
					<view class="data_list_item_text">碳中和量</view>
				</view> -->
			</view>
		</view>
		<view class="top-bg">
			<!-- <image style="width: 750rpx; height: 676rpx;" src="../../static/img/index/top-bg.png" mode=""></image> -->
			<image style="width: 750rpx; height: 676rpx;" src="https://photo-repository.oss-cn-shanghai.aliyuncs.com/2021/lexin-waibao/top-bg.png"
			 mode=""></image>
		</view>
		<view class="main">
			<view class="dynamic">
				<view class="dynamic-top">
					<view class="title">
						最新动态
					</view>
					<view class="desc">
						今日减排量为<text class="num">231</text>g
					</view>
				</view>

				<view class="dynamic_list">
					<view class="item_wrap" v-for="(item,index) in recent_news_list.slice(0,4)" :key="index">
						<view class="dynamic_list_item">
							<view class="dynamic_list_item_left">
								<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.behaviorNameEn" mode=""></image>
								<text>{{item.behaviorName}}</text>
							</view>
							<view class="dynamic_list_item_right">
								<view>
									获得碳积分 <text class="num_text">{{item.num}}</text>个
								</view>
								<view>
									<text class="num_text">66</text>g
								</view>
							</view>
						</view>
					</view>
					<!-- 					<view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/dynamic-qiandao.png"
							 mode=""></image>
							<text>签到</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">5</text>个
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view> -->
					<!-- <view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/dynamic-bushu.png"
							 mode=""></image>
							<text>步数</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">5</text>个
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view>
					<view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/dynamic-gjj.png"
							 mode=""></image>
							<text>公积金</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">5</text>个
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view>
					<view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/dynamic-news.png"
							 mode=""></image>
							<text>阅读新闻</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">5</text>个
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view>
					<view class="dynamic_list_item">
						<view class="dynamic_list_item_left">
							<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/dynamic-xietong.png"
							 mode=""></image>
							<text>协同办公</text>
						</view>
						<view class="dynamic_list_item_right">
							<view>
								获得碳积分 <text class="num_text">5</text>个
							</view>
							<view>
								<text class="num_text">66</text>g
							</view>
						</view>
					</view> -->
				</view>
				<view class="dynamic_list_more" @click="link_to('/pages/index/moretan')">
					更多低碳行为
				</view>
			</view>
			<view class="main_list">
				<view class="dynamic-top">
					<view class="title">
						排行榜
					</view>
					<view class="desc">
						当前排名数是第<text class="num">{{author_status == 1?rankingnum:"**"}}</text>位
					</view>
				</view>


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
					<view class="getUserInfo" v-if="author_status == 0" @click="getUserInfo">
						参与排行榜
					</view>
					<view class="list_wrap" v-if="author_status == 1">
						<view class="dynamic_list" v-show="!ranking">
							<!-- 当前排行榜 -->
							<view class="dynamic_list_item" v-for="(item,index) in dynamic_list_now" :key="index">
								<view class="dynamic_list_item_left">
									<image v-if="index == 0" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/jin.png"></image>
									<image v-if="index == 1" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/yin.png"></image>
									<image v-if="index == 2" style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" src="../../static/img/index/tong.png"></image>
									<text v-if="index >2 " style="width: 64rpx; height: 64rpx;line-height: 64rpx;font-size:32rpx;margin-right: 12rpx;text-align: center;">4</text>
									<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.avatarUrl" mode=""></image>
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
									<image style="width: 64rpx; height: 64rpx; margin-right: 12rpx;" :src="item.avatarUrl" mode=""></image>
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

				<view v-if="author_status == 1" class="dynamic_list_more" @click="link_to('/pages/index/morelist')">
					更多排行榜
				</view>

			</view>
		</view>

		<view class="pop">
			<u-popup class="pop_wrap" v-model="show" mode="bottom" height="70%" border-radius="34">

				<view class="title">
					<view class="dynamic-top">
						<view class="title">
							碳积分规则
						</view>
						<view class="desc">
							当日获得<text class="num">{{currentNum}}</text>积分
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 80%;padding-bottom: 6%;">

					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">首次登录</view>
							<!-- <view class="btn btn_green">去完成</view> -->
							<view class="btn btn_gray">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-qiandao.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									仅限第一次登入领取
								</view>
								<view>
									1.登入即自动领取2000碳积分
								</view>
							</view>
						</view>
					</view>


					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">签到</view>
							<!-- <view class="btn btn_green">去完成</view> -->
							<view class="btn btn_gray">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-qiandao.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每天能获取一次并且连续获取有奖励
								</view>
								<view>
									1.登入即签到成功，同一账号每天可签到一次，签到可获取碳积分。碳积分直接发放至用户账号
								</view>
								<view>
									2.连续签到天数小于5天时，每天获取1个碳积分。
								</view>
								<view>
									3.连续签到天数大于5天及以上是，每天获取2个碳积分。
								</view>
								<view>
									4.若中断签到，则重新开始计算连续签到天数。
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">步数</view>
							<view class="btn btn_green" @click="link_to('/pages/bushu/bushu')" v-if="task_key_list.bushu">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.bushu">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-bushu.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									按提交数阶梯增加有上限
								</view>
								<view>
									1.步数8000步（含）以上积累20碳积分、6000-8000步15碳积分，6000步以下无碳积分。
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">垃圾分类</view>
							<view class="btn btn_green" @click="link_to('/pages/empty/empty')" v-if="task_key_list.laji">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.laji">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-laji.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									敬请期待
								</view>
								<!-- <view>
									1.敬请期待
								</view> -->
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">阅读新闻</view>
							<!-- <view class="btn btn_green" @click="link_to('/pages/webView/webView?src='+'http://www.gjxq.gov.cn/')">去完成</view> -->
							<view class="btn btn_green" @click="finish_task(3,'http://www.gjxq.gov.cn/')" v-if="task_key_list.news">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.news">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-news.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每天限一次
								</view>
								<view>
									1.当日阅读新闻可领取5碳积分
								</view>
								<!-- <view>
									2.每天限一次
								</view> -->
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">协同办公</view>
							<view class="btn btn_green" @click="link_to('/pages/empty/empty')" v-if="task_key_list.xietong">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.xietong">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-bangong.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									1.敬请期待
								</view>
								<view>
									<!-- 1.敬请期待 -->
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">公积金</view>
							<!-- <view class="btn btn_green" @click="link_to('/pages/empty/choseUrl?urlName='+'gjj')" v-if="task_key_list.gjj">去完成</view> -->
							<view class="btn btn_green" @click="finish_task_link(4,'/pages/empty/choseUrl?urlName='+'gjj')" v-if="task_key_list.gjj">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.gjj">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-gjj.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每天限一次
								</view>
								<view>
									1.当日查询可领取10碳积分
								</view>
								<!-- <view>
									2.每天限一次
								</view> -->
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">不动产</view>
							<!-- <view class="btn btn_green" v-if="task_key_list.budong" @click="link_to('/pages/webView/webView?src='+'https://wt.jxzfgjj.cn/wx/html/bdzh.html;jsessionid=3BDC9D5A20E0FF21115B0A43B421A9DE?id=11&timestamp=1632621207977')">去完成</view> -->
							<view class="btn btn_green" v-if="task_key_list.budong" @click="finish_task(5,'https://wt.jxzfgjj.cn/wx/html/bdzh.html;jsessionid=3BDC9D5A20E0FF21115B0A43B421A9DE?id=11&timestamp=1632621207977')">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.budong">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-budong.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每天限一次
								</view>
								<view>
									1.每查询一次可领取10个碳积分
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">医保</view>
							<!-- <view class="btn btn_green" v-if="task_key_list.yibao" @click="link_to('/pages/empty/choseUrl?urlName='+'shebao')">去完成</view> -->
							<view class="btn btn_green" v-if="task_key_list.yibao" @click="finish_task_link(6,'/pages/empty/choseUrl?urlName='+'shebao')">去完成</view>
							<view class="btn btn_gray" v-if="!task_key_list.yibao">已完成</view>
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-yibao.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每天限一次
								</view>
								<view>
									1.每查询一次可领取10个碳积分
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">邀请好友</view>
							<view class="btn btn_green" @click="link_to('/pages/index/invitation')">去完成 </view>
							<!-- <view class="btn btn_gray">已完成</view>
							-->
						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-yaoqing.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									每次都能获取无限制
								</view>
								<view>
									1.每成功邀请一次可领取15碳积分
								</view>
							</view>
						</view>
					</view>
					<view class="pop_item">
						<view class="pop_item_top">
							<view class="top_title">绿色消费</view>
							<view class="btn btn_green" v-if="task_key_list.xiaofei" @click="link_to('/pages/empty/empty')">去完成 </view>
							<view class="btn btn_gray" v-if="!task_key_list.xiaofei">已完成</view>

						</view>
						<view class="pop_item_list">
							<view class="pop_item_list_left">
								<image style="width: 96rpx;height: 96rpx; border-radius: 50%;" src="../../static/img/index/dynamic-xiaofei.png"
								 mode=""></image>
							</view>
							<view class="pop_item_list_right">
								<view class="right_title">
									敬请期待
								</view>
								<!-- <view>
									1、每月获取上限
								</view> -->
							</view>
						</view>
					</view>
				</scroll-view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	const BaseUrl = "https://api.qweather.com/"
	const key = "3227b6748fda4b88a499b475dc8a50f3"
	import {
		generalRequest,
		myRequest
	} from "../../utils/api.js"
	export default {
		data() {
			return {
				title: 'Hello',
				temp: "0",
				ranking: false,
				dynamic_list_now: [],
				dynamic_list_his: [],
				show: false,
				adm1: "",
				adm2: "",
				tempNow: "0",
				tempNowTest: "",
				currentNum: 0,
				totalNum: 0,
				recent_news_list: [], //最新动态列表
				author_status: 1, // 用户是否授权 1未授权 0 已授权
				task_key_list: {},
				rankingnum: 0
			}
		},
		methods: {

			login() {
				return new Promise((resolve, reject) => {
					let _this = this;
					uni.showLoading({
						title: '登录中...'
					});
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							let code = loginRes.code;
							myRequest({
									url: "/wxminiprogram/miniAuth",
									method: "POST",
									data: {
										code: code
									}
								})
								.then(res => {
									// console.log(res.data.data);
									uni.setStorageSync('authToken', {
										token: res.data.data.authToken
									});
									uni.setStorageSync('openid', {
										openid: res.data.data.openid
									});
									uni.setStorageSync('userid', {
										userid: res.data.data.id
									});
									resolve()
									uni.hideLoading();
								})
								.catch(err => {
									throw Error(err)
								})



							//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息

						},
						fail: function(err) {
							console.log(err)
						}
					});
					// return Promise
					// wx.checkSession({
					// 	success() {
					// 		//session_key 未过期，并且在本生命周期一直有效
					// 	},
					// 	fail() {
					// 		// session_key 已经失效，需要重新执行登录流程
					// 		uni.login({
					// 			provider: 'weixin',
					// 			success: function(loginRes) {
					// 				let code = loginRes.code;

					// 				console.log(loginRes)
					// 				myRequest({
					// 						url: "/wxminiprogram/miniAuth",
					// 						method: "POST",
					// 						data: {
					// 							code: code
					// 						}
					// 					})
					// 					.then(res => {
					// 						console.log(res.data.data);
					// 						uni.setStorageSync('authToken', {
					// 							token: res.data.data.authToken
					// 						});
					// 						uni.setStorageSync('openid', {
					// 							openid: res.data.data.openid
					// 						});
					// 						uni.setStorageSync('userid', {
					// 							userid: res.data.data.id
					// 						});
					// 						uni.hideLoading();
					// 					})
					// 					.catch(err => {
					// 						throw Error(err)
					// 					})



					// 				//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息

					// 			},
					// 			fail: function(err) {
					// 				console.log(err)
					// 			}
					// 		});
					// 	}
					// })
				})

			},

			link_to(page) {
				uni.navigateTo({
					url: page
				})
			},
			bindGetLocation(e) { //获取定位信息
				let that = this;
				wx.showLoading({
					title: '加载中…'
				});
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
										// console.log(res.data);
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
												// console.log("实时天气:", res.data);
												// alert(res.data)
												that.tempNow = res.data.now.temp + '°';
												that.tempNowTest = res.data.now.text;
												that.feelsLike = res.data.now.feelsLike;
											}
										});


										wx.hideLoading()
									}
								});




								// console.log('当前位置的经度：' + res.longitude);
								// console.log('当前位置的纬度：' + res.latitude);
							}
						})
					}
				})
			},

			copytext(url) { //复制文本
				let that = this;
				wx.setClipboardData({
					data: url,
					success(res) {
						// console.log(res)
						wx.getClipboardData({
							success(res) {
								wx.showToast({
									title: '已复制到剪切板'
								})
							},
							duration: 2000
						})
					}
				})
			},
			user_info() { //获取用户积分
				generalRequest({
						url: "/carboncoindetail/personalIntegral",
						data: {
							timeType: 1,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						// console.log(res);
						let data = res.data.data;
						this.currentNum = data.currentIntegral
						this.totalNum = data.cumulativeIntegral
					})
					.catch(err => {
						throw Error(err)
					})
				// POST /carboncoindetail/detail
			},
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
						let recent_news_list = [];
						let task_key_list = {};
						//console.log(data)

						data.map((item, index) => {
							if (item.num > 0) {
								// console.log(task_key_list[item.behaviorNameEn])
								task_key_list[item.behaviorNameEn] = false
							} else {
								task_key_list[item.behaviorNameEn] = true
							}



							item.behaviorNameEn = '../../static/img/index/dynamic-' + item.behaviorNameEn + '.png';
							recent_news_list.push(item)
						})
						this.recent_news_list = recent_news_list;
						this.task_key_list = task_key_list;
						// console.log(res);
					})
					.catch(err => {
						throw Error(err)
					})
			},
			user_sign_in() { //用户签到
				generalRequest({
						url: "/carboncoindetail/save",
						data: {
							behaviorType: 1,
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						// console.log(res)
						let data = res.data.data;


					})
					.catch(err => {
						throw Error(err)
					})
			},

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
			getUserInfo(res) { //用户排行榜授权
				let _that = this;
				wx.getUserProfile({
					desc: '用于完善排行榜资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (userRes) => {
						console.log(userRes)
						let userinfo = userRes.userInfo;
						userinfo = Object.assign(userinfo, {
							id: uni.getStorageSync('userid').userid,
							status: 1
						})

						generalRequest({
								url: "/user/update",
								data: userinfo
							})
							.then((res) => {
								// console.log(res)
								let data = res.data.data;
								_that.get_author(); //授权完毕 刷新页面

							})
							.catch(err => {
								throw Error(err)
							})

					}
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
						if (data.status == 0) {
							this.author_status = 0
						} else {
							this.author_status = 1
						}


					})
					.catch(error => {
						throw Error(error)
					})
			},

			finish_task(num, text) { //去完成任务
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
			finish_task_link(num, link) { //去完成任务
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
						this.link_to(link)
					})
					.catch(err => {
						throw Error(err)
					})
			},

			get_user_num() { //获取用户当前排名
				// integralRanking

				generalRequest({
						url: "/carboncoindetail/integralRanking",
						data: {
							userId: uni.getStorageSync('userid').userid
						}
					})
					.then((res) => {
						this.rankingnum = res.data.data.ranking
						// console.log(res)
					})
					.catch(error => {

					})
			},
			info() {
				this.bindGetLocation();
				this.user_info();
				this.get_tail();
				this.getUserInfo();
				//this.get_author(); //获取用户是否授权
				this.get_user_num();
				setTimeout(() => {
					// this.get_recent_news();
					this.user_sign_in();
				}, 500)
				this.get_recent_news()
			},
			onLoad: function() {
				let _this = this;
				Promise.all([
					this.login(),
				]).then(res => {
					/* 你的逻辑代码 */
					_this.bindGetLocation();
					_this.user_info();
					_this.get_tail();
					_this.getUserInfo();
					_this.get_author(); //获取用户是否授权
					_this.get_user_num();
					setTimeout(() => {
						_this.get_recent_news();
						_this.user_sign_in();
					}, 500)
				})

			},
			onShow: function() {

			}
		}
	}
</script>

<style lang="scss">
	.num_text {
		color: #4C9D71;
		margin: 0 10rpx;
	}

	.u-drawer__scroll-view {
		background-color: #f8f8f8;
	}

	.header {
		width: 750rpx;
		height: 676rpx;
		position: relative;
		z-index: 5;

		// background-color: red;
		.header-top {
			color: #FFFFFF;
			position: relative;

			.weather {
				display: flex;
				align-items: center;
				margin: 12rpx 0 0 32rpx;

				// width: 200rpx;
				.weather_num {
					font-size: 96rpx;
					margin-right: 10rpx;
				}

				.weather_location {}
			}

			.header_pic {
				position: absolute;
				right: 0;
				top: 50rpx;
				width: 216rpx;
				height: 96rpx;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 100px 0px 0px 100px;
				display: flex;

				.pic {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
					overflow: hidden;

					.pic_img {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}
				}

				.currency_num {
					flex: 1 0 auto;
					text-align: center;

					.num {
						font-size: 36rpx;
						color: #4C9D71;
						font-weight: bold;
						margin-top: 10rpx;
					}

					.text {
						font-size: 20rpx;
					}
				}
			}

			.strategy {
				width: 128rpx;
				height: 46rpx;
				position: absolute;
				right: 0;
				top: 170rpx;
				background: #4C9D71;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 22rpx 0px 0px 22rpx;

				.text {
					margin-left: 10rpx;
				}
			}
		}

		.heaader_list {
			width: 750rpx;
			display: flex;
			padding: 0 30rpx;
			position: absolute;
			bottom: 100rpx;

			.heaader_list_item {
				display: flex;
				flex-flow: column;
				width: 20%;
				justify-content: center;
				align-items: center;

				.header_list_text {
					background-color: #FFFFFF;
					height: 30rpx;
					border-radius: 200rpx;
					padding: 0 12rpx;
					font-size: 20rpx;
					color: #4C9D71;
				}
			}
		}

		.data_list {
			width: 654rpx;
			height: 120rpx;
			background-color: #FFFFFF;
			border-radius: 60rpx;
			position: absolute;
			bottom: -60rpx;
			left: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 40rpx;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

			.data_list_item {
				width: 25%;
				text-align: center;

				.data_list_item_num {
					font-size: 40rpx;
					color: #4C9D71;
				}

				.data_list_item_text {
					font-size: 24rpx;
				}
			}

		}
	}

	.top-bg {
		position: absolute;
		top: 0;
		z-index: 1;
	}

	.main {
		background-color: #f8f8f8;
		width: 750rpx;
		height: 1000rpx;
		padding: 100rpx 0 0;

		.dynamic {

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
		}

		.main_list {
			margin-top: 40rpx;
			padding-bottom: 40rpx;

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

				.getUserInfo {
					width: 100%;
					height: 400rpx;
					line-height: 400rpx;
					text-align: center;
					color: #4C9D71;
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
		}

	}

	.pop {
		padding: 0 16rpx;

		.pop_wrap {

			.title {
				.dynamic-top {
					display: flex;
					justify-content: space-between;
					padding: 32rpx 48rpx;
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
			}

			.pop_item {
				padding: 0 48rpx;
				background-color: #FFFFFF;
				border-radius: 32rpx;
				margin: 16rpx;

				.pop_item_top {
					display: flex;
					justify-content: space-between;
					height: 96rpx;
					line-height: 96rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #f3f3f3;

					.top_title {
						font-weight: bold;
					}

					.btn {
						width: 180rpx;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						border-radius: 200rpx;

					}

					.btn_gray {
						background-color: #F3F3F3;
						color: #999999;
					}

					.btn_green {
						background-color: #4C9D71;
						color: #FFFFFF;
					}

				}

				.pop_item_list {
					display: flex;
					padding: 30rpx 0;

					.pop_item_list_left {
						width: 20%;
						flex: 1 0 auto;
					}

					.pop_item_list_right {
						text-align: left;
						line-height: 40rpx;
						font-size: 24rpx;
						color: #999999;
						width: 80%;

						.right_title {
							font-size: 28rpx;
							color: #4C9D71;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
