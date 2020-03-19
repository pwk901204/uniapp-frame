<template>
	<view class="aboutus">
		<view class="aboutus-bg">
			<image src="../../static/mine/about-bg_02.png" mode="aspectFit"></image>
		</view>
		<view class="aboutus-content">
			<image src="../../static/mine/aboutus-bg-21.png" mode="aspectFit"></image>
			<view class="aboutus-text">
				<view class="text-item">
					<text> 伴随着IT产业发展的第五次浪潮，以万物互联、智能一切为特征的人工智能时代正在到来。人工智能是新一轮产业变革的核心驱动力，将进一步释放历次科技革命和产业变革积蓄的巨大能量。</text>
				</view>
				<view class="text-item">
					<text>新冠病毒爆发以来，不断地冲击着各行各业的发展，对创业企业来说环境更加严峻，但疫情终将散去，一批优秀的人工智能创业企业必将破茧而出，AI之光必将照耀中华。</text>
				</view>
				<view class="text-item">
					<text>作为国内人工智能领军企业，科大讯飞始终坚持从技术、产业资源、资金支持等多方面扶持AI创业者，与他们并肩前行。目前，科大讯飞已扶持1800+生态企业，讯飞国家新一代人工智能开放创新平台有超过160万生态合作伙伴，商汤科技、寒武纪、优必选等一批优秀企业与我们共同成长。</text>
				</view>
				<view class="text-item">
					<text>由讯飞创投发起，携手众多优秀科技创业企业和优秀投资机构，共同搭建AI之光路演平台，致力于成为中国科创企业与投资人对接的直通平台，促进投融资活动高效展开，为创业者鼓劲加油。</text>
				</view>
				<!-- <text>由讯飞创投发起，携手众多优秀科技创业企业和优秀投资机构，共同搭建AI之光路演平台，致力于成为中国科创企业与投资人对接的直通平台，促进投融资活动高效展开。</text> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: 0
			};
		},
		components:{
		},
		onLoad(options) {
			this.initHeight()
		},
		methods:{
			initHeight () {
				let that = this
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res.windowHeight);
						let clientHeight = res.windowHeight,
							clientWidth = res.windowWidth,
							rpxR = 750 / clientWidth;
						that.windowHeight = clientHeight * rpxR
				    }
				});
			},
		}
	}
</script>

<style>
	.aboutus{
		position: relative;
		background-color: #FFFFFF;
		padding: 0;
		padding-bottom: 100upx;
		font-size: 28upx;
		line-height: 45upx;
		color: #333333;
	}
	.aboutus-bg{
		position: absolute;
		bottom: 0;
		z-index: 0;
		width: 100%;
		height: 412upx;
	}
	.aboutus-bg image{
		width: 100%;
		height: 100%;
	}
	.aboutus-content{
		position: relative;
		padding-top: 46upx;
		/* width: 684upx;
		height: 962upx; */
		width: 687upx;
		height: 1633upx;
		margin: 0 auto;
		font-size: 28upx;
		color: #333333;
	}
	.aboutus-content image{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.aboutus-content .aboutus-text{
		padding: 133upx 36upx 0 45upx;
		line-height: 40upx;
	}
	.aboutus-content .aboutus-text .text-item{
		text-indent: 2em;
	}
</style>
