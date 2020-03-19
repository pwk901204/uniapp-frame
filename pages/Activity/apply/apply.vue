<template>
    <view class="container apply">
		<view class="apply_list">
			<template v-if="list.length>0" >
				<investor-item  v-for="item in list" :key="item" :itemData="item">
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
	import { queryMoreActivityUserPage } from '@/common/vmeitime-http/index.js'
    export default {
		components:{
			investorItem
		},
        data() {
            return {
				loadMoreText: "加载中...",
				showLoadMore: false,

				list:[],
				pages:0,
				params:{
					id:"e73df58706f03b36522b6e27a3da66fd",
					pageSize:15,
					pageNum:1,
				}
            }
        },
		onLoad(options) {
			if(options.id){
				this.params.id = options.id
			}
			this.queryMoreActivityUserPage()
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
				this.list=[]
				this.params = {
					...this.params,
					pageSize:15,
					pageNum:1
				}
				this.queryMoreActivityUserPage()
			},
			async queryMoreActivityUserPage(){
				let res = await queryMoreActivityUserPage({
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
				this.queryMoreActivityUserPage()
			}
        }
    }
</script>

<style lang="scss">
	.container{
		min-height: 100vh;
		position: relative;
		padding: 20upx 30upx;
		box-sizing: border-box;
	}
	.apply{
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
		
		.apply_list{
			box-sizing: border-box;
		}
	}
	
	@import '@/components/investor-item/slot.scss'
	
</style>
