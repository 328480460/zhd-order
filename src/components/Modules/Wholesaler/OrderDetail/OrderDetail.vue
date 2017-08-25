<template>
  <div class="order-detail" >
		<div class="header">
			<div class="content">
				<div class="back" @click.stop='goBack'>
					<img src="./images/back_icon.png" >
				</div>
				<div class="title">
					{{order.shop_name}}
				</div>
				<div class="confirm" >
					确定
				</div>
			</div>
		</div>
		<div class="state">
			<div class="state-top">
				<div class="goods-state">{{order.state}}</div>
				<div class="pay-state">{{order.pay_state}}</div>
			</div> 
			<div class="state-bottom">
				<div class="delete" @click='delete_order' v-if='order.pay_state == "交易关闭"'><i class="icon-delete font" ></i></div>
				<div class="time">{{order.order_time}}</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="retailer-info">
			<div class="retailer-name">零售商姓名: {{order.retailer_name}}</div>
			<div class="address">收货地址:
				<div class="address-info">	{{order.address}}</div> 
			</div>
		</div>
		<div class="line"></div>
		<div class="goods-info">
			<div class="title">商品清单</div>
			<div class="goods-list">
				<div class="goods-item" v-for='(goods, index) in order.goodsList' v-if='index < showCount'>
					<div class="left">
						<img src="./images/goods_03.png">
						<div class="info">
							<div class="name">{{goods.goods_name}}</div>
							<div class="count">数量: {{goods.count}}</div>
							<div class="standard">规格: {{goods.standard}}</div>
						</div>
					</div>
					<div class="right">
						￥ {{goods.total_price}}
					</div>
				</div>
			</div>
			<div class="show-more" v-if='showMore' @click='show_more'>查看更多</div>
			<div class="show-more" v-else @click='close_more'>收起更多</div>
		</div>
		<div class="line"></div>
		<div class="order-info">
			<div class="title">订单信息</div>
			<div class="content">
				<div class="time">
					下单时间: {{order.order_time}}
				</div>
				<div class="pay-way">
					支付方式: {{order.pay_way}}
				</div>
				<div class="send-way">
					配送方式: {{order.send_way}}
				</div>
				<div class="order-code">
					订单号码: {{order.order_code}}
				</div>
				<div class="order-remark">
					订单备注: {{order.remark}}
				</div>
				<div class="send-time">
					送货时间: {{order.shipping_time}}
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  created() {
  	this.order = this.$store.state.wholesaler_order_detail.order;
  },
  data () {
    return {
    	showMore: true,
    	showCount: 2
    }

  },
  methods:{
  	goBack() {
  		this.$router.go(-1);
  	},
  	show_more() {
  		this.showCount = this.order.goodsList.length ;
  		this.showMore = false;
  	},
  	close_more() {
  		this.showCount = 2 ;
  		this.showMore = true;
  	},
  	delete_order() {
  		this.$store.commit('delete_order_detail');
  		this.$store.dispatch('wholesaler_delete_order', this.order);
  		this.$router.go(-1);
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
	.line {
		width: 100%;
		height: 10/@fs;
		background-color: #f0f0f0; 
	}
	.order-detail {
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
			align-orders: center;
			font-size: 30/@fs;
			.back {
				img {
					display: block;
					width: 24/@fs;
				}
			}
			.title {
				font-size: 32/@fs;
				
			}
			.confirm {
				opacity: 0;
			}
		}
	}
	.state {
		width: 100%;
		box-sizing: border-box;
		padding: 26/@fs 30/@fs;
		background-color: #fff;
		.state-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #959595;
			font-size: 30/@fs;
			.goods-state {
				color: #282828;
				font-size: 32/@fs;
			}
		}
		.state-bottom {
			.state-top;
			margin-top: 20/@fs;
			.delete {
				width: 60/@fs;
				height: 60/@fs;
				border-radius: 100%;
				background-color: #f26721;
				text-align: center;
				line-height: 64/@fs;
				.icon-delete {
					font-size: 36/@fs;
				}
				.icon-delete:before {
					color: #fff;
				}
			}
		}
	}
	.retailer-info {
		margin-top: 10/@fs;
		width: 100%;
		padding: 20/@fs 30/@fs 24/@fs;
		box-sizing: border-box;
		color: #989898;
		font-size: 30/@fs;
		background-color: #fff;
		.address {
			.address-info {
				display: inline-block;
				width: 550/@fs;
				vertical-align: top;
			}
		}
	}
	.goods-info {
		margin-top: 10/@fs;
		box-sizing: border-box;
		padding-left: 30/@fs;
		background-color: #fff;
		.title {
			height: 90/@fs;
			line-height: 90/@fs;
			color: #282828;
			font-size: 32/@fs;
			border-bottom: 1px solid #e0e0e0;

		}
		.goods-list {
			.goods-item {
				box-sizing: border-box;
				padding: 10/@fs 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #e0e0e0;
				
				.left {
					img {
						width: 200/@fs;
						height: 150/@fs;
						display: inline-block;
						vertical-align: middle;
					}
					.info {
						display: inline-block;
						vertical-align: middle;
						color: #959595;
						font-size: 30/@fs;
					}
				}
				.right {
					margin-right: 30/@fs;
					color: #959595;
					font-size: 30/@fs;
				}
			}
		}
		.show-more {
			color: #f16721;
			height: 90/@fs;
			line-height: 90/@fs;
			width: 100%;
			text-align: center;
			font-size: 30/@fs;
		}
	}
	.order-info {
		margin-top: 10/@fs;
		background-color: #fff;
		box-sizing: border-box;
		padding-left: 30/@fs;
		.title {
			height: 90/@fs;
			line-height: 90/@fs;
			color: #282828;
			font-size: 32/@fs;
			border-bottom: 1px solid #e0e0e0;

		}
		.content {
			padding: 30/@fs 0;
			color: #959595;
			font-size: 30/@fs;
			line-height: 1.6;
		}
	}
</style>
