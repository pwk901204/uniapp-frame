<template>
	<view class="container act_detail">
		<template v-if="detail">
			<view class="banner">
				<!-- <web-view class="webView" :src="url" v-if="url" @message="getMessage"></web-view> -->
				<!-- <video :src="multimediaUrl" enable-play-gesture v-if="multimediaUrl" :poster="activityIndexPath"></video> -->
				<!-- <image v-else :src='activityIndexPath'></image> -->
				<image :src='activityIndexPath' ></image>
			</view>
			<text class="act_title ell">{{detail.activityName}}</text>
			<view class="cur_line"></view>
			<view class="act_infor">
				<view class="item flex_row_justify_center">
					<image class="flex_none" src="../../../static/project/project_6.png"></image>
					<text class="dec ell flex_auto">{{detail.activityTimeFormat}}</text>
					<view v-if="detail.approveStateTxt" class="flex_none" :class="{pre:detail.approveState ==1,end:detail.approveState == 2}" >{{detail.approveStateTxt}}</view>
				</view>
				<view class="item flex_row_justify_center" @click="goDetailVideo" v-if="(detail.vedioType == 0 && detail.activityLiveAddress ) || (detail.vedioType == 1 && detail.activityRecordAddress)">
					<image class="flex_none" src="../../../static/project/live.png"></image>
					<text class="dec ell flex_auto fontBold" v-if="detail.vedioType == 0">观看直播入口</text>
					<text class="dec ell flex_auto fontBold" v-if="detail.vedioType == 1">直播回放入口</text>
					<image class="arrow flex_none" src="../../../static/icon/arrow.png"></image>
				</view>
				
				
				<view class="item flex_row_justify_center">
					<image class="flex_none" src="../../../static/project/project_2.png"></image>
					<text v-if="detail.approveMode == 1" class="dec ell flex_auto">{{detail.approveModeTxt}}</text>
					<text v-if="detail.approveMode == 2" class="dec ell flex_auto">{{detail.activityAddress}}</text>
				</view>
				<view class="item flex_row_justify_center">
					<image class="flex_none" src="../../../static/project/message.png"></image>
					<text class="dec ell flex_auto">{{detail.activityUnit}}</text>
				</view>
				<view class="item apply flex_row_justify_center" >
					<image class="flex_none" src="../../../static/project/person_1.png"></image>
					<text class="dec flex_none ell">已报名</text>
					<view class="apply_list flex_auto flex_row_justify_center">
						<view class="apply_item flex_col_center" v-for="(item,i) in detail.investorsPageDtoList" :key="i">
							<image mode="aspectFill" :src='item.photoUrl ? $api.viewFile(item.photoUrl) : "../../static/common/default_person.jpg"'></image>
							<text class="ell">{{item.userName}}</text>
						</view>
					</view>
					<view @click="goApply(id)" class="item_ell flex_none">···</view>
				</view>
			</view>
			
			
			<view class="title flex_row_between">
				<text>项目介绍</text>
			</view>
			<view class="info">
				<rich-text :nodes="detail.activityContent"></rich-text>
			</view>
			<view class="title flex_row_between" v-if="detail.joinedProjectList&&detail.joinedProjectList.length>0">
				<text>项目列表</text>
			</view>
			<view class="pro_list" v-if="detail.joinedProjectList&&detail.joinedProjectList.length>0">
				<project-item  v-for="item in detail.joinedProjectList" :key="item.projectId" proType="activity_project" :itemData="item"></project-item>
			</view>	
			
			<view class="title flex_row_between" v-if="detail.activityUndertakeList && detail.activityHostList">
				<text>合作信息</text>
			</view>
			<view class="cooperation">
				<view class="item" v-if="detail.activityHostList">
					<view>主办单位</view>
					<view class="ell" v-for="(item,i) in detail.activityHostList" :key="i">{{item}}</view>
				</view>
				<view class="item" v-if="detail.activityUndertakeList">
					<view>承办单位</view>
					<view class="ell" v-for="(item,i) in detail.activityUndertakeList" :key="i">{{item}}</view>
				</view>
			</view>
			<view class="foot flex_row">
				<button class="share flex_col_center" open-type="share">
					分享给好友
				</button>
				<button class="apply_btn flex_col_center" v-if="detail.joinState == 0 " @click="goApplication">
					报名活动
				</button>
				<button class="apply_btn disabled flex_col_center" v-else-if="detail.joinState == 1 " >
					已报名
				</button>
				<button class="apply_btn disabled flex_col_center" v-else-if="detail.joinState == 2 " >
					报名已截止
				</button>
			</view>
		</template>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import { queryActivityDetailById } from '@/common/vmeitime-http/index.js'
	import projectItem from '@/components/project-item/project-item.vue'
	
	export default {
		components: {
			projectItem
		},
		data() {
			return {
				id:'',
				detail:{
					investorsPageDtoList:[]
				},
				list:[],
				multimediaUrl:'',
				activityIndexPath:'',
				url:'http://mudu.tv/show/videolink2/m71xn2pm/origin'
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
			}
			this.queryActivityDetailById()
		},
		onShow() {
			this.$store.commit('setActivityDetail',{})
		},
		onShareAppMessage() {
			updateProjectOperate({
				type:'3',
				lx:'3',
				id:this.id
			})
			return {
				title: this.detail.projectName,
				path: '/pages/Activity/detail/detail?id='+this.id
			}
		},
		methods: {
			goDetailVideo(){
				//视频地址  0 直播 1 录像
				let url = encodeURIComponent(this.detail.vedioType == 0 ? this.detail.activityLiveAddress : this.detail.activityRecordAddress);
				uni.navigateTo({
					url:'/pages/Activity/detailVideo/detailVideo?url=' + url + '&title=' + this.detail.activityName
				})
			},
			async queryActivityDetailById(){
				let res = await queryActivityDetailById({
					id: this.id,
					flag: 1
				})
				if(res.data.flag){
					this.detail = res.data.data
					// this.multimediaUrl = 'https://myun-hw-s3.myun.tv/melj80jz/56xm92y6/1584086296125350957.m3u8'
					this.multimediaUrl = this.detail.multimediaUrl ? this.$api.viewFile(this.detail.multimediaUrl) : ''
					this.activityIndexPath = this.detail.activityIndexPath ?this.$api.viewFile(this.detail.activityIndexPath) : "../../static/common/default.jpg"
				}
			},
			goApply(id){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				uni.navigateTo({
					url:'/pages/Activity/apply/apply?id='+id
				})
			},
			goApplication(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				this.$store.commit('setActivityDetail',{...this.detail})
				uni.navigateTo({
					url:'/pages/Activity/application/application?id='+this.id
				})
			},
			share(){
				uni.showToast({
					title: "分享成功",
					icon:'none',
					duration: 3000
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		background-color: #fff;
	}
	.act_detail{
		padding-bottom: 108upx;
		position: relative;
		.banner{
			height: 300upx;
			.webView{
				width: 100%;
				height: 100%;
			}
			video{
				width: 100%;
				height: 100%;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		.act_title{
			display: block;
			font-size: 34upx;
			line-height: 94upx;
			color: #000000;
			padding: 0 30upx;
			box-sizing: border-box;
			font-weight: bold;
			background: #FFFFFF;
		}
		.cur_line{
			height: 20upx;
			background: #f3f3f3;
		}
		.act_infor{
			&>view{
				border-bottom:1px solid #e6e6e6;
			}
			&>view:last-of-type{
				border-bottom:none;
			}
			.fontBold{
				font-weight: bold;
			}
			.item{
				height: 90upx;
				padding: 0 30upx;
				background: #fff;
				&>image{
					width: 30upx;
					height: 30upx;
					margin-right: 20upx;
				}
				.arrow{
					margin-right: 0upx;
				}
				.dec{
					min-width: 0;
					color: #666666;
					font-size: 28upx;
				}
				.pre,.end{
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
				.item_ell{
					width: 60upx;
					height: 100upx;
					line-height: 100upx;
					font-size: 30upx;
					color: #666;
					font-weight: bold;
					text-align: right;
				}
			}
			.apply{
				height: 182upx;
				.apply_list{
					.apply_item{
						margin: 0 10upx;
						image{
							width: 100upx;
							height: 100upx;
							border-radius: 50%;
							margin-bottom: 18upx;
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
		
		
		&>.title{
			padding:30upx;
			background: #f3f3f3;
			text{
				font-size: 34upx;
				line-height: 1;
				color: #000000;
				font-weight: bold;
			}
		}
		.info{
			font-size: 28upx;
			color: #333;
			padding: 30upx;
			background: #fff;
		}
		
		.pro_list{
			background: #fff;
			width: 100%;
			overflow: hidden;
			.project_item {
				margin-bottom: 0;
				border-bottom: 1px solid #e6e6e6;
			}
			
		}
		
		.cooperation{
			padding: 0 30upx;
			box-sizing: border-box;
			.item{
				view{
					font-size: 28upx;
					color: #333;
					line-height: 50upx;
				}
				padding: 10px 0 40upx 0;
			}
		}
		
		.foot{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 98upx;
			.share,.apply_btn{
				width: 50%;
				border: none;
				outline: none;
				color: #FFFFFF;
				font-size: 28upx;
				border-radius: 0;
				&::after{
					border:none;
				}
			}
			.share{
				background: #3167d9;
			}
			.apply_btn{
				background: #f7aa45;
				&.disabled{
					background: #f5f5f5;
					color: #666;
				}
			}
		}
	}
	
</style>
