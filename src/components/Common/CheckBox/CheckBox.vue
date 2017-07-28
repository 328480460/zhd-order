<template>
	 <div class="checkbox" @click='change'>
     <i class="icon-right" :class='{show: isChecked}' ></i>
   </div>
</template>

<script>
export default {
  name: 'checkbox',
  data() {
  	return {

  	}
  },
  props:{
  	goods: {
  		type: Object,
  	}
  },
  computed: {
    isChecked() {
        return this.goods.isChecked
    }
  },
  methods: {
    change() {
      this.goods.isChecked = !this.goods.isChecked;
      this.$emit('getCheckState', this.goods)
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.checkbox {
    display: inline-block;
    height: 24/@fs;
    width: 24/@fs;
    border: 2/@fs #e3e3e3 solid;
    border-radius: 4/@fs;
    position: relative;
    margin-right: 20/@fs;
    overflow: hidden;
    i {
      position: absolute;
      font-size: 60/@fs;
      left: 50%;
      top: 50%;
      margin-left: -30/@fs;
      margin-top: -30/@fs;
      display: none;
      &.show {
        display: block;
      }

    }
  }

</style>
