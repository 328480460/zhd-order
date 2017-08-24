// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// axios
import axios from 'axios';
Vue.prototype.$ajax = axios;

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import store from './store/store.js';

import util from './assets/js/util.js';

import math from './assets/js/math.js';

//给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。 
Number.prototype.add = function(arg) {
    return math.accAdd(arg, this);
};
//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成计算。 
Number.prototype.sub = function(arg) {
    return math.Subtr(this, arg);
};
//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。 
Number.prototype.mul = function(arg) {
    return math.accMul(arg, this);
};
//给Number类型增加一个div方法，，使用时直接用 .div 即可完成计算。 
Number.prototype.div = function(arg) {
    return math.accDiv(this, arg);
};

router.beforeEach((to, from, next) => {
	if(!util.getCookie('userId') && to.path !== '/login') {
		next({path:'/login'});
	} 
    next();

})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
