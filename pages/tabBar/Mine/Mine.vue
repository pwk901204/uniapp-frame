<template>
	<view class="page-mine" :style="'height:' + windowHeight + 'rpx;'">
		<view class="mine-header" :class="{'small-header': !userinfo.username}">
			<image class="header-bg" src="../../../static/mine/my-bg.png" v-if="userinfo.username && userinfo.vipState === 1" mode="aspectFit"></image>
			<image class="header-bg" src="../../../static/mine/my-bg2.png" v-else mode="aspectFit"></image>
			<view class="mine-card">
				<view class="mine-card-bg">
					<image src="../../../static/mine/mine-card-bg.png" v-if="userinfo.username && userinfo.vipState === 1" mode="aspectFit"></image>
					<image src="../../../static/mine/mine-card-bg3.png" v-if="userinfo.username && userinfo.vipState !== 1 && userinfo.type !== '2'" mode="aspectFit"></image>
					<image src="../../../static/mine/mine-card-bg4.png" v-if="!userinfo.username || userinfo.type === '2'" mode="aspectFit"></image>
				</view>
				<div class="mine-card-info">
					<view class="ming-card-top" v-if="userinfo.username && userinfo.type !== '2'" @click="turnTovipjs">
						<text>会员介绍</text>
					</view>
					<view class="mine-card-info-box flex_row_center" :class="{'old': (!userinfo.username || userinfo.vipState === 0) }" @click="loginCall">
						<view class="user-photo flex_row_center">
							<image :src="userPhoto" mode="aspectFill"></image>
						</view>
						<view class="user-info">
							<view class="user-info-one flex_row_justify_center" v-if="userinfo.username">
								<view class="item name"><text>{{ userinfo.username }}</text></view>
								<view class="item zw"><text>{{ userinfo.job }}</text></view>
								<view class="item state rz" v-if="userinfo.username && userinfo.state === '1'">
									<text>已认证</text>
								</view>
								<view class="item state notrz" v-if="userinfo.username && userinfo.state === '0'">
									<text>未通过</text>
								</view>
								<view class="item state notrz" v-if="userinfo.username && userinfo.state === '3'">
									<text>待审核</text>
								</view>
							</view>
							<view class="user-info-one user-info-one2 flex_row_justify_center" v-else> 
								<view class="item name"><text>未登陆</text></view>
							</view>
							<view class="user-info-two flex_row_justify_center" v-if="userinfo.username && userinfo.vipState === 1 && userinfo.showVipInfo === '1'">
								<image src="../../../static/mine/vip.png" mode="aspectFit"></image>
								<text>有效期至<text>{{ userinfo.vipEndTimeStr }}</text></text>
							</view>
							<view class="user-info-two flex_row_justify_center" v-if="userinfo.username && userinfo.vipState === 0 && userinfo.showVipInfo === '1'">
								<image src="../../../static/mine/vip2.png" mode="aspectFit"></image>
								<text>VIP已过期</text></text>
							</view>
							<view class="user-info-three" v-if="userinfo.username">
								<text>{{ userinfo.companyName }}</text>
							</view>
							<view class="icon-right" v-if="userinfo.username">
								<image src="../../../static/mine/icon-right2.png" v-if="userinfo.type === '1' && userinfo.vipState === 1" mode="aspectFit"></image>
								<image src="../../../static/mine/icon-right.png" v-else mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</div>
				<view class="user-card-box flex_row_center" v-if="userinfo.username">
					<view class="user-card-item" @click="jumpToCommand('/pages/MyRecommend/MyRecommend')">
						<vew>
							<image src="../../../static/mine/card1.png" v-if="userinfo.vipState === 1" mode="aspectFit"></image>
							<image src="../../../static/mine/card1-1.png" v-else mode="aspectFit"></image>
						</vew>
						<view class="card-title">
							<text>我的推荐</text>
						</view>
					</view>
					<view class="user-card-item" @click="jumpTo('/pages/NameCard/NameCard')">
						<image src="../../../static/mine/card2.png" v-if="userinfo.vipState === 1" mode="aspectFit"></image>
						<image src="../../../static/mine/card2-1.png" v-else mode="aspectFit"></image>
						<view class="card-title">
							<text>名片夹</text>
						</view>
					</view>
					<view class="user-card-item" @click="jumpTo('/pages/Collection/Collection')">
						<image src="../../../static/mine/card3.png" v-if="userinfo.vipState === 1" mode="aspectFit"></image>
						<image src="../../../static/mine/card3-1.png" v-else mode="aspectFit"></image>
						<view class="card-title">
							<text>收藏</text>
						</view>
					</view>
					<view class="user-card-item">
						<image src="../../../static/mine/card4.png" v-if="userinfo.vipState === 1" mode="aspectFit"></image>
						<image src="../../../static/mine/card4-1.png" v-else mode="aspectFit"></image>
						<view class="card-title">
							<text>我的申请</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mine-abous" @click="turnToAboutus">
			<text>关于我们</text>
			<image src="../../../static/Regis/icon-right.png" mode="aspectFit"></image>
		</view>
		<view class="mine-btn" v-if="userinfo.username">
			<view class="btn"  @click="loginOut">退出登录</view>
		</view>
		<vip-dialog class="vip-dialog" v-if="userinfo.username && userinfo.needOpenVipWindow === '1'" :style="'height:' + windowHeight + 'rpx;'"></vip-dialog>
	</view>
    <!-- <view class="uni-container">
		<text v-if="userinfo && userinfo.token">我的</text>
		<text v-else @click="loginCall">登陆</text>
    </view> -->
</template>
<script>
	import VipDialog from '../../Mine/VipDialog.vue'
    export default {
		components: {
			VipDialog
		},
        data() {
            return {
				windowHeight: 0,
				defaultPhotoGr: '../../../static/mine/grtx.png',
				defaultPhotoQy: '../../../static/mine/qytx.png'
            };
        },
        onLoad() {
			this.initHeight()
        },
        onReady() {
        },
        onShow() {
			if (this.userloginInfo && this.userloginInfo.token) {
				this.getUserMoreInfo()
			}
        },
        onHide() {
        },
		computed: {
			userPhoto () {
				let userinfo = this.$store.state.userinfomore
				if (userinfo.username) {
					if (userinfo.headerImage) {
						return this.$api.viewFile(userinfo.headerImage)
					} else {
						if (userinfo.type === '1') {
							return this.defaultPhotoGr
						} else {
							return this.defaultPhotoQy
						}
					}
				} else {
					return this.defaultPhotoGr
				}
			},
			userloginInfo () {
				return this.$store.state.userinfo
			},
			userinfo () {
				return this.$store.state.userinfomore
			},
			firstLoad () {
				return this.$store.state.firstLoad
			}
		},
        methods: {
			initHeight () {
				let that = this
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res.windowHeight);
						let clientHeight = res.windowHeight,
							clientWidth = res.windowWidth,
							rpxR = 750 / clientWidth;
						that.windowHeight = clientHeight * rpxR
				    }
				});
			},
			getUserInfo () {
				let userinfo = this.$store.state.userinfo
				this.userinfo = userinfo
				console.log(userinfo)
			},
			getUserMoreInfo () {
				this.$api.test2('/rest/user/querySimpleUserInfo.do', {
					_noLoading: true
				}).then((res) => {
					res = res.data
					if (res.flag) {
						this.$store.commit('setUserinfoMore', res.data)
					} else {
						this.$store.commit('logout')
					}
				}).catch(() => {
					this.$store.commit('logout')
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			},
			turnTovipjs () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				uni.navigateTo({
				    url: '/pages/Mine/VipInfo'
				});
			},
			turnToAboutus () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				uni.navigateTo({
				    url: '/pages/Mine/aboutus'
				});
			},
			loginCall () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				if (this.userinfo.username) {
					if (this.userinfo.type === '1') {
						uni.navigateTo({
						    url: '/pages/Regis/Audit/Audit?page=mine'
						});
					} else {
						uni.navigateTo({
						    url: '/pages/Regis/Project/Project?page=mine'
						});
					}
				} else {
					uni.navigateTo({
					    url: '/pages/Login/Login'
					});
				}
				
			},
			async jumpToCommand(url) {
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'5001'})
				if(!permissionValidation) return
				uni.navigateTo({
					url: url
				})
			},
			// 跳转到其他页面
			jumpTo(url)  {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				uni.navigateTo({
					url: url
				})
			},
			loginOut () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let that = this
				uni.showModal({
				    title: '',
				    content: '是否确认退出当前账号',
				    success: function (res) {
				        if (res.confirm) {
				            that.loginOutPost()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			loginOutPost () {
				this.$api.test2('/rest/user/logout.do', {}).then((res) => {
					res = res.data
					if (res.flag) {
						uni.showToast({title: res.message || '退出成功', icon:"success"});
						this.$store.commit('setUserinfo', {})
						this.$store.commit('setUserinfoMore', {})
					} else {
						// uni.showToast({title: res.message || '退出失败', icon:"none"});
					}
					
				}).catch(() => {
					
				})
			}
        }
    };
</script>

<style>
	@import url("./Mine.less");
</style>
