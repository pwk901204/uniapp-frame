import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import uitl from '@/common/util.js'
import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'
require('@/mock/mock.js')

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$utils = uitl
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
// Vue.prototype.$imgPath = 'http://10.40.231.94:9096/static'
// Vue.prototype.$imgPath = 'http://192.168.31.36:9096/static'
Vue.prototype.$imgPath = '../../static'
Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
