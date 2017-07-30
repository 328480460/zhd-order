<template>
	 <div class="add-reduce">
		<div class="reduce" @click='reduce'></div>
		<input type="text" v-model='count' @input='number_only' @blur='zero_judge' ref='inputbox' >
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
  computed: {
  	// count() {
  	// 	return this.goods.count || 1; 
  	// }
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
  			this.$emit('getCount', this.goods);
  		}
  	},
  	add() {
  		this.goods.count++;
  		this.count = this.goods.count;
  		this.$emit('getCount', this.goods)
  	},
  	number_only() {
  		var value = this.$refs.inputbox.value;
  		if(!(/^[1-9]\d*$/.test(value))) {
  			this.$refs.inputbox.value = value.replace(/[^\d]/g,'');
  		} else {
  			this.goods.count = value;
  			this.count = this.goods.count;
  			this.$emit('getCount', this.goods)
  		}
  		
  		// console.log(value,this.goods.count);
  	},
  	zero_judge() {
  		var value = this.$refs.inputbox.value;
  		if( value == 0 || !value) {
  			this.$refs.inputbox.value = 1;
  			this.goods.count = 1;
  			this.count = this.goods.count;
  			this.$emit('getCount', this.goods);
  		}
  	}
  },
  watch: {
  	count(newVal, oldVal) {
  		console.log(newVal, oldVal)
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
