
import Mock from 'mockjs'
import queryIndexBannerDtoPage from './queryIndexBannerDtoPage.js'
import { baseUrl } from '@/common/vmeitime-http/interface.js'
Mock.setup({
    timeout: '800-2000' // 延时响应300到1000毫秒之间的阈值
})

const mockData = {
	'/banner/queryIndexBannerDtoPage.do': Mock.mock(queryIndexBannerDtoPage),
}


export default mockData