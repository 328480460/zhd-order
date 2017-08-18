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

var setCookie = function(c_name, value, expiredays) {　　　　
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
}

var getCookie = function(cName) {
  var cookieString = decodeURI(document.cookie);
  var cookieArray = cookieString.split("; ");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookieNum = cookieArray[i].split("=");
    var cookieName = cookieNum[0];
    var cookieValue = cookieNum[1];

    if (cookieName == cName) {
      return cookieValue;
    }
  }
  return false;
}
var removeCookie = function(key) {
  setCookie(key, '', -1); //这里只需要把Cookie保质期退回一天便可以删除
}
export default {
  deepCopy,
  computedPrice,
  empty_flg,
  setCookie,
  removeCookie,
  getCookie
}
