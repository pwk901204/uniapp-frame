<template>
	<view class="regis-page-audit">
		<view class="empty-view"></view>
		<view class="regis-page regis-page-posi">
			<form @submit="formSubmit" ref="registForm">
			<view class="regis-form">
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>头像</text>
						</view>
						<view class="full-input-right" @click="choseUserPhoto">
							<image class="regis-user-photo" v-if="userphoto" :src="userphoto" mode="aspectFit"></image>
							<text v-else>请选择</text>
							<image mode="aspectFit" class="icon-right" src="@/static/Regis/icon-right.png"></image>
						</view>
					</view>
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>真实姓名</text>
						</view>
						<input class="uni-input regis-input" name="name" placeholder="请填写" />
					</view>
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>所在地区</text>
						</view>
						<address-chose @updateAddress="updateAddress" class="full-input-right"></address-chose>
						<view>
							<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
						</view>
					</view>
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>任职公司</text>
						</view>
						<input class="uni-input regis-input" name="company" placeholder="请填写" />
					</view>
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>现任职务</text>
						</view>
						<input class="uni-input regis-input" name="job" placeholder="请填写" />
					</view>
					<view class="flex_row regis-input-item">
						<view class="input-label">
							<text>邮箱</text>
						</view>
						<input class="uni-input regis-input" name="email" placeholder="请填写" />
					</view>	
					<view class="regis-input-item regis-upload">
						<view class="input-label">
							<text>上传名片</text>
						</view>
						<view class="regis-upload-img" @click="chooseImageMp">
							<image mode="aspectFit" v-if="!mpPhoto" src="../../../static/Regis/icon-upload.png"></image>
							<image :src="mpPhoto" v-else mode="aspectFit"></image>
						</view>
					</view>	
			</view>
			<view class="regis-btn">
				<button type="primary" class="btn-blue" form-type="submit">提交</button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import addressChose from '@/components/addressChose/addressChose'
	export default {
	    components: {
			uniList,
			uniListItem,
			addressChose
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
				}
	        }
	    },
		onLoad(options) {
			
		},
		onUnload () {
		},
	    methods: {
			formSubmit (e) {
				let formdata = e.detail.value
				let checkRes = graceChecker.check(formdata, rule);
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
						uni.showToast({ title: '请上传名片', icon: "none" });
						return false
					}
					uni.$emit('sendRegisCall', param)
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
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
			// 用户头像选择
			choseUserPhoto () {
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
					this.$api.getSetting()
				})
			},
			bindAddressChange (e) {
				
			}
	    }
	}
</script>

<style>
	@import url("../Regis/Regis.less");
</style>
