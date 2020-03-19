<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>年份</text>
			</view>
			<!-- <picker class="regis-picker" :value="nf" @change="bindNfChange" :range="yearList">
				<view class="uni-input" v-if="nf">{{nf}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker> -->
			<picker class="regis-picker" mode="date" fields="year" :disabled="disabled" :value="formdata.year" :start="startDate" :end="endDate" @change="bindyearChange">
				<view class="uni-input" v-if="formdata.year">{{formdata.year}}</view>
				<view class="uni-input" v-else>请选择</view>
			</picker>
			<view>
				<image mode="aspectFit" class="icon-right" src="../../../static/Regis/icon-right.png"></image>
			</view>
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>营业收入</text>
			</view>
			<input class="uni-input regis-input" name="businessIncome" :disabled="disabled" v-model="formdata.businessIncome" placeholder="8位以内非0的数字(万/人名币)" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>净利润</text>
			</view>
			<input class="uni-input regis-input" name="netProfit" :disabled="disabled" v-model="formdata.netProfit" placeholder="8位以内非0的数字(万/人名币)" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>总资产</text>
			</view>
			<input class="uni-input regis-input" name="totalAssets" :disabled="disabled" v-model="formdata.totalAssets" placeholder="8位以内非0的数字(万/人名币)" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>总负债</text>
			</view>
			<input class="uni-input regis-input" name="totalLiabilities" :disabled="disabled" v-model="formdata.totalLiabilities" placeholder="8位以内的数字(万/人名币)" />
		</view>
		
		
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
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
					year: '',
					businessIncome: '',
					netProfit: '',
					totalAssets: '',
					totalLiabilities: ''
				}
	        }
	    },
		created () {
			if (this.info) {
				this.formdata = this.info
			}
		},
	    methods: {
			// 年份改变
			bindyearChange (e) {
				this.formdata.year = e.target.value
				console.log(this.formdata.year)
				this.$forceUpdate()
			},
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				let checkRes = graceChecker.check(this.formdata, rule);
				if(checkRes){
					if (!this.formdata.year) {
						uni.showToast({ title: '请选择年份', icon: "none" });
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
