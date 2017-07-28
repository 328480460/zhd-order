<template>
  <div class="confirmorder">
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
  </div>
</template>

<script>
export default {
  name: 'confirmorder',
  data () {
    return {
      goodsInfo: this.$store.state.current_order
    }
  },
  methods:{
  	goBack() {
  		this.$store.commit('add_shop_car_multi',this.goodsInfo);
  		this.$router.go(-1);
  	},
  	
  },
  computed: {
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
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

</style>
