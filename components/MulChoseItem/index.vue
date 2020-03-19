<template>
	<view class="regis-popup-box">
		<view @click="open" v-if="!checkedTxt.length"><text>请选择</text></view>
		<view @click="open" class="ell" v-else><text>{{ this.checkedTxt.join(',') }}</text></view>
		<uni-popup class="regis-popup" ref="popup" type="bottom" @change="popupChangeCall">
			<view class="flex_row">
				<view class="hy-item">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="hy-scroll">
						<div class="hy-item-box flex_row_center">
							<template v-for="(item, index) in listData">
								<view class="hy-left-item" :key="index" @click="chosedCall(item)">
									<view class="hy-item-label" :class="{'active': checked.indexOf(item.dm) !== -1}">
										<text>{{ item.mc }}</text>
									</view>
								</view>
							</template>
						</div>
						
					</scroll-view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
	    components: {
			uniPopup
	    },
		props: ['disabled', 'listData', 'checkedObj'],
	    data() {
	        return {
				scrollTop: 0,
				checked: [],
				checkedTxt: []
	        }
	    },
		watch: {
			checkedObj (obj) {
				this.checked = obj.checked.split(',')
				this.checkedTxt = obj.checkedTxt.split(',')
			}
		},
		created () {
			console.log(this.listData)
		},
		beforeDestroy () {
		    this.$store.commit('setHideTextarea', false)
		},
	    methods: {
			chosedCall (item) {
				let index = this.checked.indexOf(item.dm)
				if (index >= 0) {
					this.checked.splice(index, 1)
					this.checkedTxt.splice(index, 1)
					this.$emit('updateDate', this.checked)
				} else {
					if (false) {
						uni.showToast({title: '最多只能选择三个行业标签', icon:"none"});
					} else {
						this.checked.push(item.dm)
						this.checkedTxt.push(item.mc)
						this.$emit('updateDate', this.checked)
					}
				}
				console.log(this.checked)
			},
			chosedCompateCall () {
				this.$refs.popup.close()
			},
			open(){
				if (this.disabled) {
					return false
				}
				this.$refs.popup.open()
			},
			popupChangeCall (e) {
				this.$store.commit('setHideTextarea', e.show || false)
			}
	    }
	}
</script>

<style>
	.regis-popup-box{
		position: relative;
		/* z-index: 100; */
		width: 100%;
		text-align: right;
		font-size: 28upx;
		color: #666666;
	}
	.hy-item{
		width: 50%;
		flex-grow: 1;
	}
	.hy-item.hy-item-left{
		background-color: #f8f8f8;
	}
	.hy-scroll{
		height: 600upx;
	}
	.hy-item-box{
		flex-wrap: wrap;
		padding: 0 20upx;
	}
	.hy-left-item{
		/* padding: 0 20upx; */
		width: 100%;
		line-height: 70upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 28upx;
		color: #666666;
		text-align: left;
	}
	.hy-left-item.active{
		color: #3167d9;
	}
	.regis-popup{
		position: relative;
		/* z-index: 100; */
	}
	.regis-popup .flex_row{
		margin: -28upx;
	}
	.hy-left-item{
		padding: 0 20upx;
		line-height: 110upx;
		font-size: 28upx;
		color: #666666;
	}
	.hy-item-label{
		margin: 20upx auto;
		width: 100%;
		height: 70upx;
		text-align: center;
		border-radius: 10upx;
		overflow: hidden;
		background-color: #FFFFFF;
		box-shadow:5px 5px 8px #f4f4f4, -5px -5px 8px #f4f4f4;
	}
	.hy-item-label.active{
		background-color: #3167d9;
		color: #FFFFFF;
	}
	.hy-item-label text{
		padding: 0 16upx;
		box-sizing: border-box;
		display: flex;
		line-height: 1.4;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.hy-right-btn{
		margin: 0 auto;
		width: 320upx;
		height: 78upx;
		background-color: #3167d9;
		border-radius: 10upx;
		color: #FFFFFF;
		font-size: 32upx;
		line-height: 78upx;
		text-align: center;
	}
</style>
