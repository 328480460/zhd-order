<template>
  <div class="shop-detail">
   	<div class="header">
		<div class="content">
			<div class="back">
				<img src="./images/back_icon.png" @click='back'>
			</div>
			<div class="title">商铺详情</div>
			<div class="shop" >
				购物
			</div>
		</div>
	</div>
	<div class="shop-name">
		<div class="left">
			<img :src="'http://202.106.219.6:13799/order/' + shop_info.avata" class="shop-avata">
			<p>{{shop_info.shop_name}}</p>
		</div>
		<div class="usual" v-if='shop_info.usually'>
			<i class="icon-collected" ></i>
			<span>已添加</span>
		</div>
		<div class="usual" v-else @click='add_usual'>
			<i class="icon-no-collect" ></i>
			<span>添加常用</span>
		</div>
	</div>
	<div class="introduce">
		<div class="market-name">
			<img src="./images/shop_icon_03.png">
			<span>{{shop_info.market_name}}</span>
		</div>
		<div class="address">
			<img src="./images/shop_icon_06.png">
			<span>{{shop_info.AREA_NAME}}</span>
		</div>
		<div class="tel">
			<img src="./images/shop_icon_09.png">
			<span>{{shop_info.phone}}</span>
		</div>
	</div>
	<div class="server">
		<h4 class="title">商家服务</h4>
		<div class="content">
			<p class="type">经营类型: {{shop_info.shop_name}}</p>
			<p class="area">配送范围: {{shop_info.send_area}}</p>
			<p class="limit-tile">截单时间: {{shop_info.shop_name}}</p>
			<p class="send-way">配送方式: {{shop_info.shop_name}}</p>
		</div>
	</div>
	<div class="brief">
		<h4 class="title">店铺简介</h4>
		<div class="content">
			{{shop_info.shop_name}}
			岳各庄批发市场店铺岳各庄批发市场店铺岳各庄批发市场店铺岳各庄批发市场店铺岳各庄批发市场店铺岳各庄批发市场店铺
			
		</div>
	</div>
	<div class="more-introduce">
		<p>更多资质</p>
		<img src="./images/icon_right_arrow_03.png">
	</div>
  </div>
</template>
	
<script>
import { mapState } from 'vuex';
export default {
  name: 'shopDetail',
  data () {
  	return {
     	
    }
  },
  computed: mapState({
  	shop_info: state => state.shop_detail
  }),
  methods: {
  	back() {
  		this.$router.go(-1);
  	},
  	add_usual() {
  		this.$store.dispatch('shop_add_usual',{shop_id:this.shop_info.shop_id}).then((res) => {
  			if(res.data.result) {
  				this.shop_info.usually = true;
  			}
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});
  	},

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	::-webkit-scrollbar {display:none;}
	.shop-detail {
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
				opacity: 0;
			}
		}
	}
	.shop-name {
		background-color: #fff;
		padding: 20/@fs 30/@fs;
		display: flex;
		justify-content:space-between;
		align-items:center;
		.left {
			display: flex;
			align-items:center;
			.shop-avata {
				width: 160/@fs;
				height: 120/@fs;
				
			}
			p {
				display: inline-block;
				color: #959595;
				font-size: 30/@fs;
				margin-left: 10/@fs;
			}
		}
		.usual {
			color: #959595;
			font-size: 24/@fs;
		}
	}
	.introduce {
		background-color: #fff;
		padding-left: 30/@fs;
		color: #979797;
		font-size: 32/@fs;
		margin-top: 10/@fs;
		>div {
			height: 100/@fs;
			line-height: 100/@fs;
			border-bottom: 1px solid #e0e0e0;
			&:last-child {
				border-bottom: 0;
			}
			>img {
				display: inline-block;
				width: 30/@fs;
				vertical-align: middle;
			}
			span {
				display: inline-block;
				vertical-align: middle;
				padding-left: 12/@fs;
			}

		}
	}
	.server {
		margin-top: 10/@fs;
		padding-left: 30/@fs;
		background-color: #fff;
		.title {
			height: 88/@fs;
			line-height: 88/@fs;
			color: #282828;
			font-size: 32/@fs;
			border-bottom: 1px solid #e0e0e0;
		}
		.content {
			color: #959595;
			font-size: 30/@fs;
			padding: 20/@fs 0;
			line-height: 1.8;
		}
	}
	.brief {
		margin-top: 10/@fs;
		padding-left: 30/@fs;
		background-color: #fff;
		.title {
			height: 88/@fs;
			line-height: 88/@fs;
			color: #282828;
			font-size: 32/@fs;
			border-bottom: 1px solid #e0e0e0;
		}
		.content {
			color: #959595;
			font-size: 30/@fs;
			padding: 20/@fs 30/@fs 20/@fs 0;
			line-height: 1.8;
		}
	}
	.more-introduce {
		background-color: #fff;
		padding: 0 30/@fs;
		margin-top: 10/@fs;
		height: 88/@fs;
		line-height: 88/@fs;
		color: #282828;
		font-size: 32/@fs;
		display: flex;
		justify-content: space-between;
		align-items: center;
		img {
			width: 14/@fs;
		}
	}
</style>
