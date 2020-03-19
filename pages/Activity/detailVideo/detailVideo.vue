<template>
	<view>
		<web-view :src="url" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
				// url: 'https://uniapp.dcloud.io/static/web-view.html'
				//https://mudu.tv/watch/4883152
			}
		},
		onLoad(options) {
			if(options.url) {
				this.url = decodeURIComponent(options.url);
			}
			if(options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				});
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
