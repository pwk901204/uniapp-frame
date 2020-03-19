<template>
	<view class="regis-form">
		<template v-for="(item, index) in zblist">
			<qy-cwzb-item :ref="item.refName" :info="item" :disabled="disabled" :key="item.refName"></qy-cwzb-item>
			<view class="regis-del" v-if="!disabled" @click="delzbItem(index)">
				<text>删除</text>
			</view>
			<view class="empty-view"></view>
		</template>
		
		<view class="add-item-btn">
			<view class="btn-regis" @click="addZblist">
				<image src="../../../static/Regis/icon-add.png" mode="aspectFit"></image>
				<text>添加财务指标</text>
			</view>
		</view>
	</view>
</template>

<script>
	import QyCwzbItem from './item.vue';
	export default {
	    components: {
			QyCwzbItem
	    },
		props: {
			info: {
				type: Object
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
	    data() {
	        return {
				nf: new Date().getFullYear() + '年',
				yearList: [],
				zblist: []
	        }
	    },
		created () {
			if (this.info && this.info.id) {
				this.initData()
			} else {
				this.addZblist()
			}
		},
	    methods: {
			initData () {
				if (this.info.financialIndexDtos && this.info.financialIndexDtos.length) {
					  let zblist = []
					  for (let i = 0; i < this.info.financialIndexDtos.length; i++) {
						zblist.push({
						  refName: 'ref' + new Date().getTime() + i,
						  ...this.info.financialIndexDtos[i]
						})
					  }
					  this.zblist = zblist
				}
			},
			addZblist () {
				this.zblist.push({
					refName: 'ref' + new Date().getTime()
				})
			},
			delzbItem (index) {
				this.zblist.splice(index, 1)
			},
			getFormData () {
				let zblist = []
				for(let i = 0; i < this.zblist.length; i++) {
					let zbObj = this.$refs[this.zblist[i].refName][0].getFormData()
					if (zbObj) {
						zblist.push(zbObj)
					} else {
						break
					}
				}
				if (zblist.length === this.zblist.length) {
					return zblist
				} else {
					return false
				}
			}
	    }
	}
</script>

<style>
	@import url("../Regis.less");
</style>
