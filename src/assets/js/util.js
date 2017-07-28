var deepCopy = function(source) {
	var result = {};
	for (var key in source) {
		result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
	}
	return result;
}

// 计算总价
var computedPrice = function(goodsList) {
	var allPrice = 0;
	for (var i in goodsList) {
		goodsList[i].forEach(function(value, index) {
			if (value.isChecked) {
				allPrice += value.price * value.count;
			}
		})
	}
	// console.log(Math.floor(allPrice * 100) / 100)
	return Math.floor(allPrice * 100) / 100;
}

// 购物车空判断
var empty_flg = function(goodsList) {
	var flag = true;
	for (var i in goodsList) {
		goodsList[i].forEach(function(value, index) {
			if (value.length !== 0) {
				flag = false;
				return
			}
		})
	}
	return flag;
}
export default {
	deepCopy,
	computedPrice,
	empty_flg
}