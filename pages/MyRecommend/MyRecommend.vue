<template>
	<view class="myRecommend">
		<image class="myRecommend-bg" src="../../static/recommand/bg.png"></image>
		<view class="myRecommend-wrap">
			<view class="myRecommend-header">
				<text>
					“已成功累计获得\n{{dataList.totalCount || 0}}天VIP会员”
				</text>
				<image src="../../static/recommand/vip.png"></image>
			</view>
			<view class="myRecommend-main">
				<view class="main-title">任务列表</view>
				<view class="main-list">
					<view class="lists-item flex_row" v-if="bStop">
						<image src="../../static/recommand/logo.png"></image>
						<view class="content">
							<view class="title ell">
								{{ dataList.title || '' }}
								<text>+{{ dataList.canUpCount || '' }}天</text>
							</view>
							<view class="text ell">{{ dataList.content || '' }}</view>
						</view>
						<view class="share">
							
							<button v-if="dataList.currentCount >= dataList.baseCount" class="finished" round size="small">已完成</button>
							<button v-else round size="small" open-type="share">去分享</button>
							<view>已完成{{ dataList.currentCount}}/{{ dataList.baseCount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryMyCommand, addVipCount } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			return {
				dataList: {},
				bStop: false
			}
		},
		onLoad() {
			this.queryTaskList();
		},
		onShareAppMessage () {
			
			addVipCount({
				vipGetType: '1'
			}).then(() => {
				this.queryTaskList();
			})
			
			return {
				title: this.dataList.title,
				path: '/pages/tabBar/HomePage/HomePage'
			}
		},
		methods: {
			async queryTaskList() {
				const res = await queryMyCommand({});
				this.dataList = res.data.data;
				this.bStop = true;
			}
		}
	}
</script>

<style lang="scss">
.myRecommend{ 
	background-color: #252525;
	height: 100vh;
	position: relative;
	&-wrap{
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
	}
	&-header{
		height: 360upx;
		padding: 54upx 75upx 0 75upx;
		box-sizing: border-box;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		text{
			font-size: 56upx;
			letter-spacing: 0.05em;
			color: #815f34;
			margin-top: 66upx;
			text-align: center;
			line-height: 1.2;
			position: absolute;
			left: 0;
			right: 0;
		}
	}
	&-bg{
		position: absolute;
		top: 0;
	}
	&-main{
		background: #fff;
		margin: 0 30upx;
		border-radius: 10upx;
		height: calc(100% - 390upx);
		.main-title {
			height: 95upx;
			text-align: center; 
			line-height: 95upx;
			font-size: 30upx;
			font-weight: bold;
			color: #815f34;
		}
	}
	.main-list{
		height: calc(100% - 95upx);
		overflow: auto;
		&>view {
			margin: 0 30upx 30upx 30upx; 
			padding: 25upx 20upx 20upx 30upx;
			background: #faeed7;
			border-radius: 10upx;
		}
		image{
			width: 90upx;
			height: 90upx;
			margin-top: 5rpx;
		}
		button{
			height: 54upx;
			line-height: 1.3;
			padding: 12upx 25upx;
			font-size: 26upx;
			 color: #fff;
			border-radius: 54upx;
			background-image: linear-gradient( -90deg, rgb(255,118,76) 0%, rgb(255,169,119) 100%);
			&.finished{
				opacity: 0.6;
			}
		}
		.content{
			box-sizing: border-box;
			flex: 1;
			padding: 0 20upx;
			overflow: hidden;
			.title{
				font-size: 28upx;
				color: #815f34;
				font-weight: bold;
				text{
					color: #fff;
					font-size: 28upx;
					border-radius: 20upx 20upx 20upx 0;
					background: #ff7e53;
					padding: 5upx 10upx;
					margin-left: 14upx;
					font-weight: normal;
					vertical-align: 0.2em;
				}
			}
			.text{
				font-size: 26rpx;
				color: #815f34;
			}
		}
		.share{
			font-size: 24upx;
			color: #815f34;
			&>view{
				font-size: 24upx;
				color: #815f34;
				text-align: right;
			}
		}
	}
}
</style>
