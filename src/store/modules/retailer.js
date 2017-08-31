import baseUrl from './baseurl.js';

// 零售商 首页接口
var retailer_path = baseUrl + '/api/retailer/index';
// 零售商 搜索页面接口
var retailer_search_path = baseUrl + '/api/retailer/searchInfo';

// 零售商 购物车添加商品接口地址
var car_path = baseUrl + '/api/retailer/car';
// 零售商 购物车信息接口地址
var add_goods_path = baseUrl + '/api/retailer/add_goods';
// 零售商 购物车删除商品接口地址
var delete_goods_path = baseUrl + '/api/retailer/delete_goods';
// 零售商 购物车更新商品接口地址
var update_goods_path = baseUrl + '/api/retailer/update_goods';

// 零售商 提交订单接口地址
var submit_order_path = baseUrl + '/api/retailer/submit_order';

// 零售商 查看订单接口地址
var order_path = baseUrl + '/api/retailer/order';
// 零售商 操作查看订单接口地址
var order_operation_path = baseUrl + '/api/retailer/order_operation'

// 零售商shop店铺信息接口地址
var shop_info_path = baseUrl + '/api/retailer/shop_info';
// 零售商shop店铺信息接口地址
var get_goods_list_path = baseUrl + '/api/retailer/get_goods_list';
// 零售商 添加商铺到常用接口地址
var shop_add_usual_path = baseUrl + '/api/retailer/shop_add_usual';
// 零售商shop店铺购物车 添加商品接口地址
var shop_add_goods_path = baseUrl + '/api/retailer/shop_add_goods';
// 零售商shop店铺购物车 删除商品接口地址
var shop_delete_goods_path = baseUrl + '/api/retailer/shop_delete_goods';
// 零售商shop店铺购物车 更新商品接口地址
var shop_update_goods_path = baseUrl + '/api/retailer/shop_update_goods';
// 零售商 批发市场接口
var market_path = baseUrl + '/api/retailer/market';
// 零售商 常用店铺接口地址
var regular_shop_path =  '/api/retailer/regular_shop';

export default {
	retailer_path,
	retailer_search_path,
	car_path,
	add_goods_path,
	delete_goods_path,
	update_goods_path,
	submit_order_path,
	order_path,
	order_operation_path,
	shop_info_path,
	get_goods_list_path,
	shop_add_usual_path,
	shop_delete_goods_path,
	shop_add_goods_path,
	shop_update_goods_path,
	market_path,
	regular_shop_path
}
