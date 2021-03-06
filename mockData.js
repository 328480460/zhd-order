var wholesaler = {
	'user_id': '123213213',
	'user_name': '涛哥猪肉小铺',
	'shop_id': '123123213',
	'shop_name': '大红门',
	'market_id': '11111',
	'market_name': '水屯批发市场',
	'address': '北京市昌平区XX街XX路1',
	'order_list': [{
		'retailer_id': '12321',
		'retailer_name': '张三零售商',
		'pay_state': '未付款',
		'state': '待配货',
		'pay_way': '货到付款',
		'all_price': '1000',
		'goods_list': [{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'total_price': '200',
			'count': '20',
			'weight': '40',
			'url': ''
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'total_price': '200',
			'count': '20',
			'weight': '40',
			'url': ''
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'total_price': '200',
			'count': '20',
			'weight': '40',
			'url': ''
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'total_price': '200',
			'count': '20',
			'weight': '40',
			'url': ''
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'total_price': '200',
			'count': '20',
			'weight': '40',
			'url': ''
		}]

	}],
	'goods_manger': {
		'length' : 20,
		'goods_list': [{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		},{
			'goods_name': '黄瓜',
			'goods_id': '12321',
			'standard': '斤',
			'price': '1.99',
			'count': '20',
			'url': '',
			'state': 'saleing'
		}]
	}
}
var retailer = {
	'regular_shop' : [{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1103',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': true
	},{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1103',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': true
	},{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1102',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': true
	},{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1101',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': false
	},{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1106',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': false
	},{
		'avata': '',
		'shop_name': 'xxx商铺',
		'shop_id': '1109',
		'type': '蔬菜批发',
		'wholesaler_name': '墨善',
		'allow_order': false
	}],
	
}
module.exports.wholesaler = wholesaler;
module.exports.retailer = retailer;
