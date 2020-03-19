<template>
    <view class="container investor">
		<view class="search flex_row_justify_center">
			<view class="search_wrap flex_row_justify_center flex_auto">
				<image class="flex_none" src="../../../static/icon/search.png"></image>
				<input class="flex_auto" type="text" placeholder="投资人" v-model="params.userName" />
			</view>
			<text class="search_btn flex_none" @click="search">搜索</text>
			<image class="filter flex_none" @click="goFilter" src="../../../static/icon/filter.png"></image>
		</view>
		
		<view class="search_list">
			<template v-if="list.length>0" >
				<investor-item  v-for="item in list" :key="item.id" :itemData="item">
					<template v-slot:status>
						<view v-if="false" class="investor_status">回赠名片</view>
						<!-- <view v-if="false" class="investor_status send ">回赠名片</view>
						<view v-if="false" class="investor_status each">回赠名片</view> -->
					</template>
					<template v-slot:dec>
						<view class="investor_dec flex_row">
							<view class="flex_row_justify_center">
								<image src="../../../static/project/project_7.png"></image>
								<text class="ell">{{item.company}}</text>
							</view>
							<view class="flex_row_justify_center w50">
								<image src="../../../static/project/project_8.png"></image>
								<text class="ell">{{item.job}}</text>
							</view>
							<view class="flex_row_justify_center w50">
								<image src="../../../static/project/project_2.png"></image>
								<text class="ell">{{item.provinceCity}}</text>
							</view>
							<view class="flex_row_justify_center">
								<image src="../../../static/project/project_1.png"></image>
								<text class="ell">{{item.investmentFieldTxt}}</text>
							</view>
						</view>
					</template>
				</investor-item>
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
	import investorItem from '@/components/investor-item/investor-item.vue'
	import { queryInvestorsPage } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			investorItem
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
					userName:'',
					investmentField:'',	//行业分类
					investmentLines:'', 			//融资额度
					investmentPhase:'',			//项目阶段
					// investmentField:''			//所属地区
				}
            }
        },
		watch: {
			filter(newValue, oldValue) {
				this.params.investmentField=newValue.item_1_select,
				this.params.investmentLines=newValue.item_2_select, 
				this.params.investmentPhase=newValue.item_3_select
				this.$nextTick(() => {
					this.refresh()
				})
			}
		},
		onLoad() {
			this.refresh()
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
        methods: {
			// 首页搜索/项目列表
			search(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				this.refresh()
			},
			async queryInvestorsPage(){
				let res = await queryInvestorsPage({
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
				this.queryInvestorsPage()
			},
			goFilter(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let filter = this.filter || {
					item_1_select:'',
					item_2_select:'',
					item_3_select:''
				}
				uni.navigateTo({
					url:'/pages/Investor/filter/filter?item_1_select=' + filter.item_1_select + 
					'&item_2_select=' + filter.item_2_select +
					'&item_3_select=' + filter.item_3_select 
				})
			},
			// 分页
			scrolltolower() {
				if(this.params.pageNum >= this.pages || this.showLoadMore) return
				this.showLoadMore = true;
				this.params.pageNum++
				this.queryInvestorsPage()
			}
        }
    }
</script>

<style lang="scss">
	.container{
		min-height: 100vh;
	}
	.investor{
		box-sizing: border-box;
		padding-top: 142upx;
		.search{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background: #fff;
			box-sizing: border-box;
			padding: 20upx 30upx 30upx 30upx;
			z-index: 100;
			.search_wrap{
				padding: 0 10upx;
				box-sizing: border-box;
				height: 65upx;
				background: #f5f5f5;
				border-radius: 32upx;
				input{
					color: #b2b2b2;
					font-size: 26upx;
				}
				image{
					width: 40upx;
					height: 40upx;
					margin:0 10upx;
				}
			}
			.search_btn{
				margin:0 10upx 0 20upx;
				line-height: 1;
				color: #3167d9;
			}
			.filter{
				width: 40upx;
				height: 40upx;
				margin-left: 20upx;
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
			padding: 0 30upx;
			box-sizing: border-box;
			
		}
	}
	
	@import '@/components/investor-item/slot.scss'
	
</style>
