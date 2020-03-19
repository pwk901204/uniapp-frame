<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>股东名称</text>
			</view>
			<input class="uni-input regis-input" name="ownerName" :disabled="disabled" v-model="formdata.ownerName" placeholder="30个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require not-require">*</label>
				<text>股权比例(%)</text>
			</view>
			<input class="uni-input regis-input" name="ownerPercentage" :disabled="disabled" v-model="formdata.ownerPercentage" placeholder="请输入" />
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
					userName: '',
					userJob: '',
					userIntro: ''
				}
	        }
	    },
		created () {
			if (this.info) {
				this.formdata = this.info
			}
		},
	    methods: {
			getFormData () {
				this.formdata = this.$utils.clearStringSpece(this.formdata)
				let checkRes = graceChecker.check(this.formdata, rule);
				if(checkRes){
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
