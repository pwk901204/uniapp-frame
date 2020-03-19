<template>
	<view class="page-vip-info">
		<view class="header-bg">
			<image src="../../static/mine/vip-info-bg.png" mode="aspectFit"></image>
		</view>
		<view class="vip-info">
			<view class="vip-info-header flex_row_center">
				<image src="../../static/mine/vip-title1.png" mode="aspectFit"></image>
				<text>AI之光路演平台的VIP会员享有哪些特权？</text>
				<image src="../../static/mine/vip-title2.png" mode="aspectFit"></image>
			</view>
			<view class="vip-info-card flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card1.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>项目无限查看</text>
					</view>
					<view class="vard-title2">
						<text>享受每日无限次查看全平台的优质项目</text>
					</view>
				</view>
			</view>
			<view class="vip-info-card flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card2.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>BP在线预览</text>
					</view>
					<view class="vard-title2">
						<text>享受在线预览融资项目BP</text>
					</view>
				</view>
			</view>
			<view class="vip-info-card flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card3.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>沟通及时性</text>
					</view>
					<view class="vard-title2">
						<text>享受一键拨打融资方联系人电话</text>
					</view>
				</view>
			</view>
			<view class="vip-info-card flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card4.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>其他特权</text>
					</view>
					<view class="vard-title2">
						<text>享受平台其他专属特权</text>
					</view>
				</view>
			</view>
			<view class="vip-info-header flex_row_center">
				<image src="../../static/mine/vip-title1.png" mode="aspectFit"></image>
				<text>如何成为AI之光路演平台的VIP会员?</text>
				<image src="../../static/mine/vip-title2.png" mode="aspectFit"></image>
			</view>
			<view class="vip-info-card vip-info-card2 flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card5.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>每日成功分享一次小程序</text>
					</view>
					<view class="vard-title2">
						<text>将获得<text class="text-light">1天</text>VIP会员</text>
					</view>
				</view>
			</view>
			<!-- <view class="vip-info-card vip-info-card2 flex_row_center">
				<view class="card-left">
					<image src="../../static/mine/vip-card6.png" mode="aspectFit"></image>
				</view>
				<view class="card-right">
					<view class="card-title">
						<text>成功邀请一个投资人注册</text>
					</view>
					<view class="vard-title2">
						<text>将获得<text class="text-light">5天</text>VIP会员</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		components:{
		},
		onLoad(options) {
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.page-vip-info{
		position: relative;
		min-height: 100%;
		height: 100%;
		background-color: #f9f6f1;
		.header-bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 425upx;
			z-index: 0;
		}
		.header-bg image{
			width: 100%;
			height: 100%;
		}
		.vip-header{
			margin: 0 auto;
			padding: 60upx 20upx 160upx 20upx;
			color: #f1d1a0;
			.header1{
				font-size: 28upx;
				line-height: 28upx;
				padding-bottom: 30upx;
				// text-align: center;
			}
			.header2{
				font-size: 24upx;
				line-height: 40upx;
			}
		}
		.vip-info{
			padding: 480upx 28upx 0 28upx;
		}
		.vip-info-header{
			padding: 10upx 0 40upx 0;
			font-size: 28upx;
			line-height: 28upx;
			color: #333333;
		}
		.vip-info-header image{
			width: 71upx;
			height: 14upx;
		}
		.vip-info-header text{
			flex-grow: 1;
			width: 0;
			text-align: center;
			font-weight: bold;
		}
		.vip-info-card{
			margin-bottom: 30upx;
			padding: 20upx;
			background-color: #FFFFFF;
			.card-left{
				width: 100upx;
				height: 100upx;
				margin-right: 28upx;
			}
			.card-left image{
				width: 100%;
				height: 100%;
			}
			.card-right{
				width: 0;
				flex-grow: 1;
				font-size: 28upx;
				color: #333333;
				line-height: 28upx;
				.card-title{
					font-weight: bold;
				}
				.card-title2{
					font-size: 28upx;
					color: #333333;
					line-height: 28upx;
				}
				.text-light{
					color: #c89f53;
				}
			}
		}
		.vip-info-card2{
			padding: 0;
			.card-left{
				width: 122upx;
				height: 141upx;
				margin-right: 28upx;
			}
		}
	}
</style>
