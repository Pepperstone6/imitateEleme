<template>
  <div id="shop">
    <div v-if="shopInfo" class="shopHead">
      <nav class="nav">
        <router-link class="goback" to="#">
          <i class="icon-fanhui iconfont"></i>
        </router-link>
      </nav>
      <div class="shopInfo">
        <img :src="shopInfo.image_path | imgUrl" alt="">
        <div class="info">
          <h2>
            <span class="isbrand" v-if="shopInfo.is_premium">品牌<span>品牌</span></span>
            <span>{{shopInfo.name}}</span>
            <i class="iconfont icon-jiantou1"></i>
          </h2>
          <div class="info-xj">
            <span>{{shopInfo.rating}}</span>
            <span>月售{{shopInfo.recent_order_num}}单</span>
            <span>商家配送 约{{shopInfo.order_lead_time}}分钟</span>
            <span>距离{{shopInfo.distance | distance}}</span>
          </div>
          <p class="promotion_info">
            {{shopInfo.promotion_info}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { setSession, getSession } from '@/common/public'
export default {
  data () {
    return {
      shopId: null,
      latitude: null,
      longitude: null,
      shopInfo: null
    }
  },
  created () {
    const _this = this
    _this.latitude = getSession('latitude')
    _this.longitude = getSession('longitude')
    // https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=311914
    //https://h5.ele.me/restapi/shopping/restaurant/311914?
    // extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal
    // =h5&latitude=31.23037&longitude=121.473701
    //https://h5.ele.me/restapi/ugc/v3/restaurants/311914/ratings?has_content=true&offset=0&limit=8

    _this.shopId = _this.$route.params.shopId
    console.log(this.shopId)
    axios.get(
      `/apis/restapi/shopping/restaurant/${_this.shopId}?
    extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal
    =h5&latitude=${_this.latitude}&longitude=${_this.longitude}`
    ).then(data => {
      console.log(data)
      this.shopInfo = data.data
    })
  }
}
</script>
<style lang="stylus" scoped>
a
  text-decoration none
#shop
    .nav
      background-image url("https://fuss10.elemecdn.com/7/75/06769a8d2e4f7986cbf95766651d9jpeg.jpeg?imageMogr/format/webp/thumbnail/!40p/blur/50x40/")
      background-size: cover;
      background-repeat: no-repeat;
      padding: .106667rem .266667rem;
      padding: 1.066667vw 2.666667vw;
      height: 1.6rem;
      height: 16vw;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: justify;
      align-items: justify;
      position: relative;
      color: #333;
      font-size: .293333rem;
      &::before
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(119,103,137,.43) 
      .goback
        outline: none;
        color: inherit;
        text-decoration: none;
        z-index 9
        i
          color #fff
          font-size .56rem
    .shopInfo
      padding: .8rem .4rem 0;
      padding: 8vw 4vw 0;
      position: relative;
      display: -webkit-flex;
      display: flex;
      background-color: #fff;
      text-align: center;
      img 
        width: 1.733333rem;
        width: 17.333333vw;
        height: 1.733333rem;
        height: 17.333333vw;
        border-radius: .053333rem;
        border-radius: .533333vw;
        box-shadow: 0 0 0.04rem 0 rgba(0,0,0,.2);
        box-shadow: 0 0 0.4vw 0 rgba(0,0,0,.2);
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -1rem;
        margin-left: -10vw;
        margin-top: -1.2rem;
        margin-top: -12vw;
      .info
        -webkit-flex: 1;
        flex: 1;
        width: 7.2rem;
        width: 72vw;
        color: #333;
        font-size: .293333rem;
        h2
          margin: 0;
          font-size: .546667rem;
          line-height: 1.2em;
          font-weight: 700;
          white-space: nowrap;
          position: relative;
          padding-right: .266667rem;
          padding-right: 2.666667vw;
          display: -webkit-flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          -webkit-justify-content: center;
          justify-content: center;
          .isbrand
            margin-right: .16rem;
            margin-right: 1.6vw;
            border-radius: .026667rem;
            border-radius: .266667vw;
            background-image: linear-gradient(90deg,#fff100,#ffe339);
            width: .96rem;
            width: 9.6vw;
            height: .48rem;
            height: 4.8vw;
            position: relative;
            font-size: .266667rem;
            color: transparent;
            white-space: nowrap;
            span
              color: #6a3709;
              font-style: normal;
              font-weight: 700;
              font-size: .64rem!important;
              position: absolute;
              left: 0;
              top: 0;
              right: -100%;
              bottom: -100%;
              -webkit-transform: scale(.5);
              transform: scale(.5);
              -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
              display: -webkit-flex;
              display: flex;
              -webkit-align-items: center;
              align-items: center;
              -webkit-justify-content: center;
              justify-content: center;
              font-size: .533333rem
          i
            text-align left
            left -0.2rem
            font-size 0.53rem
            width: .4rem;
            width: 4vw;
            position: relative;
            height: .653333rem;
            height: 6.533333vw;
        .info-xj
          white-space: nowrap;
          height: .32rem;
          height: 3.2vw;
          margin-top: .173333rem;
          margin-top: 1.733333vw;
          font-size: .293333rem;
          color: #333;
          span
            white-space: nowrap;
            height: .32rem;
            height: 3.2vw;
            margin-top: .173333rem;
            margin-top: 1.733333vw;
            font-size: .293333rem;
            color: #333
            &::after
              content: " \B7 ";
              opacity: .2;
        .promotion_info
          width: 5.813333rem;
          width: 58.133333vw;
          font-size: .293333rem;
          font-weight: 300;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: .226667rem auto .266667rem;
          margin: 2.266667vw auto 2.666667vw;
          padding: 0;
          white-space: nowrap;
          background-color: white;                    
  </style>

