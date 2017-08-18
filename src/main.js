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
