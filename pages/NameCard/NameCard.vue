<template>
    <view class="container project">
		<view class="head">
			<view class="tab_wrap">
				<view class="tab flex_row">
					<view :class="{active: projectType=== '0'}" @click="changeType('0')">投资人</view>
					<view :class="{active: projectType=== '1'}" @click="changeType('1')">企业项目</view>
				</view>
			</view>
		</view>
		
		<view class="search_list">
			<template v-if="list.length > 0" >
				<card-item  v-for="item in list" :key="item" :itemData="item" :type="projectType"></card-item>
			</template>
			<view class="no_data flex_col_center" v-else>
				<image src="../../static/bg/nowNoData.png"></image>
				<text>暂无数据</text>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>
<script>
	import cardItem from '@/components/card-item/card-item.vue'
	import { nameCardList, nameCardProList } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			cardItem
		},
        data() {
            return {
				loadMoreText: "加载中...",
				showLoadMore: false,
				bStop: false,
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
		onShow() {
			if (this.bStop) {
				this.refresh()
			}
			this.bStop = true
		},
        methods: {
			// 名片列表
			async nameCardList(){
				let res = null;
				if (this.projectType === '0') {
					res = await nameCardList({
						...this.params
					})
				} else {
					res = await nameCardProList({
						...this.params
					})
					// res.data.data.list.forEach((item) => {
					// 	item.photoUrl = item.photoUrl
					// })
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
				this.nameCardList()
			},
			changeType(value){
				if (this.projectType === value) return;
				this.list = []
				this.projectType = value
				this.params = {
					...this.params,
					pageNum:1
				}
				this.nameCardList()
			},
			// 分页
			scrolltolower() {
				console.log(this.params.pageNum, this.pages)
				if(this.params.pageNum >= this.pages || this.showLoadMore) return
				console.log(2)
				this.showLoadMore = true;
				this.params.pageNum++
				this.nameCardList()
			},
			// 返回不同类型class
			selectType(type) {
				switch(type) {
					case '2': 
						return 'type0';
					case '3': 
						return 'type1';
					default: 
						return 'type2';
				}
			},
			// 返回不同类型stirng
			selectTypeStr(type) {
				switch(type) {
					case '2':
						return '回赠名片';
					case '3':
						return '已互换名片';
					default: 
						return '已递名片';
				}
			},
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

