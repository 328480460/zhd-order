<template>
  <div class="confirmorder">
  	<div class="container">
		<div class="header">
			<div class="content">
				<div class="back">
					<img src="./images/back_icon.png" @click='goBack'>
				</div>
				<div class="title">确认订单</div>
				<div class="search">
					<img src="./images/phone_icon_03.png">
				</div>
			</div>
		</div>
		<div class="address">
			<div class="left">
				<div class="name">零售商姓名: {{order_info.name}}</div>
				<div class="address-cont" v-if='order_info.address'>收货地址: {{order_info.address[0]}}</div>
			</div>
			<div class="right">
				<img src="./images/right_icon_03.png">
			</div>
		</div>
		<!-- <div class="send-way">
			<h4 class="title ">配送方式</h4>
			<div v-for="item in send_way.text" :class="{current: send_way.current== item}" @click="change_send_way(item)">{{item}}</div>
		</div>
		<div class="accounts_way">
			<h4 class="title">结算方式</h4>
			<div v-for="item in accounts_way.text" :class="{current: accounts_way.current== item}" @click="change_accounts_way(item)">{{item}}</div>
		</div> -->
		<div class="goods-info">
			<ul>
				<li v-for="item in goodsInfo">
					<h4 class="shop-name" @click='toShop(item)'>
						<div class="name">{{item[0].shop_name}}</div>
						<img src="./images/right_icon_03.png">
					</h4>
					<div v-for="goods in item" class="goods-item">
						<div class="left">
							<img :src="'http://202.106.219.6:13799/order/' + goods.url">
							<div class="info">
								<p>{{goods.goods_name}}</p>
								<p>￥{{goods.price}}</p>
								<p>规格: {{goods.standard}}</p>
							</div>
						</div>
						<div class="right">
							× {{goods.count}}
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="time-mark">
			<div class="mark">
				<label for="mark_input">订单备注 :</label>
				<input type="text" name="mark_input" id="mark_input" placeholder="选填" v-model='remark'>
			</div>
			<div class="time">
				<label  for="time_picker">配送时间 :</label>
		 		<popup-picker :data="time_range" v-model="send_time"></popup-picker>
			</div>
		</div>
		<div class="bottom">
			<div class="total-price">
				总计 <span> ￥{{total_price}} </span>
			</div>
			<div class="submit" @click="submit_order">提交订单</div>
		</div>
	</div>	
  </div>
</template>

<script>
import { PopupPicker } from 'vux';
import util from '../../../../assets/js/util.js';
export default {
  name: 'confirmorder',
  created() {
  	this.$store.dispatch('retailer').then((res) => {
  		this.order_info = res.data.data;
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  data () {
    return {
      goodsInfo: this.$store.state.current_order,
      order_info: '',
      send_way: {
      	current: '自提',
      	text: ['自提', '商家配送']
      },
      accounts_way: {
      	current: '在线支付',
      	text: ['在线支付', '货到付款', '定期结算']
      },
      send_time: ['全天'],
      time_range: [['全天','上午5点之前', '上午8点之前', '上午11点之前', '下午3点之前', '上午6点之前', '上午9点之前']],
      remark: ''
    }
  },
  methods:{
  	goBack() {
  		this.$router.go(-1);
  	},
  	change_send_way(current) {
  		this.send_way.current = current;
  	},
  	change_accounts_way(current) {
  		this.accounts_way.current = current;
  	},
  	submit_order() {
  		if(!this.goodsInfo) {
  			return
  		}
  		var order = {};
  		var _ids = '';
  		var _chk_value = '';
  		order.shipping_address = this.order_info.address[0];
  		order.shipping_method = this.send_way.current;
  		order.settlement_method = this.accounts_way.current;
  		order.shoipping_time = this.send_time[0];
  		order.remark = this.remark;
  		for(var i in this.goodsInfo) {
  			this.goodsInfo[i].forEach((value, index) => {
  				_ids += `${value.shopping_cart_id},`;
  				_chk_value += `${value.shopping_cart_id},${value.count},${value.TOTAL}::`;
  				
  			})
  		}
  		order.ids = _ids;
  		order.chk_value = _chk_value;


  		this.$store.dispatch('submit_order',order).then((res) => {
	  		this.$vux.toast.show({
				text: '提交成功',
				type: 'text',
				position: 'bottom',
				time:'2000'
			})
			this.$store.commit('clear_current_order');
			this.$router.push({path: '/retailer/order',query:{limit: 'all'}})
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	toShop(arr) {
  		console.log(arr);
  		var _shop_id = arr[0].shop_id;
  		this.$router.push({path: '/retailer/shop', query: {shop_id: _shop_id}});
  	}
  },
  computed: {
  	total_price() {
  		return  util.computedPrice(this.goodsInfo);
  	}
  },
  components: {
  	PopupPicker
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	.container {
		padding-bottom: 120/@fs;
	}
	.confirmorder {
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
				img {
					display: block;
					width: 40/@fs;
				}
			}
		}
	}
	.address {
		background-color: #fff;
		display: flex;
		justify-content:space-between;
		align-items:center;
		padding: 32/@fs 30/@fs;
		.left {
			color: #959595;
			font-size: 30/@fs;
		}
		.right {
			width: 14/@fs;
			img {
				display: block;
				width: 100%;
			}
		}
	}
	.send-way {
		margin-top: 10/@fs;
		background-color: #fff;
		padding-bottom: 30/@fs;
		padding-left: 30/@fs;
		.title {
			color: #282828;
			font-size: 32/@fs;
			height: 85/@fs;
			line-height: 85/@fs;
			border-bottom: 1px solid #e0e0e0;
			margin-bottom: 30/@fs;
		}
		>div {
			display: inline-block;
			width: 160/@fs;
			height: 60/@fs;
			text-align: center;
			line-height: 60/@fs;
			color: #959595;
			border: 2/@fs solid #959595;
			border-radius: 6/@fs;
			margin-right: 50/@fs;
			font-size: 30/@fs;
			&.current {
				border-color: rgb(241,103,33);
				color: rgb(241,103,33);
				background: url('./images/right.png') no-repeat;
				background-size: 40/@fs 40/@fs;
				background-position: bottom right;
			}
			&:last-child {
				margin-right: 0;
			}
		}
	}
	.accounts_way {
		.send-way;
	}
	.goods-info {
		margin-top: 10/@fs;
		ul {
			li {
				margin-bottom: 10/@fs;
				background: #fff;
				padding-left: 30/@fs;
				.shop-name {
					display: flex;
					justify-content:space-between;
					align-items:center;
					padding: 30/@fs 0;
					.name {
						color: #959595;
						font-size: 30/@fs;
					}
					>img {
						display: block;
						width: 14/@fs;
						margin-right: 30/@fs;
					}
				}
				.goods-item {
					padding: 10/@fs 0;
					border-top: 1px solid #e0e0e0;
					display: flex;
					justify-content:space-between;
					align-items:center;
					.left {
						>img {
							display: inline-block;
							width: 200/@fs;
							height: 150/@fs;
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
						color: #f16721;
						font-size: 32/@fs;
					}
				}
			}
		}
	}
	.time-mark {
		margin-top: 10/@fs;
		background: #fff;
		padding-left: 30/@fs;
		.mark {
			line-height: 84/@fs;
			height: 84/@fs;
			border-bottom: 1px solid #e0e0e0;
			lable {
				color: #282828;
				font-size: 32/@fs;
			}
			input {
				width: 400/@fs;
				padding-left: 20/@fs;
				color: #282828;
				font-size: 28/@fs;
				outline: none;
				border: none;
			}
		}
		.time {
			line-height: 84/@fs;
			height: 84/@fs;
			lable {
				color: #282828;
				font-size: 32/@fs;
			}
			.vux-cell-box {
				display: inline-block;
				padding-left: 20/@fs;
				color: #282828;
				font-size: 28/@fs;
				text-align: left;
				&:before{
					display: none;
				}
			}
		}
	}
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 86/@fs;
		line-height: 86/@fs;
		width: 100%;
		border-top: 1px solid #e0e0e0;
		background: #fff;
		display: flex;
		justify-content:space-between;
		align-items:center;
		.total-price {
			padding-left: 30/@fs;
			color: #282828;
			font-size: 30/@fs;
			span {
				color: #f16721;
				font-size: 36/@fs;
				padding-left: 30/@fs;
			}
		}
		.submit {
			width: 154/@fs;
			text-align: center;
			background-color: #f16721;
			color: #fff;
			font-size: 30/@fs;
		}

	}
</style>
