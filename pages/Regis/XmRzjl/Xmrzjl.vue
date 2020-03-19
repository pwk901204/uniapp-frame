<template>
	<view class="regis-form">
		<view class="flex_row regis-input-item">
			<view class="input-label">
				<label class="require">*</label>
				<text>是否有融资成功经历</text>
			</view>
			<view class="full-input-right">
				<radio-group @change="rzcgChange" :disabled="disabled" class="regis-radio-box">
					<label class="regis-radio-item" v-for="(item, index) in sfDicts" :key="item.value">
						<view class="regis-radio">
							<radio :value="item.value" :disabled="disabled" :checked="item.value === formdata.hasFinancingExperience" />{{item.name}}
							<image v-if="item.value === formdata.hasFinancingExperience" src="../../../static/Regis/radio-checked.png" mode="aspectFit"></image>
							<image v-else src="../../../static/Regis/radio-default.png" mode="aspectFit"></image>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="regis-tips">
			<text>填写完整的融资经历，可为您的企业加分</text>
		</view>
		<view class="empty-view"></view>
		<template v-for="(item, index) in zblist">
			<xmrzjl-item :ref="item.refName" :info="item" :disabled="disabled" :key="item.refName"></xmrzjl-item>
			<view class="regis-del" v-if="!disabled" @click="delzbItem(index)">
				<text>删除</text>
			</view>
			<view class="empty-view"></view>
		</template>
		
		<view class="add-item-btn">
			<view class="btn-regis" @click="addZblist">
				<image src="../../../static/Regis/icon-add.png" mode="aspectFit"></image>
				<text>添加融资经历</text>
			</view>
		</view>
	</view>
</template>

<script>
	import XmrzjlItem from './item.vue';
	export default {
	    components: {
			XmrzjlItem
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
				formdata: {
					hasFinancingExperience: ''
				},
				zblist: [],
				rzcgjl: '',
				sfDicts: [{
					value: '1',
					name: '是'
				}, {
					value: '0',
					name: '否'
				}]
	        }
	    },
		computed: {
			startDate() {
				return this.$utils.getDate('start');
			},
			endDate() {
				return this.$utils.getDate('end');
			}
		},
		created () {
			if (this.info && this.info.id) {
				this.initData(this.info)
			}
		},
	    methods: {
			initData (data) {
				if (data && data.id && data.projectInfoRegisterDtos && data.projectInfoRegisterDtos.length) {
					let projectInfo = data.projectInfoRegisterDtos[0]
					this.formdata.hasFinancingExperience = projectInfo.hasFinancingExperience || ''
					let zblist = []
					for (let i = 0; i < projectInfo.financingExperienceDtos.length; i++) {
					  zblist.push({
						refName: 'ref' + new Date().getTime() + i,
						...projectInfo.financingExperienceDtos[i]
					  })
					}
					this.zblist = zblist
				}
			},
			getDict (lxjp, field) {
				this.$api.test('/rest/dictList.do', {
					lxjp: lxjp
				}).then((res) => {
					res = res.data
					if (res.flag) {
						this[field] = res.data
					}
				}).catch(() => {
				})
			},
			rzcgChange (evt) {
				this.formdata.hasFinancingExperience = evt.target.value
				if (this.formdata.hasFinancingExperience === '0') {
					console.log(this.formdata.hasFinancingExperience)
					this.zblist = []
				}
			},
			addZblist () {
				if (this.formdata.hasFinancingExperience === '1') {
					this.zblist.push({
						refName: 'ref' + new Date().getTime()
					})
				}
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
					return {
						hasFinancingExperience: this.formdata.hasFinancingExperience,
						financingExperienceParams: zblist
					}
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
