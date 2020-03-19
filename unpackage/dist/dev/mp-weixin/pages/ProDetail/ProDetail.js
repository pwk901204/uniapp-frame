(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/ProDetail/ProDetail"],{

/***/ 144:
/*!********************************************************************************!*\
  !*** D:/project/uniapp-frame/main.js?{"page":"pages%2FProDetail%2FProDetail"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _ProDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/ProDetail/ProDetail.vue */ 145));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_ProDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 145:
/*!*************************************************************!*\
  !*** D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProDetail.vue?vue&type=template&id=1ffd7de8& */ 146);
/* harmony import */ var _ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProDetail.vue?vue&type=script&lang=js& */ 148);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProDetail.vue?vue&type=style&index=0&lang=scss& */ 150);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 10);






/* normalize component */

var component = Object(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "project/uniapp-frame/pages/ProDetail/ProDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 146:
/*!********************************************************************************************!*\
  !*** D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=template&id=1ffd7de8& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ProDetail.vue?vue&type=template&id=1ffd7de8& */ 147);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_template_id_1ffd7de8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 147:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=template&id=1ffd7de8& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.$api.viewFile(_vm.detail.companyLogo)
  var g1 = _vm.$api.viewFile(_vm.detail.companyLogo)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 148:
/*!**************************************************************************************!*\
  !*** D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ProDetail.vue?vue&type=script&lang=js& */ 149);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 149:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 14));


















































































































































var _index = __webpack_require__(/*! @/common/vmeitime-http/index.js */ 11);
var _interface = __webpack_require__(/*! @/common/vmeitime-http/interface.js */ 12);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var uniList = function uniList() {return __webpack_require__.e(/*! import() | components/uni-list/uni-list */ "components/uni-list/uni-list").then(__webpack_require__.bind(null, /*! @/components/uni-list/uni-list.vue */ 182));};var uniListItem = function uniListItem() {return __webpack_require__.e(/*! import() | components/uni-list-item/uni-list-item */ "components/uni-list-item/uni-list-item").then(__webpack_require__.bind(null, /*! @/components/uni-list-item/uni-list-item.vue */ 189));};
var color = ['#56b8e9', '#5f90f7', '#5b60e7'];var _default =
{
  components: {
    uniList: uniList,
    uniListItem: uniListItem },

  data: function data() {
    return {
      id: '',
      detail: null,
      color: Object.freeze(color) };

  },
  computed: {
    projectKindsTxt: function projectKindsTxt() {
      return this.detail && this.detail.projectKindsTxt ? this.detail.projectKindsTxt.split(';') : [];
    } },

  onLoad: function onLoad(options) {
    if (options.id) {
      this.id = options.id;
    }
    this.queryProjectDetailList();
  },
  onShareAppMessage: function onShareAppMessage() {
    (0, _index.updateProjectOperate)({
      type: '3',
      lx: '2',
      id: this.id });

    return {
      title: this.detail.projectName,
      path: '/pages/ProDetail/ProDetail?id=' + this.id };

  },
  methods: {
    queryProjectDetailList: function () {var _queryProjectDetailList2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                  (0, _index.queryProjectDetailList)({
                    id: this.id }));case 2:res = _context.sent;

                if (res.data.flag) {
                  this.detail = res.data.data;
                }case 4:case "end":return _context.stop();}}}, _callee, this);}));function queryProjectDetailList() {return _queryProjectDetailList2.apply(this, arguments);}return queryProjectDetailList;}(),

    showBook: function () {var _showBook = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var permissionValidation;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                this.$store.dispatch('setButtonClicked');if (!
                this.$store.state.buttonClicked) {_context2.next = 3;break;}return _context2.abrupt("return");case 3:_context2.next = 5;return (

                  this.$store.dispatch('permissionValidation', { accessCode: '1002' }));case 5:permissionValidation = _context2.sent;if (
                permissionValidation) {_context2.next = 8;break;}return _context2.abrupt("return");case 8:
                uni.showLoading({ title: '加载中...', mask: true });
                uni.downloadFile({
                  url: _interface.baseUrl + _index.downloadFileByPath + '?path=' + this.detail.projectBookUrl,
                  success: function success(res) {
                    var filePath = res.tempFilePath;
                    uni.openDocument({
                      filePath: filePath,
                      fileType: 'pdf',
                      success: function success(res) {
                        console.log('打开文档成功');
                        uni.hideLoading();
                      },
                      fail: function fail(res) {
                        console.log(res);
                        uni.hideLoading();
                      } });

                  },
                  fail: function fail(res) {
                    console.log(res);
                    uni.hideLoading();
                  } });case 10:case "end":return _context2.stop();}}}, _callee2, this);}));function showBook() {return _showBook.apply(this, arguments);}return showBook;}(),


    share: function share() {
      uni.showToast({
        title: "分享成功",
        icon: 'none',
        duration: 3000 });

    },
    collect: function () {var _collect = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var type, msg, res;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                type = '';
                msg = '';
                if (this.detail.isSc == 1) {
                  type = 1; // 取消收藏
                  msg = '已取消收藏';
                } else {
                  type = 2; // 收藏
                  msg = '收藏成功，您可以在"收藏"栏目查看收藏记录';
                }_context3.next = 5;return (
                  (0, _index.updateProjectOperate)({
                    type: type,
                    lx: '2',
                    id: this.id }));case 5:res = _context3.sent;

                if (res.data.flag) {
                  uni.showModal({
                    title: '提示',
                    content: msg,
                    showCancel: false });

                  this.queryProjectDetailList();
                }case 7:case "end":return _context3.stop();}}}, _callee3, this);}));function collect() {return _collect.apply(this, arguments);}return collect;}(),

    send_card: function () {var _send_card = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var isDmp, res, msg;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                isDmp = this.detail.isDmp;if (!(
                isDmp == 1 || isDmp == 2)) {_context4.next = 6;break;}_context4.next = 4;return (
                  (0, _index.saveOrUpdateCard)({
                    type: isDmp,
                    jsUserId: this.detail.userId,
                    cardType: 2 }));case 4:res = _context4.sent;

                if (res.data.flag) {
                  msg = isDmp == 1 ?
                  '递名片成功！当对方回赠名片即可获取对方联系方式' :

                  '回赠名片成功';

                  uni.showModal({
                    title: '提示',
                    content: msg,
                    showCancel: false });

                  this.queryProjectDetailList();
                }case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function send_card() {return _send_card.apply(this, arguments);}return send_card;}(),


    onPhone: function () {var _onPhone = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var permissionValidation;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                  this.$store.dispatch('permissionValidation', { accessCode: '9001' }));case 2:permissionValidation = _context5.sent;if (
                permissionValidation) {_context5.next = 5;break;}return _context5.abrupt("return");case 5:
                uni.makePhoneCall({
                  phoneNumber: this.detail.registerPhone //仅为示例
                });case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function onPhone() {return _onPhone.apply(this, arguments);}return onPhone;}() } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 150:
/*!***********************************************************************************************!*\
  !*** D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Program Files/HBuilderX.2.0.3.20190703-alpha.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./ProDetail.vue?vue&type=style&index=0&lang=scss& */ 151);
/* harmony import */ var _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Program_Files_HBuilderX_2_0_3_20190703_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_ProDetail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 151:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/uniapp-frame/pages/ProDetail/ProDetail.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[144,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ProDetail/ProDetail.js.map