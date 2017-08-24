<template>
	 <div class="wrapper">
		<div class="car-ctrl">
	   		<div class="header">
		   		<div class="left">
		   			<div class="car-icon">
		   				<i class="icon-buycar" @click='toggleList'></i>
		   				<div class="type-count" v-show='type_count >0 '>{{type_count}}</div>
		   			</div>
		   			<div class="total-price">￥{{total_price}}</div>
		   		</div>
		   		<div class="accounts" @click='to_confirmorder'>结算</div>
	   		</div>
	   		<transition name='fold'>
				<div class="content fold-transition" v-show="listShow" v-if='shop_car.length > 0'>
					<div class="car-head">
						<div class="title">已选商品</div>
						<div class="clear-goods" @click='clear_goods'>
							<img src="./images/delete_icon_03.png">
							删除所有商品
						</div>
					</div>
					<div class="goods-wrapper">
						<div class="goods-item" v-for='(item,key) in this.shop_car' :key=key>
							<div class="goods-name">{{item.goods_name}}</div>
							<div class="goods-name">￥{{item.price}}</div>
							<ShopCarCtrl :goods='item' @getCount='getCount' @deleteGoods='deleteGoods'></ShopCarCtrl>
						</div>
					</div>
				</div>
			</transition>
	   	</div> 

	   	<div class="goods-list-wrapper" v-if='shop_car.length > 0' v-show="listShow" @click='toggleList'>
		</div>
		<div class="ball-container">
	       <transition name='ball-drop' v-for="(ball, key) in balls" :key="key" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
	          <div class="ball" v-show="ball.show">
	            <div class="inner inner-hook"></div>
	          </div>
	        </transition>
	    </div>
	</div>
</template>

<script>
import ShopCarCtrl from '../ShopCarCtrl/ShopCarCtrl.vue';
export default {
  name: 'car_ctrl',
  data() {
  	return {
  		listShow: false,
  		balls: [
          {
            show: false
          },
          {
            show:  false
          },
          {
            show:  false
          },
          {
            show:  false
          },
          {
            show:  false
          },
          {
            show:  false
          }
        ],
        dropBalls:[]
  	}
  },
  props:['shop_car','postion_ele'],
  computed: {
  	
  	type_count() {
  		if(!this.shop_car) {
  			return 0;
  		}
  		return this.shop_car.length;
  	},
  	total_price () {
  		if(!this.shop_car) {
  			return 0;
  		}
  		var allPrice = 0;
  		this.shop_car.forEach((value, index) => {
  			allPrice += value.price * value.count;
  		})
  		return Math.floor(allPrice * 100) / 100;
  	},
  },
  methods: {
  	toggleList() {
  		if(!this.shop_car.length) {
  			return;
  		}
  		this.listShow = !this.listShow;
  	},
  	getCount(goods) {
  		this.$emit('getCount', goods);

  	},
  	deleteGoods(goods) {
  		this.$emit('deleteGoods', goods);
  	},
  	clear_goods() {
  		var _ids = '';
  		this.shop_car.forEach((value,index) => {
  			_ids += (value.shopping_cart_id +',');
  		})
  		this.$emit('clear_goods',_ids);
  	},
  	to_confirmorder() {
  		var _shop_id = this.shop_car.shop_id;
  		var _submit = {
  			_shop_id: this.shop_car
  		}
  		this.$store.commit('create_current_order', _submit);
    	this.$router.push({path: '/retailer/confirmOrder'});
  	},

  	drop(el) { 
      //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) { //将true的小球放到dropBalls
            this.balls[i].el = el; //设置小球的el属性为一个dom对象
            this.balls[i].show = true;
            this.dropBalls.push(this.balls[i]); 
        	// console.log(this.balls);
            return;
          }
        }
      },

	  beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
	    let count = this.balls.length;
	    while (count--) {
	      let ball = this.balls[count];
	      // console.log(ball);
	      if (ball.show) {
	        let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
	        let x = rect.left - 32;
	        let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
	        el.style.display = ''; //清空display
	        el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
	        el.style.transform = `translate3d(0,${y}px,0)`;
	        //处理内层动画
	        let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
	        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
	        inner.style.transform = `translate3d(${x}px,0,0)`;
	      }
	    }
	  },

	  enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
	    let rf = el.offsetHeight; //触发重绘html
	    this.$nextTick(() => { //让动画效果异步执行,提高性能
	      el.style.webkitTransform = 'translate3d(0,0,0)';
	      el.style.transform = 'translate3d(0,0,0)';
	      //处理内层动画
	      let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
	      inner.style.webkitTransform = 'translate3d(0,0,0)';
	      inner.style.transform = 'translate3d(0,0,0)';
	      el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
	    });

	  },

	  afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
	    let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
	    if (ball) {
	      ball.show = false;
	      el.style.display = 'none'; //隐藏小球
	    }
	  }
  },
  watch: {
  	shop_car(newVal, oldVal) {
  		if(newVal.length == 0) {
  			this.listShow = false;
  		}
  	}
  },
  components: {
  	ShopCarCtrl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@fs:100rem;
	.car-ctrl {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #e0e0e0;
		height: 90/@fs;
		background: #fff;
		display: flex;
		justify-content:space-between;
		align-items:center;
		z-index: 88;
		.header {
			width: 100%;
			height: 90/@fs;
			display: flex;
			justify-content:space-between;
			align-items:center;
			background: #fff;
			.left {
				margin-left: 30/@fs;
				.car-icon {
					display: inline-block;
					width: 60/@fs;
					height: 60/@fs;
					background: #f16721;
					border-radius: 100%;
					font-size: 40/@fs;
					text-align: center;
					line-height: 64/@fs;
					position: relative;
					i:before {
						color: #fff;
					}
					.type-count {
						position: absolute;
						right: -16/@fs;
						top: -5/@fs;
						font-size: 18/@fs;
						background: #da2e39;
						height: 36/@fs;
						width: 36/@fs;
						line-height: 38/@fs;
						border-radius: 50%;
						color: #fff;
					}
				}
				.total-price {
					display: inline-block;
					margin-left:30/@fs;			
					color: #f16721;
					font-size: 36/@fs;
				}
			}
			.accounts {
				width: 150/@fs;
				background: #f16721;
				color: #fff;
				font-size: 30/@fs;
				line-height: 90/@fs;
				height: 90/@fs;
				text-align: center;
			}
		}
		.content {
			position: absolute;
			max-height: 480/@fs;
			background: #fff;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			&.fold-transition  {
				transform: translate3d(0,-100%,0);
			}
			&.fold-enter {
				transform: translate3d(0,0,0);
			}
			&.fold-enter-to {
				transition: all .3s linear;
			}
			&.fold-leave-to {
				transition: all .3s linear;
				transform: translate3d(0,0,0);
			} 
			.car-head {
				height: 80/@fs;
				line-height: 80/@fs;
				display: flex;
				justify-content:space-between;
				align-items:center;
				padding: 0 30/@fs;
				color: #282828;
				font-size: 32/@fs;
				.clear-goods {
					color: #656565;
					font-size: 30/@fs;
					img {
						display: inline-block;
						width: 27/@fs;
					}
				}
			}
			.goods-wrapper {
				max-height: 400/@fs;
				overflow-y: scroll;
				overflow-x: hidden;
				.goods-item {
					height: 90/@fs;
					line-height: 90/@fs;
					display: flex;
					justify-content:space-between;
					align-items:center;
					color: #656565;
					font-size: 32/@fs;
					padding: 0 30/@fs;
					border-top: 1px solid #e0e0e0;
					.goods-name {
						width: 380/@fs;
					}
				}
			}
		}
	}
	.goods-list-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 92/@fs;
		right: 0;
		background: rgba(0,0,0,.5);
	}
	.ball-container {
		.ball-drop-enter {

		}

		.ball {
			position:fixed;
	        left: 46/@fs;
	        bottom: 34/@fs;
	        z-index:999;
	        transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	        .inner {
	              width: 30/@fs;
		          height: 30/@fs;
		          border-radius: 50%;
		          background: #e8440c;
		          transition: all .5s linear;
	        }
		}
	}
</style>
