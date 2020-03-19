// 启动前请先安装mockjs ：命令： npm install mockjs --save
import Mock from 'mockjs';
// 构造mock数据方式
import data_frame from './data_frame.js';

let data = Mock.mock({
	...data_frame,
	'data|6-8': [{
		// "id":"@id",
		"id":"@increment",
		bannerUrl:'@url',
		bannerFile:'@image("720x300","@color","hello")',
		//'name': "@ctitle(2,3)",
		// 'name': "@cname"//,
		//"img": "@dataimage('120x120','@color','hello')",
		// "img": "@image('120x120','@color','hello')",
		// "brief": "@csentence(8,50)",
		// "price|0-20.0-2": 1,
		// "num": 0,
		// "minusFlag": true,
		// "date": "@datetime",
		// "peisongfei|0-100.0-2": 1,
		// "limit|0-50": 1
	}]
})

export default data