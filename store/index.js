import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import api from '@/common/vmeitime-http/'
import { auth } from '@/common/vmeitime-http/index.js'
Vue.use(Vuex)

const myPlugin = (store) => {
	console.log('store初始化了');  
	if(uni.getStorageSync('state')){  
		console.log(JSON.parse(uni.getStorageSync('state')))
		store.replaceState({
			...store.state,
			...JSON.parse(uni.getStorageSync('state')),
			buttonClicked:false,
			buttonClickedTime:0,
			buttonClickedTimeLastTime:0
		})  
	}  
	store.subscribe((mutation, state) => {  
		// console.log( JSON.stringify(state) )  
		uni.setStorageSync('state', JSON.stringify(state))
	})
}

let plugins = [myPlugin]
if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}

let clickTimer = null

const store = new Vuex.Store({
	state: {
		loadNum: 0,
		userinfo: {},
		firstLoad: false,
		submitFlag: true,
		hidetextarea: false,
		userinfomore: {},
		activityDetail:{},
		searchHistory:[],
		buttonClicked:false,
		buttonClickedTime:0,
		buttonClickedLastTime:0
	},
	mutations: {
		setLoadNum (state, num) {
			state.loadNum = num
		},
		setSubmitFlag (state, submitFlag) {
			state.submitFlag = submitFlag
		},
		setFirstLoad (state, firstLoad) {
			state.firstLoad = firstLoad
		},
		setHideTextarea (state, hidetextarea) {
			state.hidetextarea = hidetextarea
		},
		logout(state) {
			state.userinfo = {}
			state.userinfomore = {}
		},
		setUserinfo(state, userinfo) {
			state.userinfo = userinfo
		},
		setUserinfoMore(state, userinfomore) {
			state.userinfomore = userinfomore
		},
		updateToken(state,token){
			state.userinfo.token = token
		},
		setActivityDetail(state, activityDetail) {
			state.activityDetail = activityDetail
		},
		setSearchHistory({searchHistory},searchKey){
			searchKey = searchKey.trim()
			if(searchKey!==''){
				if(searchHistory.includes(searchKey)){
					searchHistory.splice(searchHistory.indexOf(searchKey),1)
				}
				if(searchHistory.length>=6){
					searchHistory.splice(5,1)
				}
				
				searchHistory.unshift(searchKey)
			}
		},
		setButtonClickedSync(state,onoff){
			state.buttonClicked = onoff
		},
		setButtonClickedTime(state,time){
			state.buttonClickedTime = time
		},
		setButtonClickedLastTime(state,time){
			state.buttonClickedLastTime = time
		}
	},
	actions: {
		getUserMoreInfo({commit}){
			return api.test2('/rest/user/querySimpleUserInfo.do').then((res)=>{
				commit('setUserinfoMore', res.data.data)
			})
		},
		// // 权限验证
		permissionValidation({commit,state},{accessCode}){
			return new Promise(async (resolve,reject)=>{
				let res = await auth({
					accessCode
				})
				resolve(true)
				
			})
		},
		setButtonClicked({commit,state},wait=1000){
			let {buttonClicked,buttonClickedLastTime} = state
			commit('setButtonClickedTime', new Date().getTime())
			let buttonClickedTime =  new Date().getTime()
			console.log(buttonClickedTime - buttonClickedLastTime)
			if( buttonClickedTime - buttonClickedLastTime > wait) {
				commit('setButtonClickedSync',false)
			}else{
				commit('setButtonClickedSync',true)
			}
			commit('setButtonClickedLastTime', new Date().getTime())
		}
	},
	plugins
})

export default store

