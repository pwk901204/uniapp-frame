<template>
	<view class="vip-dialog">
		<view class="vip-dialog-bg"></view>
		<view class="vip-dialog-content">
			<view class="vip-dialog-box">
				<view class="vip-dilog-title">
					<text>恭喜您获得</text>
				</view>
				<view class="vip-dilog-title">
					<text>AI之光路演<text class="text-light">{{ userinfo.auditVipDays || 0 }}天VIP</text>会员体验</text>
				</view>
				<view class="vip-dilog-title2">
					<text>您将享受如下特权</text>
				</view>
				<view class="vip-dilog-list flex_row_center">
					<view class="vip-dilog-item">
						<image src="../../static/mine/vip-card2.png" mode="aspectFit"></image>
						<view class="card-title">
							<text>BP在线预览</text>
						</view>
					</view>
					<view class="vip-dilog-item">
						<image src="../../static/mine/vip-card1.png" mode="aspectFit"></image>
						<view class="card-title">
							<text>项目无限查看</text>
						</view>
					</view>
					<view class="vip-dilog-item">
						<image src="../../static/mine/vip-card3.png" mode="aspectFit"></image>
						<view class="card-title">
							<text>沟通及时性</text>
						</view>
					</view>
				</view>
				<view class="dialog-close" @click="closeModal">
					<image src="../../static/mine/dialog-close.png" mode="aspectFit"></image>
				</view>
			</view>
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
		computed: {
			userinfo () {
				return this.$store.state.userinfomore
			}
		},
		onLoad(options) {
		},
		methods:{
			closeModal () {
				// this.$store.commit('setFirstLoad', false)
				this.$api.test2('/rest/user/updateOpenVipWindow.do', {}).then((res) => {
					res = res.data
					if (res.flag) {
						this.$api.test2('/rest/user/querySimpleUserInfo.do', {}).then((res) => {
							res = res.data
							if (res.flag) {
								this.$store.commit('setUserinfoMore', res.data)
							}
						}).catch(() => {
							// uni.showToast({title: '登录失败', icon:"none"});
						})
					}
				}).catch(() => {
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			}
		}
	}
</script>

<style lang="scss">
	.vip-dialog{
		position: fixed;
		width: 100%;
		height: 100%;
		.vip-dialog-bg{
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: #000000;
			opacity: 0.4;
			z-index: 9997;
		}
		.vip-dialog-content{
			position: fixed;
			top: 30%;
			left: 0;
			width: 100%;
			z-index: 9999;
			.vip-dialog-box{
				position: relative;
				margin: 0 auto;
				width: 604upx;
				height: 464upx;
				padding: 40upx;
				box-sizing: border-box;
				background-color: #FFFFFF;
				border-radius: 20upx;
				.dialog-close{
					position: absolute;
					top: 10upx;
					right: 20upx;
					width: 26upx;
					height: 26upx;
				}
				.dialog-close image{
					width: 100%;
					height: 100%;
				}
				.vip-dilog-title{
					color: #333333;
					font-size: 32upx;
					line-height: 32upx;
					padding-bottom: 30upx;
					font-weight: bold;
					.text-light{
						color: #c89f53;
					}
				}
				.vip-dilog-title2{
					color: #333333;
					font-size: 28upx;
					line-height: 28upx;
					padding-bottom: 30upx;
					margin-top: 30upx;
				}
				.vip-dilog-list{
					.vip-dilog-item{
						flex-grow: 1;
						text-align: center;
						color: #333333;
						font-size: 22upx;
						line-height: 22upx;
					}
					.vip-dilog-item image {
						width: 100upx;
						height: 100upx;
					}
					.vip-dilog-item text{
						padding-top: 30upx;
					}
				}
			}
		}
	}
	
</style>
