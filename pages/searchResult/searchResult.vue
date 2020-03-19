<template>
	<view class="container search_result">
		<view class="head">
			<view class="flex_row_between search">
				<view class="search_wrap flex_row_justify_center">
					<icon type="search"></icon>
					<input type="text" placeholder="项目/活动/投资人" v-model="searchKey" />
				</view>
				<text @click="search">搜索</text>
			</view>
			<view class="tab_wrap">
				<view class="tab flex_row">
					<view :class="{active: type=== 'project'}" @click="changeType('project')">项目</view>
					<view :class="{active: type=== 'investor'}" @click="changeType('investor')">投资人</view>
					<view :class="{active: type=== 'activity'}" @click="changeType('activity')">活动</view>
				</view>
			</view>
		</view>
		
		<view class="search_list" :class="{bg_white:bg_white}">
			<template v-if="list.length>0" >
				<project-item v-if="type === 'project'"  v-for="item in list" :key="item" :itemData="item"></project-item>
				<investor-item v-if="type === 'investor'" v-for="item in list" :key="item" :itemData="item">
					<template v-slot:dec>
						<view class="investor_dec flex_row">
							<view class="flex_row_justify_center">
								<image src="../../static/project/project_7.png"></image>
								<text class="ell">{{item.company}}</text>
							</view>
							<view class="flex_row_justify_center w50">
								<image src="../../static/project/project_8.png"></image>
								<text class="ell">{{item.job}}</text>
							</view>
							<view class="flex_row_justify_center w50">
								<image src="../../static/project/project_2.png"></image>
								<text class="ell">{{item.provinceCity}}</text>
							</view>
							<view class="flex_row_justify_center">
								<image src="../../static/project/project_1.png"></image>
								<text class="ell">{{item.investmentFieldTxt}}</text>
							</view>
						</view>
					</template>
				</investor-item> 
				<activity-item v-if="type === 'activity'" v-for="item in list" :key="item" :itemData="item"></activity-item>
			</template>
			<view class="no_data flex_col_center" v-else>
				<image src="../../static/bg/nodata.png"></image>
				<text>暂无搜索结果</text>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		
	</view>
</template>

<script>
	import projectItem from '@/components/project-item/project-item.vue'
	import activityItem from '@/components/activity-item/activity-item.vue'
	import investorItem from '@/components/investor-item/investor-item.vue'
	import { querySearchProjectInforList,queryInvestorsPage,querySearchIndexActivityDtoPage } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			return {
				type:'project',
				loadMoreText: "加载中...",
				showLoadMore: false,
				searchKey:'',
				list:[],
				pages:0,
				pageSize:15,
				pageNum:1
			};
		},
		components:{
			projectItem,
			activityItem,
			investorItem
		},
		computed:{
			bg_white(){
				return (this.type==='activity' && this.list.length>0)
			}
		},
		onLoad(options) {
			if(options.searchKey){
				this.searchKey = options.searchKey
			}
			if(options.type){
				this.type = options.type
			}
			this.changeType(this.type)
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.refresh()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('next');
			this.scrolltolower()
		},
		methods:{
			refresh(){
				this.changeType(this.type)
			},
			// 首页搜索/项目列表
			async querySearchProjectInforList(){
				let res = await querySearchProjectInforList({
					pageSize:this.pageSize,
					pageNum:this.pageNum,
					projectName:this.searchKey
				})
				this.showLoadMore = false
				if(res.data.flag){
					this.pages = res.data.data.pages
					this.list = this.list.concat(res.data.data.list)
				}
			},
			// 投资人列表
			async queryInvestorsPage(){
				let res = await queryInvestorsPage({
					pageSize:this.pageSize,
					pageNum:this.pageNum,
					userName:this.searchKey
				})
				this.showLoadMore = false
				if(res.data.flag){
					this.pages = res.data.data.pages
					this.list = this.list.concat(res.data.data.list)
				}
			},
			// 活动列表
			async querySearchIndexActivityDtoPage(){
				let res = await querySearchIndexActivityDtoPage({
					pageSize:this.pageSize,
					pageNum:this.pageNum,
					activityName:this.searchKey
				})
				this.showLoadMore = false
				if(res.data.flag){
					this.pages = res.data.data.pages
					this.list = this.list.concat(res.data.data.list)
				}
			},
			search(){
				this.$store.commit('setSearchHistory', this.searchKey)
				this.list=[]
				this.pageNum=1
				this.refresh()
			},
			changeType(value){
				this.list=[]
				this.pages=0
				this.pageNum=1
				this.type = value
				switch(value){
					case 'project':
					this.querySearchProjectInforList()
					break;
					case 'activity':
					this.querySearchIndexActivityDtoPage()
					break;
					case 'investor':
					this.queryInvestorsPage()
					break;
				}
			},
			scrolltolower() {
				if(this.pageNum >= this.pages || this.showLoadMore) return
				this.showLoadMore = true;
				this.pageNum++
				this.querySearchProjectInforList()
			}
		}
	}
</script>

<style lang="scss">
	.container{
		min-height: 100vh;
	}
	.search_result{
		box-sizing: border-box;
		padding-top: 220upx;
		.head{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 100;
		}
		.search{
			background: #fff;
			padding: 20upx 30upx;
			.search_wrap{
				width: 620upx;
				height: 60upx;
				background: #f5f5f5;
				border-radius: 30upx;
				icon{
					margin: 0 15upx 0 20upx;
				}
				input{
					width: 520upx;
				}
			}
			&>text{
				font-size: 28upx;
				color: #3167d9;
			}
		}
		.tab_wrap{
			background: #f3f3f3;
			padding: 20upx 30upx;
			.tab{
				border: 1px solid #3167d9;
				border-radius: 8upx;
				view{
					width: 33.3%;
					color: #3167d9;
					font-size: 30upx;
					text-align: center;
					line-height: 70upx;
					&:nth-of-type(2){
						border-left: 1px solid #3167d9;
						border-right: 1px solid #3167d9;
					}
					&.active{
						background: #3167d9;
						color: #fff;
					}
				}
			}
		}
		
		.no_data{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			image{
				width: 356upx;
				height: 232upx;
			}
			text{
				font-size: 28upx;
				color: #666666;
				margin-top: 50upx;
			}
		}
		
		.search_list{
			padding:0 30upx;
			box-sizing: border-box;
			&.bg_white{
				background: #fff;
				padding: 30upx;
			}
		}
	}
	@import '@/components/investor-item/slot.scss'
</style>
