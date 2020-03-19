<template>
	<view class="container investor_detail">
		<view class="private_info out_shadow">
			<view class="top flex_row out_shadow">
				<view class="left flex_none">
					<image mode="aspectFill" :src='detail.photoUrl ? $api.viewFile(detail.photoUrl) : "../../../static/common/default_person.jpg"'></image>
				</view>
				<view class="right flex_auto">
					<view class="title ell">{{detail.userName}}</view>
					<view class="dec flex_row">
						<view class="flex_row_justify_center">
							<image src="../../../static/project/project_7_1.png"></image>
							<text class="ell">{{detail.company}}</text>
						</view>
						<view class="flex_row_justify_center w50">
							<image src="../../../static/project/project_8_1.png"></image>
							<text class="ell">{{detail.job}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="content flex_row">
				<view class="item flex_col_center">
					<view class="flex_row_center">
						<image src="../../../static/project/project_9.png"></image>
						<text>电话</text>
					</view>
					<text class="ell">{{detail.isDmp == 3 ? detail.phone: '互换名片后显示'}}</text>
				</view>
				<view class="item flex_col_center">
					<view class="flex_row_center">
						<image src="../../../static/project/project_10.png"></image>
						<text>邮箱</text>
					</view>
					<text class="ell">{{detail.isDmp == 3 ? detail.email: '互换名片后显示'}}</text>
				</view>
			</view>
		</view>
		<view class="cur_line"></view>
		<view class="company_info">
			<view class="item flex_row_justify_center">
				<text class="flex_none">所在地区</text>
				<text class="ell flex_auto">{{detail.provinceCity}}</text>
			</view>
			<view class="item flex_row_justify_center">
				<text class="flex_none">投资额度</text>
				<text class="ell flex_auto">{{detail.investmentLinesTxt}}</text>
			</view>
			<view class="item flex_row_justify_center">
				<text class="flex_none">投资阶段</text>
				<text class="ell flex_auto">{{detail.investmentPhaseTxt}}</text>
			</view>
			<view class="item flex_row_justify_center">
				<text class="flex_none">投资地区</text>
				<text class="ell flex_auto">{{detail.investmentPlaceTxt}}</text>
			</view>
		</view>
		<view class="title flex_row_between">
			<text>投资领域</text>
		</view>
		<view class="area">
			<view class="area_wrap flex_row">
				<view class="item ell" v-for="item in investmentFieldTxt">{{item}}</view>
			</view>
		</view>
		<view class="title flex_row_between">
			<text>个人经历</text>
		</view>
		<view class="info">{{detail.personalExper}}</view>
		<view class="foot flex_row out_shadow">
			<view class="collect flex_col_center" @click="collect">
				<image v-if="detail.isSc==1"src="../../../static/icon/collected.png"></image>
				<image v-else src="../../../static/icon/collect.png"></image>
				<text v-if="detail.isSc==1">已收藏</text>
				<text v-else>收藏</text>
			</view>
			<view class="send_card flex_col_center" @click="send_card">
				<image src="../../../static/icon/card.png"></image>
				<text v-if="detail.isDmp == 1">递名片</text>
				<text v-else-if="detail.isDmp == 4">已递名片</text>
				<text v-else-if="detail.isDmp == 2">回赠名片</text>
				<text v-else-if="detail.isDmp == 3">已互换名片</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryInvestorsDtoById,updateProjectOperate,saveOrUpdateCard } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			return {
				id:"",
				detail:null
			}
		},
		computed:{
			investmentFieldTxt(){
				return (this.detail && this.detail.investmentFieldTxt) ? this.detail.investmentFieldTxt.split(';') : []
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
			}
			this.queryInvestorsDtoById()
		},
		methods: {
			async queryInvestorsDtoById(){
				let res = await queryInvestorsDtoById({
					id: this.id
				})
				if(res.data.flag){
					this.detail = res.data.data
				}
			},
			share(){
				uni.showToast({
					title: "分享成功",
					icon:'none',
					duration: 3000
				})
			},
			async collect(){
				let type = ''
				let msg = ''
				if(this.detail.isSc == 1){
					type = 1 // 取消收藏
					msg = '已取消收藏'
				}else{
					type = 2 // 收藏
					msg = '收藏成功，您可以在"收藏"栏目查看收藏记录'
				}
				let res = await updateProjectOperate({
					type,
					lx:'1',
					id:this.id
				})
				if(res.data.flag){
					this.queryInvestorsDtoById()
				}else{
					msg = res.data.message
				}
				uni.showModal({
					title:'提示',
					content: msg,
					showCancel: false
				});
			},
			async send_card(){
				let isDmp = this.detail.isDmp
				if(isDmp == 1 || isDmp == 2){
					let res = await saveOrUpdateCard({
						type:isDmp,
						jsUserId:this.detail.id,
						cardType:1
					})
					if(res.data.flag){
						let msg = isDmp == 1 ? 
						'递名片成功！当对方回赠名片即可获取对方联系方式'
						:
						'回赠名片成功'
						;
						uni.showModal({
							title:'提示',
							content: msg,
							showCancel: false
						});
						this.queryInvestorsDtoById()
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding-bottom: 148upx;
		background-color: #fff;
		min-height: 100vh;
	}
	.investor_detail{
		.private_info{
			background: #fff;
			.top{
				padding: 30upx;
				box-sizing: border-box;
				background: url(../../../static/bg/banner.png) no-repeat;
				background-size: 100% 100%;
				.left{
					width: 145upx;
					height: 145upx;
					border-radius: 50%;
					overflow: hidden;
					margin: 0 45upx 0 29upx;
					image{
						border: 10upx solid #fff;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						box-sizing: border-box;

					}
				}
				.right{
					width:0;
					.title{
						font-size: 36upx;
						color: #fff;
						line-height: 1.4;
					}
					.dec{
						.w50{
							width: 50%;
						}
						flex-wrap:wrap;
						margin-top: 20upx;
						view{
							padding-right: 10upx;
							margin-bottom: 10upx;
							box-sizing: border-box;
							width: 100%;
						}
						image{
							width: 30upx;
							height: 30upx;
							margin-right: 20upx;
						}
						text{
							font-size: 26upx;
							color: #fff;
						}
					}
				}
			}
			.content{
				padding: 40upx 0;
				.item{
					width: 50%;
					&:nth-of-type(1){
						border-right: 1px solid #e6e6e6;
					}
					&>view{
						image{
							width: 30upx;
							height: 30upx;
							margin-right: 20upx;
						}
						text{
							font-size: 26upx;
							color: #666666;
						}
					}
					&>text{
						font-size: 28upx;
						color: #000000;
						width: 100%;
						padding: 0 20upx;
						box-sizing: border-box;
						text-align: center;
					}
				}
			}
				
		}
		.company_info{
			.item{
				height: 90upx;
				padding: 0 30upx;
				border-bottom: 1px solid #e6e6e6;
				text{
					width: 160upx;
					font-size: 28upx;
					line-height: 1;
				}
				text:nth-of-type(1){
					color: #000;
				}
				text:nth-of-type(2){
					width: 0;
					color: #666666;
					text-align: right;
				}
			}
			
		}
		.cur_line{
			height: 20upx;
			background: #f3f3f3;
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
		.area{
			padding: 47upx 30upx;
			overflow-x: auto;
			.area_wrap{
				width: max-content;
				.item{
					min-width: 150upx;
					max-width: 240upx;
					padding: 0 20upx;
					box-sizing: border-box;
					background: #f2f2f2;
					height: 68upx;
					line-height: 68upx;
					border-radius: 34upx;
					margin-right: 30upx;
					text-align: center;
				}
			}
			
		}
		.info{
			font-size: 28upx;
			color: #333;
			padding: 30upx;
			background: #fff;
		}
		.foot{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 98upx;
			background: #fff;
			image{
				width: 40upx;
				height: 40upx;
			}
			.collect{
				width: 50%;
				text{
					font-size: 26upx;
					color: #000;
					line-height: 1.4;
				}
			}
			.send_card{
				width: 50%;
				background: #3167d9;
				text{
					font-size: 26upx;
					color: #fff;
					line-height: 1.4;
				}
			}
		}
	}
</style>
