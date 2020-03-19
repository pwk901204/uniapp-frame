
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

import http from './interface'

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (url, data, options) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    if (!options){
		options = {}
	}
	return http.request({
		url: url || 'ajax/echo/text?name=uni-app',
		dataType: 'json',
		method: options.method || 'POST',
		data,
	})
}

// 首页-轮播图
export const test2 = (url, data, options) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
	if (!options){
		options = {}
	}
    return http.request({
        url: url || 'ajax/echo/text?name=uni-app',
		dataType: 'json',
		method: options.method || 'POST',
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		},
        data,
    })
}

// 首页-轮播图
export const queryIndexBannerDtoPage = () =>{
	return http.post( '/banner/queryIndexBannerDtoPage.do')
}
// 首页-热门项目
export const queryHotProjectInforList = (data) =>{
	return http.post( '/project-infor/queryHotProjectInforList.do',data)
}
// 首页-最新项目
export const queryNewProjectInforList = (data) =>{
	return http.post( '/project-infor/queryNewProjectInforList.do',data)
}
// 首页搜索/项目列表
export const querySearchProjectInforList = (data) =>{
	return http.post( '/project-infor/querySearchProjectInforList.do',data)
}

// 上下级字典通用字典接口
export const upDowZd = (data) =>{
	return http.post( '/rest/upDowZd.do',data)
}
// 通用公共字典请求接口 
export const dictList = (data) =>{
	return http.post( '/rest/dictList.do',data,{
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}
//项目详情接口
export const queryProjectDetailList = (data) =>{
	return http.post( '/project-infor/queryProjectDetailList.do',data)
}
//分享、收藏、取消收藏操作
export const updateProjectOperate = (data) =>{
	return http.post( '/project-infor/updateProjectOperate.do',data)
}

//递名片和回赠名片操作
export const saveOrUpdateCard = (data) =>{
	return http.post( '/card/saveOrUpdateCard.do',data,{
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

//点击详情保存查看记录
export const savaProjectFwjl = (data) =>{
	return http.post( '/project-infor/savaProjectFwjl.do',{
		...data,
		_noLoading:false
	})
}

// 我的 - 名片夹投资人列表
export const nameCardList = (data) => {
	return http.post('/investors/queryMyFolderInvestors.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}
// 我的 - 名片夹项目列表
export const nameCardProList = (data) => {
	return http.post('/investors/queryMyFolderProUserPage.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

// 我的 - 收藏投资人列表
export const colPersonList = (data) => {
	return http.post('/investors/queryMyCollectInvestors.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

// 我的 - 收藏项目列表
export const collectionList = (data) => {
	return http.post('/project-infor/querymyColleProject.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

// 我的 - 我的推荐
export const queryMyCommand = (data) => {
	return http.post('/rest/user/queryMyRecommend.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

// 我的 - 记录分享次数
export const addVipCount = (data) => {
	return http.post('/rest/user/addVipTime.do', data, {
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}


//投资人列表
export const queryInvestorsPage = (data) =>{
	return http.post( '/investors/queryInvestorsPage.do',data,{
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}
//投资人详情接口
export const queryInvestorsDtoById = (data) =>{
	return http.post( '/investors/queryInvestorsDtoById.do',data,{
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

//微信端-首页活动专辑
export const queryIndexActivityDtoPage = (data) =>{
	return http.post( '/activity/queryIndexActivityDtoPage.do',data)
}

//活动管理/首页搜索活动
export const querySearchIndexActivityDtoPage = (data) =>{
	return http.post( '/activity/querySearchIndexActivityDtoPage.do',data)
}
// //活动详情
export const queryActivityDetailById = (data) =>{
	return http.post( '/activity/queryActivityDetailById.do',data)
}
// 活动报名
export const saveActivityDtoInfo = (data) =>{
	return http.post( '/activity/saveActivityDtoInfo.do',data)
}
//报名列表-更多
export const queryMoreActivityUserPage = (data) =>{
	return http.post( '/activity/queryMoreActivityUserPage.do',data)
}
//关键页面权限接口-吴勇
export const auth = (data) =>{
	return http.post( '/rest/auth.do',{
		...data,
		_noLoading:true
	},{
		header:{
			'Content-Type':'application/json;charset=UTF-8'
		}
	})
}

//下载
export let downloadFileByPath = '/file/downloadFileByPath.do'


// 获取授权
export const getAuthorize = (data) => {
	return new Promise((resolve, reject) => {})
}


export const getSetting = () => {
	uni.getSetting({
		success: (res) => {
			let authStatus = res.authSetting['scope.album'];
			if (!authStatus) {
				uni.showModal({
					title: '授权失败',
					content: '需要从您的相册获取图片，请在设置界面打开相关权限',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting()
						}
					}
				})
			}
		}
	})
}

// 附件选择
export const chooseImage = (data) => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: data.num || 1,
			sizeType: data.sizeType || ['compressed'],
			sourceType: data.sourceType || ['album'],
			success: (res) => {
				console.log('chooseImage success, temp path is', res.tempFilePaths[0])
				var imageSrcArr = res.tempFilePaths
				resolve(imageSrcArr)
			},
			fail: (err) => {
				console.log('chooseImage fail', err)
				reject()
			}
		})
	})
}

// 上传附件
export const uploadFile = (data, url) => {
	return http.uploadFile({
	    url: url,
	    data
	})
}

// 附件查看地址
export const viewFile = (data) => {
	return http.viewFile(data)
}

// 轮播图
export const banner = (data) => {
    return http.request({
        url: '/banner/36kr',
        method: 'GET', 
        data,
		// handle:true
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
	test2,
	banner,
	chooseImage,
	getSetting,
	uploadFile,
	viewFile
}