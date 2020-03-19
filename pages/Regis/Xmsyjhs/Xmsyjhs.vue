<template>
	<view class="regis-form">
		<view class="regis-input-item regis-upload">
			<view class="input-label">
				<label class="require">*</label>
				<text>商业计划书</text>
			</view>
			<view class="regis-upload-img" v-if="!disabled" @click="chooseImage">
				<image mode="aspectFit" src="../../../static/Regis/icon-upload.png"></image>
			</view>
			<view class="upload-tip" v-if="!disabled">
				<text>请上传pdf格式的文件，文件大小勿超过20M</text>
			</view>
			<view class="upload-list">
				<view class="upload-list-item" v-if="formdata.projectBookUrl">
					<image class="img-body" src="../../../static/Regis/icon-pdf.png" mode="aspectFit"></image>
					<image @click="removeBookCall" v-if="!disabled" class="img-del" src="../../../static/Regis/icon-del.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>显示权限</text>
			</view>
			<picker class="regis-picker" :value="xsqxIndex" :disabled="disabled" range-key="mc" @change="bindXsqxChange" :range="xsqxList">
				<view class="uni-input" v-if="xsqxIndex !== -1">{{xsqxList[xsqxIndex].mc}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import addresList from '@/common/city.data'
	export default {
	    components: {
			uniList,
			uniListItem
	    },
		props: {
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
				formdata:{
					projectBookName: '',
					projectBookUrl: '',
					projectShowAuth: ''
				},
				projectBookUrl: '',
				xsqxIndex: -1,
				xsqxList: []
	        }
	    },
		created () {
			this.getDict('XMZSQX', 'xsqxList')
			if (this.info && this.info.id) {
				this.initData(this.info)
			}
		},
		onLoad(options) {

		},
	    methods: {
			initData (data) {
				if (data && data.id && data.projectInfoRegisterDtos && data.projectInfoRegisterDtos.length) {
					let projectInfo = data.projectInfoRegisterDtos[0]
					this.formdata.projectBookName = projectInfo.projectBookName
					this.formdata.projectBookUrl = projectInfo.projectBookUrl
					this.formdata.projectShowAuth = projectInfo.projectShowAuth
					let t1 = setInterval(() => {
						if (this.xsqxList.length && this.formdata.projectShowAuth !== ''){
							clearInterval(t1)
							for (let i = 0; i < this.xsqxList.length; i++) {
								if (this.xsqxList[i].dm === this.formdata.projectShowAuth) {
									this.xsqxIndex = i
									this.$forceUpdate()
									break
								}
							}
						}
					}, 200)
				}
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
			bindXsqxChange (e) {
				this.xsqxIndex = e.target.value
				console.log(this.xsqxIndex)
				this.$forceUpdate()
			},
			removeBookCall () {
				this.formdata.projectBookUrl = ''
			},
			// 上传名片
			chooseImage () {
				// this.$api.chooseImage({}).then((res)=>{
				// 	console.log(res)
				// }).catch((err)=>{
				// 	this.$api.getSetting()
				// })
				if (this.formdata.projectBookUrl) {
					uni.showToast({title: '商业计划书只能上传一张', icon:"none"});
					return false
				}
				let that = this
				wx.chooseMessageFile({
					count: 1,     //能选择文件的数量
				    type: 'file',   //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
				    success(res) { 
				        var size = res.tempFiles[0].size;
				        var filename = res.tempFiles[0].name;
				        var newfilename = filename + "";  
				        console.log(size);
						console.log(res)
						if (size > 20971520 || newfilename.indexOf(".pdf")==-1){ //我还限制了文件的大小和具体文件类型
				          uni.showToast({
				            title: '文件大小不能超过20MB,格式必须为pdf！',
				            icon: "none",
				            duration: 2000,
				            mask: true
				          })
				        }else{
							for (let item of res.tempFiles) {
								that.$api.uploadFile(item.path).then((res) => {
									that.formdata.projectBookUrl = res.data[0]
									that.formdata.projectBookName = item.name
								}).catch((err) => {
									uni.showToast({title: err.message || '商业计划书上传失败', icon:"none"});
								})
							}
				          // that.setData({
				          // path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
				          // filename: filename              //渲染到wxml方便用户知道自己选择了什么文件
				          // })
				        }
				  }
				})
			},
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				if (!this.formdata.projectBookUrl) {
					uni.showToast({title: '请上传商业计划书', icon:"none"});
					return false
				} else {
					if (this.xsqxIndex === -1 || !this.xsqxList[this.xsqxIndex]) {
						uni.showToast({ title: '请选择显示权限', icon: "none" });
						return false
					} else {
						this.formdata.projectShowAuth = this.xsqxList[this.xsqxIndex].dm
					}
					return this.formdata
				}
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
