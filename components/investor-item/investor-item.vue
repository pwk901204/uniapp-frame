<template>
	<view class="investor_item flex_row_between" @click="goDetail(itemData.id)" >
		<view class="left" >
			<image mode="aspectFill" :src="itemData.photoUrl  ? $api.viewFile(itemData.photoUrl) :'../../static/common/default.jpg'"></image>
		</view>
		<slot name="status"></slot>
		<view class="right">
			<view class="title ell">{{itemData.userName}}</view>
			<slot name="dec"></slot>
		</view>
	</view>
</template>

<script>
	import { savaProjectFwjl } from '@/common/vmeitime-http/index.js'
	export default {
		props:{
			itemData:{
				type:Object,
				require:true
			}
		},
		methods:{
			async goDetail(id) {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'4003'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:1
				})
				uni.navigateTo({
					url:'/pages/Investor/detail/detail?id='+ id
				})
			}
		}
	}
</script>

<style lang="scss">
.investor_item{
	background: #fff;
	padding: 27upx;
	align-items: start;
	margin-bottom: 30upx;
	border-radius: 8upx;
	position: relative;
	
	.left{
		width: 145upx;
		height: 145upx;
		padding: 10upx;
		border-radius: 50%;
		border: 1px dashed #3167d9;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.right{
		width: 450upx;
		.title{
			width: 300upx;
			font-size: 30upx;
			color: #000000;
			line-height: 1.4;
		}
	}
}
</style>
