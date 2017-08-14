<template>
  <div class="searchbox">
  	<div class="contianer">
	  	<div class="header" >
			<div class="content">
				<div class="back" @click="goBack">
					<img src="./images/back_icon.png">
				</div>
				<div class="search-box">
					<img src="./images/search_icon_06.png" >
					<input type="text" name="search" placeholder="输入批发商或商品名称"  v-model="key_word" @focus='openFlag' @blur='closeFlag'>
				</div>
				<img class="message" src="./images/search_icon.png" @click='searchResult(key_word)'>
			</div>
		</div>
		<div class="content">
			<div class="step-1" v-if="step === 1">
				<div class="hot">
					<h4 class="title">热门搜索</h4>
					<ul>
						<li v-for="(item, key) in search_info.hot" :key=key @click="fastEnter(item)">{{item}}</li>
					</ul>
				</div>
				<div class="history" v-if="history.length">
					<h4 class="title">搜索历史</h4>
					<ul>
						<li v-for="(item, key) in search_info.hostory" :key=key @click="fastEnter(item)">{{item}}</li>
					</ul>
					<div class="clear-history" @click="clear_history" >
						清空搜索历史
					</div>
				</div>
			</div>
			<div class="step-2" v-if="step === 2">
				<ul v-if="search_key">
					<li v-for="(item, key) in search_key" @click='searchResult(item)'>{{item}}</li>
				</ul>
			</div>
			<div class="step-3" v-if="step === 3" >
				<div class="have-buy" v-if="have_buy.length > 0 "> 
					<h4>已买过的商品</h4>
					<ul>
						<li v-for="item in have_buy" class="goods-item">
							<div class="head">
								<div class="market-name">
									{{item.market_name}}
								</div>
								<img src="./images/icon_right_arrow_03.png">
							</div>
							<div class="cont">
								<img src="./images/goods_07.png">
								<div class="goods-info">
									<p class="goods-name">{{item.goods_name}}</p>
									<p class="price-standard">
										<span class="price">￥{{item.price}}</span>
										<span class="standard">规格:{{item.standard}}</span>
									</p>
									<div class="add-reduce-car">
										<Add_Reduce @getCount='getCount' :goods='item'></Add_Reduce>
										<div class="add-car" @click='add_car(item)'>
											添加
										</div>
									</div>
								</div>
							</div>
							<div class="foot" @click='toShop(item)'>{{item.shop_name}}</div>
						</li> 
					</ul>
				</div>
				<div class="first-buy" v-if="first_buy.length > 0 ">
					<h4>未购买过的商品</h4>
					<ul class="goods-list" ref='goodsList'>
						<li v-for="item in first_buy" class="goods-item">
							<div class="head">
								<div class="market-name">
									{{item.market_name}}
								</div>
								<img src="./images/icon_right_arrow_03.png">
							</div>
							<div class="cont">
								<img src="./images/goods_07.png">
								<div class="goods-info">
									<p class="goods-name">{{item.goods_name}}</p>
									<p class="price-standard">
										<span class="price">￥{{item.price}}</span>
										<span class="standard">规格:{{item.standard}}</span>
									</p>
									<div class="add-reduce-car" >
										<Add_Reduce @getCount='getCount' :goods='item'></Add_Reduce>
										<div class="add-car" @click='add_car(item)'>
											添加
										</div>
									</div>
									
								</div>
							</div>
							<div class="foot" @click='toShop(item)'>{{item.shop_name}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import Add_Reduce from '../../../Common/Add_Reduce/Add_Reduce.vue';

export default {
  name: 'searchbox',
  created() {
  	this.$store.dispatch('retailer_search').then((res) => {
  		// console.log(res.data)
  		if(res.data.result) {
  			this.search_info = res.data.data;
  		}
  	}).catch((res) => {
  		alert('ERROR');
  	})
  },
  mounted() {
  	var path = this.$route.path;
  	if(path !== "/retailer/searchbox") {
  		return
  	}
  	var _this = this;
  	var li = '';
  	var last_li = '';
  	var last_li_h = '';
  	var headerH = '';
  	var windowH = document.querySelector('.searchbox').clientHeight;
  	
  	this.upload = function(){
  		if(_this.isLoading) {
  			return;
  		}
  		if(_this.finish) {
  			if(_this.isToasting) {
  				return
  			}
  			_this.$vux.toast.show({
				text: '没有更多数据',
				type: 'text',
				position: 'bottom',
				time:'2000'
			})
			_this.isToasting = true;
  			return;
  		}
  		if(!li) {
  			li = _this.$refs.goodsList.querySelectorAll('.goods-item');
  			last_li = li[li.length-1] ;
  			last_li_h = last_li.offsetHeight;
  			headerH = document.querySelector('.header').offsetHeight;
  		}
		// console.log(windowH + document.body.scrollTop, last_li.offsetTop + last_li_h );
		if(document.body.scrollTop + windowH > last_li.offsetTop + last_li_h) {
			_this.isLoading = true;
			// console.log('get');
			_this.$store.dispatch('retailer_search',{'key_word': _this.key_word,'page': ++_this.page}).then((res) => {
				var res = res.data.data.result.first_buy;
				if(res) {
					_this.search_info.result.first_buy = _this.search_info.result.first_buy.concat(res);
					_this.isLoading = false;
					li = '';
					// console.log(res.length);
					if(res.length < 10) {

						_this.finish = true;
					}
				} 
				
		  	}).catch((res) => {
		  		alert('ERROR');
		  	})

		}

  	}
  	window.addEventListener('scroll',this.upload,false);

  },
  data () {
    return {
    	search_info: '',
    	key_word: '',
      	step: 1,
      	flag: true,
      	page: 1,
      	isLoading : false,
  		finish: false,
  		isToasting: false
    }
  },
  computed: {
  	history() {
  		if(!this.search_info) {
  			return [];
  		}
  		return this.search_info.hostory;
  	},
  	search_key() {
  		if(!this.search_info) {
  			return [];
  		}
  		return this.search_info.key_word;
  	},
  	have_buy() {
  		if(!this.search_info) {
  			return [];
  		}
  		return this.search_info.result.have_buy;
  	},
  	first_buy() {
  		if(!this.search_info) {
  			return [];
  		}
  		return this.search_info.result.first_buy;
  	}
  },
  methods: {
  	goBack() {
  		this.$router.go(-1);
  	},
  	turnStep(step) {
		this.step = step;
  	},
  	openFlag() {
  		this.flag = true;
  	},
  	closeFlag() {
  		if(this.step !== 1) {
			this.flag = false;
  		}
  	},
  	serachKey(keyword) {
  		// console.log('serachKey');
  		this.page = 1;
  		this.$store.dispatch('retailer_search',{'key_word': keyword, 'page':this.page}).then((res) => {
  			// console.log(res)
  			this.search_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	serachGoods(keyword) {
  		document.body.scrollTop = 0;
  		this.page = 1;
  		this.isLoading = false;
  		this.finish = false;
  		this.isToasting =  false;
  		this.$store.dispatch('retailer_search',{'key_word': keyword, 'page':this.page, history: true}).then((res) => {
  			// console.log(res)
  			this.search_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	fastEnter(val) {
  		this.key_word = val;
  	},
  	searchResult(val) {
  		if(!val) {
  			return;
  		}
  		this.key_word = val;
  		this.flag = false;
  		this.turnStep(3);
  		this.serachGoods(this.key_word );
  	},
  	clear_history() {
  		this.$store.dispatch('retailer_search', {'option': 'delete_history'}).then((res) => {
	  		this.search_info = res.data.data;
	  	}).catch((res) => {
	  		alert('ERROR');
	  	})
  	},
  	getCount(value) {
  		// console.log(value);
  	},
  	add_car(goods) {
  		// console.log(obj);
  		if(!goods.count) {
  			goods.count = 1;
  		}

  		this.$store.dispatch('add_goods', goods).then((res) => {
	  		console.log(res.data);
	  	}).catch((res) => {
	  		alert('ERROR');
	  	});

  		this.$vux.toast.show({
			text: '添加成功',
			type: 'text',
			position: 'bottom',
			time:'800'
		})
	},
	toShop(item) {
		this.$router.push({path:'/retailer/shop',query:{shop_id:item.shop_id}});
	}	
  },
  watch: {
  	key_word(newVal, oldVal) {
  		// console.log(newVal, oldVal);
  		if(newVal == '' && this.flag) {
  			this.page = 1;
  			this.turnStep(1);
  			return
  		}
  		if(newVal !== oldVal && this.flag) {
  			this.page = 1;
  			this.turnStep(2);
  			this.serachKey(newVal);
  		}

  	}
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log('leave');
    window.removeEventListener('scroll',this.upload,false);
    next();
  },
  components: {
  	Add_Reduce
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@fs:100rem;
	.searchbox {
		background-color: #f0f0f0;
		min-height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		
	}
	.header {
		width: 100%;
		background-color: #f36721;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.content {
			width: 690/@fs;
			height: 80/@fs;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			font-size: 30/@fs;
			color: #fff;
			align-items: center;
			.back {
				width: 24/@fs;
				img {
					display: block;
					width: 100%;
				}
			}
			.search-box {
				width: 500/@fs;
				border-radius: 29/@fs;
				background-color: #fff;
				outline: none;
				>img {
					width: 30/@fs;
					height: 30/@fs;
					display: inline-block;
					margin-left: 34/@fs;
					vertical-align: middle;
				}

				input {
					padding: 0;
					height: 100%;
					outline: none;
					width: 380/@fs;
					font-size: 26/@fs;
					color: #979797;
					display: inline-block;
					margin-left: 12/@fs;
					vertical-align: middle;
					border:none;
					height: 58/@fs;
					line-height: 58/@fs;
				}
			}
			.message {
				width: 46/@fs;
				height: 46/@fs;
			}
		}
	}
	.content {
		margin-top: 80/@fs;
		.step-1 {
			.hot {
				background-color: #fff;
				padding-left: 30/@fs;
				.title {
					color: #282828;
					font-size: 32/@fs;
					height: 90/@fs;
					line-height: 90/@fs;
					font-weight: 700;
				}
				ul {
					border-top: 1px solid #eee;
					box-sizing: border-box;
					padding: 20/@fs 0;
					li {
						display: inline-block;
						color: #656565;
						font-size: 30/@fs;
						vertical-align: middle;
						padding: 10/@fs 30/@fs;
						border-radius: 26/@fs;
						background-color: #f0f0f0;
						margin-right: 20/@fs;
						margin-bottom:15/@fs;
					}
				}
			}
			.history {
				margin-top: 24/@fs;
				.title {
					color: #282828;
					font-size: 32/@fs;
					height: 90/@fs;
					line-height: 90/@fs;
					font-weight: 700;
					background-color: #fff;
					padding-left: 30/@fs;
				}
				ul {
					background-color: #fff;
					padding-left: 30/@fs;
					li {
						  color: #656565;
						  line-height: 100/@fs;
						  border-top: 1px solid #eee;
					}
				}
				.clear-history {
					font-size: 30/@fs;
					color: #969696;
					width: 240/@fs;
					height: 56/@fs;
					border:2/@fs solid #969696;
					text-align: center;
					line-height: 57/@fs;
					text-align: center;
					margin: 80/@fs auto 0;
					border-radius: 4/@fs;
				}
			}
		}
		.step-2 {
			ul {
				background-color: #fff;
				li {
				  margin-left: 30/@fs;
				  color: #656565;
				  line-height: 100/@fs;
				  border-top: 1px solid #eee;
				}
			}
		}
		.step-3 {
			.have-buy {
				h4 {
					color: #969696;
					font-size: 32/@fs;
					padding: 30/@fs 0 15/@fs 30/@fs;	
				}
				ul {
					li {
						padding-left: 30/@fs;
						background-color: #fff;
						margin-bottom: 10/@fs;
						.head {
							display: flex;
							justify-content:space-between;
							align-items:center;
							height: 86/@fs;
							line-height: 86/@fs;
							border-bottom: 1px solid #eee;
							.market-name {
								color: #282828;
								font-size: 32/@fs;
							}
							>img {
								display: block;
								width: 14/@fs;
								margin-right: 30/@fs;
							}
						}
						.cont {
							display: flex;
							padding: 16/@fs 0;
							border-bottom: 1px solid #eee;
							justify-content:space-between;
							img {
								display: block;
								width: 200/@fs;
								height: 150/@fs;
							}
							.goods-info {
								width: 430/@fs;
								margin-right: 30/@fs;
								color: #969696;
								font-size: 30/@fs;
								.goods-name {
					
								}
								.price-standard {
									.standard {
										margin-left: 50/@fs;
									}
								}
								.add-reduce-car {
									display: flex;
									justify-content: space-between;
									margin-top: 6/@fs;
									.add-car {
										width: 100/@fs;
										height: 50/@fs;
										line-height: 50/@fs;
										background: #f26721;
										color: #fff;
										text-align: center;
										font-size: 28/@fs;
										border-radius: 4/@fs;
									}
								}
								
							}
						}
						.foot {
							color: #282828;
							font-size: 30/@fs;
							height: 86/@fs;
							line-height: 86/@fs;
						}
					}
				}
			}
			.first-buy {
				.have-buy;
			}
		}
	}
</style>
