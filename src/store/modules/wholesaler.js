import baseUrl from './baseurl.js';

//批发商订单管理接口
var order_path = baseUrl + '/api/wholesaler/wholesalerOrder';
// 批发商修改订单接口
var updata_order_path  = baseUrl + '/api/wholesaler/update_order';
// 批发商删除订单接口
var delete_order_path  = baseUrl + '/api/wholesaler/delete_order';
// 批发商首页接口
var index_path = baseUrl + '/api/wholesaler/wholesaler_index';
// 批发商商品管理接口地址
var goods_path =  baseUrl + '/api/wholesaler/goods_index';

// 批发商商品管理,更改商品接口地址
var updata_goods_path =  baseUrl + '/api/wholesaler/updata_goods';

export default {
	order_path,
	updata_order_path,
	delete_order_path,
	index_path,
	goods_path,
	updata_goods_path
}