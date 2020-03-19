<template>
	<view class="container pro_filter">
		<view class="title title_first">
			行业分类
			<!-- <text>(单选)</text> -->
		</view>
		<view class="filter_list flex_row">
			<text class="flex_row_center out_shadow" :class="{active:item_1_select===''}" @click="()=>{this.item_1_select=''}">不限</text>
			<text class="flex_row_center out_shadow" :class="{active:item.code===item_1_select}" v-for="(item,index) in item_1" :key="index" @click="item_1_fn(item.code)">{{item.name}}</text>
		</view>
		<view class="title">融资额度</view>
		<view class="filter_list flex_row">
			<text class="flex_row_center out_shadow" :class="{active:item_2_select===''}" @click="()=>{this.item_2_select=''}">不限</text>
			<text class="flex_row_center out_shadow" :class="{active:item.dm===item_2_select}" v-for="(item,index) in item_2" :key="index" @click="item_2_fn(item.dm)">{{item.mc}}</text>
		</view>
		<view class="title">项目阶段</view>
		<view class="filter_list flex_row">
			<text class="flex_row_center out_shadow" :class="{active:item_3_select===''}" @click="()=>{this.item_3_select=''}">不限</text>
			<text class="flex_row_center out_shadow" :class="{active:item.dm===item_3_select}" v-for="(item,index) in item_3" :key="index" @click="item_3_fn(item.dm)">{{item.mc}}</text>
		</view>
		<view class="title">项目地区</view>
		<view class="filter_list flex_row">
			<text class="flex_row_center out_shadow" :class="{active:item_4_select===''}" @click="()=>{this.item_4_select=''}">不限</text>
			<text class="flex_row_center out_shadow" :class="{active:item.dm===item_4_select}" v-for="(item,index) in item_4" :key="index" @click="item_4_fn(item.dm)">{{item.mc}}</text>
			<!-- <text class="flex_row_center out_shadow" :class="{active:no_item_4}" @click="()=>{this.item_2_select=[]}">不限</text> -->
			<!-- <text class="flex_row_center out_shadow" :class="{active:item_4_select.includes(item.dm)}" v-for="(item,index) in item_4" :key="index" @click="item_4_fn(item.dm)">{{item.mc}}</text> -->
		</view>
		<view class="btnWrap flex_row">
			<view class="reset" @click="reset">重置</view>
			<view class="confirm" @click="confirm">确定</view>
		</view>
	</view>
</template>

<script>
	import { upDowZd,dictList } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			return {
				item_1:[],
				item_2:[],
				item_3:[],
				item_4:[],
				item_1_select:'',
				item_2_select:'',
				item_3_select:'',
				item_4_select:''
			};
		},
		computed:{
			// no_item_1(){return (this.item_1_select.length === 0)},
			// no_item_2(){return (this.item_2_select.length === 0)},
			// no_item_3(){return (this.item_3_select.length === 0)},
			// no_item_4(){return (this.item_4_select.length === 0)}
		},
		onLoad(options){
			if(options){
				this.item_1_select = options.item_1_select
				this.item_2_select = options.item_2_select
				this.item_3_select = options.item_3_select
				this.item_4_select = options.item_4_select
			}
			this.get_item_1()
			this.get_item_2()
			this.get_item_3()
			this.get_item_4()
		},
		methods:{
			async get_item_1(){
				let res = await upDowZd({
					sjCode:'',
					lxjp:'XYLX'
				})
				if(res.data.flag){
					this.item_1 = res.data.data
				}
			},
			async get_item_2(){
				let res = await dictList({
					lxjp:'RZED'
				})
				if(res.data.flag){
					this.item_2 = res.data.data
				}
			},
			async get_item_3(){
				let res = await dictList({
					lxjp:'QYJD'
				})
				if(res.data.flag){
					this.item_3 = res.data.data
				}
			},
			async get_item_4(){
				let res = await dictList({
					lxjp:'YJXZQH'
				})
				if(res.data.flag){
					this.item_4 = res.data.data
				}
			},
			item_1_fn(value){
				this.item_1_select===value ? this.item_1_select = '' : this.item_1_select = value
			},
			item_2_fn(value){
				this.item_2_select===value ? this.item_2_select = '' : this.item_2_select = value
			},
			item_3_fn(value){
				this.item_3_select===value ? this.item_3_select = '' : this.item_3_select = value
			},
			item_4_fn(value){
				this.item_4_select===value ? this.item_4_select = '' : this.item_4_select = value
			},
			// item_4_fn(value){
			// 	if(this.item_4_select.includes(value)){
			// 			this.item_4_select.splice(this.item_4_select.findIndex((item,index,arr)=>{
			// 			return item.dm === value
			// 		}),1)
			// 	}else{
			// 		this.item_4_select.push(value)
			// 	}
			// },
			reset(){
				this.item_1_select = ''
				this.item_2_select = ''
				this.item_3_select = ''
				this.item_4_select = ''
			},
			confirm(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				if(prevPage){
					prevPage.$vm.filter = {
						item_1_select:this.item_1_select,
						item_2_select:this.item_2_select,
						item_3_select:this.item_3_select,
						item_4_select:this.item_4_select
					}
					// prevPage.$vm.refresh && prevPage.$vm.refresh()
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.showToast({
						title: "无上级页面",
						icon:'none',
						duration: 3000
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.pro_filter{
		background: #fff;
		padding:0 30upx 98upx;
		position: relative;
		box-sizing: border-box;
		.title{
			font-size: 28upx;
			line-height: 88upx;
			color: #333333;
			margin-top: 11px;
			text{
				color: #666666;
				margin-left: 12upx;
			}
			&_first{
				margin: 0;
			}
		}
		.filter_list{ 
			text{
				width: 216upx;
				height: 100upx;
				font-size: 26upx;
				color: #666666;
				text-align: center;
				margin-bottom: 20upx;
				margin-right: 20upx;
				border-radius: 8px;
				line-height: 1.2;
				padding: 10upx;
				box-sizing: border-box;
				&:nth-of-type(3n){
					margin-right: 0;
				}
				&.active{
					background: #3167d9;
					color: #fff;
				}
			}
			flex-wrap: wrap;
		}
		.btnWrap{
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 0;
			font-size: 34upx;
			.reset{
				width: 50%;
				color: #000;
				text-align: center;
				line-height: 98upx;
				background: #fff;
				box-shadow: -31px 0px 15px -20px $my_box_shadow_color inset;
			}
			.confirm{
				width: 50%;
				background: #3167d9;
				color: #fff;
				text-align: center;
				line-height: 98upx;
			}
		}
	}
	
</style>
