<template>
	<view>
		<picker class="regis-picker-new" :disabled="disabled" mode="multiSelector" @columnchange="bindAddressChange" range-key="name" :value="cityMulindex" :range="addressList">
			<view class="uni-input" v-if="changeAddress && addressList[2][cityMulindex[2]]">{{addressList[0][cityMulindex[0]].name}}，{{addressList[1][cityMulindex[1]].name}}，{{addressList[2][cityMulindex[2]].name}}</view>
			<view class="uni-input" v-else>请选择</view>
		</picker>
	</view>
</template>

<script>
	export default {
	    components: {
	    },
		props: ['disabled', 'addressObj'],
	    data() {
	        return {
				addressList: [[], [], []],
				cityMulindex: [0, 0, 0],
				changeAddress: true,
				provinceFlag: true,
				cityFlag: true,
				countyFlag: true
	        }
	    },
		// watch: {
		// 	addressObj (newval) {
		// 		this.getAddress('', 0)
		// 	}
		// },
		mounted () {
			setTimeout(() => {
				this.getAddress('', 0)
			}, 2000)
		},
	    methods: {
			// 获取行政区域
			getAddress (sjCode, level) {
				this.$api.test('/rest/xzqh.do', {
					sjCode: sjCode || '',
					_noLoading: true
				}).then((res) => {
					res = res.data
					this.addressList[level] = res.data.list
					switch(level) {
						case 0:
							if (this.addressObj.province && this.provinceFlag) {
								for (let i = 0; i < res.data.list.length; i++) {
									if (res.data.list[i].code === this.addressObj.province) {
										this.cityMulindex[0] = i
										break
									}
								}
								this.getAddress(res.data.list[this.cityMulindex[0]].code, 1)
							} else {
								this.getAddress(res.data.list[0].code, 1)
							}
							break
						case 1:
							if (this.addressObj.city && this.cityFlag) {
								for (let i = 0; i < res.data.list.length; i++) {
									if (res.data.list[i].code === this.addressObj.city) {
										this.cityMulindex[1] = i
										break
									}
								}
								this.getAddress(res.data.list[this.cityMulindex[1]].code, 2)
							} else {
								this.getAddress(res.data.list[0].code, 2)
								this.$forceUpdate()
								this.sendAdress()
							}
							break
						case 2:
							if (this.addressObj.county && this.countyFlag) {
								for (let i = 0; i < res.data.list.length; i++) {
									if (res.data.list[i].code === this.addressObj.county) {
										this.cityMulindex[2] = i
										break
									}
								}
							}
							setTimeout(() => {
								if (this.countyFlag && this.addressObj.county) {
									this.provinceFlag = false
									this.cityFlag = false
									this.countyFlag = false
								}
							}, 1000)
							this.$forceUpdate()	
							this.sendAdress()
							break
					}
				}).catch((res) => {
				})
			},
			// 向父级页面发送地址信息
			sendAdress () {
				this.$emit('updateAddress', [this.addressList[0][this.cityMulindex[0]], this.addressList[1][this.cityMulindex[1]], this.addressList[2][this.cityMulindex[2]]])
			},
			cloaseBox () {
				this.changeAddress = true
				this.sendAdress()
			},
			bindAddressChange (e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.changeAddress = true
				this.cityMulindex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						this.cityMulindex[1] = 0
						this.cityMulindex[2] = 0
						this.getAddress(this.addressList[0][e.detail.value].code, 1)
						break
					case 1: //拖动第1列
						this.cityMulindex[2] = 0
						this.getAddress(this.addressList[1][e.detail.value].code, 2)
						break
					case 2 :
						this.$forceUpdate()	
						this.sendAdress()
						break
				}
			}
	    }
	}
</script>

<style>
	.regis-picker-new{
		width: 100%;
		text-align: right;
	}
</style>
