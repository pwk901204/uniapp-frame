<template>
	<view class="regis-popup-box">
		<view @click="open" v-if="!secondCheckedTxt.length"><text>请选择</text></view>
		<view @click="open" class="ell" v-else><text>{{ this.secondCheckedTxt.join(',') }}</text></view>
		<uni-popup class="regis-popup" ref="popup" type="bottom" @change="popupChangeCall">
			<view class="flex_row">
				<view class="hy-item hy-item-left">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="hy-scroll">
						<template v-for="(item, index) in leftData">
							<view class="hy-left-item" :class="{'active': firstChecked.indexOf(item.code) !== -1}" :key="index" @click="chosedFirstCall(item.code)">
								<text>{{ item.name }}</text>
							</view>
						</template>
					</scroll-view>
				</view>
				<view class="hy-item">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="hy-scroll2">
						<template v-for="(item, index) in rightData">
							<view class="hy-right-item" :key="index" @click="chosedSecondCall(item)">
								<view class="hy-item-label" :class="{'active': secondChecked.indexOf(item.code) !== -1}">
									<text>{{ item.name }}</text>
								</view>
							</view>
						</template>
					</scroll-view>
					<view class="hy-right-btn" @click="chosedCompateCall">
						<text>确认</text>
					</view>
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
		props: {
			disabled: {
				type: Object
			},
			checkedObj: {
			  type: Object
			},
			isMul: {
			  type: Boolean,
			  default: false
			}
		},
	    data() {
	        return {
				scrollTop: 0,
				leftData: [],
				rightData: [],
				firstChecked: [],
				secondChecked: [],
				secondCheckedTxt: [],
				initLoad: true
	        }
	    },
		watch: {
		    checkedObj (newVal) {
		      this.initChecked(newVal)
		    }
		},
		created () {
			this.initChecked(this.checkedObj)
			this.getHytags('')
		},
		beforeDestroy () {
		    this.$store.commit('setHideTextarea', false)
		},
	    methods: {
			initChecked (checkedObj) {
			      if (checkedObj.checkedFristIds) {
			        this.firstChecked = checkedObj.checkedFristIds.split(',')
			      }
			      if (checkedObj.checkedIds) {
			        this.secondChecked = checkedObj.checkedIds.split(',')
			        this.secondCheckedTxt = checkedObj.checkedTxts.split(',')
			      }
			},
			// 获取行业级别
			getHytags (sjCode) {
				this.$api.test('/rest/upDowZd.do', {
					sjCode: sjCode || '',
					lxjp: 'XYLX',
					_noLoading: true
				}).then((res) => {
					res = res.data
					if (res.flag) {
						if (!sjCode) {
							this.leftData = res.data
							if (this.leftData.length) {
								console.log(this.firstChecked)
								console.log(this.leftData)
								this.chosedFirstCall(this.firstChecked.length ? this.firstChecked[0] : this.leftData[0].code)
							}
						} else {
							this.rightData = res.data
						}
					}
					
				}).catch((res) => {
				})
			},
			chosedFirstCall (code) {
				if (this.isMul) {
					this.removeNotSelect()
				}
				let index = this.firstChecked.indexOf(code)
				if (index === -1) {
					if (this.firstChecked.length) {
					  if (!this.isMul) {
						this.firstChecked[0] = code
					  } else {
						this.firstChecked.push(code)
					  }
					} else {
					  this.firstChecked.push(code)
					}
					if (!this.initLoad) {
					  if (!this.isMul) {
						this.secondChecked = []
						this.secondCheckedTxt = []
					  }
					}
					this.getHytags(code)
					this.initLoad = false
				} else {
					if (this.initLoad) {
					  this.initLoad = false
					}
					this.getHytags(code)
				}
			},
			// 移除掉当前没有选中二级选项对应的一级
			removeNotSelect () {
				let notExistFirstFlag = true
				console.log(this.secondChecked)
				console.log(this.rightData)
				for (let i = 0; i < this.secondChecked.length; i++) {
					for(let item of this.rightData){
						if (item.code === this.secondChecked[i]) {
							notExistFirstFlag = false
							break
						}
					}
					if (!notExistFirstFlag) {
						break
					}
				}
				if (notExistFirstFlag && this.rightData.length) {
					let index = this.firstChecked.indexOf(this.rightData[0].sjCode)
					this.firstChecked.splice(index, 1)
				}
			},
			chosedSecondCall (item) {
				let index = this.secondChecked.indexOf(item.code)
				if (index >= 0) {
					this.secondChecked.splice(index, 1)
					this.secondCheckedTxt.splice(index, 1)
					this.$emit('updateHyTags', {
						firstChecked: this.firstChecked,
						secondChecked: this.secondChecked
					})
				} else {
					let max = this.isMul ? 15 : 3
					if (this.secondChecked.length >= max) {
						uni.showToast({title: '最多只能选择' + max + '个行业标签', icon:"none"});
					} else {
						this.secondChecked.push(item.code)
						this.secondCheckedTxt.push(item.name)
						this.$emit('updateHyTags', {
							firstChecked: this.firstChecked,
							secondChecked: this.secondChecked
						})
					}
				}
				console.log(this.secondChecked)
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
	.uni-popup{
		bottom: var(--window-bottom) !important;
	}
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
	.hy-scroll2{
		height: 550upx;
	}
	.hy-left-item{
		padding: 0 20upx;
		line-height: 110upx;
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
	.hy-right-item{
		padding: 0 20upx;
		line-height: 110upx;
		font-size: 28upx;
		color: #666666;
	}
	.hy-item-label{
		margin: 20upx auto;
		width: 220upx;
		height: 110upx;
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
