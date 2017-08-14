export default {
	
	// 生成当前订单
	create_current_order(state,obj) {
		state.current_order = obj;
	},

	// 清空当前订单
	clear_current_order(state) {
		state.current_order = null;
	}

}