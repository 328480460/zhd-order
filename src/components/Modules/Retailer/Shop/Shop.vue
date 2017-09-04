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
					<img :src="'http://202.106.219.6:13799/order/' + shop_info.avata" class="shop-avata" v-if='shop_info'>
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
					<!-- <p class="market-name">{{shop_info.market_name}}</p> -->
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
						<img :src="'http://202.106.219.6:13799/order/' + item.url">
					</div>
					<div class="goods-info">
						<div class="name">
							<span>{{item.goods_name}}</span>
							<span>￥{{item.price}}</span>
						</div>
						<div class="standard">{{item.standard}}</div>
						<div class="add-reduce-car" >
							<Add_Reduce  :goods='item'></Add_Reduce>
							<div class="add-car" @click.stop='add_car(item, $event)' ref='car_icon'>
								<i class="icon-buycar" ></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
   	</div>
   	<CarCtrl :shop_car='shop_car' @getCount='getCount' @deleteGoods='deleteGoods' @clear_goods='clear_goods' ref='carCtrl'></CarCtrl>
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
  		// this.goods_list = this.shop_info.goods_list.recommend.list;
  		this.goods_list = this.shop_info.goods_list.all.list;
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  data () {
    return {
     	shop_info: '',
     	classify: '',
     	goods_list: '',
     	// current: 'recommend',
     	current: 'all',
     	listShow: false,
     	shop_id: this.$route.query.shop_id,
     	postion_ele: '',
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
  	add_car(goods,event) {
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
  		this.$store.commit('create_goods_detail', goods)
  		this.$router.push({path:'/retailer/goodsDetail',query: {shop_id: this.shop_id, goods_id:goods.goods_id}})

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
		padding: 20/@fs 30/@fs;
		display: flex;
		justify-content: space-between;
		align-items:center;
		height: 160/@fs;
		.info {
			display: flex;
			justify-content:flex-start;
			align-items: flex-start;
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
				margin-left: 20/@fs;
			}
		}
		.more-phone {
			height: 120/@fs;
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
		top: 290/@fs;
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
			-webkit-overflow-scrolling : touch;
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

						span {
							display: block;
							// width: 100/@fs;
							// flex: 0 0 100/@fs;
							&:first-child {
								width: 240/@fs;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								flex: 0 0 240/@fs;
							}
						}
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

	
</style>
