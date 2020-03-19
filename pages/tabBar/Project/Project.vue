<template>
    <view class="container project">
		<view class="head">
			<view class="tab_wrap">
				<view class="tab flex_row">
					<view :class="{active: params.projectType=== ''}" @click="changeType('')">全部</view>
					<view :class="{active: params.projectType=== '2'}" @click="changeType('2')">路演项目</view>
					<view :class="{active: params.projectType=== '1'}" @click="changeType('1')">展示项目</view>
				</view>
			</view>
			<view class="flex_row_between list_head">
				<view class="sort flex_row_justify_center">
					<!-- <text :class="{active:params.sortType==='1'}" @click="sortTypeChange('1')">相关度</text> -->
					<text :class="{active:params.sortType==='2'}" @click="sortTypeChange('2')">时间优先</text>
					<text :class="{active:params.sortType==='3'}" @click="sortTypeChange('3')">热度优先</text>
				</view>
				<view class="filter flex_row_center" @click="goFilter">
					<text>筛选</text>
					<image src="../../../static/icon/filter.png"></image>
				</view>
			</view>
		</view>
		
		<view class="search_list">
			<template v-if="list.length>0" >
				<project-item  v-for="item in list" :key="item.id" :itemData="item"></project-item>
			</template>
			<view class="no_data flex_col_center" v-else>
				<image src="../../../static/bg/nodata.png"></image>
				<text>暂无搜索结果</text>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>
<script>
	import projectItem from '@/components/project-item/project-item.vue'
	import { querySearchProjectInforList } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			projectItem
		},
        data() {
            return {
				filter:null,
				loadMoreText: "加载中...",
				showLoadMore: false,
				list:[],
				pages:0,
				params:{
					pageSize:15,
					pageNum:1,
					projectType:'',
					sortType:'',
					projectKinds:'',	//行业分类
					rzed:'', 			//融资额度
					qyjd:'',			//项目阶段
					ssdqCode:''			//所属地区
				}
            }
        },
		watch: {
			filter(newValue, oldValue) {
				this.params.projectKinds=newValue.item_1_select,
				this.params.rzed=newValue.item_2_select, 
				this.params.qyjd=newValue.item_3_select,
				this.params.ssdqCode=newValue.item_4_select
				this.$nextTick(() => {
					this.refresh()
				})
			}
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
		onShow(){
			let sortType = uni.getStorageSync('projectSort')
			if(sortType){
				this.params.sortType = sortType
				uni.removeStorageSync('projectSort')
				this.refresh()
			}
		},
		onLoad() {
			this.refresh()
		},
        methods: {
			// 首页搜索/项目列表
			async querySearchProjectInforList(){
				let res = await querySearchProjectInforList({
					...this.params
				})
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
				this.querySearchProjectInforList()
			},
			changeType(value){
				// this.$store.dispatch('setButtonClicked')
				// if(this.$store.state.buttonClicked) return
				
				this.list = []
				this.params = {
					...this.params,
					pageNum:1,
					projectType:value
				}
				this.querySearchProjectInforList()
			},
			sortTypeChange(value){
				// this.$store.dispatch('setButtonClicked')
				// if(this.$store.state.buttonClicked) return
				
				this.list = []
				this.params = {
					...this.params,
					pageNum:1,
					sortType:value
				}
				this.querySearchProjectInforList()
			},
			goFilter(){
				let filter = this.filter || {
					item_1_select:'',
					item_2_select:'',
					item_3_select:'',
					item_4_select:'',
				}
				uni.navigateTo({
					url:'/pages/ProFilter/ProFilter?item_1_select=' + filter.item_1_select + 
					'&item_2_select=' + filter.item_2_select +
					'&item_3_select=' + filter.item_3_select +
					'&item_4_select=' + filter.item_4_select
				})
			},
			// 分页
			scrolltolower() {
				if(this.params.pageNum >= this.pages || this.showLoadMore) return
				this.showLoadMore = true;
				this.params.pageNum++
				this.querySearchProjectInforList()
			}
        }
    }
</script>

<style lang="scss">
	.container{
		// background-color: #fff;
		min-height: 100vh;
	}
	.project{
		box-sizing: border-box;
		padding-top: 176upx;
		.head{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 100;
		}
		.tab_wrap{
			padding: 20upx 30upx 0 30upx;
			background: #fff;
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
		
		.list_head{
			display: flex;
			background: #FFFFFF;
			padding: 0 30upx;
			border-bottom: 1px solid #f5f5f5;
			height: 88upx;
			line-height: 88upx;
		}
		.sort{
			width: 550upx;
			text{
				text-align: center;
				margin-right: 50upx;
				color: #666666;
				font-size: 24upx;
				&.active{
					color: #000000;
					font-weight: bold;
				}
			}
		}
		.filter{
			text{
				color: #666666;
				font-size: 24upx;
			}
			image{
				width: 30upx;
				height: 30upx;
				margin-left: 10upx;
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
			padding: 20upx 30upx 0;
			overflow: auto;
			box-sizing: border-box;
			min-height: 100%;
		}
	}
	
	
</style>
