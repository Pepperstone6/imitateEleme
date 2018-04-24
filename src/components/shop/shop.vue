<template>
  <div id="shop">
    <div v-if="shopInfo" class="shopHead">
      <nav class="nav">
        <router-link  class="goback" to="#">
          <i  @click="goback" class="icon-fanhui iconfont"></i>
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
      <div class="activity">
          <div class="activity-content">
            <div class="activity-inner">
              <span :style="`background-color:#${shopInfo.activities[0].icon_color}`" class="activity-icon">
                {{shopInfo.activities[0].icon_name}}
                <span>{{shopInfo.activities[0].icon_name}}</span>
              </span>
              <span class="activity-nr">{{shopInfo.activities[0].name}}</span>
            </div>
          </div>
          <div  @click="showPopup(true)" class="activity-length">{{shopInfo.activities.length}}个优惠</div>
      </div>
      <div class="shop-coupon">
          <a v-for="item in coupon" :key="item.id" class="coupon-content">
            <i class="iconfont icon-huangguan"></i><p>{{item.description}}</p><button>领取</button>
          </a>
      </div>
    </div>
    <div class="tab">
      <div @click="tabDom(0, $event)" ref="tabDom" class="tab-c onactive">
        <div>
          <span>
            点餐
          </span>
        </div>
      </div>
      <div @click="tabDom(1, $event)" ref="tabDom" class="tab-c">
        <div>
          <span>
            评价
          </span>
        </div>
      </div>
      <div @click="tabDom(2, $event)" ref="tabDom" class="tab-c">
        <div>
          <span>商家</span>
        </div>
      </div>
    </div>
    <goods-list
      v-if="info"
      :info="info"
    ></goods-list>
    <mt-popup  v-model="popupVisible"
    position="bottom">
      <div v-if="shopInfo"  class="active-wr">
        <active @test="showPopup"  :activities="shopInfo.activities">
        </active>
      </div>
    </mt-popup>
  </div>
</template>
<script>
//引入插件
import axios from 'axios'
import Vue from 'vue'
import { setSession, getSession } from '@/common/public'
import { Popup } from 'mint-ui';
//引入组件
import Active from 'com/active/active'
import GoodsList from 'com/goodsList/goodsList'
//引入js文件
import { tabDom } from '@/common/dom.js'
//使用插件
Vue.component(Popup.name, Popup);
export default {
  data () {
    return {
      shopId: null,
      latitude: null,
      longitude: null,
      shopInfo: null,
      popupVisible: false,
      index: 0,
      coupon: null,
      info: null,
      position: null
    }
  },
  created () {
    const _this = this
    // _this.latitude = getSession('latitude')
    // _this.longitude = getSession('longitude')
    _this.position = _this.$store.state.position
    //https://shadow.elemecdn.com/crayfish/h5.ele.me/service-worker?t=1522051779278
    // https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=311914
    //https://h5.ele.me/restapi/shopping/restaurant/311914?
    // extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal
    // =h5&latitude=31.23037&longitude=121.473701
    //https://h5.ele.me/restapi/ugc/v3/restaurants/311914/ratings?has_content=true&offset=0&limit=8
    // https://h5.ele.me/restapi/shopping/v1/restaurants/156020618/exclusive_hongbao/overview?latitude=31.23037&longitude=121.473701&code=0.16084438857682803&terminal=h5
    //https://h5.ele.me/restapi/shopping/v1/restaurants/156020618/exclusive_hongbao/detail?latitude=31.23037&longitude=121.473701&code=0.8507371846392899&terminal=h5
    _this.shopId = _this.$route.params.shopId
    console.log(_this.position)
    const args = {
      shopId: _this.$route.params.shopId,
      latitude: _this.position.lat,
      longitude: _this.position.lng
      }
      _this.info = args
    // axios.get(
      
    // ).then(data => {
    //   console.log(data)
    //   this.shopInfo = data.data
    // })
    // axios.get(`/cdns/crayfish/h5.ele.me/service-worker?t=${_this.shopId}`)

    async function request () {
      try {
        let [response1, response2, response3] = await Promise.all([_this.request1(args),
        _this.request2(args), _this.request3(args)])
        return {
          response1,
          response2,
          response3
        }
     }
      catch(err) {
        console.log(err)
      }
    }
  request().then(data => {
    let {response1, response2, response3} = data
    this.shopInfo = response1.data
    this.coupon = response3.data
  })

  },
  methods: {
    goback: function () {
      this.$router.go(-1)
    },
    tabDom: function (num, ev) {
      ev.cancelBubble = false
      let className = 'onactive'
      let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
      const tabDoms = document.querySelectorAll('.tab-c')
      let newArr = tabDoms[this.index].className.split(' ')
      newArr.map((item, i) => {
        if (item === "onactive") {
          newArr.splice(i,1)
        }
      })
      tabDoms[this.index].className = newArr.join(' ')
      let arr = tabDoms[num].className.split(' ')
      arr.push(className)
      tabDoms[num].className = arr.join(' ')
      this.index = num
    },
    showPopup: function (bool){
      this.popupVisible = bool
    },
    request1: function (args) {
      let {shopId, latitude, longitude} = args
      return axios.get(
        `/apis/restapi/shopping/restaurant/${shopId}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${latitude}&longitude=${longitude}`
      )
    },
    request2: function (args){
      let {shopId, latitude, longitude} = args
      return axios.get(
        `/apis/restapi/ugc/v3/restaurants/${shopId}/ratings?has_content=true&offset=0&limit=8`
      )
    },
    request3: function (args) {
      let {shopId, latitude, longitude} = args
    return axios.get(
        `/apis/restapi/shopping/v1/restaurants/${shopId}/exclusive_hongbao/overview?latitude=${latitude}&longitude=${longitude}&code=0.16084438857682803&terminal=h5`
      )
    }
  },
  components: {
    Active,
    GoodsList
  }
}
</script>
<style lang="stylus" scoped>
a
  text-decoration none
#shop
  .shopHead
    padding-bottom: 2.133333vw;
    .shop-coupon
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: center;
      justify-content: center;
      margin-top: .213333rem;
      margin-top: 2.133333vw;
      .coupon-content
        overflow hidden
        border: .013333rem solid #fde6e3;
        border: .133333vw solid #fde6e3;
        color: #594519;
        // border: 1px solid #f7eebb;
        background: #fff8d7;
        display: inline-block;
        padding: 0 .16rem 0 .2rem;
        padding: 0 1.6vw 0 2vw;
        height: .64rem;
        height: 6.4vw;
        line-height: .64rem;
        line-height: 6.4vw;
        // background: #fff4f4;
        color: #5c1603;
        font-size: .293333rem;
        font-weight: 700;
        i
          color #ffe339
          // linear-gradient(90deg,#fff100,#ffe339)
        p
          position: relative;
          display: inline-block;
          padding-right: .186667rem;
          padding-right: 1.866667vw;
          font-weight: 700;
          color: #594519;
          // border: 1px solid #f7eebb;
          background: #fff8d7;
          display: inline-block;
          padding: 0 .16rem 0 .2rem;
          padding: 0 1.6vw 0 2vw;
          height: .64rem;
          height: 5.4vw;
          line-height: .64rem;
          line-height: 6.4vw;
          // background: #fff4f4;
          // color: #5c1603;
          font-size: .293333rem;
          font-weight: 700;
          &::before
            bottom: -1px;
            border-bottom: none;
            border-radius: .133333rem .133333rem 0 0;
            border-radius: 1.333333vw 1.333333vw 0 0;
            content: "";
            position: absolute;
            right: 0;
            width: .133333rem;
            width: 1.333333vw;
            height: .066667rem;
            height: .666667vw;
            background: #fff;
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            z-index: 10;
            border: 1px solid #fde6e3;
          &::after
            top: -3px;
            border-bottom: none;
            border-radius: .133333rem .133333rem 0 0;
            border-radius: 1.333333vw 1.333333vw 0 0;
            content: "";
            position: absolute;
            right: 0;
            width: .133333rem;
            width: 1.333333vw;
            height: .066667rem;
            height: .666667vw;
            background: #fff;
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            z-index: 10;
            border: 1px solid #fde6e3;
        button
          color: #594519;
          padding-left: .16rem;
          padding-left: 1.6vw;
          color: #5c1704;
          font-weight: 700;
          background: transparent;
          outline: none;
          border: none;
          font-size: inherit;
          font-family: inherit
          text-rendering: auto;
          color: initial;
          letter-spacing: normal;
          word-spacing: normal;
          text-transform: none;
          text-indent: 0px;
          text-shadow: none;
          display: inline-block;
          text-align: start;
          margin: 0em;
          font: 400 13.3333px Arial;
          color: #594519;
          // border: 1px solid #f7eebb;
          background: #fff8d7;
          display: inline-block;
          padding: 0 .16rem 0 .2rem;
          padding: 0 1.6vw 0 2vw;
          height: .64rem;
          height: 5.4vw;
          line-height: .64rem;
          line-height: 6.4vw;
          // background: #fff4f4;
          // color: #5c1603;
          font-size: .293333rem;
          font-weight: 700;
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
            display flex
            align-items  center
            left -0.1rem
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
    .activity
      display: -webkit-flex;
      display: flex;
      border-radius: 1px;
      border: 1px solid #eee;
      padding: .133333rem .213333rem;
      padding: 1.333333vw 2.133333vw;
      font-size: .293333rem;
      color: #666;
      margin: 0 .64rem;
      margin: 0 6.4vw;
      -webkit-align-items: center;
      align-items: center; 
      .activity-content
        -webkit-flex: 1;
        flex: 1;
        overflow: hidden;
        font-size: .293333rem;
        color: #666;
        .activity-inner
          -webkit-align-items: center;
          align-items: center;
          display: -webkit-flex;
          display: flex;
          font-size: .346667rem;
          -webkit-align-items: center;
          align-items: center;
          .activity-icon
            margin-right: .16rem;
            margin-right: 1.6vw;
            font-size: .24rem;
            padding: .053333rem .12rem;
            padding: .533333vw 1.2vw;
            height: .346667rem;
            height: 3.466667vw;
            display: inline-block;
            box-sizing: border-box;
            border-radius: .026667rem;
            border-radius: .266667vw;
            position: relative;
            font-size: .266667rem;
            color: transparent;
            white-space: nowrap;
            span
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
              font-size: .48rem!important;
              color: #fff;
              white-space nowrap;
          .activity-nr
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-flex: 1;
            flex: 1;
            font-size: .293333rem;
    .activity-length
      width: 1.626667rem;
      width: 16.266667vw;
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      position: relative;
      padding-right: .293333rem;
      padding-right: 2.933333vw;
      text-align: right;
      font-size: .093333rem;
      color: #666;
      font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
      line-height: 1.2;
      -webkit-user-select: none;
      user-select: none;
      -webkit-font-smoothing: antialiased;
      touch-action: manipulation;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
      &::after
        content: "";
        display: block;
        border-style: solid;
        border-width: .106667rem .093333rem 0;
        border-width: 1.066667vw .933333vw 0;
        border-color: rgba(0,0,0,.57) transparent transparent;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 0
  .active-wr
    width 100%
    width 100vw 
    padding: .533333rem .693333rem;
    padding: 5.333333vw 6.933333vw;
    box-sizing: border-box;
  .tab
    line-height: 1.066667rem;
    line-height: 10.666667vw;
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .tab-c
      position: relative;
      -webkit-flex: 1;
      flex: 1;
      text-align: center;
      font-size: .373333rem;
      color: #666;
      border-bottom: 1px solid #ddd;
    .onactive
      span
        position relative
        &::after
          content: "";
          position: absolute;
          bottom: -.32rem;
          bottom: -3.2vw;
          left: 0;
          right: 0;
          height: .053333rem;
          height: .533333vw;
          background-color: #2395ff;                 
  </style>

