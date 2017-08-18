<template>
  <div class="index">
  	<div class="container">
		<div class="header">
			<div class="content">
				<div class="position">
					{{info.position}}
				</div>
				<div class="search-box" @click="toSearchBox">
					<img src="./images/search_icon_06.png">
					输入批发商或商品名称
				</div>
				<img class="message" src="./images/msg_icon_03.png" height="46" width="47" @click='user_message'>
			</div>
		</div>
		<div class="market-recommend">
			<p class="title">
				推荐
			</p>
			<div class="list" @touchstart='computeWidth'>
				<ul ref='market_list'>
					<li v-for='(item,key) in info.market_recommend' :key=key @click='toMarket(item)'>{{item.market_name}}</li>
				</ul>
			</div>
		</div>
		<div class="banner">
			<ul>
				<li><img src="./images/banner_02.png"></li>
			</ul>
		</div>
		<div class="option">
			<div class="order" @click='toMyOrlder'>
				<img src="./images/order_icon.png">
				我的订单
			</div>
			<div class="shop" @click='toUsualSop'>
				<img src="./images/shop_icon.png">
				常用店铺
			</div>
		</div>
		<div class="line"></div>
		<div class="goods-recommend">
			<div class="title">商品推荐</div>
			<ul>
				<li v-for='(item,key) in info.goods_recommend' :key=key @click='toGoodsDetail(item)'>
					<img src="./images/goods_03.png">
					<div class="goods-info">
						<div class="name">{{item.goods_name}}</div>
						<div class="price">￥<span>{{item.price}}</span>元/斤</div>
						<div class="standard">{{item.standard}}</div>
					</div>
					<div class="level" v-if='item.level'>{{item.level}}</div>
				</li>
			</ul>
		</div>
		<div class="line"></div>
		<div class="nearby">
			<div class="title">附近商家</div>
			<div class="info"  @click='toMarket(info.nearby)'>
				<img src="./images/nearby_03.png">
				<div>
					<p v-if='info.nearby'>{{info.nearby.market_name}}</p>
					<p v-if='info.nearby'>{{info.nearby.belong_to}}</p>
				</div>
			</div>
		</div>
	</div>
	<v_footer :cur="0"></v_footer>
  </div>
</template>

<script>
import axios from 'axios';
import v_footer from '../../../Common/Footer/Footer.vue'
export default {
  name: 'index',
  created() {
  	this.$store.dispatch('retailer','').then((res) => {
		if(res.data.result) {
  			this.info = res.data.data;
  			console.log(this.info);
  		}
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  
  data () {
    return {
      info: ''
    }
  },
  methods: {
  	user_message() {
  		
  	},
  	computeWidth() {
  		var width = 0;
		var li = this.$refs.market_list.querySelectorAll( 'li');
		var length = li.length;
		var htmlFS = document.querySelector('html').style.fontSize;
		var margin_right = 0.6 * parseInt(htmlFS);
		li.forEach((ele, index) => {
			width += ele.offsetWidth;
		})
		width += (margin_right * length + 10);
		// console.log(width);
		this.$refs.market_list.style.width = width + 'px';
  	},
  	toSearchBox() {
  		this.$router.push({path:'/retailer/searchbox'})
  	},
  	toMyOrlder() {
  		this.$router.push({path:'/retailer/order',query:{limit: 'all'}})
  	},
  	toUsualSop() {
  		alert('去常用店铺')
  	},
  	toGoodsDetail(goods) {
  		this.$store.commit('create_goods_detail', goods);
  		this.$router.push({path:'/retailer/goodsDetail',query:{shop_id: goods.shop_id, goods_id: goods.goods_id}})
  	},
  	toMarket(market) {
  		this.$router.push({path: '/retailer/market', query: {market_id: market.market_id}})
  	}
  },
  components: {
  	v_footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	::-webkit-scrollbar {display:none;}
	.header {
		width: 100%;
		background-color: #f36721;
		.content {
			width: 690/@fs;
			height: 80/@fs;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			font-size: 30/@fs;
			color: #fff;
			align-items: center;
			.search-box {
				width: 500/@fs;
				height: 58/@fs;
				line-height: 59/@fs;
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
	.market-recommend {
		height: 74/@fs;
		line-height: 72/@fs;
		width: 690/@fs;
		margin: 0 auto;
		font-size: 0;
		.title {
			display: inline-block;
			vertical-align: middle;
			width: 20%;
			color: #f36721;
			font-size: 30/@fs;
			position: relative;
			&:after{
				content:'';
				width:80/@fs;
				height: 1px;
				position: absolute;
				bottom: 0;
				left: -10/@fs;
				background-color: #f36721;

			}
			
		}
		.list {
			width: 80%;
			height: 74/@fs;
			display: inline-block;
			vertical-align: middle;
			overflow-x: scroll;
			ul {
				width: 400px;
				
				li {
					height: 74/@fs;
					line-height: 76/@fs;
					font-size: 30/@fs;
					color: #656565;
					display: inline-block;
					margin-right: 60/@fs;

				}
			}
			

		}

	}
	.banner {
		ul {
			li {
				img {
					display: block;
					width: 100%;
				}
			}
		}
	}
	.option {
		font-size: 0;
		box-sizing: border-box;
		padding: 24/@fs 0;
		.order {
			width: 50%;
			display: inline-block;
			text-align: center;
			font-size: 32/@fs;
			color: #989898;
			img {
				display: block;
				height: 48/@fs;
				margin: 0 auto;
				margin-bottom: 16/@fs;
			}
		}
		.shop {
			.order;
			position: relative;
			&:before {
				content: '';
				height: 100/@fs;
				width: 2px;
				background-color: #fafafa;
				/*background-color: red;*/
				position: absolute;
				top: 0;
				left: 0;
			}
		}
	}
	.line {
		width: 100%;
		height: 10/@fs;
		background-color: #f5f5f5;
	}
	.goods-recommend {
		width: 690/@fs;
		margin: 0 auto;
		.title {
			color: #656565;
			font-size: 30/@fs;
			height: 34/@fs;
			line-height: 34/@fs;
			padding-left: 20/@fs;
			border-left: 2/@fs solid #f36b27;
			margin: 16/@fs 0;
		}
		ul {
			font-size: 0;
			li {
				width: 330/@fs;
				margin-left: 30/@fs;
				margin-bottom: 20/@fs;
				display: inline-block;
				overflow:hidden;
				position: relative;
				&:nth-child(2n-1) {
					margin-left: 0;
				}
				img {
					width: 100%;
				}
				.goods-info {
					width: 100%;
					font-size: 0;
					.name {
						color: #282828;
						font-size: 30/@fs;
						margin-top:16/@fs;
						margin-bottom: 6/@fs;
					}
					.price {
						display: inline-block;
						width: 50%;
						font-size: 26/@fs;
						color: #979797;
						text-align: left;
						span {
							color: #f36721;
						}
					}
					.standard {
						.price;
						text-align: right;
					}
				}
				.level {
					font-size: 32/@fs;
					color: #fff;
					background-color: #f36721;
					position: absolute;
					top: 0;
					left: 0;
					height: 50/@fs;
					line-height: 48/@fs;
					padding: 0 5/@fs 0 10/@fs;
					&:after {
						content:'';
						width: 0;
						height: 0;
						border: 25/@fs solid #f36721;
						top: 0;
						right: -50/@fs;
						position: absolute;
						border-color: transparent transparent transparent #f36721;
					}
				}
			}
		}
	}
	.nearby {
		width: 690/@fs;
		margin: 0 auto;
		.title {
			color: #656565;
			font-size: 30/@fs;
			height: 34/@fs;
			line-height: 34/@fs;
			padding-left: 20/@fs;
			border-left: 2/@fs solid #f36b27;
			margin: 16/@fs 0 ;
		}
		.info {
			img {
				width: 200/@fs;
				display: inline-block;
				vertical-align: middle;
			}
			div {
				display: inline-block;
				vertical-align: middle;
				font-size: 30/@fs;
				color: #979797;
				margin-left: 24/@fs;
			}

		}
		
	}
	.container {
		padding-bottom: 120/@fs;
	}
</style>
