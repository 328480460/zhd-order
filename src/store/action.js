import axios from 'axios';
import login_path from './modules/login.js';
import retailer from './modules/retailer.js';
import wholesaler from './modules/wholesaler.js'
axios.defaults.withCredentials = true;

export default {
    login({ commit }, value) {
        return axios.post(login_path, value);
    },
    retailer({ commit }, value) {
        return axios.post(retailer.retailer_path, { query: value });
    },
    retailer_search({ commit }, value) {
        return axios.post(retailer.retailer_search_path, { query: value });
    },
    car({ commit }, value) {
        return axios.post(retailer.car_path, value);
    }, 
    add_goods({ commit }, value) {
        return axios.post(retailer.add_goods_path, value);
    }, 
    delete_goods({ commit }, value) {
        return axios.post(retailer.delete_goods_path, value);
    }, 
    updata_goods({ commit }, value) {
        return axios.post(retailer.update_goods_path, value);
    }, 
    submit_order({ commit }, value) {
        return axios.post(retailer.submit_order_path, value);
    },
    order({ commit }, value) {
        return axios.post(retailer.order_path, value);
    },
    order_operation({ commit }, value) {
        return axios.post(retailer.order_operation_path, value);
    },
    shop_info({ commit }, value) {
        return axios.post(retailer.shop_info_path, value);
    },
    get_goods_list({ commit }, value) {
        return axios.post(retailer.get_goods_list_path, value);
    },
    shop_add_usual({ commit }, value) {
        return axios.post(retailer.shop_add_usual_path, value);
    },
    shop_add_goods({ commit }, value) {
        return axios.post(retailer.shop_add_goods_path, value);
    },
    shop_delete_goods({ commit }, value) {
        return axios.post(retailer.shop_delete_goods_path, value);
    },
    shop_update_goods({ commit }, value) {
        return axios.post(retailer.shop_update_goods_path, value);
    },
    market({ commit }, value) {
        return axios.post(retailer.market_path, value);
    },
    wholesaler_order({ commit }, value) {
        return axios.post(wholesaler.order_path, value);
    },
    wholesaler_updata_order({ commit }, value) {
        return axios.post(wholesaler.updata_order_path, value);
    },
    wholesaler_delete_order({ commit }, value) {
        return axios.post(wholesaler.delete_order_path, value);
    },
    wholesaler_index({ commit }, value) {
        return axios.post(wholesaler.index_path, value);
    },
    wholesaler_goods({ commit }, value) {
        return axios.post(wholesaler.goods_path, value);
    },
    wholesaler_goods({ commit }, value) {
        return axios.post(wholesaler.goods_path, value);
    },
    wholesaler_updata_goods({ commit }, value) {
        return axios.post(wholesaler.updata_goods_path, value);
    }
}

