<template>
    <div id="app">
    	<transition name="fade" >
        	<router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app',
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
    	transition: all .3s linear;
    }
    .fade-leave {
    	transition: all .3s linear;
    }
    .fade-leave-to {
    	/*transform: translateX(100%);*/
    	opacity: 0.5;
    }
}
</style>
