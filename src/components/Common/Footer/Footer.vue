<template>
  <div class="footer">
 	<ul>
 		<li :class="{current: cur===0}" @click='toIndex'>
 			<i class="icon-index font"></i>
 			首页
 		</li>
 		<li :class="{current: cur===1}" @click='toClassify'>
 			<i class="icon-classify font"></i>
 			分类
 		</li>
 		<li :class="{current: cur===2}" @click='toBuycar'>
 			<i class="icon-buycar font"></i>
 			购物车
 		</li>
 		<li :class="{current: cur===3}" @click='toMy'>
 			<i class="icon-my font"></i>
 			我的
 		</li>
 	</ul>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
  	return {}
  },
  props:['cur'],
  methods: {
  	toIndex() {
  		this.$router.push({ path: '/retailer/index' });
  	},
  	toClassify() {

  		alert('暂未开放');
  	},
  	toBuycar() {
  		this.$router.push({ path: '/retailer/buycar' })
  	},
  	toMy() {
  		this.$router.push({ path: '/retailer/my' })
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #eee;
		box-sizing: border-box;
		padding: 12/@fs 0;
		height: 110/@fs;
		background-color: #fff;
		ul {
			display: flex;
			text-align: center;
			justify-content: space-between;
			li {
				width: 25%;
				text-align: center;
				color: #656565;
				font-size: 24/@fs;
				.font {
					display: block;
					font-size: 40/@fs;
					margin-bottom: 10/@fs;
				}
				&.current {
					color: #f36721;
					.font:before {
						color: #f36721;
					}
				}

			}
		}
	}
</style>
