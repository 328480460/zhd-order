<template>
  <div class="order">
		<div class="header">
			<div class="content">
				<div class="back">
					<img src="./images/back_icon.png" @click='goBack'>
				</div>
				<div class="title">订单管理</div>
				<div class="search">
					<img src="./images/search_icon.png">
				</div>
			</div>
		</div>
		<form >
			<div class="search-wrapper">
				<div class="search">
					<img src="./images/icon-search_03.png">
					<input type="search" name="search" placeholder="订单号、零售商账号" v-model='key_word'>
				</div>
			</div>
		</form>
		<div class="state-nav">
			<ul>
				<li v-for="(item,key) in order_state" :key=key  :class="{active: order_state_current == item.state}">{{item.text}}</li>
			</ul>
		</div>
		<div class="order-list" ref='order_list'>
			<div class="order-item" v-for='(item, key) in order' :key=key >
				<div class="order-head">
					<div class="retailer-name">{{item.retailer_name}}</div>
					<div class="state">{{item.state}}</div>
				</div>
				<div class="goods-list">
					<div class="goods-item" v-for='goods in item.goods_list'>
						<div class="left">
							<img src="./images/goods_03.png">
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
						<span class="count">￥{{item.all_price}}</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'order',
  created() {
  	this.render();
  },
  mounted() {
  	var order_list = this.$refs.order_list;
  	order_list.addEventListener('scroll',function() {
  		console.log(this.scrollTop)
  	},false)
  },
  data () {
    return {
      order: '',
      order_state: [{text:'待配货',state:'wait'},{text: '已配货', state:'prepared'},{text: '已发货', state: 'send'}, {text: '未付款', state: 'nopay'}, {text: '全部', state: 'all'}],
      pay_way: [{text: '全部',state: 'all'},{text: '定期结算',state: 'regular'},{text: '在线支付',state: 'online'},{text: '货到付款',state: 'cash'}],
      pay_way_current: 'all',
      order_state_current: 'wait',
      key_word:'',
    }

  },
  methods:{
  	goBack() {
  		this.$router.go(-1);
  	},
  	reRouter(keyWord) {
  		// this.$router.replace({path:'/retailer/order', query: { limit: keyWord }});
  		this.render();
  	},
  	render() {
  		var query = this.$route.query;
	  	this.$store.dispatch('wholesaler_order',query).then((res) => {
	  		this.order = res.data.data;
		  	this.current = query.limit;
		  	console.log(this.order);
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	btnOption(text,order) {

  		this.$store.dispatch('order_operation',{operation:text,limit:this.current,order_id:order.order_id,order_code:order.order_code}).then((res) => {
  			if(text == '再次购买') {
  				this.$router.push({path:'/retailer/buycar'})
  			}
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	}
  },
  computed: {
  	order_compute() {
  		
  		return this.order;

  	}
  },
  components: {}
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
				opacity: 0;
				img {
					display: block;
					width: 44/@fs;
				}
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
		}

	}
</style>
