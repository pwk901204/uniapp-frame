<template>
	<view class="common-popup-box" v-show="showPopup">
		<view class="popup-bg">123123</view>
		<view class="popup-box">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	
	export default {
	    data() {
	        return {
				showPopup: false
	        }
	    },
		created () {
		},
	    methods: {
			open () {
				this.showPopup = true
				this.change()
			},
			close () {
				this.showPopup = false
				this.change()
			},
			change () {
				this.$emit('change', {
					show: this.showPopup
				})
			}
	    }
	}
</script>

<style>
	.common-popup-box {
		position: fixed;
		z-index: 997;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.common-popup-box .popup-bg{
		position: fixed;
		display: block;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.4;
	}
	.common-popup-box .popup-box {
		position: fixed;
		z-index: 999;
		width: 100%;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
	}
</style>
