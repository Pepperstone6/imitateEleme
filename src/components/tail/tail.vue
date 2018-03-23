<template>
  <div>
     <div class="tail">
       <router-link class="active" to="#">
        <i class="iconfont home icon-changyonglogo40"></i>
        <div>首页</div>
      </router-link>
      <router-link to="#">
        <i class="iconfont  icon-faxian"></i>
        <div>发现</div>
      </router-link>
      <router-link to="#">
        <i class="iconfont  icon-weibiaoti-"></i>
        <div>订单</div>
      </router-link>
      <router-link to="#">
        <i class="iconfont icon-wodeweijihuo-"></i>
        <div>我的</div>
      </router-link>
     </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
  .tail
    position fixed
    bottom 0
    left 0
    display flex
    width 100%
    text-align center
    background #fff
    z-index 99
    padding .23rem 0
    .active 
      color #0089dc
    a
      flex 1
      text-decoration none
      color #666
      div
        font-size 0.43rem
      .home
        font-size 1.5rem    
    i
      font-size 1rem 
      line-height 1.5rem
</style>
