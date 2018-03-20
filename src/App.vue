<template>
    <div id="app">
    	<transition name="fade" >
            <keep-alive :include="['searchbox', 'wholesalerorder']">
        	   <router-view></router-view>
                </keep-alive>  
        </transition>
    </div>
</template>
<script>
export default {
  name: "app",
  created() {}
};
</script>
<style  lang='less'>
@import "./assets/less/reset.less";
@import "~vux/src/styles/reset.less";
body {
  @fs: 100rem;
  .fade-enter {
    /*transform: translateX(100%);*/
    opacity: 0.5;
  }
  .fade-enter-to {
    transition: all 0.3s linear;
  }
  .fade-leave {
    transition: all 0.3s linear;
  }
  .fade-leave-to {
    /*transform: translateX(100%);*/
    opacity: 0.5;
  }
}
</style>
