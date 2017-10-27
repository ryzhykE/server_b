webpackJsonp([0],{

/***/ "/w5R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "cart",
  data() {
    return {
      error: "",
      cart: [],
      books: [],
      id: "",
      login: '',
      checkedPayment: "",
      clientDiscount: "",
      clientId: "",
      payment: "",
      showCheckOut: 0,
      showCart: 1,
      showSuccess: 0,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    addOrder: function () {
      var self = this;
      self.error = "";
      if (!self.checkedPayment) {
        return self.error = "Select a Payment Method!";
      }
      var data = new FormData();
      data.append("id_client", JSON.parse(localStorage["id"]));
      data.append("id_payment", self.checkedPayment);
      data.append("total_discount", self.totalDiscount);
      data.append("total_price", self.getTotalPrice);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'orders/', data, self.config).then(function (response) {
        self.addFullOrder(response.data.id_order);
        self.clearCart();
        self.goPaym();
      }).catch(function (error) {
        console.log(error);
      });
    },
    clearCart: function () {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(getUrl() + 'orders/' + self.id, self.config).then(function (response) {}).catch(function (error) {
        console.log(error);
      });
    },

    addFullOrder: function (order) {
      var self = this;
      self.cart.forEach(function (book) {
        var data = new FormData();
        data.append("id_order", order);
        data.append("id_book", book.id);
        data.append("title_book", book.title);
        data.append("count", book.count);
        data.append("price", book.price);
        data.append("discount_book", book.discount);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'OrderInfo/', data, self.config).then(function (response) {
          if (response.data !== 1) {
            self.error = response.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      });
    },

    goPaym: function () {
      var self = this;
      self.showCart = 0;
      self.showCheckOut = 0;
      self.showSuccess = 1;
    },

    goCheckOut: function () {
      var self = this;
      self.showCart = 0;
      self.showCheckOut = 1;
      self.getPayment();
    },
    goCart: function () {
      var self = this;
      self.showCart = 1;
      self.showCheckOut = 0;
    },

    getPayment: function () {
      var self = this;
      var books = self.cart;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'payment/', self.config).then(function (response) {
        //console.log(response.data)
        self.payment = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    updateCart: function () {
      var self = this;
      var books = self.cart;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'cart/', books, self.config).then(function (response) {
        console.log(response.data);
        self.CartList();
      }).catch(function (error) {
        console.log(error);
      });
    },
    getClientDiscount: function () {
      var self = this;
      if (localStorage["id"]) {
        self.id = JSON.parse(localStorage["id"]);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Client/' + self.id).then(function (response) {
          if (response.data !== false) {
            self.clientDiscount = response.data.discount;
            self.clientId = response.data.id;
            return true;
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        return false;
      }
    },

    totalPrice: function (index) {
      var self = this;
      var discount = +self.cart[index].price * +self.cart[index].discount / 100;
      self.cart[index].sum = (+self.cart[index].price - discount) * +self.cart[index].count;
      return self.cart[index].sum.toFixed(2);
    },
    totalDisc: function (index) {
      var self = this;
      var discount = +self.cart[index].price * +self.cart[index].discount / 100;
      self.cart[index].sum = +self.cart[index].price * +self.cart[index].count;
      return self.cart[index].sum.toFixed(2);
    },

    getCount: function (sym, index) {
      var self = this;
      if (sym == "+") {
        self.cart[index].count = +self.cart[index].count + 1;
      } else if (sym == "-") {
        self.cart[index].count -= 1;
        if (self.cart[index].count < 1) {
          self.cart[index].count = 1;
        }
      }
    },

    CartList: function () {
      var self = this;
      if (localStorage["id"]) {
        self.id = JSON.parse(localStorage["id"]);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'cart/' + self.id).then(function (response) {
          if (response.data !== false) {
            self.cart = response.data;
            self.login = JSON.parse(localStorage["login"]);
            response.data.forEach(function (cart) {
              cart.checked = false;
            });
            return true;
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        return false;
      }
    }
  },
  created() {
    this.CartList();
    this.getClientDiscount();
  },
  computed: {
    getTotalPrice() {
      var self = this;
      var total = 0;
      self.cart.forEach(function (book) {
        var discount = +book.price * +book.discount / 100;
        total += +(+book.price - discount) * +book.count;
      });
      var cliDisc = +total * +self.clientDiscount / 100;
      total = +total - cliDisc;
      total = total.toFixed(2);
      return total;
    },
    totalDiscount() {
      var self = this;
      var total = self.getTotalPrice;
      var totalWithout = 0;
      self.cart.forEach(function (book) {
        totalWithout += +book.price * +book.count;
      });
      var discount = +totalWithout - +total;
      return discount.toFixed(2);
    }
  }
});

/***/ }),

/***/ "4DpY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"book-add col-md-8 col-md-offset-2"},[_c('h4',[_vm._v("Edit Book")]),_vm._v(" "),_c('div',{staticClass:"alert-danger"},[_vm._v(_vm._s(_vm.errors))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"title"}},[_vm._v("Book title: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.book.title),expression:"book.title"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter title","name":"titile"},domProps:{"value":(_vm.book.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.book, "title", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"title"}},[_vm._v("Book Price: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.book.price),expression:"book.price"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter price","name":"price"},domProps:{"value":(_vm.book.price)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.book, "price", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"description"}},[_vm._v("Decription: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.book.description),expression:"book.description"}],staticClass:"form-control",attrs:{"name":"description"},domProps:{"value":(_vm.book.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.book, "description", $event.target.value)}}},[_vm._v("Enter description")])])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"discount"}},[_vm._v("Discount: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.book.discount),expression:"book.discount"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter discount","name":"discount"},domProps:{"value":(_vm.book.discount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.book, "discount", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"active"}},[_vm._v("Show")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.active),expression:"active"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.active=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Show Book")]),_vm._v(" "),_c('option',{attrs:{"value":"yes"}},[_vm._v("Yes")]),_vm._v(" "),_c('option',{attrs:{"value":"no"}},[_vm._v("No")])])])]),_vm._v(" "),_c('div',[_c('button',{staticClass:"btn btn-primary add-btn",on:{"click":function($event){_vm.eddBook()}}},[_vm._v("Eddit Book")])]),_vm._v(" "),_c('div',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"authors"}},[_vm._v("Select Authors: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selAuthors),expression:"selAuthors"}],attrs:{"multiple":"","size":"4"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selAuthors=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.authors),function(author){return _c('option',{domProps:{"value":author.id}},[_vm._v(_vm._s(author.name))])}))])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"genres"}},[_vm._v("Select Genres: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selGenres),expression:"selGenres"}],attrs:{"multiple":"","size":"4","name":""},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selGenres=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.genres),function(genre){return _c('option',{domProps:{"value":genre.id}},[_vm._v(_vm._s(genre.name))])}))])]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary add-btn",on:{"click":function($event){_vm.changeBook()}}},[_vm._v("Edit author and ganre")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "6J5f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"login"}},[_c('nav',{staticClass:"navbar navbar-inverse navbar-fixed-top"},[_c('div',{staticClass:"container"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[(_vm.checkUser == '')?_c('div',[_c('div',{staticClass:"navbar-form navbar-right"},[_c('div',{staticClass:"form-group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.login),expression:"login"}],staticClass:"form-control",attrs:{"type":"text","name":"login","placeholder":"login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pass),expression:"pass"}],staticClass:"form-control",attrs:{"type":"password","name":"pass","placeholder":"Password"},domProps:{"value":(_vm.pass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pass=$event.target.value}}})]),_vm._v(" "),_c('button',{staticClass:"btn btn-success",attrs:{"type":"submit"},on:{"click":function($event){_vm.loginUser()}}},[_vm._v("Sign in")])]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',[_c('router-link',{attrs:{"to":'/register/'}},[_vm._v("Sign up")])],1)]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',{staticClass:"err-pass"},[_vm._v(_vm._s(_vm.error))])])]):_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){_vm.logoutUser()}}},[_c('span',{staticClass:"glyphicon glyphicon-log-out"}),_vm._v(" Log out ")])]),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":'/cart/'}},[_c('span',{staticClass:"glyphicon glyphicon-shopping-cart"},[_vm._v("Cart")])])],1),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":'/order/'}},[_c('span',{staticClass:"glyphicon glyphicon-pencil"},[_vm._v("Order")])])],1)])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-header"},[_c('button',{staticClass:"navbar-toggle collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle navigation")]),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"})]),_vm._v(" "),_c('a',{staticClass:"navbar-brand",attrs:{"href":"/"}},[_vm._v("Book Shop")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "8/Ry":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "8BVx":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "8llw":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9/Y+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9Don":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "BtMU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"book-add col-md-8 col-md-offset-2"},[_c('h4',[_vm._v("Add Book")]),_vm._v(" "),_c('div',{staticClass:"alert-danger"},[_vm._v(_vm._s(_vm.errors))]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"title"}},[_vm._v("Book title: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.title),expression:"title"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter title","name":"titile"},domProps:{"value":(_vm.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.title=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"title"}},[_vm._v("Book Price: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.price),expression:"price"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter price","name":"price"},domProps:{"value":(_vm.price)},on:{"input":function($event){if($event.target.composing){ return; }_vm.price=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"description"}},[_vm._v("Decription: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.description),expression:"description"}],staticClass:"form-control",attrs:{"name":"description"},domProps:{"value":(_vm.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.description=$event.target.value}}},[_vm._v("Enter description")])])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"discount"}},[_vm._v("Discount: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.discount),expression:"discount"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter discount","name":"discount"},domProps:{"value":(_vm.discount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.discount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"active"}},[_vm._v("Show")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.active),expression:"active"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.active=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Show Book")]),_vm._v(" "),_c('option',{attrs:{"value":"yes"}},[_vm._v("Yes")]),_vm._v(" "),_c('option',{attrs:{"value":"no"}},[_vm._v("No")])])])]),_vm._v(" "),(_vm.bookId.length == 0)?_c('div',[_c('button',{staticClass:"btn btn-primary add-btn",on:{"click":function($event){_vm.addBook()}}},[_vm._v("Add Book")])]):_vm._e(),_vm._v(" "),(_vm.bookId)?_c('div',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"authors"}},[_vm._v("Select Authors: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedAuthors),expression:"selectedAuthors"}],attrs:{"multiple":"","size":"4"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedAuthors=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.authors),function(author){return _c('option',{domProps:{"value":author.id}},[_vm._v(_vm._s(author.name))])}))])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"genres"}},[_vm._v("Select Genres: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 select-inp"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedGenres),expression:"selectedGenres"}],attrs:{"multiple":"","size":"4","name":""},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedGenres=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.genres),function(genre){return _c('option',{domProps:{"value":genre.id}},[_vm._v(_vm._s(genre.name))])}))])]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary add-btn",on:{"click":function($event){_vm.saveBook()}}},[_vm._v("Save Book")])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "CGhs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-5 col-md-offset-3"},[_c('h4',[_vm._v("Register user")]),_vm._v(" "),(_vm.error !== '')?_c('div',{staticClass:"alert alert-danger"},[_vm._v("\n            "+_vm._s(_vm.error)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.success !== 'register success')?_c('div',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"first_name"}},[_vm._v("Name: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.first_name),expression:"first_name"}],staticClass:"form-control",attrs:{"type":"first_name","id":"first_name","placeholder":"Enter First name","name":"first_name"},domProps:{"value":(_vm.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.first_name=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"last_name"}},[_vm._v("Surname: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.last_name),expression:"last_name"}],staticClass:"form-control",attrs:{"type":"last_name","id":"last_name","placeholder":"Enter Last name","name":"last_name"},domProps:{"value":(_vm.last_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.last_name=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"login"}},[_vm._v("Login: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.login),expression:"login"}],staticClass:"form-control",attrs:{"type":"login","id":"login","placeholder":"Enter login","name":"login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"discount"}},[_vm._v("Discount: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.discount),expression:"discount"}],staticClass:"form-control",attrs:{"type":"text","id":"discount","placeholder":"Enter discount","name":"discount"},domProps:{"value":(_vm.discount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.discount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"pass"}},[_vm._v("Password: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pass),expression:"pass"}],staticClass:"form-control",attrs:{"type":"password","id":"pass","placeholder":"Enter password","name":"pass"},domProps:{"value":(_vm.pass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pass=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"pass_confirm"}},[_vm._v("Password Conferm: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pass_confirm),expression:"pass_confirm"}],staticClass:"form-control",attrs:{"type":"password","id":"pass_confirm","placeholder":"Enter password","name":"pass"},domProps:{"value":(_vm.pass_confirm)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pass_confirm=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"col-sm-offset-2 col-sm-10"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"submit"},on:{"click":function($event){_vm.registration()}}},[_vm._v("Submit")])])])]):_c('div',{staticClass:"success"},[_c('h4',[_vm._v("User "+_vm._s(_vm.login)+" register !")])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "FvRa":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "G/m/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row admin-main"},[_c('div',{staticClass:"col-lg-4 manu-left"},[_c('router-link',{attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-warning main-btn"},[_vm._v("Main page")])]),_vm._v(" "),_c('div',{staticClass:"authors"},[_c('h6',[_vm._v("Authors:")]),_vm._v(" "),_c('div',{staticClass:"new-author"},[_c('div',{staticClass:"alert-danger"},[_c('p',[_vm._v(_vm._s(_vm.autherr))])]),_vm._v("\r\n                        Author name:\r\n                        "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newAuthor),expression:"newAuthor"}],attrs:{"type":"text"},domProps:{"value":(_vm.newAuthor)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newAuthor=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-success",on:{"click":function($event){_vm.addAuthor()}}},[_vm._v("Add")])]),_vm._v(" "),_c('div',{staticClass:"edit"},[_c('div',{staticClass:"new-author"},[_vm._v("\r\n                            Chenge or delete author:\r\n                            "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.editAuthor),expression:"editAuthor"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.editAuthor=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Select Author")]),_vm._v(" "),_vm._l((_vm.authors),function(author){return _c('option',{domProps:{"value":author.id}},[_vm._v(_vm._s(author.name))])})],2)]),_vm._v(" "),_c('div',{staticClass:"new-author"},[(_vm.editAuthor)?_c('div',[_vm._v("\r\n                            New name:"),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editAuthorName),expression:"editAuthorName"}],attrs:{"type":"text"},domProps:{"value":(_vm.editAuthorName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.editAuthorName=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-warning",on:{"click":function($event){_vm.renameAuthor()}}},[_vm._v("Rename")]),_vm._v(" "),_c('button',{staticClass:"btn btn-danger",on:{"click":function($event){_vm.deleteAuthor()}}},[_vm._v("Delete")])]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"authors"},[_c('h6',[_vm._v("Genre:")]),_vm._v(" "),_c('div',{staticClass:"new-author"},[_c('div',{staticClass:"alert-danger"},[_c('p',[_vm._v(_vm._s(_vm.genreerr))])]),_vm._v("\r\n                        Genre name:\r\n                        "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newGenre),expression:"newGenre"}],attrs:{"type":"text"},domProps:{"value":(_vm.newGenre)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newGenre=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-success",on:{"click":function($event){_vm.addGenre()}}},[_vm._v("Add")])]),_vm._v(" "),_c('div',{staticClass:"edit"},[_c('div',{staticClass:"new-author"},[_vm._v("\r\n                            Chenge or delete genre:\r\n                            "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.editGenre),expression:"editGenre"}],on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.editGenre=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Select Genre")]),_vm._v(" "),_vm._l((_vm.genres),function(genre){return _c('option',{domProps:{"value":genre.id}},[_vm._v(_vm._s(genre.name))])})],2)]),_vm._v(" "),_c('div',{staticClass:"new-author"},[(_vm.editGenre)?_c('div',[_vm._v("\r\n                            New name:"),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.editGenreName),expression:"editGenreName"}],attrs:{"type":"text"},domProps:{"value":(_vm.editGenreName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.editGenreName=$event.target.value}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-warning",on:{"click":function($event){_vm.renameGenre()}}},[_vm._v("Rename")]),_vm._v(" "),_c('button',{staticClass:"btn btn-danger",on:{"click":function($event){_vm.deleteGenre()}}},[_vm._v("Delete")])]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"books"},[_c('h6',[_vm._v("Books:")]),_vm._v(" "),_c('div',{staticClass:"alert-danger"},[_c('p',[_vm._v(_vm._s(_vm.bookerr))])]),_vm._v(" "),_c('router-link',{attrs:{"to":"/admin/addbook/"}},[_c('button',{staticClass:"btn btn-success"},[_vm._v("Add Book")])]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.editBook),expression:"editBook"}],staticClass:"books-edit",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.editBook=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Select Book")]),_vm._v(" "),_vm._l((_vm.books),function(book){return _c('option',{domProps:{"value":book.id}},[_vm._v(_vm._s(book.title))])})],2),_vm._v(" "),_c('button',{staticClass:"btn btn-warning",on:{"click":function($event){_vm.showEditBook()}}},[_vm._v("Edit book")])],1),_vm._v(" "),_c('div',{staticClass:"books"},[_c('h6',[_vm._v("Users:")]),_vm._v(" "),_c('div',{staticClass:"alert-danger"},[_c('p',[_vm._v(_vm._s(_vm.usererr))])]),_vm._v(" "),_c('router-link',{attrs:{"to":"/admin/adduser/"}},[_c('button',{staticClass:"btn btn-success"},[_vm._v("Add user")])]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.editUser),expression:"editUser"}],staticClass:"books-edit",attrs:{"name":"","id":""},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.editUser=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{staticClass:"default",attrs:{"value":""}},[_vm._v("Select user login")]),_vm._v(" "),_vm._l((_vm.users),function(user){return _c('option',{domProps:{"value":user.id}},[_vm._v(_vm._s(user.login))])})],2),_vm._v(" "),_c('button',{staticClass:"btn btn-warning",on:{"click":function($event){_vm.eddUser()}}},[_vm._v("Edit user")])],1),_vm._v(" "),_c('router-link',{attrs:{"to":"/admin/orderuser/"}},[_c('button',{staticClass:"btn btn-success"},[_vm._v("Order user")])])],1),_vm._v(" "),_c('div',{staticClass:"col-md-8"},[_c('h4',[_vm._v("Admin panel")]),_vm._v(" "),_c('router-view')],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "H5Eb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditBook_vue__ = __webpack_require__("lLxc");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d96b1f3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditBook_vue__ = __webpack_require__("4DpY");
function injectStyle (ssrContext) {
  __webpack_require__("K/R+")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4d96b1f3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditBook_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d96b1f3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditBook_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "HcT+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4 col-md-offset-4"},[_c('h4',[_vm._v("Register form")]),_vm._v(" "),(_vm.error !== '')?_c('div',{staticClass:"alert alert-danger"},[_vm._v("\n            "+_vm._s(_vm.error)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.success !== 'register success')?_c('div',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"first_name"}},[_vm._v("Name:")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.first_name),expression:"first_name"}],staticClass:"form-control",attrs:{"type":"first_name","id":"first_name","placeholder":"Enter First name","name":"first_name"},domProps:{"value":(_vm.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.first_name=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"last_name"}},[_vm._v("Surname:")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.last_name),expression:"last_name"}],staticClass:"form-control",attrs:{"type":"last_name","id":"last_name","placeholder":"Enter Last name","name":"last_name"},domProps:{"value":(_vm.last_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.last_name=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"login"}},[_vm._v("Login:")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.login),expression:"login"}],staticClass:"form-control",attrs:{"type":"login","id":"login","placeholder":"Enter login","name":"login"},domProps:{"value":(_vm.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.login=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"pass"}},[_vm._v("Password:")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pass),expression:"pass"}],staticClass:"form-control",attrs:{"type":"password","id":"pass","placeholder":"Enter password","name":"pass"},domProps:{"value":(_vm.pass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pass=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"pass_confirm"}},[_vm._v("Password Conferm")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pass_confirm),expression:"pass_confirm"}],staticClass:"form-control",attrs:{"type":"password","id":"pass_confirm","placeholder":"Enter password","name":"pass"},domProps:{"value":(_vm.pass_confirm)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pass_confirm=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"col-sm-offset-2 col-sm-10"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"submit"},on:{"click":function($event){_vm.registration()}}},[_vm._v("Submit")]),_vm._v(" "),_c('router-link',{attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-warning"},[_vm._v("Main page")])])],1)])]):_c('div',{staticClass:"success"},[_c('h4',[_vm._v("Thank you "+_vm._s(_vm.login)+", for register")]),_vm._v(" "),_c('router-link',{staticClass:"link",attrs:{"to":"/"}},[_vm._v("Back to main page")])],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "JJT7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "register",
  data() {
    return {
      error: "",
      success: "",
      first_name: "",
      last_name: "",
      login: "",
      pass: "",
      pass_confirm: "",
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    registration: function () {
      var self = this;
      if (self.first_name && self.last_name && self.login && self.pass && self.pass_confirm) {
        if (self.pass.pass < 7) {
          self.error = "Password should be at least 8 characters";
          return false;
        }
        if (self.login < 2) {
          self.error = "Login more 2 characters";
          return false;
        }
        if (self.pass != self.pass_confirm) {
          self.error = "Password fields do not match";
        } else {
          var data = new FormData();
          data.append("first_name", self.first_name);
          data.append("last_name", self.last_name);
          data.append("login", self.login);
          data.append("pass", self.pass);
          __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'Client', data, this.config).then(function (response) {
            self.error = response.data;
            self.success = "register success";
          }).catch(function (error) {
            console.log(error);
          });
        }
      } else {
        self.error = "Enter field!";
      }
    }
  }
});

/***/ }),

/***/ "K/R+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "KS52":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__admin_AddBook__ = __webpack_require__("hyHr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_EditUser__ = __webpack_require__("d9IM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_UserOrders__ = __webpack_require__("pn9b");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_EditBook__ = __webpack_require__("H5Eb");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  name: "order",
  data() {
    return {
      error: "",
      authors: [],
      genres: [],
      newAuthor: '',
      autherr: '',
      editAuthor: '',
      editAuthorName: '',
      genreerr: '',
      editGenre: '',
      editGenreName: '',
      newGenre: '',
      bookerr: '',
      books: '',
      editBook: '',
      editUser: '',
      users: '',
      role: '',
      userId: '',
      usererr: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    showEditBook: function () {
      var self = this;
      if (self.editBook) {
        self.$router.push({ path: '/admin/editbook/' + self.editBook });
      } else {
        self.bookerr = 'Select book';
      }
    },
    eddUser: function () {
      var self = this;
      if (self.editUser) {
        self.$router.push({ path: '/admin/edituser/' + self.editUser });
      } else {
        self.usererr = 'Select user';
      }
    },
    getUser: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'user/', self.config).then(function (response) {
        if (response.data !== false) {
          self.users = response.data;
          self.userId = response.data.id;
          self.getUser();
          return true;
        }
      }).catch(function (error) {
        //console.log(error);
      });
    },
    getAllBooks: function () {
      var self = this;
      self.bookerr = '';
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'AdminBook/', self.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.books = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        //console.log(error);
      });
    },
    deleteGenre: function () {
      var self = this;
      self.genreerr = '';
      if (self.editGenre) {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(getUrl() + 'genre/' + self.editGenre, self.config).then(function (response) {
          self.genreerr = 'genre delete';
          self.getAllGenres();
          self.editGenre = '';
          self.editGenreName = '';
        }).catch(function (error) {
          //console.log(error);
        });
      } else {
        self.authMsg = 'Select a genre';
      }
    },
    renameGenre: function () {
      var self = this;
      self.genreerr = '';
      if (self.editGenreName && self.editGenre) {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'genre/', {
          id: self.editGenre,
          name: self.editGenreName
        }, self.config).then(function (response) {
          self.genreerr = 'update genre';
          self.editGenre = response.data.id;
          self.editGenreName = response.data.name;
          self.getAllGenres();
          self.editGenre = '';
          self.editGenreName = '';

          return true;
        }).catch(function (error) {
          //console.log(error);
        });
      } else {
        self.autherr = 'Check new name in field';
      }
    },
    addGenre: function () {
      var self = this;
      self.genreerr = '';
      if (self.newGenre) {
        var data = new FormData();
        data.append("name", self.newGenre);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'genre/', data, self.config).then(function (response) {
          self.genreerr = 'add genre';
          self.getAllGenres();
          self.newGenre = '';
        }).catch(function (error) {
          //console.log(error);
        });
      } else {
        self.autherr = "Enter genre field!";
      }
    },
    deleteAuthor: function () {
      var self = this;
      self.autherr = '';
      if (self.editAuthor) {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(getUrl() + 'authors/' + self.editAuthor, self.config).then(function (response) {
          self.autherr = 'delete author';
          alert('delete author');
          self.getAllAuthors();
          self.editAuthor = '';
          self.editAuthorName = '';
        }).catch(function (error) {
          // console.log(error);
        });
      } else {
        self.authMsg = 'Select an Author';
      }
    },
    renameAuthor: function () {
      var self = this;
      self.autherr = '';
      if (self.editAuthorName && self.editAuthor) {
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'authors/', {
          id: self.editAuthor,
          name: self.editAuthorName
        }, self.config).then(function (response) {
          alert('rename author');
          self.autherr = 'rename author';
          self.editAuthor = response.data.id;
          self.editAuthorName = response.data.name;
          self.getAllAuthors();
          self.editAuthor = '';
          self.editAuthorName = '';
          return true;
        }).catch(function (error) {
          //console.log(error);
        });
      } else {
        self.autherr = 'Check new name in field';
      }
    },
    addAuthor: function () {
      var self = this;
      self.autherr = '';
      if (self.newAuthor) {
        var data = new FormData();
        data.append("name", self.newAuthor);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'authors/', data, self.config).then(function (response) {
          alert('add author');
          self.autherr = 'add author';
          self.getAllAuthors();
          self.newAuthor = '';
        }).catch(function (error) {
          // console.log(error);
        });
      } else {
        self.autherr = "Enter author field!";
      }
    },
    checkAdmin: function () {
      var self = this;
      if (localStorage["hash"]) {
        self.user = JSON.parse(localStorage["hash"]);
        self.id = JSON.parse(localStorage["id"]);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Client/' + self.id).then(function (response) {
          //console.log(response.data.role);
          if (self.user === response.data.hash) {
            if (response.data.role == "admin") {
              self.role = response.data.role;
            } else {
              self.$router.push("/");
            }
          }
        }).catch(function (error) {
          //console.log(error);
        });
      } else {
        self.$router.push("/");
      }
    },
    getAllGenres: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Genre/', self.config).then(function (response) {
        if (response.status == 200) {
          self.genres = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        //console.log(error);
      });
    },
    getAllAuthors: function () {
      var self = this;
      self.autherr = '';
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'authors/', self.config).then(function (response) {
        if (response.status == 200) {
          self.authors = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        //console.log(error);
      });
    }
  },

  created() {
    this.checkAdmin();
    this.getAllAuthors();
    this.getAllGenres();
    this.getAllBooks();
    this.getUser();
  }
});

/***/ }),

/***/ "KTvf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Order_vue__ = __webpack_require__("eSQD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ee8c044_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Order_vue__ = __webpack_require__("tlSc");
function injectStyle (ssrContext) {
  __webpack_require__("pi7U")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4ee8c044"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Order_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ee8c044_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Order_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "LhwG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row order-back"},[_c('div',{staticClass:"col-md-offset-2 col-md-8"},[_c('p',{staticClass:"alert-danger"},[_vm._v(_vm._s(_vm.error))]),_vm._v(" "),(_vm.orders.length != 0 )?_c('div',[_c('h3',[_vm._v("Order List")]),_vm._v(" "),_c('table',{staticClass:"table table-bordered"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.orders),function(order,index){return _c('tbody',[_c('tr',{staticClass:"collapsed trOrders tr-ord",attrs:{"data-toggle":"collapse","href":'#' + order.id,"aria-expanded":"false","aria-controls":order.id},on:{"click":function($event){_vm.listFullOrder(order.id)}}},[_c('td',[_vm._v(_vm._s(order.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.date_time))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.first_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.last_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.name))]),_vm._v(" "),_c('td',[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.orders[index].status),expression:"orders[index].status"}],on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.orders[index], "status", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},function($event){_vm.saveStatus(_vm.orders[index].status,_vm.orders[index].id )}]}},[_c('option',{attrs:{"value":"processed"}},[_vm._v("Processed")]),_vm._v(" "),_c('option',{attrs:{"value":"sent"}},[_vm._v("Sent")])])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.discount))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.total_discount)+"$")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.total_price)+"$")])]),_vm._v(" "),_c('tr',{staticClass:"collapse",attrs:{"id":order.id,"role":"tabpanel","aria-labelledby":order.id}},[_c('td',{attrs:{"colspan":"9"}},[_c('table',{staticClass:"table table-hover table-bordered"},[_vm._m(1,true),_vm._v(" "),_c('tbody',_vm._l((_vm.ordersFull),function(book){return _c('tr',[_c('td',[_vm._v(_vm._s(book.title_book))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.price))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.discount_book))])])}))])])])])})],2)]):_c('div',[_c('p',{staticClass:"no-order"},[_vm._v(" \n            You have no orders !\n          ")])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',{staticClass:"info"},[_c('th',{staticClass:"thTable"},[_vm._v("Order")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Date")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("First Name")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Last Name")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Payment")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Status")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("User Discount")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Total Discount")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Total Price")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',{staticClass:"success"},[_c('th',{staticClass:"thTable"},[_vm._v("Title")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Count")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Price")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Discount Book")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d9bd8b0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("uOkG");
function injectStyle (ssrContext) {
  __webpack_require__("g22L")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d9bd8b0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__("YaEn");
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] }
});

/***/ }),

/***/ "Uhku":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Login__ = __webpack_require__("xJsL");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "Main",
  data() {
    return {
      books: "0",
      menuBooks: [],
      authors: [],
      genres: "0",
      errors: "",
      getGan: [],
      getAuth: [],
      oneBook: [],
      checkUser: "",
      count: 1,
      add: "",
      success: "",
      role: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    checkUserA: function () {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.id = JSON.parse(localStorage["id"]);
        self.hash = JSON.parse(localStorage["hash"]);
        self.role = JSON.stringify(localStorage["role"]);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Client/' + self.id).then(function (response) {
          if (response.data !== false) {
            //console.log(response.data.hash);
            if (self.hash === response.data.hash) {
              self.checkUser = 1;
              if (self.role == "admin") {
                self.$router.push("/admin");
              }
              return true;
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        return false;
      }
    },

    addToCart: function (id) {
      var self = this;
      self.success = '';
      self.add = 1;
      var data = new FormData();
      data.append("id_book", id);
      data.append("id_client", localStorage["id"]);
      data.append("count", self.count);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'cart/', data, self.config).then(function (response) {
        if (response.data) {

          self.success = "book add to cart";
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getBtnCountPlus: function () {
      var self = this;
      self.success = '';
      self.count += 1;
      return self.count;
    },
    getBtnCountMinus: function () {
      var self = this;
      self.success = '';
      if (self.count < 2) {
        self.count = 1;
      } else {
        self.count -= 1;
        return self.count;
      }
    },
    getCheck: function () {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.checkUser = 1;
      } else {
        self.checkUser = "";
      }
    },
    getAllBooks: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Books/', this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.books = response.data;
          self.menuBooks = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getAllGenres: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Genre/', this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.genres = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getAllAuthors: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Authors/', this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.authors = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    filteredBooks: function (id) {
      var self = this;
      self.success = '';
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Books/' + id + "/", this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.oneBook = response.data;
          self.books = 0;
          self.getAuth = 0;
          self.getGan = 0;
          self.count = 1;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    filteredBooksGenre: function (id) {
      var self = this;
      self.success = '';
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'GenreBook/' + id + "/", this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.getGan = response.data;
          self.books = 0;
          self.getAuth = 0;
          self.oneBook = 0;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    filteredBooksAuthor: function (id) {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'AuthorsBook/' + id + "/", this.config).then(function (response) {
        //console.log(response.data)
        if (response.status == 200) {
          self.getAuth = response.data;
          self.books = 0;
          self.getGan = 0;
          self.oneBook = 0;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    this.getAllBooks();
    this.getAllGenres();
    this.getAllAuthors();
    this.checkUserA();
  },
  computed: {},
  components: {
    loginForm: __WEBPACK_IMPORTED_MODULE_1__Login__["a" /* default */]
  }
});

/***/ }),

/***/ "X2y5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "XKwl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "register",
  data() {
    return {
      error: "",
      success: "",
      first_name: "",
      last_name: "",
      login: "",
      discount: "",
      pass: "",
      pass_confirm: "",
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    registration: function () {
      var self = this;
      if (self.first_name && self.last_name && self.login && self.discount && self.pass && self.pass_confirm) {
        if (self.pass.pass < 7) {
          self.error = "Password should be at least 8 characters";
          return false;
        }
        if (self.login < 2) {
          self.error = "Login more 2 characters";
          return false;
        }
        if (self.pass != self.pass_confirm) {
          self.error = "Password fields do not match";
        } else {
          var data = new FormData();
          data.append("first_name", self.first_name);
          data.append("last_name", self.last_name);
          data.append("login", self.login);
          data.append("discount", self.discount);
          data.append("pass", self.pass);
          __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'User/', data, self.config).then(function (response) {
            self.error = response.data;
            self.success = "register success";
          }).catch(function (error) {
            self.error = response.data;
            console.log(error);
          });
        }
      } else {
        self.error = "Enter field!";
      }
    }
  }
});

/***/ }),

/***/ "Y89W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "order",
  data() {
    return {
      error: "",
      orders: [],
      ordersFull: [],
      orderid: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    saveStatus: function (index, id) {
      var self = this;
      var data = {};
      data.id = id;
      data.status = index;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'orders/', data, self.config).then(function (response) {
        self.listOrder();
        if (response.data == 'OK') {
          self.error = 'Order №' + data.id + ' - Status changed!';
        } else {
          self.error = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    listOrder: function () {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'orders/').then(function (response) {
        if (Array.isArray(response.data)) {
          self.orders = response.data;
          self.orderid = response.data.id;
        } else {
          self.error = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    listFullOrder: function (id) {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'OrderInfo/' + id + "/").then(function (response) {
        self.ordersFull = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  },

  created() {
    this.listOrder();
  }
});

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("7+uW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Main__ = __webpack_require__("s6+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios__ = __webpack_require__("Rf8U");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Register__ = __webpack_require__("dIqY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Cart__ = __webpack_require__("Zc39");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Order__ = __webpack_require__("KTvf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Admin__ = __webpack_require__("qbhH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_admin_AddBook__ = __webpack_require__("hyHr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_admin_AddUser__ = __webpack_require__("z8zq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_admin_EditUser__ = __webpack_require__("d9IM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_admin_UserOrders__ = __webpack_require__("pn9b");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_admin_EditBook__ = __webpack_require__("H5Eb");















__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_3_axios___default.a);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Main',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Main__["a" /* default */]
  }, {
    path: '/register/',
    name: 'Register',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Register__["a" /* default */]
  }, {
    path: '/cart',
    name: 'Cart',
    component: __WEBPACK_IMPORTED_MODULE_6__components_Cart__["a" /* default */]
  }, {
    path: '/order',
    name: 'Order',
    component: __WEBPACK_IMPORTED_MODULE_7__components_Order__["a" /* default */]
  }, {
    path: '/admin/',
    name: 'Admin',
    component: __WEBPACK_IMPORTED_MODULE_8__components_Admin__["a" /* default */],
    children: [{ path: 'addbook', component: __WEBPACK_IMPORTED_MODULE_9__components_admin_AddBook__["a" /* default */] }, { path: 'adduser', component: __WEBPACK_IMPORTED_MODULE_10__components_admin_AddUser__["a" /* default */] }, { path: 'edituser/:id', component: __WEBPACK_IMPORTED_MODULE_11__components_admin_EditUser__["a" /* default */] }, { path: 'orderuser', component: __WEBPACK_IMPORTED_MODULE_12__components_admin_UserOrders__["a" /* default */] }, { path: 'editbook/:id', component: __WEBPACK_IMPORTED_MODULE_13__components_admin_EditBook__["a" /* default */] }]
  }]
}));

/***/ }),

/***/ "Zc39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__ = __webpack_require__("/w5R");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b6113c80_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__ = __webpack_require__("e51i");
function injectStyle (ssrContext) {
  __webpack_require__("8llw")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b6113c80"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b6113c80_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Cart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "bMiY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'Book',
  data() {
    return {
      authors: '',
      genres: '',
      selectedAuthors: [],
      selectedGenres: [],
      strAuthors: '',
      strGenres: '',
      title: '',
      description: '',
      price: '',
      discount: '',
      active: '',
      errors: '',
      bookId: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    saveBook: function () {
      var self = this;
      self.errors = '';
      self.strAuthors = '';
      self.strGenres = '';
      if (self.selectedGenres.length == 0) {
        self.errorMsg = 'Choose genre';
      }
      if (self.selectedAuthors.length == 0) {
        self.errorMsg = 'Choose Author';
      }

      self.selectedAuthors.forEach(function (idAuthor) {
        var data = new FormData();
        data.append('id_book', self.bookId);
        data.append('id_author', idAuthor);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'AuthorsBook/', data, self.config).then(function (response) {
          if (!response.data) {
            self.errors = response.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
        self.authors.forEach(function (author) {
          if (author.id == idAuthor) {
            self.strAuthors += author.name + ' ';
          }
        });
      });
      self.selectedGenres.forEach(function (idGenre) {
        var data = new FormData();
        data.append('id_book', self.bookId);
        data.append('id_genre', idGenre);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'GenreBook/', data, self.config).then(function (response) {
          if (!response.data) {
            self.errors = response.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
        self.genres.forEach(function (genre) {
          if (genre.id == idGenre) {
            self.strGenres += genre.name + ' ';
          }
        });
      });

      if (self.errors == '') {
        self.errors = 'Book add successfully!';
        self.historyBook();
        self.$parent.getAllBooks();
      }
    },
    historyBook: function () {
      var self = this;
      var data = new FormData();
      data.append('title', self.title);
      data.append('genre', self.strGenres);
      data.append('author', self.strAuthors);
      data.append('price', self.price);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'HistoryBook/', data, self.config).then(function (response) {
        if (!response.data) {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    addBook: function () {
      var self = this;
      self.errors = '';
      var data = new FormData();
      data.append('title', self.title);
      data.append('price', self.price);
      data.append('description', self.description);
      data.append('discount', self.discount);
      data.append('active', self.active);
      if (!self.title) {
        self.errors = 'Check Title';
        return false;
      }
      if (!self.description) {
        self.errors = 'Check Description';
        return false;
      }
      if (!self.price) {
        self.errors = 'Check Price';
        return false;
      }
      if (!self.discount) {
        self.errors = 'Check Discount';
        return false;
      }
      if (self.active < 1) {
        self.errors = 'Chek show or not book';
        return false;
      }
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(getUrl() + 'books/', data, self.config).then(function (response) {
        if (response.data.id_book) {
          self.bookId = response.data.id_book;
          self.errors = 'Book created, add author and genre!';
        } else {
          self.errors = response.data;
        }
        //console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
    getAllGenres: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Genre/', self.config).then(function (response) {
        if (response.status == 200) {
          self.genres = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getAllAuthors: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'authors/', self.config).then(function (response) {
        if (response.status == 200) {
          self.authors = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    this.getAllAuthors();
    this.getAllGenres();
  }
});

/***/ }),

/***/ "d9IM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditUser_vue__ = __webpack_require__("oqEr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_738fbc56_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditUser_vue__ = __webpack_require__("xKnU");
function injectStyle (ssrContext) {
  __webpack_require__("9Don")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-738fbc56"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditUser_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_738fbc56_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_EditUser_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "dIqY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Register_vue__ = __webpack_require__("JJT7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_173857c3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Register_vue__ = __webpack_require__("HcT+");
function injectStyle (ssrContext) {
  __webpack_require__("X2y5")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-173857c3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Register_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_173857c3_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Register_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "e51i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cart row"},[_c('p',{staticClass:"alert-danger"},[_vm._v(_vm._s(_vm.error))]),_vm._v(" "),(_vm.showCart)?_c('div',[_c('div',{staticClass:"col-md-offset-2 col-md-8"},[_c('h4',[_vm._v("Hello "+_vm._s(_vm.login)+" !")]),_vm._v(" "),(_vm.cart.length != 0)?_c('div',[_c('table',{staticClass:"table table-bordered"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.cart),function(item,index){return _c('tr',{staticClass:"item"},[_c('td',[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.cart[index].checked),expression:"cart[index].checked"}],attrs:{"type":"checkbox","id":"checkbox"},domProps:{"checked":Array.isArray(_vm.cart[index].checked)?_vm._i(_vm.cart[index].checked,null)>-1:(_vm.cart[index].checked)},on:{"change":function($event){var $$a=_vm.cart[index].checked,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.cart[index].checked=$$a.concat([$$v]))}else{$$i>-1&&(_vm.cart[index].checked=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.$set(_vm.cart[index], "checked", $$c)}}}})])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.title))]),_vm._v(" "),_c('td',[_c('button',{staticClass:"btn btn-default",attrs:{"type":"submit"},on:{"click":function($event){_vm.getCount('-', index)}}},[_vm._v("-")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:( _vm.cart[index].count),expression:" cart[index].count"}],staticClass:"inputCount",attrs:{"type":"text"},domProps:{"value":( _vm.cart[index].count)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set( _vm.cart[index], "count", $event.target.value)}}}),_vm._v(" "),_c('button',{staticClass:"btn btn-default",attrs:{"type":"submit"},on:{"click":function($event){_vm.getCount('+', index)}}},[_vm._v("+")])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.price))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.discount))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.totalPrice(index))+"$")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.totalDisc(index))+"$")])])}))]),_vm._v(" "),_c('button',{staticClass:"btn btn-info",on:{"click":function($event){_vm.updateCart()}}},[_vm._v("Update cart ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-success",on:{"click":function($event){_vm.goCheckOut()}}},[_vm._v("To Checkout")]),_vm._v(" "),_c('router-link',{attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-warning"},[_vm._v("Back to main")])])],1):_c('div',[_c('p',{staticClass:"empty-cart"},[_vm._v("Empty cart !")]),_vm._v(" "),_c('router-link',{attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-warning"},[_vm._v("Main page")])])],1),_vm._v(" "),_c('div',{staticClass:"total-sum"},[_c('p',[_c('span',[_vm._v("Total price: ")]),_vm._v(_vm._s(_vm.getTotalPrice)+" $")]),_vm._v(" "),_c('p',[_c('span',[_vm._v("Client Discount: ")]),_vm._v(_vm._s(_vm.clientDiscount)+" %")]),_vm._v(" "),_c('p',[_c('span',[_vm._v("Total discount: ")]),_vm._v(_vm._s(_vm.totalDiscount)+" $")])])])]):_vm._e(),_vm._v(" "),(_vm.showCheckOut)?_c('div',{staticClass:"checkout"},[_c('h4',[_vm._v("CheckOut")]),_vm._v(" "),_c('p',[_vm._v("\n      Payment cart\n   ")]),_vm._v(" "),_vm._l((_vm.payment),function(payMeth,index){return _c('div',{key:payMeth.id},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.checkedPayment),expression:"checkedPayment"}],attrs:{"name":"id_payment","type":"radio"},domProps:{"value":payMeth.id,"checked":_vm._q(_vm.checkedPayment,payMeth.id)},on:{"change":function($event){_vm.checkedPayment=payMeth.id}}}),_vm._v(" "),_c('p',{staticClass:"radio-pay"},[_vm._v(_vm._s(payMeth.name))])])}),_vm._v(" "),_c('button',{staticClass:"btn btn-info",on:{"click":function($event){_vm.goCart()}}},[_vm._v("Back to Cart")]),_vm._v(" "),_c('button',{staticClass:"btn btn-danger",on:{"click":function($event){_vm.addOrder()}}},[_vm._v("Add Order")])],2):_vm._e(),_vm._v(" "),(_vm.showSuccess)?_c('div',[_c('p',{staticClass:"and-order"},[_vm._v("\n         Thanks for your order !\n        ")]),_vm._v(" "),_c('router-link',{staticClass:"link",attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-info"},[_vm._v("Back to main")])])],1):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("№")]),_vm._v(" "),_c('th',[_vm._v("Title")]),_vm._v(" "),_c('th',[_vm._v("Count")]),_vm._v(" "),_c('th',[_vm._v("Price")]),_vm._v(" "),_c('th',[_vm._v("Discount")]),_vm._v(" "),_c('th',[_vm._v("Total with discount")]),_vm._v(" "),_c('th',[_vm._v("Total with out discont")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "eSQD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "order",
  data() {
    return {
      error: "",
      orders: [],
      ordersFull: [],
      checkUser: 0,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    listOrder: function () {
      var self = this;
      self.id = JSON.parse(localStorage["id"]);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'orders/' + self.id + "/").then(function (response) {
        if (Array.isArray(response.data)) {
          self.orders = response.data;
        } else {
          self.error = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    listFullOrder: function (id) {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'OrderInfo/' + id + "/").then(function (response) {
        self.ordersFull = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    getCheck: function () {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.checkUser = 1;
      } else {
        self.checkUser = 0;
      }
    }
  },

  created() {
    this.listOrder();
    this.getCheck();
  }
});

/***/ }),

/***/ "eYaX":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "g22L":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hyHr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddBook_vue__ = __webpack_require__("bMiY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60678afa_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddBook_vue__ = __webpack_require__("BtMU");
function injectStyle (ssrContext) {
  __webpack_require__("8BVx")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60678afa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddBook_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60678afa_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddBook_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "lLxc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditBook',
  beforeRouteUpdate(to, from, next) {
    if (this.getBook(to.params.id)) {
      this.msg = '';
      next();
    }
  },
  data() {
    return {
      authors: '',
      genres: '',
      selAuthors: [],
      selGenres: [],
      errors: '',
      book: [],
      active: '',
      bookGenres: [],
      bookAuthors: [],
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    getBook: function (id) {
      var self = this;
      self.selAuthors = [];
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'AdminBook/' + id + "/", self.config).then(function (response) {
        if (response.status == 200) {
          self.book = response.data[id];
          self.bookGenres = response.data[id].genres;
          self.bookGenres.forEach(function (id) {
            self.selGenres.push(id.id);
          });
          self.bookAuthors = response.data[id].authors;
          self.bookAuthors.forEach(function (id) {
            self.selAuthors.push(id.id);
          });
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    eddBook: function () {
      var self = this;
      var data = {};
      data.id = self.book.id;
      data.title = self.book.title;
      data.price = self.book.price;
      data.description = self.book.description;
      data.discount = self.book.discount;
      data.active = self.book.active;
      if (!data.title) {
        self.errors = 'Check Title';
        return false;
      }
      if (!data.price) {
        self.errors = 'Check Description';
        return false;
      }
      if (!data.description) {
        self.errors = 'Check Price';
        return false;
      }
      if (!data.discount) {
        self.errors = 'Check Discount';
        return false;
      }
      if (data.active < 1) {
        self.errors = 'Chek show or not book';
        return false;
      }
      console.log(data);
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'books/', data, self.config).then(function (response) {

        alert('Book Edit');
        self.error = self.$parent.getAllBooks();
      })
      //self.error = 'Book Edit'
      .catch(function (error) {
        console.log(error);
      });
    },
    getAllGenres: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Genre/', self.config).then(function (response) {
        if (response.status == 200) {
          self.genres = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getAllAuthors: function () {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'authors/', self.config).then(function (response) {
        if (response.status == 200) {
          self.authors = response.data;
        } else {
          self.errors = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    changeBook: function () {
      var self = this;
      var data = {};

      self.errors = '';

      if (self.selAuthors.length == 0) {
        self.errors = 'Choose genre';
      }
      if (self.selAuthors.length == 0) {
        self.errors = 'Choose Author';
      }

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(getUrl() + 'AuthorsBook/' + self.book.id + '/', self.config).then(function (response) {

        self.selAuthors.forEach(function (idAuthor) {
          var data = {};
          data.id_book = self.book.id;
          data.id_author = idAuthor;
          __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'AuthorsBook/', data, self.config).then(function (response) {
            if (!response.data) {
              self.errors = response.data;
            }
            self.errors = 'Genre/Author add to book!';
          }).catch(function (error) {
            console.log(error);
          });
        });
      });

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(getUrl() + 'GenreBook/' + self.book.id + '/', self.config).then(function (response) {

        self.selGenres.forEach(function (idGenre) {
          var data = {};
          data.id_book = self.book.id;
          data.id_genre = idGenre;
          __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'GenreBook/', data, self.config).then(function (response) {
            if (!response.data) {
              self.errors = response.data;
            }
            self.errors = 'Genre/Author add to book!';
          }).catch(function (error) {
            console.log(error);
          });
        });
      });

      if (self.errors == '') {
        self.errors = 'Book add successfully!';
        self.$parent.getAllBooks();
      }
    }
  },

  created() {
    this.getAllAuthors();
    this.getAllGenres();
    this.getBook(this.$route.params.id);
  }
});

/***/ }),

/***/ "nKb+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "loginForm",
  data() {
    return {
      login: "",
      pass: "",
      id: "",
      hash: "",
      error: "",
      checkUser: "",
      role: ""
    };
  },
  methods: {
    loginUser: function () {
      var self = this;
      self.error = "";

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'Client/', {
        login: self.login,
        pass: self.pass
      }, this.config).then(function (response) {
        if (response.data.id && response.data.hash) {
          self.id = response.data.id;
          self.hash = response.data.hash;
          self.role = response.data.role;
          localStorage["id"] = JSON.stringify(self.id);
          localStorage["hash"] = JSON.stringify(self.hash);
          localStorage["login"] = JSON.stringify(self.login);
          localStorage["role"] = JSON.stringify(self.role);
          self.checkUserA();
          self.$parent.getCheck();
          if (response.data.role == "admin") {
            self.$router.push("/admin");
          } else {
            self.$router.push("/");
          }

          return true;
        } else {
          self.error = response.data;
        }
      }).catch(function (error) {
        console.log(error);
        self.error = "password or login wrong";
      });
    },
    checkUserA: function () {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        self.id = JSON.parse(localStorage["id"]);
        self.hash = JSON.parse(localStorage["hash"]);
        self.role = JSON.stringify(localStorage["role"]);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Client/' + self.id).then(function (response) {
          if (response.data !== false) {
            //console.log(response.data.role);


            self.checkUser = 1;
            return true;
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        return false;
      }
    },
    logoutUser: function () {
      var self = this;
      if (localStorage["id"] && localStorage["hash"]) {
        delete localStorage["id"];
        delete localStorage["hash"];
        delete localStorage["login"];
        delete localStorage["role"];
        self.checkUser = "";
        self.role = "", self.$parent.getCheck();
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.checkUserA();
  }
});

/***/ }),

/***/ "oqEr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__("mtWM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'EditUser',
  beforeRouteUpdate(to, from, next) {
    this.getUser(to.params.id);
    this.showOrdrers = false;
    this.orderMsg = '';
    next();
  },
  data() {
    return {
      user: '',
      userInfo: [],
      error: '',
      showOrdrers: false,
      orderMsg: '',
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    getOrders: function () {
      var self = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', getUrl() + 'orders/' + self.userData.id, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          var res = JSON.parse(xhr.responseText);
          if (typeof res == 'string') {
            self.msg = res;
          } else {
            self.userData.orders = JSON.parse(xhr.responseText);
          }
        }
      };
      xhr.send();
    },
    saveUser: function () {
      var self = this;
      self.error = '';
      if (self.userInfo.first_name && self.userInfo.last_name && self.userInfo.pass) {
        if (self.userInfo.first_name.length <= 3) {
          self.error = 'First name should be at least 3 characters';
          return false;
        }

        if (self.userInfo.last_name.length <= 2) {
          self.error = 'Last name should be at least 3 characters';
          return false;
        }

        if (self.userInfo.pass.length <= 3) {
          self.error = 'Password should be at least 4 characters';
          return false;
        }

        var data = {};
        data.id = self.userInfo.id;
        data.first_name = self.userInfo.first_name;
        data.last_name = self.userInfo.last_name;
        data.login = self.userInfo.login;
        data.discount = self.userInfo.discount;
        data.pass = self.userInfo.pass;
        data.role = self.userInfo.role;
        data.active = self.userInfo.active;
        //console.log(data);
        __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(getUrl() + 'user/', data, self.config).then(function (response) {
          self.getUser(self.$route.params.id);
          self.error = 'User update';
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        self.errorMsg = 'Check all fields!';
      }
    },
    getUser: function (id) {
      var self = this;
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(getUrl() + 'Client/' + id, self.config).then(function (response) {
        if (response.data !== false) {
          //console.log(response.data);
          self.userInfo = response.data;
          console.log(self.userInfo);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }

  },
  created() {
    this.getUser(this.$route.params.id);
  },
  computed: {},
  components: {}
});

/***/ }),

/***/ "pi7U":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "pn9b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserOrders_vue__ = __webpack_require__("Y89W");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_143df020_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserOrders_vue__ = __webpack_require__("LhwG");
function injectStyle (ssrContext) {
  __webpack_require__("9/Y+")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-143df020"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserOrders_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_143df020_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserOrders_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "qbhH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Admin_vue__ = __webpack_require__("KS52");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d9f9942_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Admin_vue__ = __webpack_require__("G/m/");
function injectStyle (ssrContext) {
  __webpack_require__("8/Ry")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1d9f9942"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Admin_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d9f9942_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Admin_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "rt0U":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "s6+2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Main_vue__ = __webpack_require__("Uhku");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b7da104e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Main_vue__ = __webpack_require__("uUok");
function injectStyle (ssrContext) {
  __webpack_require__("eYaX")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b7da104e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Main_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b7da104e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "tlSc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row order-back"},[_c('div',{staticClass:"col-md-offset-2 col-md-8"},[_c('router-link',{attrs:{"to":"/"}},[_c('button',{staticClass:"btn btn-warning main-btn"},[_vm._v("Main page")])]),_vm._v(" "),(_vm.orders.length != 0 )?_c('div',[_c('h3',[_vm._v("Order List")]),_vm._v(" "),(_vm.checkUser > 0)?_c('table',{staticClass:"table table-bordered"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.orders),function(order){return _c('tbody',[_c('tr',{staticClass:"collapsed trOrders tr-ord",attrs:{"data-toggle":"collapse","href":'#' + order.id,"aria-expanded":"false","aria-controls":order.id},on:{"click":function($event){_vm.listFullOrder(order.id)}}},[_c('td',[_vm._v(_vm._s(order.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.date_time))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.first_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.last_name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.status))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.discount))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.total_discount)+"$")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(order.total_price)+"$")])]),_vm._v(" "),_c('tr',{staticClass:"collapse",attrs:{"id":order.id,"role":"tabpanel","aria-labelledby":order.id}},[_c('td',{attrs:{"colspan":"9"}},[_c('table',{staticClass:"table table-hover table-bordered"},[_vm._m(1,true),_vm._v(" "),_c('tbody',_vm._l((_vm.ordersFull),function(book){return _c('tr',[_c('td',[_vm._v(_vm._s(book.title_book))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.count))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.price))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(book.discount_book))])])}))])])])])})],2):_c('div',[_c('p',{staticClass:"order-login"},[_vm._v("Please, login")])])]):_c('div',[_c('p',{staticClass:"no-order"},[_vm._v(" \n            You have no orders !\n          ")])])],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',{staticClass:"info"},[_c('th',{staticClass:"thTable"},[_vm._v("Order")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Date")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("First Name")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Last Name")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Payment")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Status")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("User Discount")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Total Discount")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Total Price")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',{staticClass:"success"},[_c('th',{staticClass:"thTable"},[_vm._v("Title")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Count")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Price")]),_vm._v(" "),_c('th',{staticClass:"thTable"},[_vm._v("Discount Book")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "uOkG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view'),_vm._v(" "),_vm._m(0)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"mastfoot col-lg-12"},[_c('div',{staticClass:"inner"},[_c('p',[_vm._v("Our shop "),_c('a',{attrs:{"href":"/"}},[_vm._v("Shop")]),_vm._v(", by "),_c('a',{attrs:{"href":"/"}},[_vm._v("Evgeniy")]),_vm._v(".")])])])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "uUok":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main container-fluid"},[_c('div',{staticClass:"row"},[_c('loginForm'),_vm._v(" "),_c('div',{staticClass:"col-md-3 left-menu "},[_c('p',{staticClass:"alert-danger"},[_vm._v(_vm._s(_vm.errors))]),_vm._v(" "),_c('ul',{staticClass:"nav "},[_c('li',{staticClass:"nav-header glyphicon glyphicon-list-alt"},[_vm._v(" Books")]),_vm._v(" "),_vm._l((_vm.menuBooks),function(book){return _c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooks(book.id)}}},[_vm._v(_vm._s(book.title))])])}),_vm._v(" "),_c('li',{staticClass:"nav-header glyphicon glyphicon-book"},[_vm._v(" Genre ")]),_vm._v(" "),_vm._l((_vm.genres),function(genre){return _c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooksGenre(genre.id)}}},[_vm._v(_vm._s(genre.name))])])}),_vm._v(" "),_c('li',{staticClass:"nav-header glyphicon glyphicon-user"},[_vm._v(" Author")]),_vm._v(" "),_vm._l((_vm.authors),function(author){return _c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooksAuthor(author.id)}}},[_vm._v(_vm._s(author.name))])])})],2)]),_vm._v(" "),_c('div',{staticClass:"col-md-9"},[(_vm.getGan !== 0)?_c('div',_vm._l((_vm.getGan),function(book){return _c('div',{staticClass:" book-list"},[_c('h2',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooks(book.id)}}},[_vm._v(_vm._s(book.title))])]),_vm._v(" "),_c('img',{staticClass:"img",attrs:{"src":book.img}}),_vm._v(" "),_vm._m(0,true),_vm._v(" "),_vm._l((book.authors),function(author){return _c('p',{staticClass:"author"},[_vm._v(_vm._s(author.name)+" ")])}),_vm._v(" "),_vm._m(1,true),_vm._v(" "),_vm._l((book.genres),function(genre){return _c('p',{staticClass:"genre"},[_vm._v(_vm._s(genre.name))])}),_vm._v(" "),_c('p',[_c('span',[_vm._v("Price : ")]),_vm._v(" "+_vm._s(book.price)+" $ ")]),_vm._v(" "),(book.discount !== null)?_c('p',[_vm._v("Discount: "+_vm._s(book.discount)+" %")]):_vm._e()],2)})):_vm._e(),_vm._v(" "),(_vm.getAuth !== 0)?_c('div',{},_vm._l((_vm.getAuth),function(book){return _c('div',{staticClass:" book-list"},[_c('h2',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooks(book.id)}}},[_vm._v(_vm._s(book.title))])]),_vm._v(" "),_c('img',{staticClass:"img",attrs:{"src":book.img}}),_vm._v(" "),_vm._m(2,true),_vm._v(" "),_vm._l((book.authors),function(author){return _c('p',{staticClass:"author"},[_vm._v(_vm._s(author.name)+" ")])}),_vm._v(" "),_vm._m(3,true),_vm._v(" "),_vm._l((book.genres),function(genre){return _c('p',{staticClass:"genre"},[_vm._v(_vm._s(genre.name))])}),_vm._v(" "),_c('p',[_c('span',[_vm._v("Price : ")]),_vm._v(" "+_vm._s(book.price)+" $ ")]),_vm._v(" "),(book.discount !== null)?_c('p',[_vm._v("Discount: "+_vm._s(book.discount)+" %")]):_vm._e()],2)})):_vm._e(),_vm._v(" "),(_vm.books !== 0)?_c('div',_vm._l((_vm.books),function(book){return _c('div',{staticClass:"book-list"},[_c('h2',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){ _vm.filteredBooks(book.id)}}},[_vm._v(_vm._s(book.title))])]),_vm._v(" "),_c('img',{staticClass:"img",attrs:{"src":book.img}}),_vm._v(" "),_vm._m(4,true),_vm._v(" "),_vm._l((book.authors),function(author){return _c('p',{staticClass:"author"},[_vm._v(_vm._s(author.name)+" ")])}),_vm._v(" "),_vm._m(5,true),_vm._v(" "),_vm._l((book.genres),function(genre){return _c('p',{staticClass:"genre"},[_vm._v(_vm._s(genre.name))])}),_vm._v(" "),_c('p',[_c('span',[_vm._v("Price : ")]),_vm._v(" "+_vm._s(book.price)+" $ ")]),_vm._v(" "),(book.discount > 0 )?_c('p',[_vm._v("Discount: "+_vm._s(book.discount)+" %")]):_vm._e()],2)})):_vm._e(),_vm._v(" "),(_vm.oneBook !== 0)?_c('div',_vm._l((_vm.oneBook),function(book){return _c('div',{staticClass:"book-one"},[_c('h2',[_vm._v(_vm._s(book.title))]),_vm._v(" "),_c('img',{staticClass:"img",attrs:{"src":book.img}}),_vm._v(" "),_c('p',[_c('span',[_vm._v("Description : ")]),_vm._v("\n        "+_vm._s(book.description)+"\n      ")]),_vm._v(" "),_vm._m(6,true),_vm._v(" "),_vm._l((book.authors),function(author){return _c('p',{staticClass:"author"},[_vm._v(_vm._s(author.name)+" ")])}),_vm._v(" "),_vm._m(7,true),_vm._v(" "),_vm._l((book.genres),function(genre){return _c('p',{staticClass:"genre"},[_vm._v(_vm._s(genre.name))])}),_vm._v(" "),_c('p',[_c('span',[_vm._v("Price : ")]),_vm._v(" "+_vm._s(book.price)+" $ ")]),_vm._v(" "),(book.discount !== null)?_c('p',[_vm._v("Discount: "+_vm._s(book.discount)+" %")]):_vm._e(),_vm._v(" "),(_vm.checkUser != '')?_c('div',[_c('button',{staticClass:"btn",on:{"click":function($event){_vm.getBtnCountMinus()}}},[_vm._v("-")]),_vm._v(" "),_c('span',{staticClass:"count-book"},[_vm._v(_vm._s(_vm.count))]),_vm._v(" "),_c('button',{staticClass:"btn",on:{"click":function($event){_vm.getBtnCountPlus()}}},[_vm._v("+")]),_vm._v("\n        "+_vm._s(_vm.success)+"\n      "),_c('button',{staticClass:"btn btn-success ",attrs:{"type":"button"},on:{"click":function($event){_vm.addToCart(book.id)}}},[_vm._v("Add to cart")])]):_vm._e()],2)})):_vm._e()])],1)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Author : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Genre : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Author : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Genre : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Author : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Genre : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Author : ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_c('span',[_vm._v("Genre : ")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "xJD8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'app',
  data() {
    return {};
  }

});

/***/ }),

/***/ "xJsL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__("nKb+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ed2efb0e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__("6J5f");
function injectStyle (ssrContext) {
  __webpack_require__("FvRa")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ed2efb0e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "xKnU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"edd-user"},[(_vm.error !== '')?_c('div',{staticClass:"alert alert-danger"},[_vm._v("\n      "+_vm._s(_vm.error)+"\n    ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form"},[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"first_name"}},[_vm._v("Name: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10 "},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.first_name),expression:"userInfo.first_name"}],staticClass:"form-control",attrs:{"type":"text","name":"first_name"},domProps:{"value":_vm.userInfo.first_name,"value":(_vm.userInfo.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userInfo, "first_name", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"last_name"}},[_vm._v("Surname: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.last_name),expression:"userInfo.last_name"}],staticClass:"form-control",attrs:{"type":"last_name","id":"last_name","name":"last_name"},domProps:{"value":_vm.userInfo.last_name,"value":(_vm.userInfo.last_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userInfo, "last_name", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"login"}},[_vm._v("Login: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.login),expression:"userInfo.login"}],staticClass:"form-control",attrs:{"type":"login","id":"login","name":"login"},domProps:{"value":_vm.userInfo.login,"value":(_vm.userInfo.login)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userInfo, "login", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"discount"}},[_vm._v("Discount: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.discount),expression:"userInfo.discount"}],staticClass:"form-control",attrs:{"type":"text","id":"discount","name":"discount"},domProps:{"value":_vm.userInfo.discount,"value":(_vm.userInfo.discount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userInfo, "discount", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"pass"}},[_vm._v("Password: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.pass),expression:"userInfo.pass"}],staticClass:"form-control",attrs:{"type":"password","name":"pass"},domProps:{"value":(_vm.userInfo.pass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.userInfo, "pass", $event.target.value)}}})])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"activ"}},[_vm._v("Activ: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.active),expression:"userInfo.active"}],staticClass:"form-control",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.userInfo, "active", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_c('option',{attrs:{"value":"yes"}},[_vm._v("Yes")]),_vm._v(" "),_c('option',{attrs:{"value":"no"}},[_vm._v("No")])])])]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"control-label col-sm-2",attrs:{"for":"role"}},[_vm._v("Role: ")]),_vm._v(" "),_c('div',{staticClass:"col-sm-10"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInfo.role),expression:"userInfo.role"}],staticClass:"form-control",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.userInfo, "role", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},[_c('option',{attrs:{"value":"user"}},[_vm._v("User")]),_vm._v(" "),_c('option',{attrs:{"value":"admin"}},[_vm._v("Admin")])])])]),_vm._v(" "),_c('button',{staticClass:"btn btn-success save-user",on:{"click":function($event){_vm.saveUser()}}},[_vm._v("Update User")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "z8zq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddUser_vue__ = __webpack_require__("XKwl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4dee0a48_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddUser_vue__ = __webpack_require__("CGhs");
function injectStyle (ssrContext) {
  __webpack_require__("rt0U")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4dee0a48"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddUser_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4dee0a48_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddUser_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},["NHnr"]);
//# sourceMappingURL=app.871e68020a03e5865408.js.map