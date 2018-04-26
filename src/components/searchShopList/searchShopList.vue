<template>
  <div id="shoplist">
    <ul>
      <li class="restaurantWr" @click="toShop(item.restaurant.id)" ref="restaurant" 
      v-for="(item, key) in shopList"  :key="key">
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
          <activities :activities="item.restaurant.activities"></activities>
        <!-- </router-link>  -->
      </li>
      <li class="recommed">
          <svg>
            <use xlink:href="#recommend">
              <svg viewBox="0 0 15 16" id="recommend" width="100%" height="100%"><path fill="none" fill-rule="evenodd" stroke="#333" d="M9.965 14.52H3.792V7.924v6.596H1.499A.493.493 0 0 1 1 14.026l.004-6.53c0-.272.22-.492.499-.492h1.283c.555 0 1.006.438 1.006.92.946 0 2.707-2.777 3.897-6.216 0 0-.288.965.035-.113.322-1.079 1.663-.624 1.685.83-.022 4.203 0 3.684 0 3.684h3.776c.553 0 1.001.455 1.001.998v3.734c0 3.782-4.221 3.679-4.221 3.679z"></path></svg>
            </use>
          </svg>
          为你推荐
      </li>
     <li class="restaurantWr" @click="toShop(item.restaurant.id)" ref="restaurant" 
      v-for="(item, key) in recommendList"  :key="key">
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
          <activities :activities="item.restaurant.activities"></activities>
        <!-- </router-link>  -->
      </li>
    </ul>
  </div>
</template>
<script>
import Activities from 'com/activities/activities'
export default {
  props: {
    foodList: Array
  },
  mounted() {
    console.log(this.foodList)
  },
  components: {
    Activities
  },
  computed: {
    shopList: function () {
      return this.foodList.filter((item, index) => {
         return item.foods.length
      })
    },
    recommendList: function () {
      return this.foodList.filter((item, index) => {
        console.log(item)
         return item.foods.length===0
      })
    }
  }
}
</script>
<style lang="stylus">
#shoplist
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
.recommed
    height: 1.28rem;
    height: 12.8vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: .4rem;
    font-weight: 700;
    color: #333;
    &::before
      display: block;
      content: "";
      width: .213333rem;
      width: 2.133333vw;
      height: .026667rem;
      height: .266667vw;
      margin-right: .133333rem;
      margin-right: 1.333333vw;
      background-color: #999;
    &::after
      display: block;
      content: "";
      width: .213333rem;
      width: 2.133333vw;
      height: .026667rem;
      height: .266667vw;
      background-color: #999; 
      margin-right: .133333rem;
      margin-right: 1.333333vw;
    svg
      width: .373333rem;
      width: 3.733333vw;
      height: .373333rem;
      height: 3.733333vw;
      margin-right: .133333rem;
      margin-right: 1.333333vw;         
</style>

