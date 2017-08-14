import axios from 'axios';
// 零售商 首页接口
var retailer_path = 'http://192.168.0.14:9999/order/api/retailer/index';
// 零售商 搜索页面接口
var retailer_search_path = 'http://192.168.0.14:9999/order/api/retailer/searchInfo';

// 零售商 购物车添加商品接口地址
var car_path = 'http://192.168.0.14:9999/order/api/retailer/car';
// 零售商 购物车信息接口地址
var add_goods_path = 'http://192.168.0.14:9999/order/api/retailer/add_goods';
// 零售商 购物车删除商品接口地址
var delete_goods_path = 'http://192.168.0.14:9999/order/api/retailer/delete_goods';
// 零售商 购物车更新商品接口地址
var update_goods_path = 'http://192.168.0.14:9999/order/api/retailer/update_goods';

// 零售商 提交订单接口地址
var submit_order_path = 'http://192.168.0.14:9999/order/api/retailer/submit_order';

// 零售商 查看订单接口地址
var order_path = 'http://192.168.0.14:9999/order/api/retailer/order';
// 零售商 操作查看订单接口地址
var order_operation_path = 'http://192.168.0.14:9999/order/api/retailer/order_operation'

// 零售商shop店铺信息接口地址
var shop_info_path = 'http://192.168.0.14:9999/order/api/retailer/shop_info';
// 零售商shop店铺信息接口地址
var get_goods_list_path = 'http://192.168.0.14:9999/order/api/retailer/get_goods_list';
// 零售商 添加商铺到常用接口地址
var shop_add_usual_path = 'http://192.168.0.14:9999/order/api/retailer/shop_add_usual';
// 零售商shop店铺购物车 添加商品接口地址
var shop_add_goods_path = 'http://192.168.0.14:9999/order/api/retailer/shop_add_goods';
// 零售商shop店铺购物车 删除商品接口地址
var shop_delete_goods_path = 'http://192.168.0.14:9999/order/api/retailer/shop_delete_goods';
// 零售商shop店铺购物车 更新商品接口地址
var shop_update_goods_path = 'http://192.168.0.14:9999/order/api/retailer/shop_update_goods';

// 登录接口
var login_path ='http://192.168.0.14:9999/order/loginApi/login';

axios.defaults.withCredentials = true;
export default {
    retailer({ commit }, value) {
        return axios.post(retailer_path, { query: value });
    },
    retailer_search({ commit }, value) {
        return axios.post(retailer_search_path, { query: value });
    },
    car({ commit }, value) {
        return axios.post(car_path, value);
    }, 
    add_goods({ commit }, value) {
        return axios.post(add_goods_path, value);
    }, 
    delete_goods({ commit }, value) {
        return axios.post(delete_goods_path, value);
    }, 
    updata_goods({ commit }, value) {
        return axios.post(update_goods_path, value);
    }, 
    submit_order({ commit }, value) {
        return axios.post(submit_order_path, value);
    },
    order({ commit }, value) {
        return axios.post(order_path, value);
    },
    order_operation({ commit }, value) {
        return axios.post(order_operation_path, value);
    },
    shop_info({ commit }, value) {
        return axios.post(shop_info_path, value);
    },
    get_goods_list({ commit }, value) {
        return axios.post(get_goods_list_path, value);
    },
    shop_add_usual({ commit }, value) {
        return axios.post(shop_add_usual_path, value);
    },
    shop_add_goods({ commit }, value) {
        return axios.post(shop_add_goods_path, value);
    },
    shop_delete_goods({ commit }, value) {
        return axios.post(shop_delete_goods_path, value);
    },
    shop_update_goods({ commit }, value) {
        return axios.post(shop_update_goods_path, value);
    },
    login({ commit }, value) {
        return axios.post(login_path, {params:value});
    }
}
