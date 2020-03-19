<template>
	<view class="container search_page">
		<view class="flex_row_between search">
			<view class="search_wrap flex_row_justify_center">
				<image src="../../static/icon/search.png"></image>
				<input type="text" placeholder="项目/活动/投资人" v-model="searchKey" />
			</view>
			<text @click="search">搜索</text>
		</view>
		<view class="title flex_row_between" v-if="searchHistory.length>0">
			<text>历史搜索</text>
		</view>
		<view class="search_item flex_row">
			<text v-for="(item,index) in searchHistory" :key="index"  class="item ell" @click="goSearchResult(item)">{{item}}</text>
		</view>
		<view class="title flex_row_between" v-if="searchHot.length > 0">
			<text>热门搜索</text>
		</view>
		<view class="search_item flex_row">
			<text v-for="(item,index) in searchHot" :key="index"  class="item ell" @click="goSearchResult(item)">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			let {searchHistory} = this.$store.state
			return {
				type:'',
				searchKey: '',
				searchHistory,
				searchHot: []
			};
		},
		onLoad(options) {
			if(options.type){
				this.type = options.type
			}
		},
		methods:{
			search(){
				this.goSearchResult(this.searchKey)
			},
			goSearchResult(searchKey){
				this.$store.commit('setSearchHistory', searchKey)
				uni.navigateTo({
					url:'/pages/searchResult/searchResult?searchKey='+searchKey +'&type=' + this.type
				})
			}
		}
	}
</script>

<style lang="scss">
	.search_page{
		background: #fff;
		padding: 0 30upx;
		.search{
			padding: 20upx 0;
			.search_wrap{
				width: 620upx;
				height: 64upx;
				background: #f5f5f5;
				border-radius: 30upx;
				image{
					width: 36upx;
					height: 36upx;
					margin: 0 15upx 0 30upx;
				}
				input{
					width: 520upx;
					height: 64upx;
				}
			}
			&>text{
				font-size: 28upx;
				color: #3167d9;
			}
		}
		
		.title{
			padding: 50upx 0 30upx 0;
			text{
				font-size: 34upx;
				color: #000000;
				font-weight: bold;
			}
		}
		.search_item{
			flex-wrap: wrap;
			text{
				width: 210upx;
				height: 74upx;
				text-align: center;
				line-height: 74upx;
				color: #666;
				font-size: 28upx;
				background: #f3f4f4;
				border-radius: 37upx;
				margin-bottom: 28upx;
				margin-right: 20upx;
			}
		}
	}
</style>
