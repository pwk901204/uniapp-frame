<template>
	<view class="regis-page-audit">
		<view class="regis-page regis-page-posi">
			<view class="regis-top regis-pd">
				<view class="flex_row">
					<view class="regis-top-item" :class="{'active': bigtabIndex === 0}" @click="choseBigTabCall(0)"><text>企业资料</text></view>
					<view class="regis-top-item" :class="{'active': bigtabIndex === 1}" @click="choseBigTabCall(1)"><text>项目资料</text></view>
				</view>
			</view>
			<view class="hide" :class="{'show': bigtabIndex === 0}">
				<view class="regis-tab regis-pd">
					<view class="flex_row">
						<view class="regis-tab-item" :class="{'active': tabIndex === 0}" @click="choseTabCall(0)"><text>基本信息</text></view>
						<view class="regis-tab-item" :class="{'active': tabIndex === 1}" @click="choseTabCall(1)"><text>财务指标</text></view>
						<view class="regis-tab-item" :class="{'active': tabIndex === 2}" @click="choseTabCall(2)"><text>核心团队</text></view>
						<view class="regis-tab-item" :class="{'active': tabIndex === 3}" @click="choseTabCall(3)"><text>股权结构</text></view>
					</view>
				</view>
				<view class="regis-scroll-box">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="'height:' + windowHeight + 'rpx;'">
						<qy-basic-info v-if="!page || info.id" :info="info" :disabled="disabled" ref="qybasicinfo" :phone="phone" class="hide" :class="{'show': tabIndex === 0}"></qy-basic-info>
						<qy-cwzb v-if="!page || info.id" :info="info" :disabled="disabled" ref="cwzbinfo" class="hide" :class="{'show': tabIndex === 1}"></qy-cwzb>
						<qy-hxtd v-if="!page || info.id" :info="info" :disabled="disabled" ref="hxtdinfo" class="hide" :class="{'show': tabIndex === 2}"></qy-hxtd>
						<qy-gqjg v-if="!page || info.id" :info="info" :disabled="disabled" ref="gqjginfo" class="hide" :class="{'show': tabIndex === 3}"></qy-gqjg>
					</scroll-view>
				</view>
			</view>
			<view class="hide" :class="{'show': bigtabIndex === 1}">
				<view class="regis-tab regis-pd">
					<view class="flex_row">
						<view class="regis-tab-item" :class="{'active': tabIndex2 === 0}" @click="choseTabCall2(0)"><text>基本信息</text></view>
						<view class="regis-tab-item" :class="{'active': tabIndex2 === 1}" @click="choseTabCall2(1)"><text>融资经历</text></view>
						<view class="regis-tab-item" :class="{'active': tabIndex2 === 2}" @click="choseTabCall2(2)"><text>商业计划书</text></view>
					</view>
				</view>
				<view class="regis-scroll-box">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="'height:' + windowHeight + 'rpx;'">
						<xm-basic-info v-if="!page || info.id" :info="info" :disabled="disabled" ref="xmbasicinfo" class="hide" :class="{'show': tabIndex2 === 0}"></xm-basic-info>
						<xm-rzjl v-if="!page || info.id" :info="info" :disabled="disabled" ref="rzjlinfo" class="hide" :class="{'show': tabIndex2 === 1}"></xm-rzjl>
						<xm-syjhs v-if="!page || info.id" :info="info" :disabled="disabled" ref="syjhsinfo" class="hide" :class="{'show': tabIndex2 === 2}"></xm-syjhs>
					</scroll-view>
				</view>
			</view>
			<view class="regis-btn" v-if="!disabled" v-show="!hidetextarea">
				<button type="primary" class="btn-blue" v-if="bigtabIndex === 1 && tabIndex2 === 2" @click="nextSetpCall">提交</button>
				<button type="primary" class="btn-blue" v-else @click="nextSetpCall">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker';
	// var  graceChecker = require("../../../common/graceChecker.js");
	import rule from './validate';
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import addresList from '@/common/city.data'
	import QyBasicInfo from '../QyBasicInfo/QyBasicinfo.vue'
	import QyCwzb from '../QyCwzb/QyCwzb.vue'
	import QyHxtd from '../QyHxtd/Qyhxtd.vue'
	import QyGqjg from '../QyGqjg/Qygqjg.vue'
	import XmBasicInfo from '../XmBasinInfo/XmBasininfo.vue'
	import XmRzjl from '../XmRzjl/Xmrzjl.vue'
	import XmSyjhs from '../Xmsyjhs/Xmsyjhs.vue'
	export default {
	    components: {
			uniList,
			uniListItem,
			QyBasicInfo,
			QyCwzb,
			QyHxtd,
			QyGqjg,
			XmBasicInfo,
			XmRzjl,
			XmSyjhs
	    },
	    data() {
	        return {
				scrollTop: 0,
				windowHeight: 0,
				tabIndex: 0,
				tabIndex2: 0,
				bigtabIndex: 0,
				phone: '',
				qybasicinfo: '',
				cwzbinfo: '',
				hxtdinfo: '',
				gqjginfo: '',
				xmbasicinfo: '',
				rzjlinfo: '',
				syjhsinfo: '',
				page: '',
				info: {},
				submitFlag: true
	        }
	    },
		computed: {
			disabledAll () {
				let userinfo = this.$store.state.userinfomore
				if (userinfo.username) {
					return true
				} else {
					return false
				}
			},
			disabled () {
				let userinfo = this.$store.state.userinfomore
				if (userinfo.username && (userinfo.state === '1')) {
					return false
				} else {
					return false
				}
			},
			hidetextarea () {
				return this.$store.state.hidetextarea
			}
		},
		watch: {
			hidetextarea (newVal) {
				let that = this
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res.windowHeight);
						let clientHeight = res.windowHeight,
							clientWidth = res.windowWidth,
							rpxR = 750 / clientWidth;
						that.windowHeight = clientHeight * rpxR - (newVal ? 205 : 315)
				    }
				});
			}
		},
		onLoad(options) {
			let that = this
			if (options && options.page === 'mine') {
				this.page = options.page
			}
			if (options.phone) {
				this.phone = options.phone
				console.log(this.phone)
			}
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
					let clientHeight = res.windowHeight,
						clientWidth = res.windowWidth,
						rpxR = 750 / clientWidth;
					that.windowHeight = clientHeight * rpxR - (that.disabled ? 225 : 315)
			    }
			});
			if (this.page === 'mine') {
				uni.setNavigationBarTitle({
				    title: '我的项目'
				});
				this.getUserInfo()
			}
		},
		onUnload () {
			if (!this.page) {
				uni.$off('sendRegisCall')
			}
		},
	    methods: {
			getUserInfo () {
				this.$api.test2('/rest/user/queryUserRegisterInfo.do', {}).then((res) => {
					res = res.data
					if (res.flag) {
						console.log(res)
						this.info = res.data
						this.phone = res.data.leaderPhone
					}
				}).catch(() => {
					// uni.showToast({title: '登录失败', icon:"none"});
				})
			},
			choseTabCall (index) {
				if (this.tabIndex >= index || this.disabled) {
					this.tabIndex = index
				} else {
					let flag = this.getData()
					if (flag) {
						this.tabIndex = index
					}
				}
			},
			choseTabCall2 (index) {
				if (this.tabIndex2 >= index || this.disabled) {
					this.tabIndex2 = index
				} else {
					let flag = this.getData()
					if (flag) {
						this.tabIndex2 = index
					}
				}
			},
			choseBigTabCall (index) {
				if (this.bigtabIndex >= index || this.disabled) {
					this.bigtabIndex = index
				} else {
					let flag = this.getData()
					if (flag) {
						this.bigtabIndex = index
					}
				}
			},
			// 获取每个标签的数据
			getData () {
				let flag = false
				if (this.bigtabIndex === 0 ) {
					switch (this.tabIndex) {
						case 0 :
							this.qybasicinfo = this.$refs.qybasicinfo.getFormData()
							if (this.qybasicinfo) {
								flag = true
							} else {
								flag = false
							}
							break
						case 1 :
							let cwzbinfo = this.$refs.cwzbinfo.getFormData()
							if (cwzbinfo) {
								// console.log(cwzbinfo)
								this.cwzbinfo = cwzbinfo
								flag = true
							} else {
								flag = false
							}
							break
						case 2 :
							let hxtdinfo = this.$refs.hxtdinfo.getFormData()
							if (hxtdinfo) {
								this.hxtdinfo = hxtdinfo
								flag = true
							} else {
								flag = false
							}
							break
						case 3 :
							let gqjginfo = this.$refs.gqjginfo.getFormData()
							if (gqjginfo) {
								this.gqjginfo = gqjginfo
								flag = true
							} else {
								flag = false
							}
							break
					}
				} else {
					switch (this.tabIndex2) {
						case 0 :
							this.xmbasicinfo = this.$refs.xmbasicinfo.getFormData()
							if (this.xmbasicinfo) {
								flag = true
							} else {
								flag = false
							}
							break
						case 1 :
							let rzjlinfo = this.$refs.rzjlinfo.getFormData()
							if (rzjlinfo) {
								// console.log(cwzbinfo)
								this.rzjlinfo = rzjlinfo
								flag = true
							} else {
								flag = false
							}
							break
						case 2 :
							let syjhsinfo = this.$refs.syjhsinfo.getFormData()
							if (syjhsinfo) {
								this.syjhsinfo = syjhsinfo
								flag = true
							} else {
								flag = false
							}
							break
					}
				}
				return flag
			},
			nextSetpCall () {
				let flag = this.getData()
				if (flag) {
					if (this.bigtabIndex === 0 ) {
						if (this.tabIndex !== 3) {
							this.choseTabCall(this.tabIndex + 1)
						} else {
							this.choseBigTabCall(this.bigtabIndex + 1)
						}
					} else {
						if (this.tabIndex2 !== 2) {
							this.choseTabCall2(this.tabIndex2 + 1)
						} else {
							this.saveData()
						}
					}
				}
			},
			getAllFormData () {
				this.qybasicinfo = this.$refs.qybasicinfo.getFormData()
				if (!this.qybasicinfo) {
					this.bigtabIndex = 0
					this.tabIndex = 0
					return false
				}
				let cwzbinfo = this.$refs.cwzbinfo.getFormData()
				if (cwzbinfo) {
					this.cwzbinfo = cwzbinfo
				} else {
					this.bigtabIndex = 0
					this.tabIndex = 1
					return false
				}
				let hxtdinfo = this.$refs.hxtdinfo.getFormData()
				if (hxtdinfo) {
					this.hxtdinfo = hxtdinfo
				} else {
					this.bigtabIndex = 0
					this.tabIndex = 2
					return false
				}
				let gqjginfo = this.$refs.gqjginfo.getFormData()
				if (gqjginfo) {
					this.gqjginfo = gqjginfo
				} else {
					this.bigtabIndex = 0
					this.tabIndex = 3
					return false
				}
				this.xmbasicinfo = this.$refs.xmbasicinfo.getFormData()
				if (!this.xmbasicinfo) {
					this.bigtabIndex = 1
					this.tabIndex2 = 0
					return false
				}
				let rzjlinfo = this.$refs.rzjlinfo.getFormData()
				if (rzjlinfo) {
					this.rzjlinfo = rzjlinfo
				} else {
					this.bigtabIndex = 1
					this.tabIndex2 = 1
					return false
				}
				let syjhsinfo = this.$refs.syjhsinfo.getFormData()
				if (syjhsinfo) {
					this.syjhsinfo = syjhsinfo
				} else {
					this.bigtabIndex = 1
					this.tabIndex2 = 2
					return false
				}
				return true
			},
			saveData () {
				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let flag = this.getAllFormData()
				if (!flag) {
					return false
				}
				let param = {
					financialIndexParams: [...this.cwzbinfo],
					teamParams: [...this.hxtdinfo],
					shareholdingStructureParams: [...this.gqjginfo],
					projectInfoParams: [{
						projectBookAuth: '0',
						...this.xmbasicinfo,
						...this.syjhsinfo,
						...this.rzjlinfo
					}],
					...this.qybasicinfo
				}
				if (this.page === 'mine') {
					param.id = this.info.id
					param.userId = this.info.id
					param.companyId = this.info.companyId
					this.$api.test2('/rest/user/company/update.do', param).then((res) => {
						res = res.data
						if (res.flag) {
							console.log(res)
							uni.showToast({title: res.message || '用户信息修改成功', icon:"success"});
							setTimeout(() => {
								uni.navigateBack({
								    delta: 1
								});
							}, 2000)
						} else {
							// uni.showToast({title: res.message || '用户信息修改失败', icon:"none"});
						}
					}).catch(() => {
						// uni.showToast({title: '用户信息修改失败', icon:"none"});
					})
				} else {
					uni.$emit('sendRegisCall', param)
				}
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
