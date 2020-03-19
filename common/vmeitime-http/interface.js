/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import store from "@/store";
export let baseUrl =  ""

if(process.env.NODE_ENV === 'development'){
	// baseUrl = 'http://localhost:8081/xfct-rest'
	baseUrl = 'http://220.178.163.228:8800/xfct-rest'
	// baseUrl = 'https://xfct.iflysec.com/xfct-rest'
}else{
	baseUrl = 'https://xfct.iflysec.com/xfct-rest'
}


// 防止接口重复调用
let pending = []
let stringify = (data)=>{
	let str = ''
	for(let name in data){
		str += "&" + name + '=' + data[name]
	}
	return str
}
// 防止接口重复调用
let removePending = (config) => {
  let url = `${config.url}?${stringify(config.data)}`
  for (let p in pending) {
    if (pending[p].url === url) {
      pending[p].task.abort()
      pending.splice(p, 1)
    }
  }
}

export default {
	config: {
		baseUrl,
		header: {
			'Content-Type':'application/x-www-form-urlencoded'
		},  
		data: {},
		method: "GET",
		dataType: "json",  /* 如设为json，会对返回的数据做一次 JSON.parse */
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = options.header || this.config.header
		
		
	   
		return new Promise((resolve, reject) => {
			let _config = null
			let _noLoading = !!options.data._noLoading
			delete options.data._noLoading
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				_reslog(response)
				for (let p in pending) {
				  if (pending[p].url === `${response.config.url}?${stringify(response.config.data)}`) {
					pending.splice(p, 1)
				  }
				}
				console.log(pending)
				pending.length<=0 && uni.hideLoading();
				
				if (statusCode === 200 && response.data.flag) { //成功
					if(response.header.loginAuthToken){
						store.commit('updateToken',response.header.loginAuthToken)
					}
					resolve(response);
				} else {
					if(response.data){
						switch(response.data.code){
							case 1010:
								// store.commit('logout')
								uni.showModal({
									title:'提示',
									content: response.data.message,
									success: function (res) {
										if (res.confirm) {
											store.commit('logout')
											uni.navigateTo({
												url: '/pages/Login/Login',
											});
										} 
									}
								});
							break;
							case 1020:
							case 1030:
							case 2010:
							case 2020:
							case 2030:
							case -1:
								uni.showModal({
									title:'提示',
									content: response.data.message,
									showCancel: false
								});
							break;
						}
					}
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			
			if (store.state.userinfo && store.state.userinfo.token) {
				_config.header.loginAuthToken = store.state.userinfo.token || ''
			}
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			
			// 统一的请求日志记录
			_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}
			
			const task = uni.request(_config);
			
			removePending(_config)
			!_noLoading && pending.push({
				url: `${_config.url}?${stringify(_config.data)}`,
				task
			})
			pending.length>0 && uni.showLoading({title: '加载中...', mask:false});
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	uploadFile (options) {
		uni.showLoading({title: '附件上传中...'});
		if (!options) {
			options = {}
		}
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: this.config.baseUrl + (options.url ||'/file/web/uploadFile.do'), //仅为示例，非真实的接口地址
				filePath: options.data,
				name: 'file',
				success: (uploadFileRes) => {
					uni.hideLoading();
					console.log(uploadFileRes)
					resolve(JSON.parse(uploadFileRes.data))
				},
				fail: (err) => {
					uni.hideLoading();
					reject(err)
				} 
			});
		});
	},
	viewFile (data) {
		return this.config.baseUrl + '/file/downloadFileByPath.do?path=' + data
	}
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch(_statusCode){
		case 200:
			break;
		case 401:
			break;
		case 404:
			break;
		default:
			break;
	}
}

