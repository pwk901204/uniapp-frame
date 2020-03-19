<template>
	<view class="application container">
		<view class="head">
			<view class="title">{{detail.activityName}}</view>
			<view class="content flex_row_justify_center">
				<view class="flex_row_justify_center flex_none">
					<image src="../../../static/project/project_6.png"></image>
					<text class="ell">{{detail.activityTimeFormat}}</text>
				</view>
				<view class="flex_row_center flex_auto">
					<image class="flex_none" src="../../../static/project/project_2.png"></image>
					<text v-if="detail.approveMode == 1" class="ell flex_auto">{{detail.approveModeTxt}}</text>
					<text v-if="detail.approveMode == 2" class="ell flex_auto">{{detail.activityAddress}}</text>
				</view>
				<view v-if="detail.approveStateTxt" class="flex_none" :class="{pre:detail.approveState ==1,end:detail.approveState == 2}" >{{detail.approveStateTxt}}</view>
			</view>
			<view class="dec">请如实填写报名信息，方便我们及时与您联系</view>
		</view>
		<view class="cut_line"></view>
		
		<form @submit="formSubmit">
			<view class="form">
				<view class="item flex_row_justify_center">
					<label class="flex_none">姓名</label>
					<view class="form_item flex_auto">
						<input type="text" name="name" placeholder="请填写" v-model="params.name" />
					</view>
				</view>
				<view class="item flex_row_justify_center">
					<label class="flex_none">手机</label>
					<view class="form_item flex_auto">
						<input type="text" name="phone" placeholder="手机号码" v-model="params.phone" />
					</view>
				</view>
				<view class="item flex_row_justify_center">
					<label class="flex_none">邮箱</label>
					<view class="form_item flex_auto">
						<input type="text" name="email"  placeholder="请填写" v-model="params.email" />
					</view>
				</view>
				<view class="item flex_row_justify_center">
					<label class="flex_none">微信</label>
					<view class="form_item flex_auto">
						<input type="text" name="wechat" placeholder="请填写" v-model="params.wechat" />
					</view>
				</view>
				<view class="item flex_row_justify_center">
					<label class="flex_none">公司</label>
					<view class="form_item flex_auto">
						<input type="text"  name="company" placeholder="请填写" v-model="params.company" />
					</view>
				</view>
				<view class="item flex_row_justify_center">
					<label class="flex_none">职位</label>
					<view class="form_item flex_auto">
						<input type="text"  name="job" placeholder="请填写" v-model="params.job" />
					</view>
				</view>
			</view>
			<view class="foot">
				<button class="btn-submit" formType="submit">提交报名</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	import rule from './validate';
	import { saveActivityDtoInfo } from '@/common/vmeitime-http/index.js'
	export default {
		data() {
			let {userinfomore,activityDetail} = this.$store.state
			return {
				detail:activityDetail,
				params:{
					activityId:'',
					name: userinfomore.username || '',
					phone:userinfomore.phone || '',
					email:userinfomore.email || '',
					wechat:userinfomore.wechat || '',
					company:userinfomore.companyName || '',
					job:userinfomore.job || '',
				}
			}
		},
		onLoad(options) {
			if(options.id){
				this.params.activityId = options.id
			}
		},
		methods: {
			formSubmit(e){
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					this.saveActivityDtoInfo()
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			async saveActivityDtoInfo(){
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let res = await saveActivityDtoInfo({
					...this.params
				})
				let pages = getCurrentPages()
				let prevPage = pages[pages.length-2]
				if(prevPage){
					prevPage.$vm.queryActivityDetailById && prevPage.$vm.queryActivityDetailById()
				}
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss">
.container{
	min-height: 100vh;
	background: #fff;
}
.application{
	padding-bottom: 98upx;
	.head{
		background: #fff;
		padding: 30upx 30upx 40upx;
		background: #fff;
		.title{
			font-size: 34upx;
			color: #000000;
			line-height: 1;
		}
		.content{
			height: 94upx;
			&>view{
				image{
					width: 30upx;
					height: 30upx;
					margin-right: 10upx;
				}
				text{
					font-size: 28upx;
					color: #666666;
				}
			}
			&>view:nth-of-type(1){
				width: 50%;
			}
			&>view:nth-of-type(2){
				text{
					width: 0;
				}
			}
			.pre,.end{
				font-size: 28upx;
				width: 124upx;
				height: 40upx;
				text-align: center;
				line-height: 40upx;
				color: #fff;
				background: linear-gradient(to right,#f9c300,#ffa52f);
				border-radius: 20upx 0 0 20upx;
			}
			.end{
				background: linear-gradient(to right,#999999,#808080);
			}
		}
		
	
		.dec{
			font-size: 24upx;
			color: #999999;
			line-height: 1;
		}
	}
	.cut_line{
		height: 20upx;
		background: #f3f3f3;
	}
	.form{
		.item{
			height: 87upx;
			padding: 0 30upx;
			border-bottom: 1px solid #e6e6e6;
			label{
				width: 130upx;
				font-size: 28upx;
				color: #666666;
			}
			.form_item{
				input{
					width: 100%;
					text-align: right;
					font-size: 28upx;
					color: #666666;
				}
			}
		}
	}
	.foot{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		.btn-submit{
			width: 100%;
			height: 98upx;
			font-size: 32upx;
			color: #fff;
			background: #3167d9;
			text-align: center;
			line-height: 98upx;
			border-radius: 0;
		}
	}
}
</style>
