<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>姓名</text>
			</view>
			<input class="uni-input regis-input" name="userName" :disabled="disabled" v-model="formdata.userName" placeholder="20个字符内" />
		</view>
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>职务名称</text>
			</view>
			<input class="uni-input regis-input" name="userJob" :disabled="disabled" v-model="formdata.userJob" placeholder="50个字符内" />
		</view>
		<view class="regis-input-item regis-input-item-auto">
			<view class="input-label">
				<label class="require">*</label>
				<text>个人经历</text>
			</view>
			<textarea class="regis-textarea" name="userIntro" v-show="!hidetextarea" :disabled="disabled" v-model="formdata.userIntro" placeholder="请输入(500字符内)"/>
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
		computed: {
			hidetextarea () {
				return this.$store.state.hidetextarea
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
