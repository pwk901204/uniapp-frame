<template>
    <view class="container home_page">
		<view class="search">
			<navigator url='/pages/search/search' class="search_btn flex_row_center">
				<image src="../../../static/icon/search.png"></image>
				<text>项目/活动/投资人</text>
			</navigator>
		</view>
		
		<view class="swiper_wrap">
			<swiper circular :indicator-dots="true" :autoplay="false" :interval="2000" :duration="500" indicator-color="rgba(255,255,255,0.4)" indicator-active-color="rgba(255,255,255,1)">
				<swiper-item :key="item.id" v-for="item in banner">
					<view class="swiper_item"  @click="goActivityDetail(item.bannerUrl)">
						<image class="swiper_item" :src="item.bannerFile"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="title flex_row_justify_center">
			<text class="flex_auto">最新项目</text>
			<text @click="goProject('2')">更多</text>
			<image src="../../../static/icon/arrow.png" ></image>
		</view>
		<swiper class="new_project" circular :indicator-dots="false" :autoplay="false" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in newList" :key='index'>
				<view class="new_project_wrap flex_row">
					<view class="item flex_col out_shadow" v-for="itemChild in item" :key="itemChild.id" @click="goDetail(itemChild.id)">
						<image :src="itemChild.fileUrl ? $api.viewFile(itemChild.fileUrl) : '../../../static/common/default.jpg'"></image>
						<text class="ell">{{itemChild.projectName|| '暂无'}}</text>
						<text class="ell">{{itemChild.projectKindsTxt|| '暂无'}}</text> 
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="title flex_row_justify_center">
			<text class="flex_auto">热门项目</text>
			<text @click="goProject('3')">更多</text>
			<image src="../../../static/icon/arrow.png" ></image>
		</view>
		<swiper class="hot_project" circular :indicator-dots="false" :autoplay="false" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in hotList" :key='index'>
				<view class="hot_project_wrap flex_row">
					<view class="item flex_col out_shadow" v-for="itemChild in item" :key="itemChild.id" @click="goDetail(itemChild.id)">
						<image :src="itemChild.fileUrl ? $api.viewFile(itemChild.fileUrl) : '../../../static/common/default.jpg' "></image>
						<text class="ell">{{itemChild.projectName|| '暂无'}}</text>
						<text class="ell">{{itemChild.projectKindsTxt|| '暂无'}}</text> 
						<view class="ell">热度值{{itemChild.projectHot || '暂无'}}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="title flex_row_justify_center">
			<text class="flex_auto">路演专辑</text>
			<text @click="goActivity('3')">更多</text>
			<image src="../../../static/icon/arrow.png" ></image>
		</view>
		<swiper class="activity" circular :indicator-dots="false" :autoplay="false" :interval="2000" :duration="500">
			<swiper-item v-for="(item,index) in activityList" :key='index'>
				<view class="activity_wrap flex_row">
					<view class="item out_shadow" v-for="itemChild in item" :key="itemChild.id"  @click="goActivityDetail(itemChild.id)">
						<image :src="itemChild.activityIndexPath ? $api.viewFile(itemChild.activityIndexPath) :'../../static/common/default.jpg'"></image>
						<view class="flex_row_justify_center">
							<image class="flex_none"  src="../../../static/project/project_6.png"></image>
							<text class="ell">{{itemChild.activityStartTime}}</text>
						</view>
						<view class="flex_row_justify_center">
							<image class="flex_none" src="../../../static/project/project_2.png"></image>
							<text v-if="itemChild.approveMode == 1" class="ell">{{itemChild.approveModeTxt}}</text>
							<text v-if="itemChild.approveMode == 2" class="ell">{{itemChild.activityAddress}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
    </view>
</template>
<script>
	import { queryIndexBannerDtoPage,queryHotProjectInforList,queryNewProjectInforList,savaProjectFwjl,queryIndexActivityDtoPage } from '@/common/vmeitime-http/index.js'
	export default {
        components: {
        },
        data() {
            return {
				banner:[],
				hotList:[],
				newList:[],
				activityList:[]
            }
        },
		onLoad() {
			this.init()
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.init()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
        methods: {
			init(){
				this.queryIndexBannerDtoPage()
				// this.queryNewProjectInforList()
				// this.queryHotProjectInforList()
				// this.queryIndexActivityDtoPage()
			},
			// 首页-轮播图
			async queryIndexBannerDtoPage(){
				let res = await queryIndexBannerDtoPage()
				debugger
				if(res.data.flag){
					this.banner = res.data.data
				}
			},
			// 首页-热门项目
			async queryHotProjectInforList(){
				let res = await queryHotProjectInforList({
					pageSize:9,
					pageNum:1
				})
				if(res.data.flag){
					let list = res.data.data.list
					this.hotList = this.formatData(list)
				}
			},
			// 首页-最新项目
			async queryNewProjectInforList(){
				let res = await queryNewProjectInforList({
					pageSize:9,
					pageNum:1
				})
				if(res.data.flag){
					let list = res.data.data.list
					this.newList = this.formatData(list)
				}
			},
			async queryIndexActivityDtoPage(){
				let res = await queryIndexActivityDtoPage({
					pageSize:2,
					pageNum:1
				})
				if(res.data.flag){
					let list = res.data.data.list
					this.activityList =  this.formatData(list,2)
				}
				
			},
			formatData(data=[],step=3){
				let result = []
				for(let i =0;i<data.length;i++){
					if(i%step===0){
						result.push([])
					}
					result[Math.floor(i/step)].push(data[i])
				}
				return result
			},
			goProject(type){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				uni.setStorageSync('projectSort',type)
				uni.switchTab({
					url:'/pages/tabBar/Project/Project'
				})
			},
			goActivity(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				uni.switchTab({
					url:'/pages/tabBar/Activity/Activity'
				})
			},
			async goActivityDetail(id){
				if(id=='') return
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'3001'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:3
				})
				uni.navigateTo({
					url:'/pages/Activity/detail/detail?id=' + id
				})
			},
			async goDetail(id){
				if(this.$store.state.buttonClicked) return
				this.$store.dispatch('setButtonClicked')

				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'1001'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:2
				})
				uni.navigateTo({
					url:'/pages/ProDetail/ProDetail?id=' + id
				})
			}
        }
    }
</script>

<style lang="scss">
	.container{
		padding-top: 115upx;
		padding-bottom: 40upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.home_page{
		.search{
			position: fixed;
			/* #ifdef H5 */
			top: 44px;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 0;
			/* #endif */
			left: 0;
			width: 100%;
			box-sizing: border-box;
			z-index: 100;
			background: #fff;
			padding: 20upx 30upx 30upx 30upx;
			.search_btn{
				height: 65upx;
				background: #f5f5f5;
				border-radius: 32upx;
				text{
					color: #b2b2b2;
					font-size: 26upx;
				}
				image{
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}
			}
		}
		.swiper_wrap{
			margin:0 30upx 0upx;
			border-radius: 10upx;
			overflow: hidden;
			swiper{
				height: 300upx;
			}
		}
		.swiper_item{
			display: block;
			height: 100%;
			image{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		
		.title{
			padding: 20rpx 30upx 10upx;
			text:nth-of-type(1){
				font-size: 34upx;
				color: #000000;
				font-weight: bold;
			}
			text:nth-of-type(2){
				font-size: 26upx;
				color: #666666;
			}
			image{
				width: 26upx;
				height: 26upx;
				margin-left: 10upx;
			}
		}
		.hot_project{
			height: 385upx;
			box-sizing: border-box;
			.hot_project_wrap{
				padding: 20upx 30upx;
				height: 100%;
				box-sizing: border-box;
			}
		}
		.new_project{
			height: 317upx;
			box-sizing: border-box;
			.new_project_wrap{
				padding: 20upx 30upx;
				height: 100%;
				box-sizing: border-box;
			}
			
		}
		.hot_project,.new_project{
			.item{
				width: 217upx;
				padding: 20upx 20upx 30upx 20upx;
				margin-right: 20upx;
				box-sizing: border-box;
				border-radius: 8upx;
				background: #fff;
				// box-shadow:1px 2px 15px -4px #aaa;
				image{
					width: 176upx;
					height: 130upx;
				}
				text:nth-of-type(1){
					font-size: 28upx;
					color: #000000;
					width: 100%;
					text-align: center;
					line-height: 1;
					margin-top: 19upx;
				}
				text:nth-of-type(2){
					font-size: 24upx;
					color: #666;
					width: 100%;
					text-align: center;
					line-height: 1;
					margin-top: 26upx;
				}
				view{
					width: 100%;
					height: 48upx;
					background: #3167d9;
					color: #fff;
					font-size: 24upx;
					text-align: center;
					border-radius: 24upx;
					margin-top: 20upx;
					line-height: 48upx;
				}
			}
		}
		.activity{
			height: 360upx;
			box-sizing: border-box;
			.activity_wrap{
				height: 100%;
				box-sizing: border-box;
			}
			
		}
		.activity_wrap{
			padding: 20upx 30upx 0;
			.item{
				&:nth-of-type(1){
					margin-right: 18upx;
				}
				border-radius: 8upx;
				width: 336upx;
				height: 320upx;
				background: #fff;
				overflow: hidden;
				&>image{
					width: 100%;
					height: 220upx;
					display: block;
				}
				&>view{
					width: 100%;
					margin-top: 10upx;
					image{
						width: 30upx;
						height: 30upx;
						margin: 0 20upx;
					}
					text{
						font-size: 26upx;
						color: #666666;
						line-height: 1;
					}
				}
			}
		}
	}
</style>
