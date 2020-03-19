<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>项目名称</text>
			</view>
			<input class="uni-input regis-input" name="projectName" :disabled="disabled" v-model="formdata.projectName" placeholder="50字以内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资方式</text>
			</view>
			<picker class="regis-picker" :value="rzfsIndex" :disabled="disabled" range-key="mc" @change="bindRzfsChange" :range="rzfsList">
				<view class="uni-input" v-if="rzfsIndex !== ''">{{rzfsList[rzfsIndex].mc}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>拟融资金额</text>
			</view>
			<picker class="regis-picker" :value="njrjeIndex" :disabled="disabled" range-key="mc" @change="bindnjrjeChange" :range="njrjeList">
				<view class="uni-input" v-if="njrjeIndex !== ''">{{njrjeList[njrjeIndex].mc}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>项目阶段</text>
			</view>
			<picker class="regis-picker" :value="xmjdIndex" :disabled="disabled" range-key="mc" @change="bindXmjdChange" :range="xmjdList">
				<view class="uni-input" v-if="xmjdIndex !== ''">{{xmjdList[xmjdIndex].mc}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="regis-input-item regis-input-item-auto">
			<view class="input-label">
				<label class="require">*</label>
				<text>项目介绍</text>
			</view>
			<textarea class="regis-textarea" name="xmjs" v-show="!hidetextarea" :disabled="disabled" v-model="formdata.xmjs" placeholder="包括项目，产品，前景项目，产品的应用领域，项目，产品的优点和特点，融资金额，融资资金的用途(500字符内)"/>
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
					projectName: '',
					rzfs: '',
					rzed: '',
					qyjd: '',
					xmjs: ''
				},
				projectInfoId: '',
				rzfsIndex: -1,
				njrjeIndex: -1,
				xmjdIndex: -1,
				rzfsList: [],
				njrjeList: [],
				xmjdList: []
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
		created () {
			if (this.info && this.info.id) {
				this.initData(this.info)
			}
			this.getDict('RZFS', 'rzfsList')
			this.getDict('RZED', 'njrjeList')
			this.getDict('QYJD', 'xmjdList')
		},
		onLoad(options) {
		},
	    methods: {
			initData (data) {
				if (data && data.id && data.projectInfoRegisterDtos && data.projectInfoRegisterDtos.length) {
					let projectInfo = data.projectInfoRegisterDtos[0]
					this.projectInfoId = projectInfo.projectInfoId
					this.formdata = projectInfo
					let t1 = setInterval(() => {
						if (this.rzfsList.length && this.formdata.rzfs !== ''){
							clearInterval(t1)
							for (let i = 0; i < this.rzfsList.length; i++) {
								if (this.rzfsList[i].dm === this.formdata.rzfs) {
									this.rzfsIndex = i
									break
								}
							}
						}
					}, 200)
					let t2 = setInterval(() => {
						if (this.njrjeList.length && this.formdata.rzed !== ''){
							clearInterval(t2)
							for (let i = 0; i < this.njrjeList.length; i++) {
								if (this.njrjeList[i].dm === this.formdata.rzed) {
									this.njrjeIndex = i
									console.log(this.njrjeIndex)
									break
								}
							}
						}
					}, 200)
					let t3 = setInterval(() => {
						if (this.xmjdList.length && this.formdata.qyjd !== ''){
							clearInterval(t3)
							for (let i = 0; i < this.xmjdList.length; i++) {
								if (this.xmjdList[i].dm === this.formdata.qyjd) {
									this.xmjdIndex = i
									console.log(this.xmjdIndex)
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
			// Logo选择
			choseLogo () {
				this.$api.chooseImage({}).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					this.$api.getSetting()
				})
			},
			// 成立时间改变
			bindRzfsChange (e) {
				this.rzfsIndex = e.target.value
				console.log(this.rzfsIndex)
				this.$forceUpdate()
			},
			bindnjrjeChange (e) {
				this.njrjeIndex = e.target.value
				console.log(this.njrjeIndex)
				this.$forceUpdate()
			},
			bindXmjdChange (e) {
				this.xmjdIndex = e.target.value
				console.log(this.xmjdIndex)
				this.$forceUpdate()
			},
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				let checkRes = graceChecker.check(this.formdata, rule);
				if(checkRes){
					if (this.rzfsIndex === -1 || !this.rzfsList[this.rzfsIndex]) {
						uni.showToast({ title: '请选择融资方式', icon: "none" });
						return false
					} else {
						this.formdata.rzfs = this.rzfsList[this.rzfsIndex].dm
					}
					if (this.njrjeIndex === -1 || !this.njrjeList[this.njrjeIndex]) {
						uni.showToast({ title: '请选择拟融资金额', icon: "none" });
						return false
					} else {
						this.formdata.rzed = this.njrjeList[this.njrjeIndex].dm
					}
					if (this.xmjdIndex === -1 || !this.xmjdList[this.xmjdIndex]) {
						uni.showToast({ title: '请选择项目阶段', icon: "none" });
						return false
					} else {
						this.formdata.qyjd = this.xmjdList[this.xmjdIndex].dm
					}
					let param = {...this.formdata}
					if (this.projectInfoId) {
						param.projectInfoId = this.projectInfoId
					}
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
