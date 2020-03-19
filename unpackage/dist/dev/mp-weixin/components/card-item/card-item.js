(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/card-item/card-item"],{

/***/ 393:
/*!******************************************************************!*\
  !*** D:/project/uniapp-frame/components/card-item/card-item.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card-item.vue?vue&type=template&id=60349982& */ 394);
/* harmony import */ var _card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-item.vue?vue&type=script&lang=js& */ 396);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _style_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss?vue&type=style&index=0&lang=scss& */ 399);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 10);






/* normalize component */

var component = Object(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__["render"],
  _card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "project/uniapp-frame/components/card-item/card-item.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 394:
/*!*************************************************************************************************!*\
  !*** D:/project/uniapp-frame/components/card-item/card-item.vue?vue&type=template&id=60349982& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./card-item.vue?vue&type=template&id=60349982& */ 395);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_template_id_60349982___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 395:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/uniapp-frame/components/card-item/card-item.vue?vue&type=template&id=60349982& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.selectType(_vm.itemData.isDmp)
  var m1 = _vm.selectTypeStr(_vm.itemData.isDmp)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 396:
/*!*******************************************************************************************!*\
  !*** D:/project/uniapp-frame/components/card-item/card-item.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./card-item.vue?vue&type=script&lang=js& */ 397);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_card_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 397:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/uniapp-frame/components/card-item/card-item.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));




































var _index = __webpack_require__(/*! @/common/vmeitime-http/index.js */ 11);
var _default2 = _interopRequireDefault(__webpack_require__(/*! ../../static/common/default.jpg */ 398));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{
  props: {
    itemData: {
      type: Object,
      require: true },

    type: {
      type: String,
      require: true } },



  data: function data() {
    return {
      defaultUrl: _default2.default };

  },
  mounted: function mounted() {
    this.$nextTick(function () {
      if (this.itemData.photoUrl) {
        this.defaultUrl = this.$api.viewFile(this.itemData.photoUrl);
      } else if (this.itemData.projectLogo) {
        this.defaultUrl = this.$api.viewFile(this.itemData.projectLogo);
      } else {
        this.defaultUrl = _default2.default;
      }
    });
  },
  methods: {
    // 投资人和企业项目跳转
    jumpTo: function jumpTo() {
      if (this.type === '0') {
        this.goPersonDetail(this.itemData.id);
      } else {
        this.goCompanyDetail(this.itemData.id);
      }
    },
    goPersonDetail: function () {var _goPersonDetail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {var permissionValidation, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                this.$store.dispatch('setButtonClicked');if (!
                this.$store.state.buttonClicked) {_context.next = 3;break;}return _context.abrupt("return");case 3:_context.next = 5;return (
                  this.$store.dispatch('permissionValidation', { accessCode: '4003' }));case 5:permissionValidation = _context.sent;if (
                permissionValidation) {_context.next = 8;break;}return _context.abrupt("return");case 8:_context.next = 10;return (
                  (0, _index.savaProjectFwjl)({
                    id: id,
                    type: 1 }));case 10:res = _context.sent;

                uni.navigateTo({
                  url: '/pages/Investor/detail/detail?id=' + id });case 12:case "end":return _context.stop();}}}, _callee, this);}));function goPersonDetail(_x) {return _goPersonDetail.apply(this, arguments);}return goPersonDetail;}(),


    goCompanyDetail: function () {var _goCompanyDetail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {var permissionValidation, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                this.$store.dispatch('setButtonClicked');if (!
                this.$store.state.buttonClicked) {_context2.next = 3;break;}return _context2.abrupt("return");case 3:_context2.next = 5;return (

                  this.$store.dispatch('permissionValidation', { accessCode: '1001' }));case 5:permissionValidation = _context2.sent;if (
                permissionValidation) {_context2.next = 8;break;}return _context2.abrupt("return");case 8:_context2.next = 10;return (
                  (0, _index.savaProjectFwjl)({
                    id: id,
                    type: 2 }));case 10:res = _context2.sent;

                uni.navigateTo({
                  url: '/pages/ProDetail/ProDetail?id=' + id });case 12:case "end":return _context2.stop();}}}, _callee2, this);}));function goCompanyDetail(_x2) {return _goCompanyDetail.apply(this, arguments);}return goCompanyDetail;}(),


    // 返回不同类型class
    selectType: function selectType(type) {
      switch (type) {
        case '2':
          return 'type0';
        case '3':
          return 'type1';
        default:
          return 'type2';}

    },
    // 返回不同类型stirng
    selectTypeStr: function selectTypeStr(type) {
      switch (type) {
        case '2':
          return '回赠名片';
        case '3':
          return '已互换名片';
        default:
          return '已递名片';}

    },
    // 图片错误
    imageError: function imageError() {
      this.defaultUrl = _default2.default;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/card-item/card-item.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/card-item/card-item-create-component',
    {
        'components/card-item/card-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(393))
        })
    },
    [['components/card-item/card-item-create-component']]
]);                
