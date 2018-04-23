<template>
  <div id="supplier">
    <div class="recommend">推荐商家</div>
    <ul v-if="restaurant" v-infinite-scroll='loadMore'
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
      <li class="restaurantWr" @click="toShop(item.restaurant.id)" ref="restaurant" 
      v-for="(item, key) in restaurant"  :key="key">
        <!-- <router-link to="/shop"> -->
          <div class="restaurant">
            <div class="supplierImg">
             <img :src="item.restaurant.image_path | imgUrl" alt="">
            </div>
            <div class="supperInfo">
                <div class="supplierName">
                  <div class="titleWr">
                    <i v-if="item.restaurant.is_premium" content="品牌" class="brand">品牌</i>
                    <span class="title">{{item.restaurant.name}}</span>
                  </div>
                  <ul class="supportWr">
                    <li v-for="support in item.restaurant.supports" :key="support.id">
                      {{support.icon_name}}
                    </li>
                  </ul>
                </div>
                <div class="restaurantOrder">
                  <!-- <star :rating='rating'></star>   -->
                  <span class="monthOrder">月售{{item.restaurant.recent_order_num}}单</span>
                  <i v-if="item.restaurant.delivery_mode" content="蜂鸟专送" class="ship">蜂鸟专送</i>
                </div>
                <div class="distance">
                  <div class="mini-order">
                    <span>￥{{item.restaurant.float_minimum_order_amount}}</span>
                    <span class="delivery_fee">配送费￥{{item.restaurant.float_delivery_fee}}</span>
                  </div>
                  <div class="mini-distance">
                    <span>{{item.restaurant.distance | distance}}</span>
                    <span class="delivery_fee">{{item.restaurant.order_lead_time}}分钟</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="activityWR">
            <div class="activity">
              <ul ref="activity">
                <li  v-for="(activity, key) in item.restaurant.activities" v-show="(key < 2) "   :key="activity.id">
                  <div class="gogogo">
                    <span class="icon-wr"><span class="activity-icon" :style="`background-color:#${activity.icon_color}`">{{activity.icon_name}}</span></span>
                    <span class="activity-name">{{activity.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div @click="showActivity(index, $event)" v-if="item.restaurant.activities.length > 2" class="activity-cz">
              {{item.restaurant.activities.length}}个活动
              <svg class>
                <use xlink:href="#activity-more.c46fec1">
                  <svg viewBox="0 0 12 6" id="#activity-more.c46fec1" width="100%" height="100%">
                    <path fill-rule="evenodd" d="M4.577 5.423c.79.77 2.073.767 2.857 0l4.12-4.026C12.345.625 12.09 0 10.985 0H1.027C-.077 0-.33.63.457 1.397l4.12 4.026z"></path>
                  </svg>
                </use> 
              </svg> 
            </div>
          </div>
        <!-- </router-link>  -->
      </li>
      <li class="loading" v-if="loadingmore">
        <mt-spinner type="fading-circle" :size='20'></mt-spinner>&nbsp;<span style="font-size:0.22rem;color:#999">正在加载</span>
      </li>
    </ul>
  </div>
</template>
<script>
// import Star from 'com/stars/stars'
import axios from 'axios'
import Vue from 'vue'
// import BScroll from 'better-scroll'
import { InfiniteScroll } from 'mint-ui';
import { setSession, getSession } from '@/common/public'
import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
Vue.use(InfiniteScroll);
export default {
  props: {
    supplier: {
      type: Object
    }
  },
  data () {
    return {
      restaurant: null,
      index: true,
      type:1,
      position: null,
      flag: true,
      geohash: null,
      loadingmore: true
    }
  },
  methods: {
    toShop: function (shopId) {
      // ev.target.$router.push({name:shop})
      const node = event.target
      this.$router.push({path: `/shop/${shopId}`})
    },
    showActivity: function (num, ev) {
      // document.getElementsByTagName
      ev.cancelBubble = true
      let liNodes = ev.target.parentNode.getElementsByTagName('li')
      if(num){
        for (let i=0; i<liNodes.length; i++) {
          liNodes[i].style.display = 'block'
        }
      }else{
        for (let i=0; i<liNodes.length; i++) {
        if ( i > 1 ) {
            liNodes[i].style.display = 'none'
          }
        }
      }
      this.index = !num
    },
    loadMore() {
      // this.$loading = true;
      if (!this.flag) {
        return
      }
      this.flag = false
      axios.get(
        `/apis/restapi/shopping/v3/restaurants?latitude=${this.position.lat}&longitude=${this.position.lng}
        &offset=${this.type*8}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5`
      ).then(data => {
          this.flag = true
          if (data.items && data.items.length === 0) {
            this.flag = false
            this.loadingmore = false 
            return false
          }
          this.type++
          this.restaurant = [...this.restaurant, ...data.data.items]
          // data.data.items.map(item => this.restaurant.push(item))
      })
      // setTimeout(() => {
      //   this.loading = false;
      // }, 2500);
    }
  },
  // computed: {
  //   loadMore: function () {
  //     this.loading = true;
  //     setTimeout(() => {
  //       let last = this.list[this.list.length - 1];
  //       for (let i = 1; i <= 10; i++) {
  //         this.list.push(last + i);
  //       }
  //       this.loading = false;
  //     }, 2500);
  //   }
  // },
  mounted () {
    const _this = this
    _this.restaurant = _this.supplier.data.items
    // _this.latitude = JSON.parse(getSession('latitude'))
    // _this.longitude = JSON.parse(getSession('longitude'))
    _this.position = _this.$store.state.position
  },
  components: {
    // Star
    // Activity
  }
}
</script>
<style lang="stylus" scoped>
a 
  text-decoration none
#supplier
  .loading
    display flex 
    justify-content center
    padding-bottom 15vw
    padding-bottom 1.5rem
    align-items center
  .recommend
    font-size .4rem
    height 9.6vw
    color #000
    display flex
    justify-content center
    align-items center
    &::before, &::after
      content ''
      display block
      height .266667vw
      width 5.333333vw
      background-color #999
    &::before  
      margin-right 3.466667vw
    &::after  
      margin-left 3.466667vw
  .restaurant
    display flex
    padding 0 2.666667vw
    justify-content flex-start
  .restaurantWr
    padding: .4rem 0;
    padding: 4vw 0;
  .supplierImg
    width 17.333333vw
    height 17.333333vw
    img
      width 100%
      height 100%
  .supperInfo
    border-bottom 1px dotted #d6d6d6
    display flex
    flex-direction column
    justify-content space-between
    overflow hidden
    flex-grow 1
    margin-left 2.666667vw
    .supplierName
      font-size .4rem
      font-weight 700
      display flex
      justify-content space-between
      align-items center
      // flex-direction column
      line-height: normal;
      // flex-grow 1
      .brand
        position: relative
        margin-right: .133333rem
        margin-right: 1.333333vw
        padding: .026667rem .066667rem
        padding: .266667vw .666667vw
        color: transparent
        text-align: center
        white-space: nowrap
        font-weight: 700
        font-size: .093333rem
        font-style: normal
        line-height: normal
        &::after
          background-image: linear-gradient(-139deg,#fff100,#ffe339)
          display: block
          position: absolute
          left: 0
          top: 0
          z-index: 1
          content: attr(content)
          padding: .533333vw 1.333333vw
          color: #6f3f15
          font-weight: 700
          -webkit-transform: scale(.8)
          transform: scale(.8)
          -webkit-transform-origin: 0 0
        transform-origin: 0 0
  .restaurantOrder
    display flex
    align-items center
    justify-content space-between
    color #666
    font-size .2933333rem
    line-height normal
    .monthOrder
      color #666
      font-size .2933333rem
      line-height normal
    .ship
      margin-left: 1.066667vw
      position: relative
      padding: 0 .04rem
      padding: 0 .4vw
      color: transparent
      white-space: nowrap
      font-size: .266667rem
      border: .013333rem solid transparent
      border: .133333vw solid transparent
      border-radius: .04rem
      border-radius: .4vw
      line-height: 1.2
      &::after
        position: absolute
        left: 0
        top: 0
        z-index: 1
        white-space: nowrap
        content: attr(content)
        font-size: .113773rem
        font-size: .533333rem
        padding: 0 .011373rem
        padding: 0 .113733vw
        padding: 0 .053333rem
        padding: 0 .533333vw
        border-radius: .017067rem
        border-radius: .170667vw
        border-radius: .08rem
        border-radius: .8vw
        -webkit-transform: scale(.5)
        transform: scale(.5)
        -webkit-transform-origin: 0 0
        transform-origin: 0 0
        color: #fff
        border: .013333rem solid #0097ff
        border: .133333vw solid #0097ff
        background-image: -webkit-linear-gradient(45deg,#0085ff,#0af)
        background-image: linear-gradient(45deg,#0085ff,#0af)  
  .titleWr
    display: flex;
    align-items center
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 700;
    font-size: .4rem;
    overflow: hidden;  
    .title
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  .supportWr
    display flex
    margin-left: 2.666667vw;
    align-items center
    li
      margin-right: .013333rem;
      margin-right: .133333vw;  
      position: relative;
      height: .346667rem;
      height: 3.466667vw;
      width: .346667rem;
      width: 3.466667vw;
      font-size 0.1rem
      margin-left: .08rem;
      margin-left: .8vw;
      color #666
  .distance
    display flex
    justify-content space-between
    align-items center
    .mini-order
      font-size: .293333rem;
      line-height: normal;
      color #666
    .delivery_fee
      &::before
        margin: 0 .017067rem;
        margin: 0 .170667vw;
        margin: 0 .08rem;
        margin: 0 .8vw;
        color: #ddd;
        content: "|";
    .mini-distance
      font-size: .293333rem;
      line-height: normal;
      color #666
  .activityWR
    padding-top: 1.76vw;
    padding-left: 2.266667rem;
    padding-left: 22.666667vw;
    display: flex;
    position: relative;
    -webkit-justify-content: space-between;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    overflow: hidden;
    .activity-cz
      padding: .08rem .266667rem 0 0;
      padding: .8vw 2.666667vw 0 0;
      color: #999;
      text-align: right;
      font-size: .266667rem;
      line-height: 1;
      svg
        width: .173333rem;
        width: 1.733333vw;
        height: .173333rem;
        height: 1.733333vw;
        opacity: .9;
        margin-left: .026667rem;
        margin-left: .266667vw;
        -webkit-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        fill: currentColor;
        will-change: transform;
        transform-origin: 50% 50% 0px;
    .activity
      -webkit-flex: 1;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding-right: .266667rem;
      padding-right: 2.666667vw;
      overflow: hidden;
      .gogogo
        display flex
        align-items center
      .activity-name
        color #666
        font-size: .293333rem;
        line-height: .48rem;
        line-height: 4.8vw;
        display: inline-block;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      .icon-wr
        display: inline-block;
        position: relative;
        margin-right: .16rem;
        margin-right: 1.6vw;
        height: .373333rem;
        height: 3.733333vw;
        width: .373333rem;
        width: 3.733333vw;
        vertical-align: middle;
        font-size: .293333rem;
        line-height: .48rem;
        line-height: 4.8vw;
        .activity-icon
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          height: .746667rem;
          height: 7.466667vw;
          width: .746667rem;
          width: 7.466667vw;
          font-size: .56rem;
          color: #fff;
          display: -webkit-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-justify-content: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border-radius: .106667rem;
          border-radius: 1.066667vw;
          -webkit-transform: scale(.5);
          transform: scale(.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
</style>

