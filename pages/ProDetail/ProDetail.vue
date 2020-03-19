<template>
	<view class="container pro_detail">
		<template v-if="detail">
			<view class="banner flex_row_between">
				<image class="left" mode="aspectFit" :src='detail.companyLogo ? $api.viewFile(detail.companyLogo) : "../../static/common/default.jpg"'></image>
				<view class="right dec">
					<view class="tit ell">{{detail.projectName}}</view>
					<scroll-view class="tag" scroll-x="true">
						<view v-for="(item,i) in projectKindsTxt" :key="i" class="ell">{{item}}</view>
					</scroll-view>
				</view>
			</view>
			
			<view class="pro_infor flex_row_between">
				<view class="item flex_col_center">
					<view class="flex_row_justify_center">
						<image src="../../static/project/project_4.png"></image>
						<text>企业阶段</text>
					</view>
					<text class="ell">{{detail.qyjdTxt}}</text>
				</view>
				<view class="item flex_col_center">
					<view class="flex_row_justify_center">
						<image src="../../static/project/project_5.png"></image>
						<text>融资额度</text>
					</view>
					<text class="ell">{{detail.rzedTxt}}</text>
				</view>
				<view class="item flex_col_center">
					<view class="flex_row_justify_center">
						<image src="../../static/project/project_2.png"></image>
						<text>所在地区</text>
					</view>
					<text class="ell">{{detail.provinceStr}}{{detail.cityStr ? (',' + detail.cityStr) : '' }}</text>
				</view>
			</view>
			
			<uni-list class="list">
				<!-- detail.projectBookUrl -->
				<uni-list-item v-if="detail.projectBookAuth===0" title="商业计划书" :showExtraText="true" extraText="查看" @click="showBook"></uni-list-item>
				<uni-list-item v-if="detail.projectBookAuth===1" :showArrow='false' title="商业计划书" :showExtraText="true" extraText="不公开"></uni-list-item>
				<uni-list-item v-if="detail.projectBookAuth===2" title="商业计划书" :showExtraText="true" extraText="申请查看"></uni-list-item>
				<!-- <uni-list-item title="推荐单位" :showExtraText="true" extraText="暂无推荐单位企业项目"></uni-list-item> -->
			</uni-list>
			
			<view class="title flex_row_between">
				<text>项目介绍</text>
			</view>
			<view class="info">
				<rich-text :nodes="detail.xmjs"></rich-text>
			</view>
			<view class="title flex_row_between" v-if="detail.hxtdList && detail.hxtdList.length>0">
				<text>核心团队</text>
			</view>
			<view class="team_list" v-if="detail.hxtdList && detail.hxtdList.length>0">
				<view class="item flex_row_between" v-for="(item,i) in detail.hxtdList" :key="item.id">
					<view class="touxiang ell" :style="{background:color[i%3]}">{{item.userName}}</view>
					<view class="flex_col_justify_center">
						<text class="tit ell">{{item.userJob}}</text>
						<text class="dec">{{item.userIntro}}</text>
					</view>
				</view>
			</view>
			<view class="title flex_row_between" v-if="detail.gqjgList&&detail.gqjgList.length>0">
				<text>股权结构</text>
			</view>
			<view class="stock_list" v-if="detail.gqjgList&&detail.gqjgList.length>0">
				<view class="item"  v-for="(item,i) in detail.gqjgList" :key="item.id">
					<view class="ell">{{item.ownerName}}</view>
					<view class="ell">股权占比:  {{item.ownerPercentage}}</view>
				</view>
			</view>
			
			
			
			<view class="title flex_row_between">
				<text>公司介绍</text>
			</view>
			<view class="detail">
				<view class="company_banner flex_row_between">
					<image class="left"  mode="aspectFit" :src='detail.companyLogo  ? $api.viewFile(detail.companyLogo) : "../../static/common/default.jpg" '></image>
					<view class="right">
						<view class="tit ell">{{detail.companyName}}</view>
						<view class="dec flex_col">
							<view class="ell">企业简称：{{detail.companyShortName}}</view>
							<view class="ell">工商注册号：{{detail.registerNo}}</view>
							<view class="ell">法人代表：{{detail.legarPerson}}</view>
							<view class="ell">企业成立时间：{{detail.companyTime}}</view>
						</view>
					</view>
				</view>
				<view class="company_dec">
					<!-- <view class="tag flex_row">
						<view v-for="(item,i) in xmbq" :key="i">{{item}}</view>
					</view> -->
					<view class="dec">
						<view class="ell">注册资本：{{detail.registerMoney}}</view>
						<view>所在地址：{{detail.provinceStr +' '+ detail.cityStr+ ' '+ detail.address}}</view>
					</view>
					<!-- <view class="dec_table">
						<view class="flex_row">
							<text class="ell">注册人手机号</text>
							<text class="ell">1573020230</text>
						</view>
						
						<view class="flex_row">
							<text class="ell">企业网站</text>
							<text class="ell">www.iflytek.com</text>
						</view>
					</view> -->
				</view>
				<view class="company_info" v-if="detail.intro">
					<view>公司简介</view>
					<view>{{detail.intro}}</view>
				</view>
				
			</view>
			<view class="foot flex_row">
				<button class="share flex_col_center" open-type="share">
					<image src="../../static/icon/share.png"></image>
					<text>分享</text>
				</button>
				<view class="collect flex_col_center" @click="collect">
					<image v-if="detail.isSc==1"src="../../static/icon/collected.png"></image>
					<image v-else src="../../static/icon/collect.png"></image>
					<text v-if="detail.isSc==1">已收藏</text>
					<text v-else>收藏</text>
				</view>
				<view class="send_card flex_col_center" @click="send_card">
					<image src="../../static/icon/card.png"></image>
					<text v-if="detail.isDmp == 1">递名片</text>
					<text v-else-if="detail.isDmp == 4">已递名片</text>
					<text v-else-if="detail.isDmp == 2">回赠名片</text>
					<text v-else-if="detail.isDmp == 3">已互换名片</text>
				</view>
				<!-- <view class="phone flex_col_center" @click="onPhone">
					<image src="../../static/icon/phone.png"></image>
					<text>打电话</text>
				</view> -->
			</view>
		</template>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import { queryProjectDetailList,updateProjectOperate,saveOrUpdateCard,downloadFileByPath } from '@/common/vmeitime-http/index.js'
	import { baseUrl } from '@/common/vmeitime-http/interface.js'
	const color = ['#56b8e9','#5f90f7','#5b60e7']
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				id:'',
				detail:null,
				color:Object.freeze(color)
			}
		},
		computed:{
			projectKindsTxt(){
				return (this.detail && this.detail.projectKindsTxt) ? this.detail.projectKindsTxt.split(';') : []
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
			}
			this.queryProjectDetailList()
		},
		onShareAppMessage() {
			updateProjectOperate({
				type:'3',
				lx:'2',
				id:this.id
			})
			return {
				title: this.detail.projectName,
				path: '/pages/ProDetail/ProDetail?id='+this.id
			}
		},
		methods: {
			async queryProjectDetailList(){
				let res = await queryProjectDetailList({
					id: this.id
				})
				if(res.data.flag){
					this.detail = res.data.data
				}
			},
			async showBook(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'1002'})
				if(!permissionValidation) return
				uni.showLoading({title: '加载中...',mask:true})
				uni.downloadFile({
				  url: baseUrl + downloadFileByPath +'?path='+this.detail.projectBookUrl,
				  success: function (res) {
				    var filePath = res.tempFilePath;
				    uni.openDocument({
				      filePath: filePath,
					  fileType:'pdf',
				      success: function (res) {
				        console.log('打开文档成功');
						uni.hideLoading()
				      },
					  fail:function(res){
						console.log(res);
						uni.hideLoading()
					  }
				    });
				  },
				  fail:function(res) {
				  	console.log(res)
					uni.hideLoading()
				  }
				});
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
					lx:'2',
					id:this.id
				})
				if(res.data.flag){
					uni.showModal({
						title:'提示',
						content: msg,
						showCancel: false
					});
					this.queryProjectDetailList()
				}
			},
			async send_card(){
				let isDmp = this.detail.isDmp
				if(isDmp == 1 || isDmp == 2){
					let res = await saveOrUpdateCard({
						type:isDmp,
						jsUserId:this.detail.userId,
						cardType:2
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
						this.queryProjectDetailList()
					}
				}
			},
			async onPhone(){
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'9001'})
				if(!permissionValidation) return
				uni.makePhoneCall({
				    phoneNumber: this.detail.registerPhone //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	.pro_detail{
		padding-bottom: 148upx;
		position: relative;
		.banner{
			padding: 0 30upx;
			height: 222upx;
			background: url(../../static/bg/banner.png) no-repeat;
			background-size: 100% 100%;
			.left{
				width: 164upx;
				height: 164upx;
				margin: 0 20upx;
				background: #fff;
			}
			.right{
				width: 490upx;
				.tit{
					font-size: 36upx;
					font-weight: bold;
					color: #fff;
				}
				.tag{
					width: 440upx;
					margin-top: 20upx;
					white-space: nowrap;
					view{
						display: inline-block;
						width: 130upx;
						border: 2px solid #6f95e4;
						border-radius: 20upx;
						text-align: center;
						line-height: 40upx;
						color: #fff;
						font-size: 26upx;
						margin-right: 10upx;
					}
				}
			}
		}
		
		.pro_infor{
			padding: 40upx 30upx;
			background: #fff;
			margin-bottom: 20upx;
			.item{
				width: 33%;
				border-right: 1px solid #e6e6e6;
				&:last-of-type{
					border-right: none;
				}
				&>view{
					image{
						width: 30upx;
						height: 30upx;
						margin-right: 10upx;
					}
					text{
						color: #666666;
						font-size: 26upx;
					}
				}
				&>text{
					font-size: 28upx;
					color: #000;
					margin-top: 12upx;
					width: 100%;
					text-align: center;
				}
			}
		}
		
		.list{
			.uni-list-item__extra{
				width: auto;
			}
		}
		
		.title{
			padding:30upx;
			text{
				font-size: 34upx;
				line-height: 1;
				color: #000000;
				font-weight: bold;
			}
		}
		.info{
			font-size: 28upx;
			color: #333;
			padding: 30upx;
			background: #fff;
		}
		.team_list{
			background: #fff;
			.item{
				box-shadow: 0px -31px 15px -32px $my_box_shadow_color inset;
				padding: 30upx;
				align-items: start;

				.touxiang{
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
					font-size: 30upx;
					color: #fff;
					font-weight: bold;
					text-align: center;
					line-height: 100upx;
				}
				view{
					width: 550upx;
					.tit{
						font-size: 26upx;
						line-height: 1;
						color: #000;
					}
					.dec{
						font-size: 24upx;
						line-height: 1.4;
						color: #666666;
						margin-top: 15upx;
					}
				}
			}
		}
		
		.stock_list{
			background: #fff;
			.item{
				box-shadow: 0px -31px 15px -32px $my_box_shadow_color inset;
				padding: 40upx 30upx;
				view:nth-of-type(1){
					font-size: 26upx;
					color: #000;
					line-height: 1;
				}
				view:nth-of-type(2){
					font-size: 24upx;
					color: #666;
					margin-top: 18upx;
					line-height: 1;
				}
			}
		}
		
		.detail{
			background: #fff;
			.company_banner{
				// background: #3167d9;
				padding:40upx 30upx 20upx;
				.left{
					width: 200upx;
					height: 200upx;
					border-radius: 8upx;
				}
				.right{
					width: 470upx;
					.tit{
						font-size: 30upx;
						color: #4c4c4c;
						line-height: 1.3;
					}
					.dec{
						margin-top: 10upx;
						view{
							font-size: 24upx;
							color: #4c4c4c;
							line-height: 1.5;
						}
					}
				}
			}
			.company_dec{
				// background: #4676dd;
				background-size: 100% 320upx;
				padding:0 30upx ;
				border-bottom: 1px solid #e6e6e6;
				.tag{
					flex-wrap: wrap;
					view{
						width: 126upx;
						border: 1px solid #fff;
						border-radius: 20upx;
						text-align: center;
						line-height: 40upx;
						color: #4c4c4c;
						font-size: 26upx;
						margin:0 10upx 15upx 0;
						&:nth-of-type(5n){
							margin-right: 0;
						}
					}
				}
				.dec{
					padding: 20upx 0;
					view{
						font-size: 26upx;
						color: #4c4c4c;
						line-height: 40upx;
					}
				}
				.dec_table{
					padding: 30upx;
					background: #4c4c4c;
					border-radius: 20upx;
					view{
						line-height: 70upx;
						text:nth-of-type(1){
							padding-left: 28upx;
							width: 50%;
							box-sizing: border-box;
							font-size: 26upx;
							color: #666666;
						}
						text:nth-of-type(2){
							padding-left: 10upx;
							width: 50%;
							box-sizing: border-box;
							font-size: 26upx;
							color: #333333;
						}
					}
					view:last-of-type{
						padding-top: 10upx;
						border-top: 1px dashed #ccc;
						text:nth-of-type(2){
							color: #3167d9;
						}
					}
				}
			}
			.company_info{
				padding: 20upx 30upx;
				view:nth-of-type(1){
					font-size: 30upx;
					color: #333;
					margin-top: 20upx;
				}
				view:nth-of-type(2){
					margin-top: 25upx;
					font-size: 24upx;
					color: #4c4c4c;
				}
			}
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
			.share{
				background: #fff;
				border: none;
				outline: none;
				box-shadow: -31px 0px 15px -20px $my_box_shadow_color inset;
				&::after{
					border:none;
				}
			}
			.share,.collect{
				width: 155upx;
				text{
					font-size: 26upx;
					color: #000;
					line-height: 1.4;
				}
			}
			.send_card{
				
				width: 440upx;
				background: #3167d9;
			}
			.phone{
				
				width: 220upx;
				background: #f7aa45;
			}
			.send_card,.phone{
				image{
					width: 55upx;
					height: 40upx;
				}
				text{
					font-size: 26upx;
					color: #fff;
					line-height: 1.4;
				}
			}
		}
	}
	
</style>
