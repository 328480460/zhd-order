var mockData = require('./mockData.js');
var interface = function(express) {
	var apiRoutes = express.Router();
	var retailer = mockData.retailer;
	var wholesaler = mockData.wholesaler;
	
	// 零售商常用批发商接口
	apiRoutes.post('/retailer/regular_shop', (req, res) => {
		res.json({
			result: true,
			data: retailer.regular_shop
		})
	})

	// market信息接口
	apiRoutes.post('/wholesaler/order', (req, res) => {
		res.json({
			result: true,
			data: wholesaler.order_list
		})
	});

	// 商品管理接口
	apiRoutes.post('/wholesaler/wholesalerGoods', (req, res) => {
		res.json({
			result: true,
			data: wholesaler.goods_manger
		})
	})




	return apiRoutes;
}

module.exports.interface = interface;