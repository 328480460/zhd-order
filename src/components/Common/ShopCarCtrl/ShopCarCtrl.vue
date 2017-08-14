<template>
	 <div class="add-reduce">
		<div class="reduce" @click='reduce'></div>
		<div class="count">{{count}}</div>
		<div class="add" @click='add'></div>
	</div>
</template>

<script>
export default {
  name: 'add_reduce',
  data() {
  	return {
  		count: this.goods.count || 1
  	}
  },
  props:{
  	goods: {
  		type: Object,
  	}
  },
  methods: {
  	reduce() {
  		if(this.goods.count > 1) {
  			this.goods.count--;
  			this.count = this.goods.count;
  			this.$emit('getCount', this.goods)
  		} else {
  			console.log(this.goods.count);
  			this.$emit('deleteGoods',this.goods)
  		}
  	},
  	add() {
  		this.goods.count++;
  		this.count = this.goods.count;
  		this.$emit('getCount', this.goods)
  	}
  },
  watch: {
  	count(newVal, oldVal) {
		// console.log(newVal, oldVal);
  		if(!(/^[1-9]\d*$/.test(newVal))) {
  			this.goods.count = oldVal;
  			this.count = this.goods.count;
  		} else {
  			this.goods.count = parseInt(newVal);
  			this.count = this.goods.count;
  		}
  	},
  	goods(newVal, oldVal) {
  		
  		this.count = this.goods.count;
  	}
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.add-reduce {
		display: flex;
		align-items:center;
		vertical-align: middle;
		.reduce {
			width: 50/@fs;
			height: 50/@fs;
			border-radius: 4/@fs;
			background-color: #f26721;
			font-size: 40/@fs;
			color: #fff;
			text-align: center;
			line-height: 50/@fs;
			position: relative;
			&:after {
				content: '';
				width: 30/@fs;
				height: 4/@fs;
				background-color: #fff;
				border-radius: 2/@fs;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -15/@fs;
				margin-top: -2/@fs;
			}
		}
		.count {
			height: 36/@fs;
			line-height: 36/@fs;
			width: 60/@fs;
			text-align:center;
			margin: 0 20/@fs;
			border:none;
		}
		.add {
			.reduce;
			&:before {
				content: '';
				width: 30/@fs;
				height: 4/@fs;
				background-color: #fff;
				border-radius: 2/@fs;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -15/@fs;
				margin-top: -2/@fs;
				transform: rotate(90deg);
			}
		}

	}
</style>
