<template>
  <div class="shopcar">
    <div class="container">
        <div class="header">
        	<div class="content">
	        	购物车
	        	<span class="edit">编辑</span>
        	</div>
        </div>
        <div class="content">
    		<div v-for="(item,key) in shop_info" class="order-item" >
    			<div class="shop-info" v-if='item.goodsList[0]' @click='toShop(item)'>
    				<div class="shop-name" >
	    				<div class="checkbox" @click.stop='check_shop(item.goodsList)' >
						    <i class="icon-right" :class='{show: shop_check_state[key].isChecked}'></i>
						</div>
	    				<span>{{item.goodsList[0].shop_name}}</span>
    				</div>
    				<img src="./images/right_icon_03.png">
    			</div>
				<div class="cont goods-item" v-for="goods in item.goodsList">
					<div class="goods-image">
						<CheckBox :goods='goods' @getCheckState='getCheckState'></CheckBox>
						<img src="./images/goods_07.png">
					</div>
					<div class="goods-info">
						<p class="goods-name">{{goods.goods_name}}</p>
						<p class="price-standard">
							<span class="price">￥{{goods.price}}</span>
							<span class="standard">规格:{{goods.standard}}</span>
						</p>
						<div class="add-reduce-car" >
							<Add_Reduce @getCount='getCount' :goods='goods'></Add_Reduce>
							<div class="delete"  @click='delete_goods(goods)'>
								<i class="icon-delete font"></i>
							</div>
						</div>
					</div>
				</div>
    		</div>
	        <div class="empty-car" v-if='empty_flg'>
	        	您的购物车为空
	        </div>
        </div>
    </div>
    <div class="bottom" v-if="!empty_flg">
    	<div class="left">
    		<label @click='check_all()'>
    			<div class="checkbox" >
				    <i class="icon-right" :class='{show: allCheck}' ></i>
				</div>
    			全选
    		</label>
    		<span class="total-price">￥{{allPrice}}</span>
    	</div>
    	<div class="right" @click='to_confirmorder'>
    		结算
    	</div>
    </div>
    <v_footer :cur="2"></v_footer>
  </div>
</template>

<script>
import v_footer from '../../../Common/Footer/Footer.vue';
import Add_Reduce from '../../../Common/Add_Reduce/Add_Reduce.vue';
import CheckBox from '../../../Common/CheckBox/CheckBox.vue';
export default {
  name: 'shopcar',
  created() {
  	this.$store.dispatch('car').then((res) => {
  		console.log(res.data);
  		if(res.data.result) {
			this.shop_info = res.data.data;
  		}
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  data () {
    return {
    	shop_info: {},
    }
  },
  methods: {
    getCount(goods) {
    	this.$store.dispatch('updata_goods', goods).then((res) => {
	  		// console.log(res.data);
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
    },
    getCheckState(goods) {

    },
    delete_goods(goods) {
    	this.$store.dispatch('delete_goods', goods).then((res) => {
	  		if(res.data.result) {
  				this.shop_info = res.data.data;
	  		}

	  	}).catch((res) => {
	  		alert('ERROR');
	  	});

    },
    check_shop(shop) {
    	var goods_list = shop;
		for (var i = 0; i < goods_list.length; i++) {
			if (!goods_list[i].isChecked) {
				goods_list.forEach(function(value, index) {
					value.isChecked = true;
				})
				return;
			}
		}
		goods_list.forEach(function(value, index) {
			value.isChecked = false;
		})

    },
    check_all() {
		var shopList = this.shop_info;
		for (var i in shopList) {
			for (var j = 0; j < shopList[i].goodsList.length; j++) {
				if (!shopList[i].goodsList[j].isChecked) {
					console.log('选中操作');
					for (var i in shopList) {
						shopList[i].goodsList.forEach(function(value, index) {
							value.isChecked = true;
						})
					}
					return
				}
			}
		}
		for (var i in shopList) {
			shopList[i].goodsList.forEach(function(value, index) {
				value.isChecked = false;
			})
		}
    },
    to_confirmorder() {
    	var data = this.shop_info;
    	var updata = {};
    	for(var i in data) {
    		var _arr = data[i].goodsList.filter(function(value,index) {
    			return value.isChecked;
    		});

    		if(_arr.length !== 0) {
    			updata[i] = _arr;
    		}
    	}
    	if(Object.keys(updata).length === 0) {
    		this.$vux.toast.show({
				text: '至少选择一个',
				type: 'text',
				position: 'bottom',
				time:'2000'
			})
			return;
    	}

    	this.$store.commit('create_current_order', updata)
    	this.$router.push({path: '/retailer/confirmOrder'});
    },
    toShop(obj) {
    	console.log(obj);
    	var _shop_id = obj.goodsList[0].shop_id;
    	this.$router.push({path: '/retailer/shop', query:{shop_id:_shop_id}})
    }
  },
  computed: {
  	allPrice() {
  		if(!this.shop_info) {
  			return 0;
  		}
  		var shopList = this.shop_info;
  		var allPrice = 0;
		for (var i in shopList) {
			shopList[i].goodsList.forEach(function(value, index) {
				if (value.isChecked) {
					allPrice += value.price * value.count;
				}
			})
		}
		return Math.floor(allPrice * 100) / 100;

  	},
  	shop_check_state() {
		for (var j in this.shop_info) {
			this.shop_info[j].isChecked = true;
			for(var i = 0; i < this.shop_info[j].goodsList.length; i++ ) {
				if(!this.shop_info[j].goodsList[i].isChecked) {
					this.shop_info[j].isChecked = false;
				}
			}
    	}
  		return this.shop_info
  	},
  	
  	allCheck() {
  		for(var i in this.shop_info) {
  			if(!this.shop_info[i].isChecked) {
  				return false
  			}
  		}
  		return true
  	},
  	empty_flg() {
  		var shopList = this.shop_info;
  		var flag = true;
		for (var i in shopList) {
			shopList[i].goodsList.forEach(function(value, index) {
				if (value.length !== 0) {
					flag = false;
					return
				}
			})
		}
		return flag;
  	}

  },
  watch: {
  	shop_info(newVal, oldVal) {
  		// console.log(newVal, oldVal);
  	}
  },
  components: {
  	v_footer,
  	Add_Reduce,
  	CheckBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	.shopcar {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		min-height: 100%;
		background-color: #f0f0f0;
	}
	.header {
		width: 100%;
		background-color: #f26721;
		color: #fff;
		font-size: 32/@fs;
		text-align: center;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		.content {
			width: 690/@fs;
			margin: 0 auto;
			height: 80/@fs;
			line-height: 80/@fs;
			position: relative;
			.edit {
				position: absolute;
				font-size: 30/@fs;
				right: 0;
				height: 80/@fs;
				line-height: 80/@fs;
				top: 0;
			}
		}

	}
	.content {
		margin-top: 80/@fs;
		margin-bottom: 260/@fs;
		.order-item {
			background-color: #fff;
			margin-bottom: 20/@fs;
			.shop-info {
				margin-left: 30/@fs;
				color: #282828;
				font-size: 32/@fs;
				height: 88/@fs;
				line-height: 88/@fs;
				display: flex;
				justify-content:space-between;
				align-items: center;
				.shop-name {
					.checkbox {
					    display: inline-block;
					    height: 24/@fs;
					    width: 24/@fs;
					    border: 2/@fs #e3e3e3 solid;
					    border-radius: 4/@fs;
					    position: relative;
					    margin-right: 20/@fs;
					    overflow: hidden;
					    i {
					      position: absolute;
					      font-size: 60/@fs;
					      left: 50%;
					      top: 50%;
					      margin-left: -30/@fs;
					      margin-top: -30/@fs;
					      display: none;
					      &.show {
					        display: block;
					      }

					    }
					}
				}
				>img {
					display: block;
					height: 26/@fs;
					margin-right: 30/@fs;
				}
			}
			.goods-item {
				margin-left: 30/@fs;

			}
			.cont {
				display: flex;
				padding: 16/@fs 0;
				border-top: 1px solid #eee;
				justify-content:space-between;
				.goods-image {
					
					img {
						display: inline-block;
						vertical-align: middle;
						width: 200/@fs;
						height: 150/@fs;
					}
				}
				.goods-info {
					width: 400/@fs;
					margin-right: 30/@fs;
					color: #969696;
					font-size: 30/@fs;
					.price-standard {
						.standard {
							margin-left: 50/@fs;
						}
					}
					.add-reduce-car {
						display: flex;
						justify-content: space-between;
						margin-top: 6/@fs;
						.delete {
							width: 50/@fs;
							height: 50/@fs;
							line-height: 50/@fs;
							background: #f26721;
							color: #fff;
							text-align: center;
							font-size: 28/@fs;
							border-radius: 100%;
							.font {
								display: inline-block;
								margin-top: 10/@fs;
								font-size: 30/@fs;
								&:before {
									color: #fff;
								}
							}
						}
					}
					
				}
			}
		}
		.empty-car {
			font-size: 30/@fs;
			text-align: center;
			margin-top: 200/@fs;
		}
	}
	.bottom {
		height: 88/@fs;
		line-height: 88/@fs;
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 110/@fs;
		left: 0;
		display: flex;
		justify-content: space-between;
		.left {
			margin-left: 30/@fs;
			label {
				color: #282828;
				font-size: 30/@fs;
				.checkbox {
				    display: inline-block;
				    height: 24/@fs;
				    width: 24/@fs;
				    border: 2/@fs #e3e3e3 solid;
				    border-radius: 4/@fs;
				    position: relative;
				    margin-right: 20/@fs;
				    overflow: hidden;
				    i {
				      position: absolute;
				      font-size: 60/@fs;
				      left: 50%;
				      top: 50%;
				      margin-left: -30/@fs;
				      margin-top: -30/@fs;
				      display: none;
				      &.show {
				        display: block;
				      }

				    }
				}
			}
			.total-price {
				margin-left: 30/@fs;
				color: #f26721;
				font-size: 36/@fs;
			}
		}
		.right {
			height: 88/@fs;
			width: 150/@fs;
			text-align: center;
			color: #fff;
			font-size: 30/@fs;
			background-color: #f26721;
		}
	}
</style>
