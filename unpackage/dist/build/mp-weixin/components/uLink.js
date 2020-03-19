(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uLink"],{5688:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return u})},e52b:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"u-link",props:{href:{type:String,default:""},text:{type:String,default:""},inWhiteList:{type:Boolean,default:!1}},methods:{openURL:function(){this.inWhiteList?e.navigateTo({url:"/pages/component/web-view/web-view?url="+this.href}):(e.setClipboardData({data:this.href}),e.showModal({content:"本网址无法直接在小程序内打开。已自动复制网址，请在手机浏览器里粘贴该网址",showCancel:!1}))}}};t.default=n}).call(this,n("543d")["default"])},eee6:function(e,t,n){"use strict";n.r(t);var a=n("5688"),u=n("f8ee");for(var i in u)"default"!==i&&function(e){n.d(t,e,function(){return u[e]})}(i);var o=n("2877"),r=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},f8ee:function(e,t,n){"use strict";n.r(t);var a=n("e52b"),u=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uLink-create-component',
    {
        'components/uLink-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eee6"))
        })
    },
    [['components/uLink-create-component']]
]);                
