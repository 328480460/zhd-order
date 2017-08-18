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

	// 生成goods详情
	create_goods_detail(state,goods) {
		state.goods_detail = goods;
	}
}