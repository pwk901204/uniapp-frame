<template>
	<view class="activity_item" @click="goDetail(itemData.id)" >
		<view class="banner">
			<image :src="itemData.activityIndexPath ? $api.viewFile(itemData.activityIndexPath) :'../../static/common/default.jpg'"></image>
			<view v-if="itemData.approveStateTxt" :class="{pre:itemData.approveState==1,end:itemData.approveState==2}">{{itemData.approveStateTxt}}</view>
		</view>
		<view class="dec flex_row_justify_center">
			<view class="flex_auto flex_row_justify_center">
				<image class="flex_none" src="../../static/project/project_2.png"></image>
				<view class="ell flex_auto"  v-if="itemData.approveMode == 1">{{itemData.approveModeTxt }}</view>
				<view class="ell flex_auto"  v-if="itemData.approveMode == 2">{{itemData.activityAddress }}</view>
			</view>
			<view class="flex_none flex_row_justify_center">
				<image class="flex_none" src="../../static/project/project_6.png"></image>
				<view class="ell flex_auto" >{{itemData.activityStartTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { savaProjectFwjl } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			return {
			};
		},
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
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'3001'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:3
				})
				uni.navigateTo({
					url:'/pages/Activity/detail/detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
.activity_item{
	background: #fff;
	border-radius: 8upx;
	.banner{
		height:300upx;
		position: relative;
		&>image{
			width: 100%;
			height: 100%;;
			border-radius: 10upx;
		}
		.pre,.end{
			position: absolute;
			right: 0;
			top: 40upx;
			font-size: 28upx;
			width: 124upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			color: #fff;
			background: linear-gradient(to right,#f9c300,#ffa52f);
			border-radius: 20upx 0 0 20upx;
		}
		.end{
			background: linear-gradient(to right,#999999,#808080);
		}
	}
	.dec{
		height: 80upx;
		
		&>view{
			&>image{
				width: 36upx;
				height: 36upx;
				margin-right: 10upx;
			}
			&>view{
				font-size:  26upx;
				color: #666666;
			}
			&:nth-of-type(1){
				width: 0;
			}
			&:nth-of-type(2){
				width: 280upx;
			}
		}
	}
}
</style>
