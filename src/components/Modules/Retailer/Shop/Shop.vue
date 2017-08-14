<template>
  <div class="shop">
   	<div class="container">
   		<div class="header">
			<div class="content">
				<div class="back" @click='back()'>
					<img src="./images/back_icon.png" >
				</div>
				<div class="search-box" @click="toSearchBox">
					<img src="./images/search_icon_06.png">
					输入批发商或商品名称
				</div>
				
			</div>
		</div>
		<div class="shop-info">
			<div class="info">
				<div class="left">
					<img src="./images/shop_avata_03.png" class="shop-avata">
					<div class="usual" v-if='shop_info.usually'>
						<i class="icon-collected" ></i>
						<span>已添加</span>
					</div>
					<div class="usual" v-else @click='add_usual'>
						<i class="icon-no-collect" ></i>
						<span>添加常用</span>
					</div>
				</div>
				<div class="right">
					<p class="shop-name">{{shop_info.shop_name}}</p>
					<p class="market-name">{{shop_info.market_name}}</p>
					<p class="limit0time">截单时间: {{shop_info.limit_time}}</p>
					<p class="send-area">配送范围: {{shop_info.send_area}}</p>
				</div>
			</div>
			<div class="more-phone">
				<img src="./images/phone_icon_04.png">
				<p class="more">查看更多></p>
			</div>
		</div>
		<div class="shop-cont">
			<div class="classify">
				<div class="classify-item" :class="{current: current == item.type_id}" v-if='classify' v-for='(item, key) in classify' @click='change_classify(item)'>{{item.type_name}}</div>
			</div>
			<div class="goods-list" >
				<div class="goods-item" v-for='item in goods_list' >
					<div class="goods-img" @click='toGoodDetail(item)'>
						<img src="./images/goods_07.png">
					</div>
					<div class="goods-info">
						<div class="name">
							<span>{{item.goods_name}}</span>
							<span>￥{{item.price}}</span>
						</div>
						<div class="standard">{{item.standard}}</div>
						<div class="add-reduce-car" >
							<Add_Reduce  :goods='item'></Add_Reduce>
							<div class="add-car" @click.stop='add_car(item)'>
								<i class="icon-buycar" ></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
   	</div>
   	<CarCtrl :shop_car='shop_car' @getCount='getCount' @deleteGoods='deleteGoods' @clear_goods='clear_goods'></CarCtrl>
  </div>
</template>

<script>
import Add_Reduce from '../../../Common/Add_Reduce/Add_Reduce.vue';
import CarCtrl from '../../../Common/CarCtrl/CarCtrl.vue';
export default {
  name: 'shop',
  created() {
  	this.$store.dispatch('shop_info',{shop_id:this.shop_id}).then((res) => {
  		this.shop_info = res.data.data;
  		this.classify = this.shop_info.goods_type_list;
  		this.goods_list = this.shop_info.goods_list.recommend.list;
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  data () {
    return {
     	shop_info: '',
     	classify: '',
     	goods_list: '',
     	current: 'recommend',
     	listShow: false,
     	shop_id: this.$route.query.shop_id
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
  	toSearchBox() {
  		this.$router.push({path:'/retailer/searchbox'})
  	},
  	get_goods_list(value) {
  		this.$store.dispatch('get_goods_list',{shop_id: this.shop_id,type_id:value}).then((res) => {
  			if(res.data.result) {
	  			this.goods_list = res.data.data;
  			}
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  		
  	},
  	change_classify(value) {
  		this.current = value.type_id;
  		this.get_goods_list(value.type_id);
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
		if(!goods.count) {
  			goods.count = 1;
  		}
  		this.$store.dispatch('shop_add_goods', {shop_id:this.shop_id,goods_info:goods}).then((res) => {
	  		this.shop_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	add_usual() {
  		this.$store.dispatch('shop_add_usual',{shop_id:this.shop_id}).then((res) => {
  			if(res.data.result) {
  				this.shop_info.usually = true;
  			}
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},
  	toGoodDetail(goods) {
  		this.$router.push({path:'/retailer/goodsDetail',query: {shop_id: this.shop_id, goods_id:goods.goods_id}})
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
	.shop {
		background-color: #f0f0f0;
		min-height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}
	.header {
		width: 100%;
		background-color: #f36721;
		.content {
			width: 690/@fs;
			height: 80/@fs;
			margin: 0 auto;
			display: flex;
			justify-content: flex-start;
			font-size: 30/@fs;
			color: #fff;
			align-items: center;
			.back {
				width: 24/@fs;
				img {
					display: block;
					width: 100%;
				}
			}
			.search-box {
				margin-left: 50/@fs;
				width: 600/@fs;
				height: 58/@fs;
				line-height: 58/@fs;
				font-size: 26/@fs;
				color: #979797;
				border-radius: 29/@fs;
				background-color: #fff;
				>img {
					width: 30/@fs;
					height: 30/@fs;
					display: inline-block;
					margin-left: 34/@fs;
					margin-right: 12/@fs;
					vertical-align: middle;
				}
				
			}
			.message {
				width: 46/@fs;
				height: 46/@fs;
			}
		}
	}
	.shop-info {
		background: #fff;
		padding: 30/@fs 30/@fs;
		display: flex;
		justify-content: space-between;
		align-items:center;
		height: 160/@fs;
		.info {
			.left {
				display: inline-block;
				.shop-avata {
					display: block;
					width: 160/@fs;
					height: 120/@fs;
				}
				.usual {
					color: #959595;
					font-size: 24/@fs;
					margin-top: 4/@fs;
				}
			}
			.right {
				display: inline-block;
				color: #959595;
				font-size: 28/@fs;
				margin-left: 12/@fs;
			}
		}
		.more-phone {
			height: 166/@fs;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			img {
				display: block;
				width: 34/@fs;
				margin-top: 10/@fs;
			}
			.more {
				color: #f16721;
				font-size: 30/@fs;
			}
		}
	}
	.shop-cont {
		background: #fff;
		position: absolute;
		top: 310/@fs;
		width: 100%;
		bottom: 90/@fs;
		overflow: scroll;
		.classify {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 210/@fs;
			overflow-y: scroll;
			.classify-item {
				height: 100/@fs;
				line-height: 100/@fs;
				padding-left: 30/@fs;
				box-sizing: border-box;
				&.current {
					background: #f5f5f5;
					color: #f16721;
					border-left: 4/@fs solid #f16721;

				}
			}

		}
		.goods-list {
			position: absolute;
			top: 0;
			left: 210/@fs;
			bottom: 0;
			right: 0;
			overflow-x: hidden;
			overflow-y: scroll; 
			.goods-item {
				display: flex;
				justify-content:space-between;
				align-items:flex-start;
				padding: 20/@fs 30/@fs 20/@fs 0;
				border-bottom: 1px solid #e0e0e0;
				&:last-child {
					border-bottom: 0;
				}
				.goods-img {
					img {
						display: block;
						width: 160/@fs;
						height: 140/@fs;
					}
				}
				.goods-info {
					flex: 1 0 auto;
					color: #959595;
					font-size: 30/@fs;
					margin-left: 20/@fs;
					.name {
						display: flex;
						justify-content:space-between;
					}
					.add-reduce-car {
						display: flex;
						justify-content:space-between;
						.add-car {
							width: 50/@fs;
							height: 50/@fs;
							background: #f16721;
							border-radius: 100%;
							text-align: center;
							line-height: 54/@fs;
							vertical-align: top;
							i:before{
								color: #fff;
							}
						}
					}
				}
			}
		}
	}
	// .car-ctrl {
	// 	position: fixed;
	// 	left: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	border-top: 1px solid #e0e0e0;
	// 	height: 90/@fs;
	// 	background: #fff;
	// 	display: flex;
	// 	justify-content:space-between;
	// 	align-items:center;
	// 	z-index: 88;
	// 	.header {
	// 		height: 90/@fs;
	// 		display: flex;
	// 		justify-content:space-between;
	// 		align-items:center;
	// 		background: #fff;
	// 		.left {
	// 			margin-left: 30/@fs;
	// 			.car-icon {
	// 				display: inline-block;
	// 				width: 60/@fs;
	// 				height: 60/@fs;
	// 				background: #f16721;
	// 				border-radius: 100%;
	// 				font-size: 40/@fs;
	// 				text-align: center;
	// 				line-height: 64/@fs;
	// 				position: relative;
	// 				i:before {
	// 					color: #fff;
	// 				}
	// 				.type-count {
	// 					position: absolute;
	// 					right: -16/@fs;
	// 					top: -5/@fs;
	// 					font-size: 18/@fs;
	// 					background: #da2e39;
	// 					height: 36/@fs;
	// 					width: 36/@fs;
	// 					line-height: 38/@fs;
	// 					border-radius: 50%;
	// 					color: #fff;
	// 				}
	// 			}
	// 			.total-price {
	// 				display: inline-block;
	// 				margin-left:30/@fs;			
	// 				color: #f16721;
	// 				font-size: 36/@fs;
	// 			}
	// 		}
	// 		.accounts {
	// 			width: 150/@fs;
	// 			background: #f16721;
	// 			color: #fff;
	// 			font-size: 30/@fs;
	// 			line-height: 90/@fs;
	// 			height: 90/@fs;
	// 			text-align: center;
	// 		}
	// 	}
	// 	.content {
	// 		position: absolute;
	// 		max-height: 480/@fs;
	// 		background: #fff;
	// 		top: -1px;
	// 		left: 0;
	// 		width: 100%;
	// 		z-index: -1;
	// 		&.fold-transition  {
	// 			transform: translate3d(0,-100%,0);
	// 		}
	// 		&.fold-enter {
	// 			transform: translate3d(0,0,0);
	// 		}
	// 		&.fold-enter-to {
	// 			transition: all .3s linear;
	// 		}
	// 		&.fold-leave-to {
	// 			transition: all .3s linear;
	// 			transform: translate3d(0,0,0);
	// 		} 
	// 		.car-head {
	// 			height: 80/@fs;
	// 			line-height: 80/@fs;
	// 			display: flex;
	// 			justify-content:space-between;
	// 			align-items:center;
	// 			padding: 0 30/@fs;
	// 			color: #282828;
	// 			font-size: 32/@fs;
	// 			.clear-goods {
	// 				color: #656565;
	// 				font-size: 30/@fs;
	// 				img {
	// 					display: inline-block;
	// 					width: 27/@fs;
	// 				}
	// 			}
	// 		}
	// 		.goods-wrapper {
	// 			max-height: 400/@fs;
	// 			overflow-y: scroll;
	// 			overflow-x: hidden;
	// 			.goods-item {
	// 				height: 90/@fs;
	// 				line-height: 90/@fs;
	// 				display: flex;
	// 				justify-content:space-between;
	// 				align-items:center;
	// 				color: #656565;
	// 				font-size: 32/@fs;
	// 				padding: 0 30/@fs;
	// 				border-top: 1px solid #e0e0e0;
	// 				.goods-name {
	// 					width: 380/@fs;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	// .goods-list-wrapper {
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	bottom: 92/@fs;
	// 	right: 0;
	// 	background: rgba(0,0,0,.5);
	// }

	
</style>
