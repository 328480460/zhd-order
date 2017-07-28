import util from '../assets/js/util.js';
export default {
		// 向购物车中添加单个商品
		add_shop_car(state, goods) {
			var _goods = util.deepCopy(goods);
			if (!state.shop_car[goods.shop_id]) {
				state.shop_car[goods.shop_id] = [];
				state.shop_car[goods.shop_id].push(_goods);
			} else {
				for (var i = 0; i < state.shop_car[goods.shop_id].length; i++) {
					if (goods.goods_id == state.shop_car[goods.shop_id][i].goods_id) {
						state.shop_car[goods.shop_id][i].count += _goods.count;
						return
					}
				}
				state.shop_car[goods.shop_id].push(_goods);
			}

			state.shop_car_all_price = util.computedPrice(state.shop_car);
			state.empty_flg = util.empty_flg(state.shop_car);

		},

		// 向购物车中添加多个商品
		add_shop_car_multi(state, obj) {
			for(var i in obj) {
				obj[i].forEach(function(value, inde) {
					if(!state.shop_car[i]) {
						state.shop_car[i] = []
						state.shop_car[i].push(value);
					} else {
						state.shop_car[i].push(value);
					}
				})
			}
			state.shop_car_all_price = util.computedPrice(state.shop_car);
			state.empty_flg = util.empty_flg(state.shop_car);

		},

		// 删除购物车中的单个商品
		delete_shop_car(state, info) {
			var key = info[0];
			var _goods = util.deepCopy(info[1]);
			var shop = state.shop_car[key];
			var _index = 0;
			for (var i = 0; i < shop.length; i++) {
				if (shop[i].goods_id == _goods.goods_id) {
					_index = i;
				}
			}
			state.shop_car[key].splice(_index, 1);
			state.shop_car_all_price = util.computedPrice(state.shop_car);
			state.empty_flg = util.empty_flg(state.shop_car);

		},

		// 删除购物车中的多个商品
		delete_shop_car_multi(state, obj) {
			console.log(obj);
			for (var i in obj) {
				for(var j = 0; j < obj[i].length; j++ ) {
					state.shop_car[i].forEach(function(value, index){
						if(value.goods_id == obj[i][j].goods_id) {
							state.shop_car[i].splice(index, 1);
						}
					})
				}
			}
			state.shop_car_all_price = util.computedPrice(state.shop_car);
			state.empty_flg = util.empty_flg(state.shop_car);
		},

		// 更新购物车商品数量
		updata_shop_car_count(state, obj) {
			var _goods = obj; //util.deepCopy(obj);
			var key = _goods.shop_id;
			var goodsArr = state.shop_car[key];
			goodsArr.forEach(function(value, index) {
				if (value.goods_id == _goods.goods_id) {
					goodsArr.count = _goods.count;
				}
			});
			state.shop_car_all_price = util.computedPrice(state.shop_car);
		},

		// 更新购物车商品单个选中状态
		updata_check_state(state, obj) {
			var _goods = util.deepCopy(obj);
			var key = _goods.shop_id;
			var goodsArr = state.shop_car[key];
			goodsArr.forEach(function(value, index) {
				if (value.goods_id == _goods.goods_id) {
					goodsArr.isChecked = _goods.isChecked;
				}
			});
			state.shop_car_all_price = util.computedPrice(state.shop_car);
		},

		// 更新购物车商品多个选中状态
		updata_check_state_multi(state, obj) {
			var goods_list = obj;
			for (var i = 0; i < goods_list.length; i++) {
				if (!goods_list[i].isChecked) {
					goods_list.forEach(function(value, index) {
						value.isChecked = true;
					})
					state.shop_car_all_price = util.computedPrice(state.shop_car);
					return;
				}
			}
			goods_list.forEach(function(value, index) {
				value.isChecked = false;
			})
			state.shop_car_all_price = util.computedPrice(state.shop_car);
		},

		// 更新购物车商品全选状态
		updata_check_state_all(state) {
			var shopList = state.shop_car;
			for (var i in shopList) {
				for (var j = 0; j < shopList[i].length; j++) {
					if (!shopList[i][j].isChecked) {
						console.log('选中操作');
						for (var i in shopList) {
							shopList[i].forEach(function(value, index) {
								value.isChecked = true;
							})
						}
						state.shop_car_all_price = util.computedPrice(state.shop_car);
						return
					}
				}
			}
			for (var i in shopList) {
				shopList[i].forEach(function(value, index) {
					value.isChecked = false;
				})
			}
			state.shop_car_all_price = util.computedPrice(state.shop_car);
			console.log('取消操作')
		},

		// 生成当前订单
		create_current_order(state,obj) {
			state.current_order = obj;
		}

}