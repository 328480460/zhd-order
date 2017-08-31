<template>
  <div class="order" >
		<div class="header">
			<div class="content">
				<div class="back" v-if='!editing'>
					<img src="./images/back_icon.png" @click='goBack' >
				</div>
				<div class="cancle-edit" v-if='editing' @click='cancle_edit'>取消</div>
				<div class="title" >
					商品管理
				</div>
				<div class="search" v-if='!editing' @click='show_more'>
					更多
					<div class="more-list" v-if='more'>
						<div class="edit" @click='edit_goods' >批量编辑</div>
					</div>
				</div>
				<div class="edit" v-if='editing' @click='confirim_edit'>确定</div>
			</div>
		</div>
		<form  @submit.prevent='serach_order'>
			<div class="search-wrapper">
				<div class="search">
					<img src="./images/icon-search_03.png">
					<input type="search" name="search" placeholder="商品名称" v-model='key_word' >
				</div>
			</div>
		</form>
		<div class="state-nav">
			<ul>
				<li v-for="(item,key) in goods_state" :key=key  :class="{active: goods_state_current == item.state}" @click='change_state(item)'>{{item.text}}</li>
			</ul>
		</div>
		<div class="order-list" ref='order_list' @scroll='scroll' v-if='goods_info'>
			<div class="goods-length">共 {{goods_length}} 个商品</div>
			<div class="order-item">
				<div class="goods-list" >
					<div class="goods-item" v-for='(goods, key) in goods_list'>
						<div class="left">
							<img :src="'http://202.106.219.6:13799/order/' + goods.img_url">
							<!-- <img src="./images/goods_07.png"> -->
							<div class="goods-info">
								<div class="goods-name">{{goods.goods_name}}</div>
								<div class="count">规格: ({{goods.specifications_name}})</div>
								<div class="price">单价: ￥
									<span v-if='!editing'>{{goods.price}}</span>
									<input type="text" name="price" :value='goods.price' @input='change_price(goods, key)' :ref='"input" + key' @blur='blur(goods, key)' v-if='editing'>
								</div>
							</div>
						</div>
						<div class="right">
							▪▪▪
						</div>
					</div>
				</div>
				
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'wholesalerorder',
  created() {
  	this.re_render();
  },
  data () {
    return {
      goods_state: [{text:'出售中',state:'saleing'},{text: '已售罄', state:'saleOut'},{text: '已下架', state: 'saleOff'}],
      goods_state_current: 'saleing',
      key_word:'',
      isLoading: false,
      finish: false,
      page: 1,
      pay_show: false,
      goods_info: null,
      editing: false,
      more: false,
      price_list: {}
    }

  },
  computed:{
  	goods_length() {
  		if(!this.goods_info) {
  			return 0;
  		}
  		return this.goods_info.length;
  	},
  	goods_list() {
  		if(!this.goods_info) {
  			return [];
  		}
  		return this.goods_info.goods_list;
  	}
  },
  methods:{
  	goBack() {
  		this.$router.push({path:'/wholesaler/index'});
  	},
  	edit_goods() {
  		this.editing = true;
  		this.more = false;
  	},
  	show_more() {
  		this.more  = true;
  	},
  	cancle_edit() {
  		this.editing = false;
  		this.price_list = {};
  	},
  	confirim_edit() {
  		var _arr = [];
  		for(var i in this.price_list) {
  			this.price_list[i].origin_goods.price = this.price_list[i].current_price
  			_arr.push(this.price_list[i].origin_goods);
  		}
  		console.log(this.price_list);
  		this.editing = false;
  		this.price_list = {};

  		this.$store.dispatch('wholesaler_updata_goods',_arr).then((res) => {
	  		console.log(true)
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})

  	},
  	change_state(goods_state) {
  		this.$refs.order_list.scrollTop = 0;
  		this.goods_state_current = goods_state.state;
  		this.re_render();
  	},
  	serach_order() {
  		this.$refs.order_list.scrollTop = 0;
  		this.re_render();
  	},
  	change_price(goods,key) {
  		var input = this.$refs['input' + key][0];
  		input.value = input.value.replace(/[^\d\.]/g,"");
		input.value = input.value.replace(/^\./g,"");
		input.value = input.value.replace(/\.{2,}/g,".");
	    input.value = input.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	    input.value = input.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
  	},
  	blur(goods,key) {
  		var input = this.$refs['input' + key][0];
  		if(input.value == '') {
  			input.value = 0;
  		}
	    this.price_list['input' + key] = {
	    	origin_goods: goods,
	    	current_price: input.value
	    }
	    console.log(this.price_list);
  	},
  	re_render() {
  		this.page = 1;
  		this.finish = false;
  		var limit = {
	  		keyword: this.key_word,
	  		goods_state: this.goods_state_current,
	  		page: this.page
	  	}
  		this.$store.dispatch('wholesaler_goods',limit).then((res) => {
	  		this.goods_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
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
		  		goods_state: _this.goods_state_current,
		  		page: ++_this.page
		  	}
  			_this.$store.dispatch('wholesaler_goods', limit).then((res) =>{
  				if(res.data.result) {
  					_this.goods_info.goods_list = _this.goods_info.goods_list.concat(res.data.data.goods_list);
  					
  					_this.isLoading = false;
					order_parent = null;
					if(res.data.data.goods_list.length < 10) {
						_this.finish = true;
					}
  				}
  			}).catch((err) =>{
  				alert('Error')
  			})
  		}
	 
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
				position: relative;
				.more-list {
					position: absolute;
				    width: 150/@fs;
				    right: -10/@fs;
				    bottom: -180%;
				    background: #999;
				    text-align: right;
				    color: #fff;
				    padding: 10/@fs;
				    padding-right: 20/@fs;
				    font-size: 30/@fs;
				    &:after {
						content: '';
						width: 0;
						height: 0;
						border: 20/@fs solid #999;
						border-color: transparent transparent #999 transparent;
						position: absolute;
						top: -40/@fs;
						right: 10/@fs;
				    }
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
				width: 33.333%;
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
		top: 280/@fs;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		-webkit-overflow-scrolling : touch;
		z-index: 1;
		.goods-length {
			padding: 0 30/@fs;
			height: 70/@fs;
			line-height: 86/@fs;
			color: #959595;
			font-size: 32/@fs;
		}
		.order-item {
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
								span {
									color: #f16721;
								}
								input {
									border-color: #f16721;
									border-width: 1px;
									color: #f16721;
									border-radius: 5/@fs;
									outline: none;
									width: 100/@fs;
									padding-left: 10/@fs;
								}
							}
						}
					}
					.right {
						font-size: 16/@fs;
						color: #999999;
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
