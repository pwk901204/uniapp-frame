<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>企业全称</text>
			</view>
			<input class="uni-input regis-input" name="companyName" :disabled="disabled" v-model="formdata.companyName" placeholder="50个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>企业简称</text>
			</view>
			<input class="uni-input regis-input" name="companyShortName" :disabled="disabled" v-model="formdata.companyShortName" placeholder="15个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>企业LOGO</text>
			</view>
			<view class="full-input-right" @click="choseLogo">
				<image class="regis-user-photo" v-if="logoPath" :src="logoPath" mode="aspectFit"></image>
				<text v-else>请选择</text>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>统一社会信用代码</text>
			</view>
			<input class="uni-input regis-input" name="registerNo" :disabled="disabled" v-model="formdata.registerNo" placeholder="15或18位的数字或字母" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>法定代表人</text>
			</view>
			<input class="uni-input regis-input" name="legarPerson" :disabled="disabled" v-model="formdata.legarPerson" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>成立时间</text>
			</view>
			<picker class="regis-picker" mode="date" :disabled="disabled" :value="formdata.companyTime" :start="startDate" :end="endDate" @change="bindClsjChange">
				<view class="uni-input" v-if="formdata.companyTime">{{formdata.companyTime}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="empty-view"></view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>注册手机号</text>
			</view>
			<input class="uni-input regis-input" name="registerPhone" :disabled="phone ? true : false" v-model="formdata.registerPhone" placeholder="11位数字" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>注册人姓名</text>
			</view>
			<input class="uni-input regis-input" name="registerName" :disabled="disabled" v-model="formdata.registerName" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>注册人职务</text>
			</view>
			<input class="uni-input regis-input" name="registerJob" :disabled="disabled" v-model="formdata.registerJob" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>注册人是否为融资负责人</text>
			</view>
			<view class="full-input-right">
				<radio-group @change="zcrzfzrChange" :disabled="disabled" class="regis-radio-box">
					<label class="regis-radio-item" v-for="(item, index) in sfDicts" :key="item.value">
						<view class="regis-radio">
							<radio :value="item.value" :disabled="disabled" :checked="item.value === formdata.registerMainPerson" />{{item.name}}
							<image v-if="item.value === formdata.registerMainPerson" src="../../../static/Regis/radio-checked.png" mode="aspectFit"></image>
							<image v-else src="../../../static/Regis/radio-default.png" mode="aspectFit"></image>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资负责人手机号</text>
			</view>
			<input class="uni-input regis-input" name="leaderPhone" :disabled="disabled" v-model="formdata.leaderPhone" placeholder="11位数字" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资负责人姓名</text>
			</view>
			<input class="uni-input regis-input" name="leaderName" :disabled="disabled" v-model="formdata.leaderName" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资负责人职务</text>
			</view>
			<input class="uni-input regis-input" name="leaderJob" :disabled="disabled" v-model="formdata.leaderJob" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>融资负责人座机</text>
			</view>
			<input class="uni-input regis-input" name="leaderTel" :disabled="disabled" v-model="formdata.leaderTel" placeholder="可填写多个座机号码,控制在20位内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资负责人邮箱</text>
			</view>
			<input class="uni-input regis-input" name="leaderEmail" :disabled="disabled" v-model="formdata.leaderEmail" placeholder="邮箱长度40位内" />
		</view>
		<view class="empty-view"></view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>注册资本(万元)</text>
			</view>
			<input class="uni-input regis-input" name="registerMoney" :disabled="disabled" v-model="formdata.registerMoney" placeholder="15位数字内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>所在地区</text>
			</view>
			<address-chose @updateAddress="updateAddress" :disabled="disabled" :addressObj="addressObj" class="full-input-right"></address-chose>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>详细地址</text>
			</view>
			<input class="uni-input regis-input" name="address" :disabled="disabled" v-model="formdata.address" placeholder="请填入" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>行业标签</text>
			</view>
			<hy-tags @updateHyTags="updateHyTags" :disabled="disabled" :checkedObj="checkedObj" class="full-input-right"></hy-tags>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>企业网址</text>
			</view>
			<input class="uni-input regis-input" name="website" :disabled="disabled" v-model="formdata.website" placeholder="请填入" />
		</view>
		<view class="regis-input-item regis-input-item-auto">
			<view class="input-label">
				<label class="require">*</label>
				<text>企业介绍</text>
			</view>
			<textarea class="regis-textarea" name="intro" v-show="!hidetextarea" :disabled="disabled" v-model="formdata.intro" placeholder="请输入(500字符内)"/>
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	import addressChose from '@/components/addressChose/addressChose'
	import HyTags from '@/components/HyTags/Hytags'
	export default {
	    components: {
			addressChose,
			HyTags
	    },
		props: {
			phone: {
				type: String
			},
			info: {
				type: Object
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
	    data() {
	        return {
				formdata: {
					companyName: '',		// 企业全称
					companyShortName: '',
					companyLogo: '',
					registerNo: '',
					legarPerson: '',
					companyTime: '',
					registerPhone: '',
					registerName: '',
					registerJob: '',
					registerMainPerson: '0',
					leaderPhone: '',
					leaderName: '',
					leaderJob: '',
					leaderTel: '',
					leaderEmail: '',
					registerMoney: '',
					address: '',
					levelOneTradeTag: '',
					tradeTag: '',
					website: '',
					intro: ''
				},
				logoPath: '',
				address: {
					province: '',
					provinceStr: '',
					city: '',
					cityStr: '',
					county: '',
					countyStr: ''
				},
				addressObj: {},
				checkedObj: {},
				sfDicts: [{
					value: '1',
					name: '是'
				}, {
					value: '0',
					name: '否'
				}]
	        }
	    },
		computed: {
			startDate() {
				return this.$utils.getDate('start');
			},
			endDate() {
				return this.$utils.getDate('end');
			},
			hidetextarea () {
				return this.$store.state.hidetextarea
			}
		},
		watch:{
			'phone': function(newVal, oldVal) {
				this.formdata.registerPhone = newVal
			}
		},
		onLoad(options) {
		},
		created () {
			if (this.info && this.info.id) {
				this.initData()
			} else {
				// this.addressObj = {
				// 	province: ''
				// }
			}
		},
	    methods: {
			initData () {
				this.logoPath = this.$api.viewFile(this.info.companyLogo)
				if (this.info.county) {
					this.addressObj = {
						province: this.info.province,
						provinceStr: this.info.provinceStr,
						city: this.info.city,
						cityStr: this.info.cityStr,
						county: this.info.county,
						countyStr: this.info.countyStr
					}
				}
				if (this.info.tradeTag) {
					this.checkedObj = {
						checkedFristIds: this.info.levelOneTradeTag || '',
						checkedIds: this.info.tradeTag || '',
						checkedTxts: this.info.tradeTagStr || ''
					}
				}
				this.formdata = this.info
				if (this.formdata.registerMainPerson !== '') {
					this.formdata.registerMainPerson = this.formdata.registerMainPerson.toString()
				}
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
			// 更新行业
			updateHyTags (data) {
				if (data.secondChecked) {
					this.formdata.levelOneTradeTag = data.firstChecked.join(',')
					this.formdata.tradeTag = data.secondChecked.join(',')
				}
				console.log(data)
			},
			// Logo选择
			choseLogo () {
				if (this.disabled) {
					return false
				}
				this.$api.chooseImage({}).then((res)=>{
					if (res && res.length) {
						for (let item of res) {
							this.$api.uploadFile(item).then((res) => {
								console.log(res.data)
								this.formdata.companyLogo = res.data[0]
								this.logoPath = this.$api.viewFile(res.data[0])
							}).catch((err) => {
								uni.showToast({title: err.message || '企业LOGO上传失败', icon:"none"});
							})
						}
					}
				}).catch((err)=>{
					this.$api.getSetting()
				})
			},
			// 成立时间改变
			bindClsjChange (e) {
				this.formdata.companyTime = e.target.value
				console.log(this.formdata.companyTime)
			},
			zcrzfzrChange (evt) {
				this.formdata.registerMainPerson = evt.target.value
				if (this.formdata.registerMainPerson === '1') {
					this.formdata.leaderPhone = this.formdata.registerPhone
					this.formdata.leaderName = this.formdata.registerName
					this.formdata.leaderJob = this.formdata.registerJob
				}
			},
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				let checkRes = graceChecker.check(this.formdata, rule);
				if(checkRes){
					if (!this.formdata.companyLogo) {
						uni.showToast({ title: '请上传企业LOGO', icon: "none" });
						return false
					}
					if (this.formdata.companyTime === '' ) {
						uni.showToast({ title: '请选择成立时间', icon: "none" });
						return false
					}
					if (this.formdata.registerMainPerson === '' ) {
						uni.showToast({ title: '请选择注册人是否为融资负责人', icon: "none" });
						return false
					}
					if (!this.address.province) {
						uni.showToast({ title: '请选择所在地区', icon: "none" });
						return false
					}
					if (!this.formdata.tradeTag) {
						uni.showToast({ title: '请选择行业标签', icon: "none" });
						return false
					}
					let param = {...this.formdata, ...this.address}
					console.log(param)
					return param
					// this.$emit('getBasinInfo', param)
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return false
				}
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
