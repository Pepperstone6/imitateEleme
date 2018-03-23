<template>
  <div >
    <div class="searchWr">
      <router-link to="#">
          <span>搜索你喜欢的商品</span>
      </router-link> 
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
.searchWr
    background-image: -webkit-gradient(linear,left top,right top,from(#0af),to(#0085ff));
    background-image: -webkit-linear-gradient(left,#0af,#0085ff);
    background-image: linear-gradient(90deg,#0af,#0085ff);
    padding: .2rem .373333rem;
    padding: 2vw 3.733333vw;
    margin: -.013333rem 0;
    margin: -.133333vw 0;
    a
      display: flex;
      width: 100%;
      height: .96rem;
      height: 9.6vw;
      background #fff
      justify-content center
      font-size 0.43rem
      color #666
      text-decoration none
      align-items center
</style>
