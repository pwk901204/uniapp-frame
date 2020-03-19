<template>
    <view class="container activity" :style="{backgroundColor:backgroundColor}">
		<view class="search flex_row_justify_center">
			<view class="search_wrap flex_row_justify_center flex_auto">
				<image class="flex_none" src="../../../static/icon/search.png"></image>
				<input class="flex_auto" type="text" placeholder="活动名称" v-model="params.activityName" />
			</view>
			<text class="search_btn flex_none" @click="refresh">搜索</text>
		</view>
		
		
		<view class="search_list">
			<template v-if="list.length>0" >
				<activity-item  v-for="item in list" :key="item" :itemData="item"></activity-item>
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
	import activityItem from '@/components/activity-item/activity-item.vue'
	import { querySearchIndexActivityDtoPage } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			activityItem
		},
        data() {
            return {
				loadMoreText: "加载中...",
				showLoadMore: false,
				list:[],
				pages:10,
				params:{
					pageSize:15,
					pageNum:1,
					activityName:""
				}
            }
        },
		computed:{
			backgroundColor(){
				return this.list.length>0?"#fff":''
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
			refresh(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				this.list=[]
				this.params = {
					...this.params,
					pageSize:15,
					pageNum:1
				}
				this.querySearchIndexActivityDtoPage()
			},
			async querySearchIndexActivityDtoPage(){
				let res = await querySearchIndexActivityDtoPage({
					...this.params
				})
				this.showLoadMore = false
				if(res.data.flag){
					this.pages = res.data.data.pages
					this.list = this.list.concat(res.data.data.list)
				}
			},
			// 分页
			scrolltolower() {
				if(this.params.pageNum >= this.pages || this.showLoadMore) return
				this.showLoadMore = true;
				this.params.pageNum++
				this.querySearchIndexActivityDtoPage()
			}
        }
    }
</script>

<style lang="scss">
	.container{
		// background-color: #fff;
		min-height: 100vh;
	}
	.activity{
		box-sizing: border-box;
		padding-top: 127upx;
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
	
	
</style>
