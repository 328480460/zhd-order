<template>
  <div class="settlement">
    <div class="header">
		<div class="content">
			<div class="back">
				<img src="./images/back_icon.png" @click='back'>
			</div>
			<div class="title">设置</div>
			<div class="shop">
				商铺
			</div>
		</div>
	</div>
	<div class="function">
		<div class="change-shop">
			<span>切换店铺</span>
			<img src="./images/icon_right_arrow_03.png">
		</div>	
		<div class="re-word">
			<span>修改密码</span>
			<img src="./images/icon_right_arrow_03.png">
		</div>		
		<div class="advise">
			<span>意见反馈</span>
			<img src="./images/icon_right_arrow_03.png">
		</div>
	</div>
	<div class="exit" @click='exit'>
		退出登录
	</div>
	<Footer_Wholesaler :cur='3'></Footer_Wholesaler>
  </div>
</template>

<script>
import util from '../../../../assets/js/util.js';
import Footer_Wholesaler from '../../../Common/Footer_Wholesaler/Footer_Wholesaler.vue'
export default {
  name: 'settlement',
  data () {
    return {
      msg: 'settlement'
    }
  },
  methods: {
  	back() {
  		this.$router.go(-1);
  	},
  	exit() {
  		util.removeCookie('userId');
		util.removeCookie('userType');
		util.removeCookie('nodeId');
		util.removeCookie('userName');
		util.removeCookie('userPassword');
		util.removeCookie('remoberChecked');
  		this.$router.push({path:'/login'})
  	}
  },
  components: {
  	Footer_Wholesaler
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.settlement {
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
				visibility: hidden;
			}
		}
	}
	.function {
		padding-left: 30/@fs;
		background-color: #fff;
		color: #656565;
		font-size: 32/@fs;
		>div {
			height: 100/@fs;
			line-height: 100/@fs;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e0e0e0;
			&:last-child {
				border-bottom: none;
			}
			img {
				display: block;
				padding-right: 30/@fs;
				width: 14/@fs;
			}

		}
	}
	.exit {
		height: 74/@fs;
		width: 650/@fs;
		line-height: 74/@fs;
		text-align: center;
		color: #fff;
		font-size: 32/@fs;	
		margin: 100/@fs auto;
		border-radius: 5/@fs;
		background-color: #f26721;
	}
</style>
