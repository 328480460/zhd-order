<template>
  <div class="index" v-if = 'info'>
		<div class="header">
			{{info.name}}
			<div class="more"></div>
		</div>
		<div class="total-order-info">
			<img src="./images/avata_03.png" class="avata">
			<div class="total-order">
				今日订单 <span class="count">{{info.all_number}}</span> 单
			</div>
		</div>
		<div class="order-nav">
			<div class="wait">
				<p>待付款</p>
				<p>{{info.wait_number}}</p>
			</div>
			<div class="wait">
				<p>已付款</p>
				<p>{{info.already_number}}</p>
			</div>
			<div class="wait">
				<p>已发货</p>
				<p>{{info.deliver_number}}</p>
			</div>
		</div>
		<div class="entry-nav">
			<div class="goods" @click='toGoods'>
				<img src="./images/icon-w_05.png" >
				<p>商品管理</p>
			</div>
			<div class="order" @click='toOrder'>
				<img src="./images/icon-w_07.png">
				<p>订单管理</p>
			</div>
			<div class="shop">
				<img src="./images/icon-w_03.png" >
				<p>店铺管理</p>
			</div>
		</div>
		<Footer_Wholesaler :cur='0'></Footer_Wholesaler>
  </div>
</template>

<script>
import Footer_Wholesaler from '../../../Common/Footer_Wholesaler/Footer_Wholesaler.vue'
export default {
  name: 'Index',
  created() {
  	this.$store.dispatch('wholesaler_index').then((res) => {
  		console.log(res);
  		if(res.data.result) {
  			this.info = res.data.data;
  		}
  	}).catch((err) => {
  		alert(err);
  	})
  },
  data () {
    return {
    	info: null
    }

  },
  methods: {
  	toOrder() {
  		this.$router.push({path: '/wholesaler/order',query: {pay_way:'all',order_state:'wait'}})
  	},
  	toGoods() {
  		this.$router.push({path: '/wholesaler/goods'})
  	}
  },
  components: {
  	Footer_Wholesaler
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	::-webkit-scrollbar{
	    display: none;
	}
	@fs:100rem;
	.index {
		min-height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background-color: #efefef;
	}
	.header {
		background-color: #f26721;
		padding: 20/@fs 0;
		color: #fff;
		position: relative;
		text-align: center;
		font-size: 34/@fs;
		.more {
			position: absolute;
			width: 42/@fs;
			height: 42/@fs;
			right: 30/@fs;
			top: 50%;
			margin-top: -21/@fs;
		}
		&:after {
			content: '';
			width: 42/@fs;
			height: 6/@fs;
			background-color: #fff;
			border-radius: 10/@fs;
			position: absolute;
			right: 30/@fs;
			top: 50%;
			margin-top: -3/@fs;
		}
		&:before {
			content: '';
			width: 42/@fs;
			height: 6/@fs;
			background-color: #fff;
			border-radius: 10/@fs;
			transform: rotate(90deg);
			position: absolute;
			right: 30/@fs;
			top: 50%;
			margin-top: -3/@fs;
		}
	}
	.total-order-info {
		padding:  30/@fs;
		background-color: #f26721;
		.avata {
			width: 142/@fs;
			display: inline-block;
			vertical-align: middle;
		}
		.total-order {
			display: inline-block;
			vertical-align: middle;
			font-size: 34/@fs;
			color: #fff;
			margin-left: 10/@fs;
			.count {
				font-size: 48/@fs;

			}
		}
	}
	.order-nav {
		margin-top: 10/@fs;
		padding: 30/@fs 0 28/@fs 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		text-align: center;
		color: #969696;
		font-size: 32/@fs;
		>div {
			width: 33.33%;
			border-right: 1px solid #e0e0e0;
			&:last-child {
				border-right: 0;
			}
		}
	}
	.entry-nav {
		.order-nav;
		>div {
			border-right:none;
			img {
				width: 50/@fs;
				height: auto;
			}
		}
	}
</style>
