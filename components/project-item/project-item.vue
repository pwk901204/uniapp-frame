<template>
	<view class="project_item flex_row_between" @click="goDetail(itemData.id?itemData.id:itemData.projectId)" >
		<view class="left flex_none out_shadow" >
			<image mode="aspectFit" :src="itemData.fileUrl ? $api.viewFile(itemData.fileUrl) :'../../static/common/default.jpg'"></image>
		</view>
		<view class="right flex_auto">
			<view class="title ell">{{itemData.projectName}}</view>
			<view v-if="proType=='activity_project'" class="dec flex_row">
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_2.png"></image>
					<text class="ell">{{itemData.ssdqMc}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_4.png"></image>
					<text class="ell">{{itemData.qyjdTxt}}</text>
				</view>
				<view class="flex_row_justify_center w100">
					<image src="../../static/project/project_1.png"></image>
					<text class="ell">{{itemData.projectKindsTxt}}</text>
				</view>
			</view>
			<view class="dec flex_row" v-else>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_2.png"></image>
					<text class="ell">{{itemData.ssdqMc}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_3.png"></image>
					<text class="ell">热度值 {{itemData.projectHot}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_5.png"></image>
					<text class="ell">{{itemData.rzedTxt}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_4.png"></image>
					<text class="ell">{{itemData.qyjdTxt}}</text>
				</view>
				<view class="flex_row_justify_center w100">
					<image src="../../static/project/project_1.png"></image>
					<text class="ell">{{itemData.projectKindsTxt}}</text>
				</view>
			</view>
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
			},
			proType:{
				type:String
			}
		},
		methods:{
			async goDetail(id) {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'1001'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:2
				})
				uni.navigateTo({
					url:'/pages/ProDetail/ProDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.project_item{
	background: #fff;
	padding: 27upx;
	align-items: start;
	margin-bottom: 30upx;
	border-radius: 8upx;
	.left{
		width: 156upx;
		height: 156upx;
		border-radius: 10upx;
		overflow: hidden;
		margin-right: 30upx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.right{
		width: 0;
		.title{
			width: 100%;
			font-size: 30upx;
			color: #000000;
			line-height: 1;
		}
		.dec{
			flex-wrap:wrap;
			margin-top: 25upx;
			view{
				width: 50%;
				padding-right: 10upx;
				margin-bottom: 10upx;
				box-sizing: border-box;
			}
			image{
				width: 30upx;
				height: 30upx;
				margin-right: 20upx;
			}
			text{
				width: calc( 100% - 50upx );
				font-size: 26upx;
				color: #666;
			}
			.w100{
				width: 100%;
			}
			.color_blue{
				color: #3167d9;
			}
		}
		
	}
}
</style>
