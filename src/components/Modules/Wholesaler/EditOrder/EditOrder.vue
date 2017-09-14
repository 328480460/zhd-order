<template>
  <div class="edit-order" v-if='order'>
		<div class="header">
			<div class="content">
				<div class="back" @click.stop='goBack'>
					取消
				</div>
				<div class="title">
					编辑订单
				</div>
				<div class="confirm" @click.stop='confirm'>
					确定
				</div>
			</div>
		</div>
		<div class="order-detail">
			<div class="order-head">
				<div class="retailer-name">{{order.retailer_name}}</div>
				<div class="state">{{order.state}}</div>
			</div>
			<div class="goods-list">
				<div class="goods-item" v-for='goods in order.goodsList'>
					<div class="left">
						<img :src="'http://202.106.219.6:13799/order/' + goods.url">
						<div class="goods-info">
							<div class="goods-name">{{goods.goods_name}}</div>
							<Add_Reduce :goods='goods' @getCount='getCount'></Add_Reduce>
							<div class="price">￥{{goods.price}}</div>
						</div>
					</div>
					<div class="right">
						￥{{goods.total_price}}
					</div>
				</div>
			</div>
			<div class="pay">
				<div class="pay-state">{{order.pay_state}}</div>
				<div class="price">
					<div class="all-price">
						<span class="text">应收款:</span>
						<span class="count">￥{{order.allprice}}</span>
					</div>
					<div class="final-price">
						<span class="text">实收款: </span>
						<span class="count">￥<input type="text" name="finalPrice":value='finalPrice' @input='changePrice' ref='finalPriceInput'></span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import Add_Reduce from '../../../Common/Add_Reduce/Add_Reduce.vue';
import util from '../../../../assets/js/util.js';
export default {
  name: 'editOrder',
  created() {
  	this.order = this.$store.state.wholesaler_order_detail.order;
  	this.finalPrice = this.order.disbursements;

  },
  data () {
    return {
    	origin_order: util.deepCopy(this.$store.state.wholesaler_order_detail.order),
    	order: ''
    }

  },
  methods:{
  	goBack() {
  		this.$store.commit('drop_edit_order', this.origin_order);
  		this.$router.push({path:'/wholesaler/order', query: {option: 'cancle',pay_way: this.$route.query.pay_way,order_state: this.$route.query.order_state}})
  	},
  	getCount(goods) {
  		goods.total_price = goods.price.mul(goods.count);
  		this.$store.commit('updata_order_detail', goods);
  		this.finalPrice = this.order.allPrice;
  		// console.log(this.finalPrice)
  	},
  	confirm() {
  		// 确认修改
  		this.order.disbursements = this.finalPrice;
  		this.$store.dispatch('wholesaler_updata_order', this.order);
  		this.$router.push({path:'/wholesaler/order', query: {option: 'confirm',pay_way: this.$route.query.pay_way,order_state: 'prepared'}})
  	},
  	changePrice() {
  		var input = this.$refs.finalPriceInput;
  		input.value = input.value.replace(/[^\d\.]/g,"");
		input.value = input.value.replace(/^\./g,"");
		input.value = input.value.replace(/\.{2,}/g,".");
	    input.value = input.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	    input.value = input.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
  		
  		this.finalPrice = input.value;
  	}
  },
  components: {
  	Add_Reduce
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	::-webkit-scrollbar{
	    display: none;
	}
	@fs:100rem;
	.edit-order {
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
			align-orders: center;
			font-size: 30/@fs;
			.title {
				font-size: 32/@fs;
				
			}
		}
	}
	.order-detail {
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
				// height: 90/@fs;
				// line-height: 90/@fs;
				padding: 20/@fs 30/@fs;
				display: flex;
				justify-content: space-between;
				align-items:center;
				font-size: 32/@fs;
				color: #989898;
				border-bottom: 1px solid #e0e0e0;
				.price {

					.all-price {
						color: #282828;
						.count {
							color: #f16721;
						}
					}
					.final-price {
						margin-top: 10/@fs;
						color: #282828;
						.count {
							color: #f16721;
							border: 1px solid #f16721;
							input {
								width: 120/@fs;
								outline: none;
								border: none;
								
							}
						}
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
</style>
