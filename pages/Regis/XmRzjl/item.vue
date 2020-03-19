<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资轮次</text>
			</view>
			<picker class="regis-picker" :value="rzlcIndex" :disabled="disabled" range-key="mc" @change="bindRzlcChange" :range="rzlcList">
				<view class="uni-input" v-if="rzlcIndex !== -1">{{rzlcList[rzlcIndex].mc}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>融资时间</text>
			</view>
			<picker class="regis-picker" mode="date" fields="month" :disabled="disabled" :value="formdata.time" :start="startDate" :end="endDate" @change="bindrzsjChange">
				<view class="uni-input" v-if="formdata.time">{{formdata.time}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>投资机构</text>
			</view>
			<input class="uni-input regis-input" name="organization" :disabled="disabled" v-model="formdata.organization" placeholder="请填写" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>融资金额</text>
			</view>
			<input class="uni-input regis-input" name="money" :disabled="disabled" v-model="formdata.money" placeholder="(万/人民币)" />
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	export default {
	    components: {
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
					round: '',
					organization: '',
					time: '',
					money: ''
				},
				rzlcIndex: -1,
				rzlcList: []
	        }
	    },
		created () {
			this.getDict('RZLC', 'rzlcList')
			if (this.info) {
				this.formdata = this.info
				let t1 = setInterval(() => {
					if (this.rzlcList.length && this.formdata.round !== ''){
						clearInterval(t1)
						for (let i = 0; i < this.rzlcList.length; i++) {
							if (this.rzlcList[i].dm === this.formdata.round) {
								this.rzlcIndex = i
								break
							}
						}
					}
				}, 200)
			}
		},
	    methods: {
			getDict (lxjp, field) {
				this.$api.test2('/rest/dictList.do', {
					lxjp: lxjp,
					_t: new Date().getTime()
				}).then((res) => {
					res = res.data
					if (res.flag) {
						this[field] = res.data
					}
				}).catch(() => {
				})
			},
			// 年份改变
			bindRzlcChange (e) {
				this.rzlcIndex = e.target.value
				console.log(this.rzlcIndex)
				this.$forceUpdate()
			},
			bindrzsjChange (e) {
				this.formdata.time = e.target.value
				console.log(this.formdata.time)
				this.$forceUpdate()
			},
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				let checkRes = graceChecker.check(this.formdata, rule);
				if(checkRes){
					if (this.rzlcIndex === '' || !this.rzlcList[this.rzlcIndex]) {
						uni.showToast({ title: '请选择融资轮次', icon: "none" });
						return false
					} else {
						this.formdata.round = this.rzlcList[this.rzlcIndex].dm
					}
					if (this.formdata.time === '') {
						uni.showToast({ title: '请选择融资时间', icon: "none" });
						return false
					}
					return this.formdata
				} else {
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
