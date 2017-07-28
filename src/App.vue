<template>
    <div id="app">
    	<transition name="fade">
        	<router-view></router-view>
        </transition>
        <!-- <group title="chained columns">
	      
	       <cell title="获取值对应的文字" :value="$refs.picker3&&$refs.picker3.getNameValues()"></cell>
	       <popup-picker :title="title4" :data="list3" :columns="3" v-model="value4" show-name></popup-picker>
     	</group> -->
     	
    </div>
</template>
<script>
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch } from 'vux'

export default {
    name: 'app',
    components: {
	    PopupPicker,
	    Group,
	    Cell,
	},
	data() {
		return {
		value3: [],
		value4: [],
		title3: '联动显示值',
		title4: '联动显示值',
		list3: [{
	        name: '中国',
	        value: 'china',
	        parent: 0
	      }, {
	        name: '美国',
	        value: 'USA',
	        parent: 0
	      }, {
	        name: '广东',
	        value: 'china001',
	        parent: 'china'
	      }, {
	        name: '广西',
	        value: 'china002',
	        parent: 'china'
	      }, {
	        name: '美国001',
	        value: 'usa001',
	        parent: 'USA'
	      }, {
	        name: '美国002',
	        value: 'usa002',
	        parent: 'USA'
	      }, {
	        name: '广州',
	        value: 'gz',
	        parent: 'china001'
	      }, {
	        name: '深圳',
	        value: 'sz',
	        parent: 'china001'
	      }, {
	        name: '广西001',
	        value: 'gx001',
	        parent: 'china002'
	      }, {
	        name: '广西002',
	        value: 'gx002',
	        parent: 'china002'
	      }, {
	        name: '美国001_001',
	        value: '0003',
	        parent: 'usa001'
	      }, {
	        name: '美国001_002',
	        value: '0004',
	        parent: 'usa001'
	      }, {
	        name: '美国002_001',
	        value: '0005',
	        parent: 'usa002'
	      }, {
	        name: '美国002_002',
	        value: '0006',
	        parent: 'usa002'
	      }],
		}
	},
	watch: {
		
	}

}
</script>
<style  lang='less'>
@import './assets/less/reset.less';
@import '~vux/src/styles/reset.less';
body {
    @fs:100rem;
    .fade-enter {
    	/*transform: translateX(100%);*/
    	opacity: 0.5;
    }
    .fade-enter-to {
    	transition: all .5s linear;
    }
    .fade-leave {
    	/*transition: all .5s linear;*/
    }
    .fade-leave-to {
    	/*transform: translateX(-100%);*/
    	opacity: 0.5;
    }
}
</style>
