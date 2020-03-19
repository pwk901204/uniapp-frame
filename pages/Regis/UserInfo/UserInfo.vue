<template>
	<view class="regis-page regis-page-posi">
		<form @submit="formSubmit" ref="registForm">
		<view class="regis-form">
				<view class="flex_row regis-input-item">
					<view class="input-label">
						<text>+86</text>
					</view>
					<input class="uni-input regis-input" name="phone" v-model="phone" focus placeholder="输入手机号码" />
				</view>
				<view class="flex_row regis-input-item">
					<input class="uni-input regis-input" name="registerSmsCode" placeholder="输入验证码" />
					<view class="input-label label-yzm" v-if="sendTime <= 0" @click="sendSmsCode">
						<text>获取短信验证码</text>
					</view>
					<view class="input-label label-yzm disable" v-else>
						<text>{{ sendTime }}秒后重发</text>
					</view>
				</view>
				<view class="flex_row regis-input-item">
					<input class="uni-input regis-input" name="password" type="password" placeholder="请输入8-16位数字和字母密码" />
				</view>
				<view class="flex_row regis-input-item">
					<input class="uni-input regis-input" name="confirmPassword" type="password" placeholder="确认密码" />
				</view>
				<view class="flex_row regis-input-item-small">
					<checkbox-group class="check-box" @change="agreeChange">
						<label>
							<checkbox value="1" name="agree" />已阅读并同意
							<image v-show="!agreeChecked" src="../../../static/Regis/check.png" mode="aspectFit"></image>
							<image v-show="agreeChecked" src="../../../static/Regis/checked.png" mode="aspectFit"></image>
						</label>
					</checkbox-group>
					<view class="agree-notice" @click="readAgreeCall"><text>《用户注册协议》</text></view>
				</view>
			
		</view>
		<view class="regis-btn">
			<button type="primary" class="btn-blue" form-type="submit">下一步</button>
		</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	export default {
	    components: {
	    },
	    data() {
	        return {
				lx: '',
				phone: '',
				agreeChecked: false,
				sendTime: 0,
				sendData: {}
	        }
	    },
		onLoad(options) {
			if (options) {
				let title = ''
				switch (options.lx) {
					case '1':
						// 投资人
						title = '投资人注册'
						break
					case '2':
						// 企业融资人
						title = '企业注册'
						break
					default:
						title = '注册'
				}
				uni.setNavigationBarTitle({
				    title: title
				});
				this.lx = options.lx
			}
		},
	    methods: {
			formSubmit (e) {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let formdata = e.detail.value
				console.log(formdata)
				formdata = this.$utils.clearStringSpece(formdata)
				console.log(formdata)
				let checkRes = graceChecker.check(formdata, rule);
				if(checkRes){
					if (!this.agreeChecked) {
						uni.showToast({title:"请确认同意用户注册协议!", icon:"none"});
					} else {
						formdata.agreement = true
						if (formdata.password !== formdata.confirmPassword) {
							uni.showToast({ title: '两次密码输入不一致', icon: "none" });
						} else {
							formdata.userType = this.lx
							if (this.sendData && this.sendData.phone === formdata.phone) {
								this.gotoNextSetp(formdata)
							} else {
								this.validateSmsCode(formdata)
							}
						}
						
					}
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			// 验证短信验证码是否有效
			validateSmsCode (data) {
				// data.userType = this.lx
				this.$api.test2('/rest/user/validateRegisterSmsCode.do', data).then((res) => {
					res = res.data
					if (res.flag) {
						this.sendData = data
						this.gotoNextSetp(data)
					} else {
						uni.showToast({title: '短信验证码不正确', icon:"none"});
					}
					
				}).catch((res) => {
					uni.showToast({title: '短信验证码不正确', icon:"none"});
					// this.gotoNextSetp()
				})
			},
			agreeChange (e) {
				let values = e.detail.value;
				if(values.includes('1')){
					this.agreeChecked = true
				}else{
					this.agreeChecked = false
				}
			},
			// 获取短信验证码
			sendSmsCode () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let reg = /^1[0-9]{10,10}$/;
				if (this.phone && reg.test(this.phone)) {
					this.$api.test('/rest/user/sendRegisterSmsCode.do?phone=' + this.phone, {}).then((res) => {
						res = res.data
						if (res.flag) {
							uni.showToast({title: '短信发送成功', icon:"success"});
							this.sendTime = 60
							let t = setInterval(() => {
								if (this.sendTime > 0) {
								  this.sendTime--
								} else {
								  clearInterval(t)
								}
							}, 1000)
						} else {
							// uni.showToast({title: res.message || '短信发送失败', icon:"none"});
						}
						
					}).catch(() => {
						
					})
				} else {
					// uni.showToast({title:"请填写正确的手机号码", icon:"none"});
				}
				
			},
			// 阅读条例
			readAgreeCall () {
				uni.navigateTo({
				    url: '/pages/Regis/Notice/Notice'
				});
			},
			gotoNextSetp (data) {
				let url = ''
				switch (this.lx) {
					case '1':
						// 投资人
						url = '/pages/Regis/Audit/Audit'
						break
					case '2':
						// 企业融资人
						url = '/pages/Regis/Project/Project?phone=' + data.phone
						break
					default:
						url = '/pages/Regis/Audit/Audit'
				}
				// 监听全局全局事件监听用于传递参数
				uni.$on('sendRegisCall', this.sendRegisCall)
				uni.navigateTo({
				    url: url
				});
			},
			sendRegisCall (data) {
				console.log(data)
				let param = {...this.sendData, ...data}
				let url = '/rest/user/investor/regsiter.do'
				if (this.lx === '2') {
					url = '/rest/user/company/regsiter.do'
				}
				console.log(param)
				this.$api.test2(url, param).then((res) => {
					res = res.data
					if (res.flag) {
						uni.showToast({title: '注册成功', icon:"success"});
						setTimeout(() => {
							uni.navigateBack({
							    delta: 3
							});
						}, 2000)
					} else {
						// uni.showToast({title: res.message || '注册失败', icon:"none"});
					}
				}).catch(() => {
					// uni.showToast({title: '注册失败', icon:"none"});
				})
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
