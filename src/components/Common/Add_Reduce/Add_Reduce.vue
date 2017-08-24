<template>
	 <div class="add-reduce">
		<div class="reduce" @click='reduce'></div>
		<input type="text" v-model='count'>
		<div class="add" @click='add'></div>
	</div>
</template>

<script>
export default {
  name: 'add_reduce',
  data() {
  	return {
  		count: parseInt(this.goods.count) || 1
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
  		}
  	},
  	add() {
  		this.goods.count++;
  		this.count = this.goods.count;
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
  			this.$emit('getCount', this.goods)
  		}
  	},
  	goods(newVal, oldVal) {
  		// console.log(newVal, oldVal);
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
		input {
			height: 36/@fs;
			width: 80/@fs;
			padding-left: 10/@fs; 
			margin: 0 20/@fs;
			outline: none;
			border-radius: 4/@fs;
			border:2/@fs solid #f26721;
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
