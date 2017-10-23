<template>
  <div class="login">
  	<img src="./images/logo_03.png" class="logo">
  	<div class="input-wrapper">
  		<input type="text" name="userName" placeholder="用户名或手机号" v-model='userName'>
  		<input type="password" name="userPassword" placeholder="输入密码" v-model='userPassword'>
  	</div>
  	<div class="operation">
  		<div class="remerber-passwrod" @click='remerberPasswrod'>
  			<div class="box">
  				<i class="icon-right" :class='{checked: remoberChecked}'></i>
  			</div>
  			<label>记住密码</label>
  		</div>
  		<div class="reg" @click='reg'>零售商注册</div>
  	</div>
  	<div class="login-btn" @click='login'>登录</div>
  </div>
</template>

<script>
import util from '../../assets/js/util.js';
export default {
  name: 'login',
  created() {
  	if(util.getCookie('remoberChecked')) {
	  	this.userName = util.getCookie('userName') ? util.getCookie('userName'): '';
	  	this.userPassword = util.getCookie('userName') ? util.getCookie('userPassword'): '';
	  	this.remoberChecked = util.getCookie('remoberChecked');
  	}

  },
  data () {
    return {
      	userName: '',
      	userPassword: '',
      	remoberChecked: false
    }
  },
  methods: {
  	reg() {
  		alert('暂未开放');
  	},
  	remerberPasswrod() {
  		this.remoberChecked = !this.remoberChecked
  	},
  	login() {
  		if(!this.userName) {
  			alert('请输入用户名');
  			return	
  		}
  		if(!this.userPassword) {
  			alert('请输入密码');
  			return	
  		}
  		var user = {};
  		user.username = this.userName;
  		user.password = this.userPassword;
  		this.$store.dispatch('login',user).then((res)=> {
			if(res.data[0].result) {
				this.userInfo = res.data[0].data;
				if(this.remoberChecked) {
					util.setCookie('userId',this.userInfo.USERID,30);
					util.setCookie('userType',this.userInfo.USERTYPE,30);
					util.setCookie('nodeId',this.userInfo.NODE_ID,30);
					util.setCookie('userName', this.userName,30);
					util.setCookie('userPassword', this.userPassword,30);
					util.setCookie('remoberChecked', this.remoberChecked,30);
				}else {
					util.setCookie('userId',this.userInfo.USERID);
					util.setCookie('userType',this.userInfo.USERTYPE);
					util.setCookie('nodeId',this.userInfo.NODE_ID);
					util.setCookie('userName', this.userName);
					util.setCookie('userPassword', this.userPassword);
					util.setCookie('remoberChecked', this.remoberChecked);

				}

				if(this.userInfo.USERTYPE == 1003) {
					// 零售商
					this.$router.push({path:'/retailer/index'});
					// this.$router.push({path:'/retailer/market', query: {market_id: this.userInfo.NODE_ID}});

				}
				if(this.userInfo.USERTYPE == 1002) {
					// 零售商
					this.$router.push({path:'/wholesaler/index'});
				}

			} else {
				alert(res.data[0].message);
			}
  		}).catch((res) => {
  			alert('登录失败');
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	::-webkit-input-placeholder {
	    color: #989898;
	    font-size: 30/@fs;
	}
	@fs: 100rem;
	.login {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		min-height: 100%;
		background-color: #f0f0f0;
	}
	.logo {
		width: 325/@fs;
		display: block;
		margin: 150/@fs auto 0;
	}
	.input-wrapper {
		background-color: #fff;
		width: 650/@fs;
		margin: 110/@fs auto 0;
		border-radius: 8/@fs;
		input {
			width: 100%;
			height: 100/@fs;
			box-sizing: border-box;
			padding-left: 40/@fs;
			border: none;
			display: block;
			outline: none;
			border-bottom: 1px solid #e0e0e0;
			background-color: transparent;
			font-size: 30/@fs;
			&:last-child{
				height: 99/@fs;
				border-bottom: none;
			}
		}
	}
	.operation {
		width: 650/@fs;
		margin: 20/@fs auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #989898;
		font-size: 30/@fs;
		.remerber-passwrod {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.box {
				width: 25/@fs;
				height: 25/@fs;
				border: 2/@fs solid #d9d9d9;
				position: relative;
				i {
					display: none;
					font-size: 60/@fs;
					position: absolute;
					top: 50%;
					left: 50%;
					margin-left: -30/@fs;
					margin-top: -30/@fs;
					&.checked {
						display: block;
					}
				}
			}
			label {
				margin-left: 20/@fs;
			}
		}
	}
	.login-btn {
		width: 650/@fs;
		height: 66/@fs;
		line-height: 68/@fs;
		margin: 76/@fs auto;
		border-radius: 8/@fs;
		text-align: center;
		color: #fff;
		font-size: 32/@fs;
		background-color: #f16721;
	}
</style>
