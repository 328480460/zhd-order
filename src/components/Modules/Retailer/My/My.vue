<template>
  <div class="my">
    	<div class="container">
    		<div class="user-info">
    			<h2 class="title">我的<span class="admin">账户管理&gt;</span></h2>
    			<img src="./images/avata_03.png" class="avata">
    			<p class="username">{{info.user_name}}</p>
    		</div>
    		<div class="myorder">
    			<div class="content">
	    			<div class="title">我的订单</div>
	    			<div class="allOrder" @click='toOrder("all")'>全部订单&gt;</div>
    			</div>
    		</div>
    		<div class="line"></div>
    		<div class="pay-state" >
    			<div class="no-pay" @click='toOrder("noPay")'>
    				<img src="./images/icon_03.png">
    				待付款
    			</div>
    			<div class="no-send" @click='toOrder("send")'>
    				<img src="./images/icon_05.png">
    				已发货
    			</div>
    			<div class="no-receive" @click='toOrder("pay")'>
    				<img src="./images/icon_07.png">
    				已付款
    			</div>
    		</div>
    		<div class="line"></div>
    		<div class="fast-enter">
    			<ul>
    				<li>
    					<img src="./images/icon_13.png" class="icon">
    					<p>我的优惠券</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    				<li>
    					<img src="./images/icon_16.png" class="icon">
    					<p>收藏商铺</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    				<li>
    					<img src="./images/icon_18.png" class="icon">
    					<p>我的地址</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    				<li>
    					<img src="./images/icon_20.png" class="icon">
    					<p>推荐给好友</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    				<li>
    					<img src="./images/icon_22.png" class="icon">
    					<p>联系我们</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    				<li>
    					<img src="./images/icon_24.png" class="icon">
    					<p>设置</p>
    					<img src="./images/right_icon_03.png" class="right_arrow">
    				</li>
    			</ul>
    		</div>
    	</div>
    	<v_footer :cur="3"></v_footer>
  </div>
</template>

<script>
import v_footer from '../../../Common/Footer/Footer.vue'
export default {
  name: 'my',
  created() {
  	this.$store.dispatch('retailer').then((res) => {
  		console.log(res);
		if(res.data.result) {
  			this.info = res.data.data;
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
  	toOrder(keyWord) {
  		this.$router.push({path:'/retailer/order', query: { limit: keyWord }});
  	}
  },
  components: {
  	v_footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	.container {
		padding-bottom: 120/@fs;
	}
	.user-info {
		width: 100%;
		background-color: #f26721;
		text-align: center;
		color: #fff;
		.title {
			width: 690/@fs;
			margin: 0 auto;
			font-size: 34/@fs;
			padding-top: 20/@fs;
			position: relative;
			.admin {
				position: absolute;
				top: 20/@fs;
				right: 0;
			}
		}
		.avata {
			width: 142/@fs;
			display: block;
			margin: 50/@fs auto 20/@fs;
		}
		.username {
			font-size: 34/@fs;
			padding-bottom: 30/@fs;
		}
	}
	.line {
		width: 100%;
		height: 10/@fs;
		background-color: #f5f5f5;
	}
	.myorder {
		width: 100%;
		background-color: #fff;
		.content {
			width: 690/@fs;
			margin: 0 auto;
			color: #656565;
			font-size: 32/@fs;
			display: flex;
			justify-content: space-between;
			height: 90/@fs;
			line-height: 90/@fs;
			.allOrder	 {
				color: #f26721;
			}
		}
	}
	.pay-state {
		width: 100%;
		display: flex;
		justify-content: sapce-between;
		text-align: center;
		padding: 28/@fs 0 22/@fs 0;
		background-color: #fff;
		>div {
			flex:1 0 auto;
			position: relative;
			&:after {
				content: '';
				width: 1px; 
				height: 100/@fs;
				position: absolute;
				right: 0;
				top: 0;
				background-color: #eee;
			}
			&:last-child:after {
				display: none;
			}
			img {
				display: block;
				width: 50/@fs;
				margin: 0 auto 22/@fs;
			}
		}
	}
	.fast-enter {
		background-color: #fff;
		width: 100%;
		ul {
			margin-left: 30/@fs;
			li {
				font-size: 32/@fs;
				color: #282828;
				height: 100/@fs;
				line-height: 100/@fs;
				position: relative;
				border-bottom: 1px solid #eee;
				&:last-child {
					border: none;
				}
				.icon {
					width: 34/@fs;
					display: inline-block;
					vertical-align: middle;
				}
				p {
					display: inline-block;
					vertical-align: middle;
					margin-left: 20/@fs;
				}
				.right_arrow {
					height: 28/@fs;
					display: inline-block;
					vertical-align: middle;
					position: absolute;
					right: 30/@fs;
					top: 50%;
					margin-top: -14/@fs;
				}
			}
		}
	}
</style>
