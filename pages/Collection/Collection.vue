<template>
    <view class="container project">
		<view class="head">
			<view class="tab_wrap">
				<view class="tab flex_row">
					<view :class="{active: projectType === '0'}" @click="changeType('0')">投资人</view>
					<view :class="{active: projectType === '1'}" @click="changeType('1')">企业项目</view>
				</view>
			</view>
		</view>
		
		<view class="search_list">
			<template v-if="list.length > 0 && projectType === '0'" >
				<investor-item  v-for="item in list" :key="item" :itemData="item">
					<view slot="dec" class="dec flex_row">
						<view class="flex_row_justify_center w100">
							<image src="../../static/project/project_7.png"></image>
							<text class="ell">{{item.company}}</text>
						</view>
						<view class="flex_row_justify_center">
							<image src="../../static/project/project_8.png"></image>
							<text class="ell">{{item.job}}</text>
						</view>
						<view class="flex_row_justify_center">
							<image src="../../static/project/project_2.png"></image>
							<text class="ell">{{item.provinceCity}}</text>
						</view>
						<view class="flex_row_justify_center w100">
							<image src="../../static/project/project_1.png"></image>
							<text class="ell">{{item.investmentFieldTxt || ''}}</text>
						</view>
					</view>
				</investor-item>
			</template>
			<template v-if="list.length > 0 && projectType === '1'" >
				<project-item  v-for="item in list" :key="item" :itemData="item">
				</project-item>
			</template>
			<view class="no_data flex_col_center" v-if="list.length === 0">
				<image src="../../static/bg/nowNoData.png"></image>
				<text>暂无数据</text>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>
<script>
	import investorItem from '@/components/investor-item/investor-item.vue'
	import projectItem from '@/components/project-item/project-item.vue'
	import { colPersonList, collectionList } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			investorItem,
			projectItem
		},
        data() {
            return {
				loadMoreText: "加载中...",
				showLoadMore: false,
				list: [],
				pages: 0,
				projectType: '0',
				params:{
					pageSize: 15,
					pageNum: 1
				}
            }
        },
		onPullDownRefresh() {
			this.refresh()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			console.log('next');
			this.scrolltolower()
		},
		onShow(){
			let sortType = uni.getStorageSync('projectSort')
			if(sortType){
				this.params.sortType = sortType
				uni.clearStorageSync('projectSort')
				this.refresh()
			}
		},
		onLoad() {
			this.refresh()
		},
        methods: {
			// 名片列表
			async collectionList(){
				
				let res = null;
				if (this.projectType === '0') {
					res = await colPersonList({
						...this.params
					})
				} else {
					res = await collectionList({
						...this.params
					})
					res.data.data.list.forEach((item) => {
						item.fileUrl = item.projectLogo
					})
				}
				
				this.showLoadMore = false
				
				if(res.data.flag){
					this.pages = res.data.data.pages
					this.list = this.list.concat(res.data.data.list)
				}
				
			},
			refresh(){
				this.list=[]
				this.params = {
					...this.params,
					pageSize:15,
					pageNum:1
				}
				this.collectionList()
			},
			changeType(value){
				if (this.projectType === value) return;
				this.list = []
				this.projectType = value
				this.params = {
					...this.params,
					pageNum:1
				}
				this.collectionList()
			},
			// 分页
			scrolltolower() {
				if(this.params.pageNum >= this.pages || this.showLoadMore) return
				this.showLoadMore = true;
				this.params.pageNum++
				this.collectionList()
			}
        }
    }
</script>

<style lang="scss">
	.container{
		background: #f3f3f3;
		min-height: 100vh;
	}
	.project{
		box-sizing: border-box;
		padding-top: 100upx;
		.head{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 100;
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
		.tab_wrap{
			padding: 0 30upx 20upx 30upx;
			background: #fff;
			.tab{
				border: 1px solid #3167d9;
				border-radius: 8upx;
				view{
					width: 50%;
					color: #3167d9;
					font-size: 30upx;
					text-align: center;
					line-height: 70upx;
					&:nth-of-type(2){
						border-left: 1px solid #3167d9;
						// border-right: 1px solid #3167d9;
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
				width: 374upx;
				height: 283upx;
			}
			text{
				font-size: 28upx;
				color: #666666;
			}
		}
		
		.search_list{
			padding: 20upx 30upx 0;
			overflow: auto;
			box-sizing: border-box;
			min-height: 100%;
		}
	}	
</style>

