<template>
	<view class="login-page">
		<image class="bg-image" mode="scaleToFill" :src="bgImg"></image>
		<view class="login-header">
			<image mode="aspectFit" :src="headerImg"></image>
		</view>
		<view class="login-form">
			<form @submit="formSubmit">
				<view class="input-box">
					<!-- <view class="form-bg">
						<image src="../../static/login/login-bg.png" mode="aspectFill"></image>
					</view> -->
					<view class="flex_row login-form-item">
						<view class="input-icon input-icon1">
							<image mode="aspectFit" src="../../static/login/icon_phone.png"></image>
						</view>
						<input class="uni-input login-input" name="phone" placeholder="请输入手机号" />
					</view>
					<view class="flex_row login-form-item">
						<view class="input-icon input-icon2">
							<image mode="aspectFit" src="../../static/login/icon_local.png"></image>
						</view>
						<input class="uni-input login-input" name="password" type="password" placeholder="请输入密码" />
					</view>
				</view>
				<view class="login-btn">
					<button form-type="submit">登录</button>
				</view>
			</form>
			<view class="login-regist flex_row">
				<view>
					<text style="visibility: hidden;">忘记密码？</text>
				</view>
				<view @click="gotoRegisCall">
					<text>新用户注册</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import graceChecker from '../../common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	export default {
	    components: {
	    },
	    data() {
	        return {
				bgImg: this.$imgPath + '/login/logo_bg.png',
				headerImg: this.$imgPath + '/login/login-header.png'
	        }
	    },
		onLoad(options) {
			uni.setNavigationBarTitle({
			    title: ''
			});
			console.log(uni.getStorageSync('token'))
		},
	    methods: {
			formSubmit (e) {
				console.log(graceChecker)
				console.log(rule)
				let formdata = e.detail.value
				let checkRes = graceChecker.check(formdata, rule);
				if(checkRes){
				    // uni.showToast({title:"验证通过!", icon:"none"});
					this.loginCall(formdata)
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			getUserMoreInfo () {
				this.$api.test2('/rest/user/querySimpleUserInfo.do', {}).then((res) => {
					res = res.data
					if (res.flag) {
						this.$store.commit('setUserinfoMore', res.data)
					}
				}).catch(() => {
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			},
			loginCall (param) {
				if (!this.$store.state.submitFlag) {
					return false
				}
				this.$store.commit('setSubmitFlag', false)
				setTimeout(() => {
					this.$store.commit('setSubmitFlag', true)
				}, 2000)
				let that = this
				this.$api.test2('/rest/user/login.do', param).then((res) => {
					res = res.data
					if (res.flag) {
						// if (res.data.state === '1') {
						// 	this.$store.$emit('setUserinfo', res.data)
						// 	uni.showToast({title: '登录成功', icon:"success"});
						// 	uni.navigateBack({
						// 	    delta: 1
						// 	});
						// 	// uni.switchTab({
						// 	//     url: '/pages/tabBar/HomePage/HomePage'
						// 	// });
						// } else {
						// 	uni.showToast({title: res.message || '登录失败', icon:"none"});
						// }
						that.$store.commit('setUserinfo', res.data)
						that.$store.commit('setFirstLoad', true)
						that.$store.dispatch('getUserMoreInfo')
						uni.showToast({title: '登录成功', icon:"success"});
						uni.navigateBack({
						    delta: 1
						});
					} else {
						// uni.showToast({title: res.message || '登录失败', icon:"none"});
					}
				}).catch(() => {
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			},
			// 跳转到注册页面
			gotoRegisCall () {
				uni.navigateTo({
				    url: '/pages/Regis/ChoseType/ChoseType'
				});
			}
	    }
	}
</script>

<style>
@import url("./Login.less");
</style>
