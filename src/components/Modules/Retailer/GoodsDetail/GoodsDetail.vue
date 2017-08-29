<template>
  <div class="goods-detail">
   	<div class="header">
		<div class="content">
			<div class="back">
				<img src="./images/back_icon.png" @click='back'>
			</div>
			<div class="title">商品页详情</div>
			<div class="shop" @click='goShop'>
				商铺
			</div>
		</div>
	</div>
	<div class="goods-banner">
		<img :src="'http://202.106.219.6:13799/order/' + goods_detail.url">
	</div>
	<div class="goods-info">
		<div class="content">
			<div class="left">
				<div class="name">{{goods_detail.goods_name}}</div>
				<div class="price">￥{{goods_detail.price}}</div>
			</div>
			<div class="right">
				<div class="top">
					<div class="standard">规格：{{goods_detail.standard}}</div>
					<div class="stock">库存：{{goods_detail.stock}}</div>
				</div>
				<div class="bottom">
					<div class="add-reduce">
						<Add_Reduce  :goods='goods_detail'></Add_Reduce>
					</div>
					<div class="add-car" @click.stop='add_car(goods_detail, $event)'>
						<i class="icon-buycar" ></i>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="market">
		<div class="content">
			<span class="market-name">{{goods_detail.market_name}}</span>
			<img src="./images/icon_right_arrow_03.png">
		</div>
	</div>
	<div class="arguments">
		<div class="title">
			规格参数
		</div>
		<table>
			<tr>
				<td>品名</td>
				<td>{{goods_detail.goods_name}}</td>
			</tr>
			<tr>
				<td>规格</td>
				<td>{{goods_detail.standard}}</td>
			</tr>
			<tr>
				<td>产地</td>
				<td>{{goods_detail.area_name}}</td>
			</tr>
		</table>
	</div>
	<div class="description">
		<div class="title">商品详情</div>
		<div class="text">
			{{goods_detail.goods_detailed}}
		</div>
	</div>
   	<CarCtrl :shop_car='shop_car' @getCount='getCount' @deleteGoods='deleteGoods' @clear_goods='clear_goods' ref='carCtrl'></CarCtrl>
  </div>
</template>
	
<script>
import Add_Reduce from '../../../Common/Add_Reduce/Add_Reduce.vue';
import CarCtrl from '../../../Common/CarCtrl/CarCtrl.vue';
export default {
  name: 'goodsDetail',
  created() {
  	this.$store.dispatch('shop_info',{shop_id:this.shop_id}).then((res) => {
  		this.shop_info = res.data.data;
  	}).catch((res) => {
  		alert('ERROR');	
  	})
  },
  data () {
  	return {
     	shop_info: '',
     	goods_detail: this.$store.state.goods_detail,
     	listShow: false,
     	shop_id: this.$route.query.shop_id,
     	goods_id: this.$route.query.goods_id,
    }
  },
  computed: {
  	shop_car() {
  		if(this.shop_info) {
  			return this.shop_info.shop_car;
  		}
  		return []
  	}
  },
  methods: {
  	back() {
  		this.$router.go(-1);
  	},
  	goShop() {
  		this.$router.push({path:'/retailer/shop',query:{shop_id:this.shop_id}})
  	},
  	getCount(goods) {
  		this.$store.dispatch('shop_update_goods',{shop_id:this.shop_id,goods_info:goods}).then((res) => {
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	deleteGoods(goods) {
  		this.$store.dispatch('shop_delete_goods', {shop_id:this.shop_id,ids:goods.shopping_cart_id +','}).then((res) => {
	  		this.shop_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	clear_goods(_ids) {
  		this.$store.dispatch('shop_delete_goods', {shop_id:this.shop_id,ids:_ids}).then((res) => {
	  		this.shop_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	add_car(goods) {
  		this.dropBall(event);
		if(!goods.count) {
  			goods.count = 1;
  		}
  		this.$store.dispatch('shop_add_goods', {shop_id:this.shop_id,goods_info:goods}).then((res) => {
	  		this.shop_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	dropBall(event) {
  		this.$refs.carCtrl.drop(event.currentTarget);
  	}

  },
  components: {
  	Add_Reduce,
  	CarCtrl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	::-webkit-scrollbar {display:none;}
	.goods-detail {
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
			.shop {
				
			}
		}
	}
	.goods-banner {
		width: 100%;
		img {
			display: block;
			width: 100%;
			height: 300/@fs;
		}
	}
	.goods-info {
		background-color: #fff;
		padding: 30/@fs 0;
		margin-top: 10/@fs;
		.content {
			width: 690/@fs;
			margin: 0 auto;
			display: flex;
			justify-content:space-between;
			align-items:center;
			.left {
				.name {
					color: #282828;
					font-size: 30/@fs;
				}
				.price {
					margin-top: 6/@fs;
					color: #f16721;
					font-size: 39/@fs;
				}
			}
			.right {
				.top {
					color: #959595;
					font-size: 26/@fs;
					display: flex;
					align-items:center;
					justify-content: flex-end;
					.standard {
						margin-right: 30/@fs;
					}
				}
				.bottom {
					margin-top: 6/@fs;
					display: flex;
					align-items:center;
					justify-content: flex-end;
					.add-car {
						margin-left: 90/@fs;
						i {
							font-size: 60/@fs;
							&:before {
								color: #f16721;
							}
						}
					}
				}
			}
		}
	}
	.market {
		background-color: #fff;
		margin-top: 10/@fs;
		padding: 26/@fs 0;
		.content {
			display: flex;
			justify-content:space-between;
			align-items:center;
			width: 690/@fs;
			margin: 0 auto;
			.market-name {
				color: #282828;
				font-size: 32/@fs;
			}
			img {
				display: block;
				width: 14/@fs;
			}

		}
	}
	.arguments {
		margin-top: 10/@fs;
		background-color: #fff;
		.title {
			color: #282828;
			font-size: 32/@fs;
			height: 90/@fs;
			line-height: 90/@fs;
			position: relative;
			padding-left: 24/@fs;
			margin-left: 30/@fs;
			&:before {
				content: '';
				height: 40/@fs;
				width: 3/@fs;
				background-color: #f16721;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -20/@fs;
			}

		}
		table {
			width: 100%;
			tr {
				color: #979797;
				font-size: 30/@fs;
				height: 70/@fs;
				text-align: center;
				border-top: 1px solid #e0e0e0;
				td {
					&:first-child {
						border-right: 1px solid #e0e0e0;
					}
					&:last-child {
						padding-left: 40/@fs;
						text-align: left;
					}
				}
			}
		}
	}
	.description {
		margin-top: 10/@fs;
		background-color: #fff;
		.title {
			color: #282828;
			font-size: 32/@fs;
			height: 90/@fs;
			line-height: 90/@fs;
			position: relative;
			padding-left: 24/@fs;
			margin-left: 30/@fs;
			&:before {
				content: '';
				height: 40/@fs;
				width: 3/@fs;
				background-color: #f16721;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -20/@fs;
			}

		}
		.text {
			border-top: 1px solid #e0e0e0;
			padding: 26/@fs 30/@fs;
			color: #959595;
			font-size: 30/@fs;
			line-height: 1.6;
		}

	}
</style>
