<template>
	<view class="card_item flex_row_between" @click="jumpTo">
		<view :class="['left', 'flex_none', {isProject: type === '1', out_shadow: type === '1'}]" >
			<image mode="aspectFit" :src="defaultUrl" @error="imageError"></image>
		</view>
		<view class="right flex_auto">
			<view class="title ell">{{itemData.userName}}</view>
			<view class="dec flex_row">
				<view class="flex_row_justify_center w100">
					<image src="../../static/project/project_7.png"></image>
					<text class="ell">{{itemData.company}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_8.png"></image>
					<text class="ell">{{itemData.job}}</text>
				</view>
				<view class="flex_row_justify_center">
					<image src="../../static/project/project_2.png"></image>
					<text class="ell">{{itemData.provinceCity}}</text>
				</view>
				<view v-if="itemData.isDmp === '3'" class="flex_row_justify_center w100">
					<image src="../../static/project/project_9.png"></image>
					<text class="ell">{{itemData.phone}}</text>
				</view>
				<view v-if="itemData.isDmp === '3'" class="flex_row_justify_center w100">
					<image src="../../static/project/project_10.png"></image>
					<text class="ell">{{itemData.email}}</text>
				</view>
			</view>
			<view :class="['flag', selectType(itemData.isDmp)]">
				{{ selectTypeStr(itemData.isDmp) }}
			</view>
		</view>
	</view>
</template>

<script>
	import { savaProjectFwjl } from '@/common/vmeitime-http/index.js'
	import defaultImage from '../../static/common/default.jpg'
	export default {
		props:{
			itemData:{
				type:Object,
				require:true
			},
			type: {
				type: String,
				require: true
			}
		},
		
		data() {
			return {
				defaultUrl: defaultImage
			}
		},
		mounted () {
			this.$nextTick(function(){
				if (this.itemData.photoUrl) {
					this.defaultUrl = this.$api.viewFile(this.itemData.photoUrl) 
				} else if (this.itemData.projectLogo) {
					this.defaultUrl = this.$api.viewFile(this.itemData.projectLogo)
				} else {
					this.defaultUrl = defaultImage
				}
			})
		},
		methods: {
			// 投资人和企业项目跳转
			jumpTo() {
				if (this.type === '0') {
					this.goPersonDetail(this.itemData.id)
				} else {
					this.goCompanyDetail(this.itemData.id)
				}
			},
			async goPersonDetail(id) {				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'4003'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:1
				})
				uni.navigateTo({
					url:'/pages/Investor/detail/detail?id='+ id
				})
			},
			async goCompanyDetail(id) {				this.$store.dispatch('setButtonClicked')
				if(this.$store.state.buttonClicked) return
				
				let permissionValidation = await this.$store.dispatch('permissionValidation',{accessCode:'1001'})
				if(!permissionValidation) return
				let res = await savaProjectFwjl({
					id,
					type:2
				})
				uni.navigateTo({
					url:'/pages/ProDetail/ProDetail?id='+id
				})
			},
			// 返回不同类型class
			selectType(type) {
				switch(type) {
					case '2': 
						return 'type0';
					case '3': 
						return 'type1';
					default: 
						return 'type2';
				}
			},
			// 返回不同类型stirng
			selectTypeStr(type) {
				switch(type) {
					case '2':
						return '回赠名片';
					case '3':
						return '已互换名片';
					default: 
						return '已递名片';
				}
			},
			// 图片错误
			imageError() {
				this.defaultUrl = defaultImage
			}
		}
	}
</script>

<style lang="scss" src="./style.scss"></style>
