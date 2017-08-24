<template>
  <div class="order-detail" >
		<div class="header">
			<div class="content">
				<div class="back" @click.stop='goBack'>
					<img src="./images/back_icon.png" >
				</div>
				<div class="title">
					{{order.retailer_name}}
				</div>
				<div class="confirm" >
					确定
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'editOrder',
  created() {
  	this.order = this.$store.state.wholesaler_order_detail.order;
  },
  data () {
    return {
    	
    }

  },
  methods:{
  	goBack() {
  		this.$router.go(-1);
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
	.order-detail {
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
			align-orders: center;
			font-size: 30/@fs;
			.back {
				img {
					display: block;
					width: 24/@fs;
				}
			}
			.title {
				font-size: 32/@fs;
				
			}
			.confirm {
				opacity: 0;
			}
		}
	}
</style>
