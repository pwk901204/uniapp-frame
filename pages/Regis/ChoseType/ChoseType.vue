<template>
	<view class="regis-page regis-page-full">
<!-- 		<view class="regis-chose-box">
			<button type="primary" class="btn-blue" @click="gotoRegisUserCall('1')">
				<image src="../../../static/Regis/icon-tzr.png" mode="aspectFit"></image>
				<text>投资人</text>
			</button>
			<button type="warn" class="btn-yellow" @click="gotoRegisUserCall('2')">
				<image src="../../../static/Regis/icon-qy.png" mode="aspectFit"></image>
				<text>企业</text>
			</button>
		</view> -->
		<view class="regis-chose-box-new">
			<view class="regis-chose-item" @click="gotoRegisUserCall('1')">
				<image src="../../../static/login/icon-regis-gr.png" mode="aspectFit"></image>
				<br />
				<text>投资人注册</text>
			</view>
			<view class="regis-chose-item" @click="gotoRegisUserCall('2')">
				<image src="../../../static/login/icon-regis-qy.png" mode="aspectFit"></image>
				<br />
				<text>企业注册</text>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
	    components: {
	    },
	    data() {
	        return {
	        }
	    },
	    methods: {
			gotoRegisUserCall (lx) {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				// lx 1: 投资人 2： 企业 融资人
				uni.navigateTo({
				    url: '/pages/Regis/UserInfo/UserInfo?lx=' + lx
				});
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
