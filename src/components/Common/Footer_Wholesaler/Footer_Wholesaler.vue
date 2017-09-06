<template>
  <div class="footer">
 	<ul>
 		<li :class="{current: cur===0}" @click='toIndex'>
 			<i class="icon-pfs-shop font"></i>
 			店铺
 		</li>
 		<li :class="{current: cur===1}" @click='toMyretailer'>
 			<i class="icon-pfs-retailer font"></i>
 			我的零售商
 		</li>
 		<li :class="{current: cur===2}" @click='toMessage'>
 			<i class="icon-pfs-message font"></i>
 			消息
 		</li>
 		<li :class="{current: cur===3}" @click='toMore'>
 			<i class="icon-pfs-more font"></i>
 			设置
 		</li>
 	</ul>
  </div>
</template>

<script>
export default {
  name: 'footerwholesaler',
  data () {
  	return {}
  },
  props:['cur'],
  methods: {
  	toIndex() {
  		this.$router.push({ path: '/wholesaler/index' });
  	},
  	toMyretailer() {
  		// this.$router.push({ path: '/wholesaler/myretailer' })
  	},
  	toMessage() {
  		// this.$router.push({ path: '/wholesaler/message' })
  	},
  	toMore() {
  		this.$router.push({ path: '/wholesaler/settlement' })
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
