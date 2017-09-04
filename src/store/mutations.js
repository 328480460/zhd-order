export default {
	// 更新登录状态
	updata_login_status(state, status) {
		state.isLogin = status;
	},

	// 生成当前订单
	create_current_order(state,obj) {
		state.current_order = obj;
	},

	// 清空当前订单
	clear_current_order(state) {
		state.current_order = null;
	},

	// 批发商查看订单详情
	retailer_order_detail(state,obj) {
		state.retailer_order_detail = obj;
	},

	// 生成goods详情
	create_goods_detail(state,goods) {
		state.goods_detail = goods;
	},

	// 生成shop详情
	create_shop_detail(state,shop) {
		state.shop_detail = shop;
	},

	// 生成批发商order 
	create_wholesaler_order_list(state,orderList) {
		state.wholesaler_order_list = orderList;
	},

	// 更新批发商订单数量
	updata_wholesaler_order_list(state,orderList) {
		state.wholesaler_order_list = state.wholesaler_order_list.concat(orderList);
	},

	// 批发商编辑订单 
	edit_order_detail(state, obj) {
		state.wholesaler_order_detail = {};
		state.wholesaler_order_detail.scrollTop = obj.scrollTop;
		state.wholesaler_order_list.forEach((value, index) => {
			if(value.order_id == obj.order.order_id) {
				state.wholesaler_order_detail.order = value;
			}
		})
	},

	// 放弃本次编辑
	drop_edit_order(state, origin_order) {
		state.wholesaler_order_list.forEach((value, index) => {
			if(value.order_id == origin_order.order_id) {
				// 重置当前订单数据为初始化数据
				value.allPrice = origin_order.allPrice;
				value.goodsList.forEach((val, idx) => {
					val.count = origin_order.goodsList[idx].count;
					val.total_price = origin_order.goodsList[idx].total_price;
				})
			}
		})
	},

	//批发商更改订单商品数量
	updata_order_detail(state, goods) {
		var _goodsList = state.wholesaler_order_detail.order.goodsList;
		var _allPrice = 0;
		_goodsList.forEach((value, index) => {
			_allPrice += value.total_price;
		})
		state.wholesaler_order_detail.order.allPrice = _allPrice;
	},

	// 删除订单详情
	delete_order_detail(state) {
		var idx = state.wholesaler_order_list.indexOf(state.wholesaler_order_detail.order);
		state.wholesaler_order_list.splice(idx, 1);
		
	}

}