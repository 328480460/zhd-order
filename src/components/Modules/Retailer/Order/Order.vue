<template>
  <div class="order">
		<div class="header">
			<div class="content">
				<div class="back">
					<img src="./images/back_icon.png" @click='goBack'>
				</div>
				<div class="title">我的订单</div>
				<div class="search">
					<img src="./images/search_icon.png">
				</div>
			</div>
		</div>
		<div class="state-nav">
			<ul>
				<li v-for="(item,key) in state" :key=key @click="reRouter(item.limit)" :class="{active: current == item.limit}">{{item.text}}</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="order-list">
			<ul>
				<li v-for="(item,key) in order_compute" :key=key>
					<div class="order-header">
						<div class="shop-name" @click='goShop(item)'>{{item.shop_name}} &gt;</div>
						<div class="state" :class={}>{{item.state}}</div>
					</div>
					<div class="goods-info">
						<ul v-if="item.goodsList.length > 4">
							<li v-for="n in 4" :key=key>
								<img src="./images/goods_03.png">
								<!-- <img :src="item.goodsList[n].url"> -->
							</li>
							<li> ▪ ▪ ▪ </li>
						</ul>
						<ul v-else>
							<li v-for="(good, key) in item.goodsList" :key=key>
								<img src="./images/goods_07.png">
								<!-- <img :src="good.url"> -->
							</li>
						</ul>
						<div class="allPrice">
							￥{{item.allPrice}}
						</div>
					</div>
					<div class="order-footer">
						<div class="pay-state">{{item.pay_state}}</div>
						<ul class="optionList">
							<li v-for='(btnText,key) in item.btnList' :key=key @click='btnOption(btnText,item)' :class="{cancle: btnText == '取消订单'}">
								{{btnText}}
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
export default {
  name: 'order',
  created() {
  	this.render();
  },
  data () {
    return {
      order: '',
      current: 'all',
      state:[{text:'全部',limit:'all'},{text:'待付款',limit:'noPay'},{text:'已付款',limit:'pay'},{text:'已发货',limit:'send'}],
      llsMap: {
		    '定期结算': {
		        '未付款': {
		            '待配货': ['取消订单', '立即付款', '再次购买'],
		            '已配货': ['立即付款', '再次购买'],
		            '已发货': ['立即付款', '确认收货','再次购买'],
		            '已收货': ['立即付款', '再次购买'],
		            '已取消': ['再次购买', '删除']
		        },
		        '已付款': {
		            '待配货': ['取消订单', '再次购买'],
		            '已配货': ['再次购买'],
		            '已发货': ['确认收货','再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买']
		        },
		        '交易关闭':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        },
		        '交易完成':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        }
		    },
		    '在线支付': {
		        '未付款': {
		            '待配货': ['取消订单', '立即付款'],
		            '已配货': ['立即付款', '再次购买'],
		            '已发货': ['立即付款', '确认收货','再次购买'],
		            '已收货': ['立即付款', '再次购买'],
		            '已取消': ['再次购买','删除']
		        },
		        '已付款': {
		            '待配货': ['取消订单', '再次购买'],
		            '已配货': ['再次购买'],
		            '已发货': ['确认收货','再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买']
		        },
		        '交易关闭':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        },
		         '交易完成':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        }
		    },
		    '货到付款': {
		        '未付款': {
		            '待配货': ['立即付款', '再次购买'],
		            '已配货': ['立即付款', '再次购买'],
		            '已发货': ['立即付款', '再次购买'],
		            '已收货': ['立即付款', '再次购买'],
		            '已取消': ['再次购买','删除']
		        },
		        '已付款': {
		            '待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已发货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买']
		        },
		        '交易关闭':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        },
		         '交易完成':{
		        	'待配货': ['再次购买'],
		            '已配货': ['再次购买'],
		            '已收货': ['再次购买'],
		            '已取消': ['再次购买','删除']
		        }
		    }

		}
    }
  },
  methods:{
  	goBack() {
  		this.$router.push({path: '/retailer/my'})
  	},
  	reRouter(keyWord) {
  		this.$router.replace({path:'/retailer/order', query: { limit: keyWord }});
  		this.render();
  	},
  	render() {
  		var query = this.$route.query;
	  	this.$store.dispatch('order',query).then((res) => {
	  		this.order = res.data.data;
		  	this.current = query.limit;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	btnOption(text,order) {

  		this.$store.dispatch('order_operation',{operation:text,limit:this.current,order_id:order.order_id,order_code:order.order_code}).then((res) => {
  			if(text == '再次购买') {
  				this.$router.push({path:'/retailer/buycar'})
  			}
	  		this.order = res.data.data;

	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	goShop(orderInfo) {
  		this.$router.push({path:'/retailer/shop',query:{shop_id: orderInfo.shop_id}})
  	}
  },
  computed: {
  	order_compute() {
  		if(!this.order) {
  			return this.order;
  		}
  		var _this = this;
  		for (var i = 0; i < _this.order.length; i++) {
  			var _btnList = _this.llsMap[_this.order[i].pay_way][_this.order[i].pay_state][_this.order[i].state];
  			_this.order[i].btnList = _btnList;
  		}
  		return this.order;

  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	.order {
		background-color: #f5f5f5;
	}
	.header {
		background-color: #f26721;
		padding: 20/@fs 0;
		color: #fff;
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
			}
			.search {
				img {
					display: block;
					width: 44/@fs;
				}
			}
		}
	}
	.state-nav {
		background-color: #fff;
		ul {
			font-size: 0;
			height: 88/@fs;
			line-height: 88/@fs;
			li {
				display: inline-block;
				width: 25%;
				color: #282828;
				font-size: 30/@fs;
				text-align: center;
				position: relative;
				&:after {
					content: '';
					width: 2/@fs;
					height: 50/@fs;
					background-color: #eee;
					position: absolute;
					right: 0;
					top: 20/@fs;
				}
				&:last-child:after {
					display: none;
				}
				&.active:before {
					content: "";
					width: 80/@fs;
					height: 2/@fs;
					background-color: #f26721;
					position: absolute;
					left: 50%;
					margin-left: -40/@fs;
					bottom: 0;
				}
			}
		}
	}
	.order-list {
		>ul {
			>li {
				background-color: #fff;
				margin-top: 10/@fs;
				.order-header {
					width: 690/@fs;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					color: #282828;
					font-size: 32/@fs;
					height: 86/@fs;
					line-height: 86/@fs;
					border-bottom: 1px solid #eee;
				}
				.goods-info {
					width: 690/@fs;
					margin: 0 auto;
					display: flex;
					justify-content:space-between;
					align-items:center;
					padding: 20/@fs 0;
					border-bottom: 1px solid #eee;
					ul {
						font-size: 0;
						li {
							
							display: inline-block;
							vertical-align: middle;
							width: 98/@fs;
							margin-right: 10/@fs;
							font-size: 12/@fs;
							color: #979797;
							img {
								display: inline-block;
								width: 100%;
							}
						}
					}
					.allPrice {
						color: #979797;
						font-size: 32/@fs;
						flex: 0 0 auto;
					}
				}
				.order-footer {
					width: 690/@fs;
					margin: 0 auto;
					color: #656565;
					font-size: 32/@fs;
					display: flex;
					justify-content:space-between;
					padding: 15/@fs 0;
					align-items:center;
					.optionList {
						>li {
							display: inline-block;
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
		}
	}
</style>
