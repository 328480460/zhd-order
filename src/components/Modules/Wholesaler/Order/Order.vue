<template>
  <div class="order" @click='close_pay_list'>
		<div class="header">
			<div class="content">
				<div class="back">
					<img src="./images/back_icon.png" @click='goBack'>
				</div>
				<div class="title" @click.stop='show_pay_list'>{{pay_way_current.text}}
				<img src="./images/back_icon.png" class="icon">	
				</div>
				<div class="search">
					<img src="./images/search_icon.png">
				</div>
			</div>
			<div class="pay-way" v-show='pay_show'>
				<div class="pay-item" v-for='item in pay_way' @click.stop='change_pay(item)'>{{item.text}}</div>
			</div>
		</div>
		<form  @submit.prevent='serach_order'>
			<div class="search-wrapper">
				<div class="search">
					<img src="./images/icon-search_03.png">
					<input type="search" name="search" placeholder="订单号、零售商账号" v-model='key_word' >
				</div>
			</div>
		</form>
		<div class="state-nav">
			<ul>
				<li v-for="(item,key) in order_state" :key=key  :class="{active: order_state_current == item.state}" @click='change_state(item)'>{{item.text}}</li>
			</ul>
		</div>
		<div class="order-list" ref='order_list' @scroll='scroll'>
			<div class="order-item" v-for='(item, key) in order_compute' :key=key @click='toOrderDetail(item)'>
				<div class="order-head">
					<div class="retailer-name">{{item.retailer_name}}</div>
					<div class="state">{{item.state}}</div>
				</div>
				<div class="goods-list">
					<div class="goods-item" v-for='goods in item.goodsList'>
						<div class="left">
							<img :src="'http://202.106.219.6:13799/order/' + goods.url">
							<div class="goods-info">
								<div class="goods-name">{{goods.goods_name}}</div>
								<div class="count">{{goods.count}}({{goods.standard}})</div>
								<div class="price">￥{{goods.price}}</div>
							</div>
						</div>
						<div class="right">
							￥{{goods.total_price}}
						</div>
					</div>
				</div>
				<div class="pay">
					<div class="pay-state">{{item.pay_state}}</div>
					<div class="all-price">
						<span class="text">应收款:</span>
						<span class="count">￥{{item.allprice}}</span>
						&nbsp;&nbsp;&nbsp;
						<span class="text">实收款:</span>
						<span class="count">￥{{item.disbursements}}</span>
					</div>
				</div>
				<div class="opration">
					<div class="btn" :class='{cancle: btn == "取消订单" }' v-for='btn in item.btnList' @click.stop='opration(btn, item)'>{{btn}}</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'wholesalerorder',
  created() {
  	// console.log('created');
  	this.re_render();
  },
  data () {
    return {
      order_state: [{text:'待配货',state:'wait'},{text: '已配货', state:'prepared'},{text: '已发货', state: 'send'}, {text: '未付款', state: 'nopay'}, {text: '全部', state: 'all'}],
      pay_way: [{text: '全部订单',state: 'all'},{text: '定期结算',state: 'regular'},{text: '在线支付',state: 'online'},{text: '货到付款',state: 'cash'}],
      // pay_way_current:  {text: '全部订单',state: 'all'},
      // order_state_current: 'wait',
      key_word:'',
      isLoading: false,
      finish: false,
      page: 1,
      pay_show: false,
      pfsMap: {
	    '定期结算': {
	        '未付款': {
	            '待配货': ['取消订单', '配货', '结算'],
	            '已配货': ['配货', '结算', '发货'],
	            '已发货': ['结算'],
	            '已收货': ['结算'],
	            '已取消': []
	        },
	        '已付款': {
	            '待配货': ['配货'],
	            '已配货': ['配货', '发货'],
	            '已发货': [],
	            '已收货': [],
	            '已取消': []
	        },
	        '交易关闭':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已取消': []
		     },
	        '交易完成':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已发货': [],
		            '已取消': []
		     }
	    },
	    '在线支付': {
	        '未付款': {
	            '待配货': ['取消订单'],
	            '已配货': [],
	            '已发货': [],
	            '已收货': [],
	            '已取消': []
	        },
	        '已付款': {
	            '待配货': ['配货'],
	            '已配货': ['配货', '发货'],
	            '已发货': [],
	            '已收货': [],
	            '已取消': []
	        },
	        '交易关闭':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已取消': []
		    }
		    ,
	        '交易完成':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已发货': [],
		            '已取消': []
		     }
	    },
	    '货到付款': {
	        '未付款': {
	            '待配货': ['取消订单', '配货', '结算'],
	            '已配货': ['配货', '发货', '结算'],
	            '已发货': ['结算'],
	            '已收货': ['结算'],
	            '已取消': []
	        },
	        '已付款': {
	            '待配货': ['配货'],
	            '已配货': ['配货', '发货'],
	            '已发货': [],
	            '已收货': [],
	            '已取消': []
	        },
	        '交易关闭':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已取消': []
		    }
		    ,
	        '交易完成':{
		        	'待配货': [],
		            '已配货': [],
		            '已收货': [],
		            '已发货': [],
		            '已取消': []
		     }
	    }
	  }
    }

  },
  methods:{
  	goBack() {
  		// this.$router.go(-1);
  		this.$router.push({path:'/wholesaler/index'});
  	},
  	show_pay_list() {
  		this.pay_show = true;
  	},
  	close_pay_list() {
  		if(this.pay_show) {
  			this.pay_show = false;
  		}
  	},
  	change_state(order_state) {
  		this.$refs.order_list.scrollTop = 0;
  		// this.order_state_current = order_state.state;
  		this.$router.push({path:'/wholesaler/order',query: {pay_way:this.pay_way_current.state,order_state:order_state.state}})
  		this.re_render();
  	},
  	change_pay(pay_way){
  		this.$refs.order_list.scrollTop = 0;
  		// this.pay_way_current = pay_way;
  		this.pay_show = false;
  		this.$router.push({path:'/wholesaler/order',query: {pay_way:pay_way.state,order_state:this.order_state_current}})
  		this.re_render();
  	},
  	serach_order() {
  		this.$refs.order_list.scrollTop = 0;
  		this.re_render();
  	},
  	re_render() {
  		this.page = 1;
  		this.finish = false;
  		var limit = {
	  		keyword: this.key_word,
	  		pay_way: this.pay_way_current.state || 'all',
	  		order_state: this.order_state_current || 'wait',
	  		page: this.page
	  	}
  		this.$store.dispatch('wholesaler_order',limit).then((res) => {
	  		// this.order = res.data.data;
	  		this.$store.commit('create_wholesaler_order_list', res.data.data);

	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	opration(btn, order) {
  		if(btn == '配货') {
  			this.$store.commit('edit_order_detail', {order: order,scrollTop: this.$refs.order_list.scrollTop});
  			this.$router.push({path:'/wholesaler/editOrder',query: {pay_way:this.pay_way_current.state,order_state: this.order_state_current}});
  		}
  		if(btn == '发货') {
  			this.$store.dispatch('wholesaler_updata_state', {order:order.order_code,btn: btn}).then((res) => {
  				if(order.pay_way == '货到付款' || order.pay_way == '定期结算') {
  					if(order.pay_state == '已付款') {
  						this.change_state({text: '全部', state: 'all'});
  						return
  					}
  				}
  				this.change_state({text: '已发货', state: 'send'});
  			});
  		}
  		if(btn == '结算' || btn == '取消订单') {
  			this.$store.dispatch('wholesaler_updata_state', {order:order.order_code,btn: btn}).then((res) => {
  				this.change_state({text: '全部', state: 'all'});
  			});
  		}
  	},
  	toOrderDetail(order) {
  		this.$store.commit('edit_order_detail', {order: order,scrollTop: this.$refs.order_list.scrollTop});
  		this.$router.push({path:'/wholesaler/orderDetail',query: {pay_way:this.pay_way_current.state,order_state: this.order_state_current}});
  	},
  	scroll() {
  		var _this = this;
	  	var order_list = _this.$refs.order_list;
	  	var windowH = null;
	  	var last_order = null;
	  	var order_parent = null;
  		if(_this.isLoading) {
  			return;
  		}
  		if(!order_parent) {
  			windowH = order_list.clientHeight; 
  			order_parent = order_list.querySelectorAll('.order-item');
  			last_order = order_parent[order_parent.length - 1];
  		}
  		// console.log(order_list.scrollTop + windowH, windowH, last_order.offsetHeight + last_order.offsetTop, last_order.offsetHeight, last_order.offsetTop)
  		if(order_list.scrollTop + windowH >= last_order.offsetHeight + last_order.offsetTop- 10) {
  			console.log('loading');
  			if(_this.finish) {
	  			_this.$vux.toast.show({
					text: '没有更多数据',
					type: 'text',
					position: 'bottom',
					time:'2000'
				})
	  			return;
	  		}
  			_this.isLoading = true;
  			var limit = {
		  		keyword: _this.key_word,
		  		pay_way: _this.pay_way_current.state,
		  		order_state: _this.order_state_current,
		  		page: ++_this.page
		  	}
  			_this.$store.dispatch('wholesaler_order', limit).then((res) =>{
  				if(res.data.result) {

  					// _this.order = _this.order.concat(res.data.data);
  					_this.$store.commit('updata_wholesaler_order_list', res.data.data)
  					_this.isLoading = false;
					order_parent = null;
					if(res.data.data.length < 10) {
						_this.finish = true;
					}
  				}
  			}).catch((err) =>{
  				alert('Error')
  			})
  		}
	 
  	}
  },
  // 从编辑页面返回时，定位到当前编辑的订单,手动从store重新获取order
  beforeRouteEnter(to, from, next) {
  	if(!from.name) {
  		next();
  		return
  	}
  	if(from.name.indexOf('OrderDetail') > -1 ) {
  		next((vm) => {
  			vm.$refs.order_list.scrollTop = vm.$store.state.wholesaler_order_detail.scrollTop;
  			// 如果操作是从详情中删除该条订单，则更新数据
  			vm.$nextTick(() => {
  				setTimeout(function() {
	  				vm.$data.order = vm.$store.state.wholesaler_order_list;
  				}, 100)
  				
  			})
  		});
  		return
  	} 	
  	if(from.name.indexOf('EditOrder') > -1) {
  		next((vm) => {
  			if(vm.$route.query.option == 'confirm') {
  				vm.$data.order_state_current = vm.$route.query.order_state;

  				vm.$data.pay_way_current = vm.$data.pay_way.filter((value, index) => {
  					return value.state == vm.$route.query.pay_way;
  				})[0]

  				vm.re_render();

  				return
  			}
  			vm.$refs.order_list.scrollTop = vm.$store.state.wholesaler_order_detail.scrollTop;
  			vm.$nextTick(() => {
  				setTimeout(function() {
	  				vm.$data.order = vm.$store.state.wholesaler_order_list;
  				}, 100)
  				
  			})
  		});
  		return
  	}

  	next();
  },
  //  离开order页面时，进入的不是编辑页面，或者不是详情页面 则销毁order实例
  beforeRouteLeave(to, from, next) {
  	if(!/EditOrder/.test(to.name) && !/OrderDetail/.test(to.name)) {
  		this.$destroy();
  		next();
  		return;
  	}
  	next();
  },

  computed: {
  	order_compute() {
  		if(!this.order) {
  			return this.order;
  		}
  		for(var i = 0; i < this.order.length; i++) {
  			var _btnList = this.pfsMap[this.order[i].pay_way][this.order[i].pay_state][this.order[i].state];
  			this.order[i].btnList = _btnList;
  		}
  		return this.order;

  	},
  	order() {
  		return this.$store.state.wholesaler_order_list;
  	},
  	pay_way_current() {
  		var pay_current = this.pay_way.filter((value, index) => {
  			return value.state == this.$route.query.pay_way;
  		})
  		return  pay_current[0];
  	},
  	order_state_current() {
  		return this.$route.query.order_state
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	::-webkit-scrollbar{
	    display: none;
	}
	@fs:100rem;
	.order {
		background-color: #f0f0f0;
		min-height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}
	.header {
		background-color: #f26721;
		padding: 20/@fs 0;
		color: #fff;
		position: relative;
		.content {
			width: 690/@fs;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.back {
				img {
					display: block;
					width: 24/@fs;
				}
			}
			.title {
				font-size: 34/@fs;
				.icon {
					display: inline-block;
					width: 14/@fs;
					transform:rotate(-90deg);
					position: relative;
					top: 2/@fs;
					left: 5/@fs;
				}
				
			}
			.search {
				opacity: 0;
				img {
					display: block;
					width: 44/@fs;
				}
			}
		}
		.pay-way {
			position: absolute;
			// display: none;
			left: 0;
			bottom: 0;
			width: 100%;
			text-align: center;
			background-color: #fff;
			z-index: 999;
			color: #333;
			transform: translateY(100%);
			.pay-item {
				height: 70/@fs;
				line-height: 70/@fs;
				border-bottom: 1px solid #e0e0e0;
			}
			

		}
	}
	.search-wrapper {
		background-color: #fff;
		padding: 20/@fs 0;
		.search {
			width: 690/@fs;
			height: 60/@fs;
			margin: 0 auto;
			line-height: 60/@fs;
			color: #959595;
			font-size: 26/@fs;
			border-radius: 30/@fs;
			background-color: #efefef;
			box-sizing: border-box;
			padding-left: 30/@fs;
			img {
				display: inline-block;
				vertical-align: middle;
				width: 30/@fs;
			}
			input {
				outline: none;
				border:none;
				background-color: transparent;
				display: inline-block;
				vertical-align: middle;
				padding-left: 10/@fs;
				width: 580/@fs;
				height: 100%;

			}
		}
	}
	.state-nav {
		background-color: #fff;
		margin-top: 10/@fs;
		ul {
			font-size: 0;
			height: 88/@fs;
			line-height: 88/@fs;
			li {
				display: inline-block;
				width: 20%;
				color: #282828;
				font-size: 30/@fs;
				text-align: center;
				position: relative;

				&.active:before {
					content: "";
					width: 100/@fs;
					height: 2/@fs;
					background-color: #f26721;
					position: absolute;
					left: 50%;
					margin-left: -50/@fs;
					bottom: 0;
					z-index: 99;
				}
			}
		}
	}
	.order-list {
		position: fixed;
		top: 290/@fs;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		z-index: 1;
		.order-item {
			margin-top: 10/@fs;
			background-color: #fff;
			.order-head {
				display: flex;
				width: 100%;
				box-sizing: border-box;
				padding: 0 30/@fs ;
				justify-content:space-between;
				height: 90/@fs;
				line-height: 90/@fs;
				font-size: 32/@fs;
				border-bottom: 1px solid #e0e0e0;
				.retailer-name {
					color: #282828;
				}
				.state {
					color: #959595;
				}
			}
			.goods-list {
				.goods-item {
					padding: 10/@fs 30/@fs 10/@fs 0;
					margin-left: 30/@fs;
					display: flex;
					justify-content:space-between;
					align-items:center;
					border-bottom: 1px solid #e0e0e0;
					.left {
						img {
							display: inline-block;
							width: 200/@fs;
							vertical-align: middle;
						}
						.goods-info {
							margin-left: 20/@fs;
							display: inline-block;
							vertical-align: middle;
							color: #959595;
							font-size: 30/@fs;
							.price {
								color: #f16721;
							}
						}
					}
					.right {
						font-size: 32/@fs;
						color: #282828;
					}
				}
			}
			.pay {
				height: 90/@fs;
				line-height: 90/@fs;
				padding: 0 30/@fs;
				display: flex;
				justify-content: space-between;
				font-size: 32/@fs;
				color: #989898;
				border-bottom: 1px solid #e0e0e0;
				.all-price {
					color: #282828;
					.count {
						color: #f16721;
					}
				}
			}
			.opration {
				width: 690/@fs;
				margin: 0 auto;
				display: flex;
				justify-content:flex-end;
				padding: 15/@fs 0;
				.btn {
					margin-left: 10/@fs;
					font-size: 30/@fs;
					padding: 10/@fs 20/@fs;
					background-color: rgba(105, 217, 252, 0.96);
					color: #fff;
					border-radius: 4/@fs;
					&.cancle {
						background-color: transparent;
						font-size: 26/@fs;
						color: #999;
					}
				}
			}
		}

	}
</style>
