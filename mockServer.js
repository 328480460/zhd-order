var mockData = require('./mockData.js');
var interface = function(express) {
	var apiRoutes = express.Router();
	// var retailer = mockData.retailer;
	var wholesaler = mockData.wholesaler;
	// var car = retailer.car_info;
/*	apiRoutes.post('/retailer/index', (req, res) => {
		res.json({
			result: true,
			data: retailer

		})
	});

	// 购物车信息接口
	apiRoutes.post('/retailer/car', (req, res) => {
		var format_car = format_shop_car(car);
		res.json({
			result: true,
			data: format_car

		})
	});

	// 购物车添加商品接口
	apiRoutes.post('/retailer/add_goods', (req, res) => {
		// console.log(req.body);
		var goods = req.body;
		add_shop_car(car, goods);
		res.json({
			result: true,
			data: car

		})
	});

	// 购物车删除商品接口
	apiRoutes.post('/retailer/delete_goods', (req, res) => {
		var goods = req.body;
		delete_shop_car(car, goods)
		var format_car = format_shop_car(car);
		res.json({
			result: true,
			data: format_car

		})
	});

	// 购物车更新商品数量接口
	apiRoutes.post('/retailer/updata_goods', (req, res) => {
		var goods = req.body.goods;
		updata_shop_car_count(car, goods);
		var format_car = format_shop_car(car);
		res.json({
			result: true,
			data: format_car

		})
	});

	// shop店铺接口
	apiRoutes.post('/retailer/shop_info', (req, res) => {
		// 从总购物车中查出当前商铺拥有的商品
		if(car[retailer.shop_info.shop_id]) {
			retailer.shop_info.shop_car = car[retailer.shop_info.shop_id];
		}

		res.json({
			result: true,
			data: retailer.shop_info

		})
	});

	// shop店铺购物车 增加商品接口
	apiRoutes.post('/retailer/shop_add_goods', (req, res) => {
		var goods = req.body.goods_info;
		add_shop_car(car, goods);

		// 从总购物车中查出当前商铺拥有的商品
		if(car[retailer.shop_info.shop_id]) {
			retailer.shop_info.shop_car = car[retailer.shop_info.shop_id];
		} else {
			retailer.shop_info.shop_car = [];
		}

		res.json({
			result: true,
			data: retailer.shop_info

		})
	});

	// shop店铺购物车 删除商品接口
	apiRoutes.post('/retailer/shop_delete_goods', (req, res) => {
		if(Array.isArray(req.body.goods_info)) {
			var goodsList = req.body.goods_info;
			delete_shop_car_multi(car, goodsList)
		} else {
			var goods = req.body.goods_info;
			delete_shop_car(car, goods);
		}


		// 从总购物车中查出当前商铺拥有的商品
		if(car[retailer.shop_info.shop_id]) {
			retailer.shop_info.shop_car = car[retailer.shop_info.shop_id];
		} else {
			retailer.shop_info.shop_car = [];
		}

		res.json({
			result: true,
			data: retailer.shop_info

		})
	});

	// shop店铺购物车 更新商品数量接口
	apiRoutes.post('/retailer/shop_updata_goods', (req, res) => {
		var goods = req.body.goods_info;
		updata_shop_car_count(car, goods);

		// 从总购物车中查出当前商铺拥有的商品
		if(car[retailer.shop_info.shop_id]) {
			retailer.shop_info.shop_car = car[retailer.shop_info.shop_id];
		} else {
			retailer.shop_info.shop_car = [];
		}

		res.json({
			result: true,
			data: retailer.shop_info

		})
	});

	// market信息接口
	apiRoutes.post('/retailer/market', (req, res) => {
		res.json({
			result: true,
			data: retailer.market_info
		})
	});*/

	// market信息接口
	apiRoutes.post('/wholesaler/order', (req, res) => {
		res.json({
			result: true,
			data: wholesaler.order_list
		})
	});




	return apiRoutes;
}


/*// 向购物车中添加单个商品
function add_shop_car(car, goods) {
	var _goods = goods;
	if (!car[goods.shop_id]) {
		car[goods.shop_id] = [];
		car[goods.shop_id].push(_goods);
	} else {
		for (var i = 0; i < car[goods.shop_id].length; i++) {
			if (goods.goods_id == car[goods.shop_id][i].goods_id) {
				car[goods.shop_id][i].count += _goods.count;
				return
			}
		}
		car[goods.shop_id].push(_goods);
	}
}

function format_shop_car(data) {
	var _data = data;
	var _formatData = {}
	for (var i in _data) {
		_formatData[i] = {};
		_formatData[i].goodsList = _data[i];
		_formatData[i].isChecked = true;
	}
	return _formatData;
}

// 删除购物车中的单个商品
function delete_shop_car(car, goods) {
	var _goods = goods;
	var key = _goods.shop_id;
	var shop = car[key];
	var _index = 0;
	for (var i = 0; i < shop.length; i++) {
		if (shop[i].goods_id == _goods.goods_id) {
			_index = i;
		}
	}
	car[key].splice(_index, 1);

}

// 删除购物车中的多个商品
function delete_shop_car_multi(car, goodsList) {
	var key = goodsList[0].shop_id;
	console.log(car)
	delete car[key];
	console.log(car)
}



// 更新购物车商品数量
function updata_shop_car_count(car, goods) {
	var _goods = goods;
	var key = _goods.shop_id;
	car[key].forEach(function(value, index) {
		if (value.goods_id == _goods.goods_id) {
			console.log(value.goods_id, goods.goods_id);
			value.count = _goods.count;
		}
	});
}*/


module.exports.interface = interface;