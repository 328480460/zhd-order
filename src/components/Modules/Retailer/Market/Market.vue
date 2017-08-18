<template>
  <div class="market">
	<div class="container">
		<div class="header">
			<div class="content">
				<div class="back" @click='back'>
					<img src="./images/back_icon.png" >
				</div>
				<div class="search-box" @click="toSearchBox">
					<img src="./images/search_icon_06.png">
					输入批发商或商品名称
				</div>
				
			</div>
		</div>
		<div class="banner">
			<img src="./images/market_banner_02.png">
		</div>
		<div class="classify" v-if='market_info'>
			<scroller lock-y :bounce=true :scrollbar-x=false>
		      <div class="box1">
		        <div class="box1-item" v-for="(item, key) in market_info.classify" @click='more(item, key)' v-if='item.length > 0'>
		        	{{classifyMap(key)}}
		        </div>
		      </div>
		    </scroller>
		</div>
		<div class="classify-list" v-if='market_info'>
			<div class="classify-item" v-for="(item, key) in market_info.classify" v-if='item.length > 0'>
				<div class="head">
					<h4 class="title">
						{{classifyMap(key)}}
					</h4>
					<div class="more"  @click='more(item, key)'>
						更多 &gt;
					</div>
				</div>
				<div class="content">
					<div class="shop" v-for='(shop, key) in item' v-if='key < 4' @click='toShop(shop)'>
						<img src="./images/shop_avata_03.png">
						<span class="shop-name">{{shop.shop_name}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="classify-all" v-if='classify_all'>
		<div class="classify-head">
			<img src="./images/back_icon.png" class="back" @click='toMarket'>
			{{classify_all.title}}
		</div>
		<div class="classify-content">
			<div class="item" v-for='shop in classify_all.shopList' @click='toShop(shop)'>
				<img src="./images/shop_avata_03.png">
				<span class="shop-name">
					{{shop.shop_name}}
				</span>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import {Scroller} from 'vux'
export default {
  name: 'market',
  created() {
  	this.$store.dispatch('market',{market_id: this.market_id}).then((res) => {
  		console.log(res)
  		if(res.data.result) {
  			this.market_info = res.data.data;
  		}
  	}).catch((err) => {
  		alert('err')
  	}) 
  },
  data () {
    return {
     	market_info: null,
     	market_id: this.$route.query.market_id,
     	classify_all: null
    }
  },
  methods: {
  	back() {
  		this.$router.go(-1);
  	},
  	toMarket() {
  		this.classify_all = null;
  	},
  	toSearchBox() {
  		this.$router.push({path:'/retailer/searchbox'})
  	},
  	toShop(shop) {
  		this.$router.push({path:'/retailer/shop', query:{shop_id: shop.shop_id}})
  	},
  	classifyMap(key) {
  		var map = {
     		fruit: '水果',
     		meat: '肉类',
     		other: '其他',
     		vegetables: '蔬菜'
     	}
  		return  map[key];
  	},
  	more(shopList, key) {
  		console.log(shopList, key);
  		var _title = this.classifyMap(key);
  		this.classify_all = {
  			title: _title,
  			shopList: shopList
  		}
  	}
  },
  components: {
    Scroller
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	::-webkit-scrollbar {display:none;}
	.market {
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
	.banner {
		width: 100%;
		img {
			display: block;
			width: 100%;
		}
	}
	.classify {
		width: 100%;
		box-sizing: border-box;
		padding: 20/@fs 30/@fs;
		margin-top: 10/@fs;
		background-color: #fff;
	}
	.box1 {
	  position: relative;
	  width: 700/@fs;
	}
	.box1-item {
	  width: 160/@fs;
	  height: 60/@fs;
	  background-color: #efefef;
	  display:inline-block;
	  margin-left: 20/@fs;
	  border-radius: 40/@fs;
	  float: left;
	  text-align: center;
	  line-height: 60/@fs;
	}
	.box1-item:first-child {
	  margin-left: 0;
	}
	.classify-list {
		.classify-item {
			width: 100%;
			box-sizing: border-box;
			padding: 20/@fs 30/@fs;
			margin-top: 10/@fs;
			background-color: #fff;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30/@fs;
				height: 36/@fs;
				line-height: 36/@fs;
				.title {
					color: #656565;
					padding-left: 22/@fs;
					border-left: 2/@fs solid #f16721;

				}
				.more {
					color: #f16721;
				}
			}
			.content {
				margin-top: 20/@fs;
				.shop {
					width: 330/@fs;
					margin-bottom: 20/@fs;
					margin-left:30/@fs;
					display: inline-block;
					&:nth-child(2n-1) {
						margin-left: 0;
					};
					img {
						display: block;
						width: 100%;

					}
					.shop-name {
						color: #282828;
						font-size: 30/@fs;
					}

				}


			}
		}
	}
	.classify-all {
		background-color: #f0f0f0;
		max-height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999;
		overflow-y: scroll;
		.classify-head {
			width: 100%;
			background-color: #f36721;
			height: 80/@fs;
			line-height: 80/@fs;
			text-align: center;
			color: #fff;
			font-size: 34/@fs;
			position: relative;
			.back {
				width: 24/@fs;
				height: 44/@fs;
				display: block;
				position: absolute;
				left: 30/@fs;
				top: 50%;
				margin-top: -22/@fs;
			}
		}
		.classify-content {
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			margin-top: 20/@fs;
			padding: 0 30/@fs;
			.item {
				width: 330/@fs;
				margin-bottom: 20/@fs;
				margin-left:30/@fs;
				display: inline-block;
				&:nth-child(2n-1) {
					margin-left: 0;
				};
				img {
					display: block;
					width: 100%;

				}
				.shop-name {
					color: #282828;
					font-size: 30/@fs;
				}
			}
		}
	}
</style>
