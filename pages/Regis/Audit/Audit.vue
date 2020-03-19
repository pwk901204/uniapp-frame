// <template>
	<view class="regis-page-audit regis-page-audit2" :style="'height:' + windowHeight + 'rpx;'">
		<view class="empty-view"></view>
		<form @submit="formSubmit" ref="registForm">
			<scroll-view scroll-y="true" scroll-top="0" :style="'height:' + windowHeight2 + 'rpx;'">
				<view class="regis-page regis-page-posi regis-page-nobtn" >
					<view class="regis-form">
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>头像</text>
								</view>
								<view class="full-input-right" @click="choseUserPhoto">
									<image class="regis-user-photo" v-if="userphoto" :src="userphoto" mode="aspectFit"></image>
									<text v-else>请选择</text>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>真实姓名</text>
								</view>
								<input class="uni-input regis-input" name="name" v-model="formdata.name" :disabled="disabled" placeholder="请填写" />
							</view>
							<view class="flex_row regis-input-item" v-show="!page || (page && formdata.id)">
								<view class="input-label">
									<label class="require">*</label>
									<text>所在地区</text>
								</view>
								<address-chose :disabled="disabled" :addressObj="addressObj" @updateAddress="updateAddress" class="full-input-right"></address-chose>
								<view>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>任职公司</text>
								</view>
								<input class="uni-input regis-input" name="company" v-model="formdata.company" :disabled="disabled" placeholder="请填写" />
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>现任职务</text>
								</view>
								<input class="uni-input regis-input" name="job" v-model="formdata.job" :disabled="disabled" placeholder="请填写" />
							</view>
							<view class="flex_row regis-input-item" v-if="page !== 'mine'">
								<view class="input-label">
									<label class="require">*</label>
									<text>邮箱</text>
								</view>
								<input class="uni-input regis-input" name="email" v-model="formdata.email" :disabled="disabled" placeholder="请填写" />
							</view>	
							<view class="regis-input-item regis-upload" v-if="page !== 'mine'">
								<view class="input-label">
									<label class="require">*</label>
									<text>上传名片</text>
								</view>
								<view class="regis-upload-img regis-upload-img2" @click="chooseImageMp">
									<image mode="aspectFit" v-if="!mpPhoto" src="../../../static/Regis/icon-upload2.png"></image>
									<image :src="mpPhoto" v-else mode="aspectFit"></image>
								</view>
							</view>	
					</view>
					<div v-if="page === 'mine'">
						<view class="empty-view"></view>
						<view class="regis-form">
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<text>手机</text>
								</view>
								<input class="uni-input regis-input" name="phone" v-model="formdata.phone" :disabled="disabledAll" placeholder="请填写" />
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<text>邮箱</text>
								</view>
								<input class="uni-input regis-input" name="email" v-model="formdata.email" :disabled="disabled" placeholder="请填写" />
							</view>	
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<text>微信</text>
								</view>
								<input class="uni-input regis-input" name="wechat" v-model="formdata.wechat" :disabled="disabled" placeholder="请填写" />
							</view>	
							<view class="empty-view"></view>
							<view class="flex_row regis-input-item" v-if="!page || (page && formdata.id)">
								<view class="input-label">
									<label class="require">*</label>
									<text>投资领域</text>
								</view>
								<hy-tags :disabled="disabled" :isMul="true" :checkedObj="checkedObj" @updateHyTags="updateHyTags" class="full-input-right"></hy-tags>
								<view>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>投资地区</text>
								</view>
								<address-mul :disabled="disabled" :checkedObj="addressCheckObj" :listData="addressDicts" @updateDate="updateAddressMul" class="full-input-right"></address-mul>
								<view>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>投资阶段</text>
								</view>
								<address-mul :disabled="disabled" :checkedObj="tzjdCheckObj" :listData="tzjdDicts" @updateDate="updateTzjdMul" class="full-input-right"></address-mul>
								<view>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="flex_row regis-input-item">
								<view class="input-label">
									<label class="require">*</label>
									<text>投资额度</text>
								</view>
								<picker class="regis-picker" :disabled="disabled" :value="tzjeIndex" range-key="mc" @change="bindtzjeChange" :range="tzjeList">
									<view class="uni-input" v-if="tzjeIndex !== ''">{{tzjeList[tzjeIndex].mc}}</view>
									<view class="uni-input" v-else>请选择</view>
								</picker>
								<view>
									<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
								</view>
							</view>
							<view class="regis-input-item regis-input-item-auto">
								<view class="input-label">
									<label class="require not-require">*</label>
									<text>投资案例</text>
								</view>
								<textarea class="regis-textarea" v-show="!hidetextarea" name="investmentCase" v-model="formdata.investmentCase" placeholder="请输入(500字符内)"/>
							</view>
							<view class="regis-input-item regis-input-item-auto">
								<view class="input-label">
									<label class="require not-require">*</label>
									<text>个人经历</text>
								</view>
								<textarea class="regis-textarea" v-show="!hidetextarea" name="personalExper" v-model="formdata.personalExper" placeholder="请输入(500字符内)"/>
							</view>
						</view>
					</div>
				</view>
			</scroll-view>
			<view class="regis-btns regis-btn2" v-if="!disabled" v-show="!hidetextarea">
				<button type="primary" class="btn-blue" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	import rule2 from './validate2';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import addressChose from '@/components/addressChose/addressChose'
	import HyTags from '@/components/HyTags/Hytags'
	import AddressMul from '@/components/MulChoseItem/index.vue'
	export default {
	    components: {
			uniList,
			uniListItem,
			addressChose,
			HyTags,
			AddressMul
	    },
	    data() {
	        return {
				userphoto: '',		// 用户头像
				userphotoGroup: '',
				mpPhoto: '',		// 名片
				mpPhotoGroup: '',
				address: {
					province: '',
					provinceStr: '',
					city: '',
					cityStr: '',
					county: '',
					countyStr: ''
				},
				page: '',
				formdata: {},
				addressDicts: [],
				tzjdDicts: [],
				tzjeList: [],
				tzjeIndex: -1,
				checkedObj: {},
				addressObj: {},
				addressCheckObj: {},
				tzjdCheckObj: {},
				windowHeight: 0,
				windowHeight2: 0
	        }
	    },
		computed: {
			disabledAll () {
				let userinfo = this.$store.state.userinfomore
				if (userinfo.username) {
					return true
				} else {
					return false
				}
			},
			disabled () {
				let userinfo = this.$store.state.userinfomore
				if (userinfo.username) {
					return false
				} else {
					return false
				}
			},
			hidetextarea () {
				return this.$store.state.hidetextarea
			}
		},
		watch: {
			hidetextarea (newVal) {
				let that = this
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res.windowHeight);
						let clientHeight = res.windowHeight,
							clientWidth = res.windowWidth,
							rpxR = 750 / clientWidth;
						that.windowHeight2 = clientHeight * rpxR - (newVal ? 0 : 150)
				    }
				});
			}
		},
		onLoad(options) {
			this.initHeight()
			if (options && options.page === 'mine') {
				this.page = options.page
			}
			if (this.page === 'mine') {
				uni.setNavigationBarTitle({
				    title: '我的资料'
				});
				this.getUserInfo()
				this.getDict('YJXZQH', 'addressDicts')
				this.getDict('QYJD', 'tzjdDicts')
				this.getDict('RZED', 'tzjeList')
				let t = setInterval(() => {
					if (this.tzjeList.length && this.formdata.investmentLines !== ''){
						clearInterval(t)
						for (let i = 0; i < this.tzjeList.length; i++) {
							if (this.tzjeList[i].dm === this.formdata.investmentLines) {
								this.tzjeIndex = i
								break
							}
						}
					}
				}, 200)
			}
		},
		onUnload () {
			if (!this.page) {
				uni.$off('sendRegisCall')
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
						that.windowHeight2 = clientHeight * rpxR - (that.disabled ? 0 : 150)
				    }
				});
			},
			getUserInfo () {
				this.$api.test2('/rest/user/queryUserRegisterInfo.do', {}).then((res) => {
					res = res.data
					if (res.flag) {
						console.log(res)
						if (res.data.photoUrl) {
							this.userphotoGroup = res.data.photoUrl
							this.userphoto = this.$api.viewFile(res.data.photoUrl)
						}
						if (res.data.card) {
							this.mpPhotoGroup = res.data.card
							this.mpPhoto = this.$api.viewFile(res.data.card)
						}
						if (res.data.county) {
							this.addressObj = {
								province: res.data.province,
								provinceStr: res.data.provinceStr,
								city: res.data.city,
								cityStr: res.data.cityStr,
								county: res.data.county,
								countyStr: res.data.countyStr
							}
						}
						if (res.data.investmentField) {
							this.checkedObj = {
								checkedFristIds: res.data.levelOneInvestmentField || '',
								checkedIds: res.data.investmentField || '',
								checkedTxts: res.data.investmentFieldStr || ''
							}
						}
						if (res.data.investmentPlace) {
							this.addressCheckObj = {
								checked: res.data.investmentPlace,
								checkedTxt: res.data.investmentPlaceStr
							}
						}
						if (res.data.investmentPhase) {
							this.tzjdCheckObj = {
								checked: res.data.investmentPhase,
								checkedTxt: res.data.investmentPhaseStr
							}
						}
						this.formdata = res.data
					}
				}).catch(() => {
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			},
			getDict (lxjp, field) {
				this.$api.test2('/rest/dictList.do', {
					lxjp: lxjp
				}).then((res) => {
					res = res.data
					if (res.flag) {
						this[field] = res.data
					}
				}).catch(() => {
				})
			},
			// 更新投资领域
			updateHyTags (data) {
				if (data) {
					this.formdata.levelOneInvestmentField = data.firstChecked.join(',')
					this.formdata.investmentField = data.secondChecked.join(',')
				}
				console.log(data)
			},
			updateAddressMul (data) {
				this.formdata.investmentPlace = data.join(',')
			},
			updateTzjdMul (data) {
				this.formdata.investmentPhase = data.join(',')
			},
			bindtzjeChange (e) {
				this.tzjeIndex = e.target.value
				this.$forceUpdate()
			},
			formSubmit (e) {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let formdata = e.detail.value
				formdata = this.$utils.clearStringSpece(formdata)
				let validate = [...rule]
				if (this.page === 'mine') {
					validate = [...rule, ...rule2]
				}
				let checkRes = graceChecker.check(formdata, validate);
				console.log(validate)
				console.log(checkRes)
				if(checkRes){
				    let param = {...formdata, ...this.address}
					if (this.userphotoGroup) {
						param.photoUrl = this.userphotoGroup
					} else {
						uni.showToast({ title: '请上传头像', icon: "none" });
						return false
					}
					if (!this.address.province) {
						uni.showToast({ title: '请选择所在地区', icon: "none" });
						return false
					}
					if (this.mpPhotoGroup) {
						param.card = this.mpPhotoGroup
					} else {
						if (this.page !== 'mine') {
							uni.showToast({ title: '请上传名片', icon: "none" });
							return false
						}
					}
					if (this.page === 'mine') {
						debugger
						if (this.formdata.investmentField) {
							param.levelOneInvestmentField = this.formdata.levelOneInvestmentField
							param.investmentField = this.formdata.investmentField
						} else {
							uni.showToast({ title: '请选择投资领域', icon: "none" });
							return false
						}
						if (this.formdata.investmentPlace) {
							param.investmentPlace = this.formdata.investmentPlace
						} else {
							uni.showToast({ title: '请选择投资地区', icon: "none" });
							return false
						}
						if (this.formdata.investmentPhase) {
							param.investmentPhase = this.formdata.investmentPhase
						} else {
							uni.showToast({ title: '请选择投资阶段', icon: "none" });
							return false
						}
						if (this.tzjeIndex === -1 || !this.tzjeList[this.tzjeIndex]) {
							uni.showToast({ title: '请选择投资额度', icon: "none" });
							return false
						} else {
							param.investmentLines = this.tzjeList[this.tzjeIndex].dm
						}
						this.savePost(param)
					} else {
						uni.$emit('sendRegisCall', param)
					}
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			savePost (param) {
				param.id = this.formdata.id
				param.userId = this.formdata.id
				param.userInforId = this.formdata.userInforId
				this.$api.test2('/rest/user/investor/update.do', param).then((res) => {
					res = res.data
					if (res.flag) {
						console.log(res)
						uni.showToast({title: res.message || '用户信息修改成功', icon:"success"});
						setTimeout(() => {
							uni.navigateBack({
							    delta: 1
							});
						}, 2000)
					} else {
						// uni.showToast({title: res.message || '用户信息修改失败', icon:"none"});
					}
				}).catch(() => {
					// uni.showToast({title: '用户信息修改失败', icon:"none"});
				})
			},
			// 更新地址
			updateAddress (data) {
				this.address.province = data[0].code
				this.address.provinceStr = data[0].name
				this.address.city = data[1].code
				this.address.cityStr = data[1].name
				this.address.county = data[2].code
				this.address.countyStr = data[2].name
			},
			// 用户头像选择
			choseUserPhoto () {
				if (this.disabled) {
					return false
				}
				this.$api.chooseImage({}).then((res)=>{
					if (res && res.length) {
						for (let item of res) {
							this.$api.uploadFile(item).then((res) => {
								console.log(res.data)
								this.userphotoGroup = res.data[0]
								this.userphoto = this.$api.viewFile(res.data[0])
							}).catch((err) => {
								uni.showToast({title: err.message || '头像上传失败', icon:"none"});
							})
						}
					}
				}).catch((err)=>{
					
				})
			},
			// 上传名片
			chooseImageMp () {
				if (this.disabled) {
					return false
				}
				this.$api.chooseImage({}).then((res)=>{
					if (res && res.length) {
						for (let item of res) {
							this.$api.uploadFile(item).then((res) => {
								console.log(res.data)
								this.mpPhotoGroup = res.data[0]
								this.mpPhoto = this.$api.viewFile(res.data[0])
							}).catch((err) => {
								uni.showToast({title: err.message || '名片上传失败', icon:"none"});
							})
						}
					}
				}).catch((err)=>{
					// this.$api.getSetting()
				})
			},
			bindAddressChange (e) {
				
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
	.regis-page-audit{
		padding-bottom: 120upx;
	}
</style>
