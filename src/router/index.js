import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Retailer from '@/components/Modules/Retailer/index.js'
// console.log(Retailer);
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		redirect: '/login',
	}, {
		path: '/login',
		name: 'Login',
		component: Login
	}, {
		path: '/retailer',
		redirect: '/retailer/index',
	}, {
		path: '/retailer/index',
		name: 'Index',
		component: Retailer.Index
	}, {
		path: '/retailer/buycar',
		name: 'Buycar',
		component: Retailer.Buycar
	}, {
		path: '/retailer/market',
		name: 'Market',
		component: Retailer.Market
	}, {
		path: '/retailer/my',
		name: 'My',
		component: Retailer.My
	}, {
		path: '/retailer/regularShop',
		name: 'RegularShop',
		component: Retailer.RegularShop
	}, {
		path: '/retailer/shop',
		name: 'Shop',
		component: Retailer.Shop
	}, {
		path: '/retailer/settlement',
		name: 'Settlement',
		component: Retailer.Settlement
	}, {
		path: '/retailer/order',
		name: 'Order',
		component: Retailer.Order
	}, {
		path: '/retailer/searchbox',
		name: 'SearchBox',
		component: Retailer.SearchBox
	}, {
		path: '/retailer/confirmOrder',
		name: 'ConfirmOrder',
		component: Retailer.ConfirmOrder
	}]
})