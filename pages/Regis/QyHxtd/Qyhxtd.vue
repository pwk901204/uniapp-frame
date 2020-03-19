<template>
	<view class="regis-form">
		<template v-for="(item, index) in zblist">
			<qy-hxtd-item :ref="item.refName" :info="item" :disabled="disabled" :key="item.refName"></qy-hxtd-item>
			<view class="regis-del" v-if="!disabled" @click="delzbItem(index)">
				<text>删除</text>
			</view>
			<view class="empty-view"></view>
		</template>
		
		<view class="add-item-btn">
			<view class="btn-regis" @click="addZblist">
				<image src="../../../static/Regis/icon-add.png" mode="aspectFit"></image>
				<text>添加核心团队</text>
			</view>
		</view>
	</view>
</template>

<script>
	import QyHxtdItem from './item.vue';
	export default {
	    components: {
			QyHxtdItem
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
				if (this.info.teamDtos && this.info.teamDtos.length) {
					  let zblist = []
					  for (let i = 0; i < this.info.teamDtos.length; i++) {
						zblist.push({
						  refName: 'ref' + new Date().getTime() + i,
						  ...this.info.teamDtos[i]
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
