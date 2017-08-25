import baseUrl from './baseurl.js';

//批发商订单管理接口
var order_path = baseUrl + '/api/wholesaler/wholesalerOrder';
// 批发商修改订单接口
var updata_order_path  = baseUrl + '/api/wholesaler/update_order';
// 批发商删除订单接口
var delete_order_path  = baseUrl + '/api/wholesaler/delete_order';

export default {
	order_path,
	updata_order_path,
	delete_order_path
}