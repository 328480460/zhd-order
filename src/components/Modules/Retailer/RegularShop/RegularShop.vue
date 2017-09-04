<template>
  <div class="regular-shop">
    <div class="header">
		<div class="content">
			<div class="back">
				<img src="./images/back_icon.png" @click='back'>
			</div>
			<div class="title">我的常用商铺</div>
		</div>
	</div>
	<div class="shop-list" v-if='regular_info' >
		<div class='shop-item' v-for='shop in regular_info'>
			<div class="left">
				<img src="./images/shop_avata_03.png"  @click.stop='toShop(shop)'>
				<div class="shop-info">
					<div class="name">{{shop.shop_name}}</div>
					<div class="type">经营类型: {{shop.type}}</div>
					<div class="wholesaler-name">经营类型: {{shop.wholesaler_name}}</div>
				</div>
			</div>
			<div class="more" :class='{"allow": shop.allow_order}' @click.stop='showOptation(shop)'>
				<span v-for='i in 3'></span>
			</div>
		</div>
	</div>
	<div class="optation" v-if='optation'>
		<div class="top">
			<div class="allow" @click='allow'>
				<img src="./images/regular_icon_03.png">
				<p>允许代下单</p>
			</div>
			<div class="delete" @click='delete_shop'>
				<img src="./images/regular_icon_05.png">
				<p>删除</p>
			</div>
			<div class="forbiden" @click='forbiden'>
				<img src="./images/regular_icon_07.png">
				<p>禁止代下单</p>
			</div>
		</div>
		<div class="cancle" @click='cancle'>取消</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'regular_shop',
  created() {
  	this.$store.dispatch('regular_shop').then((res) => {
  		if(res.data.result) {
  			this.regular_info = res.data.data;
  		}
  	}).catch((err) => {
  		alert(err);
  	})
  },
  data () {
    return {
      regular_info: null,
      optation: false,
      current_optation: null
    }
  },
  methods: {
  	back() {
  		this.$router.go(-1);
  	},
  	toShop(shop) {
  		this.$router.push({path:'/retailer/shop', query: {shop_id: shop.shop_id}})
  	},
  	showOptation(shop) {
  		this.optation = true;
  		this.current_optation = shop;
  	},
  	allow(){
  		this.current_optation.allow_order = true;
  		// to back
  	},
  	delete_shop() {
  		// to back
  		this.regular_info = this.regular_info.filter((value, index) => {
  			return this.current_optation !== value;
  		})
  	},
  	forbiden() {
  		// to back
  		this.current_optation.allow_order = false;
  	},
  	cancle() {
  		this.optation = false;
  	}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.regular-shop {
		background-color: #efefef;
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
			position: relative;
			text-align: center;
			.back {
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -22/@fs;
				img {
					display: block;
					width: 24/@fs;
				}
			}
			.title {
				font-size: 34/@fs;
			}
		}
	}
	.shop-list {
		width: 100%;
		box-sizing: border-box;
		padding-left: 30/@fs;
		background-color: #fff;
		.shop-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 22/@fs 0;
			border-bottom: 1px solid #e0e0e0;
			&:last-child {
				border-bottom: none;
			}
			.left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				img {
					display: block;
					height: 120/@fs;
				}
				.shop-info {
					margin-left: 20/@fs;
					color: #959595;
				}
			}
			.more {
				margin-right: 30/@fs;
				&.allow {
					position: relative;
					&:after {
						content: '已允许';
						position: absolute;
						width: 100/@fs;
						right: 0;
						top: -90%;
						text-align: right;
						color: #02973f;
						font-size: 32/@fs;
					}
				}
				span {
					display: inline-block;
					width: 6/@fs;
					height: 6/@fs;
					background-color: #959595;
					border-radius: 100%;
					margin-left: 10/@fs;
				}
			}
		}
	}
	.optation {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #efefef;
		padding-top: 30/@fs; 
		.top{
			display: flex;
			width: 70%;
			margin: 0 auto;
			justify-content: space-between;
			text-align: center;
			>div {
				color: #282828;
				font-size: 28/@fs;
				img {
					display: inline-block;
					width: 80/@fs;
				}
			}
		}
		.cancle {
			margin-top: 30/@fs;
			border-top: 1px solid #d7d7d7;
			text-align: center;
			height: 100/@fs;
			line-height: 100/@fs;
		}
	}
</style>
