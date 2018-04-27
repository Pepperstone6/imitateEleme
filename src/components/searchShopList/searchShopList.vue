<template>
  <div id="shoplist" ref="shoplist" >
    <ul>
      <li class="restaurantWr" @click="toShop(item.restaurant.id)" ref="restaurant" 
      v-for="(item) in shopList"  :key="item.restaurant.id">
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
          <div class="food"  v-if="item.foods.length">
          <div class="food-c"  v-for="food in item.foods" :key="food.id">
              <img class="food-img" :src="food.image_path|imgUrl" alt="">
              <p class="food-name">{{food.name}}</p>
          </div>
        </div>
        <!-- </router-link>  -->
      </li>
      <!-- <li ref="more" class="loadMore" @click="loadMore($event)">
        <svg v-if="show" class="load">
        <use xlink:href="#loading">
          <svg viewBox="0 0 64 64" id="loading" width="100%" height="100%"><path fill-rule="evenodd" d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"></path></svg>
        </use>
        </svg>
        <span v-if="show">正在加载...</span>
        <span v-if="!show">没有更多了哦~</span>
      </li> -->
      <load-more :show="show" ref="more" :loadMore="loadMore"></load-more>
      <li class="recommed" v-if="recommendList.length">
          <svg>
            <use xlink:href="#recommend">
              <svg viewBox="0 0 15 16" id="recommend" width="100%" height="100%"><path fill="none" fill-rule="evenodd" stroke="#333" d="M9.965 14.52H3.792V7.924v6.596H1.499A.493.493 0 0 1 1 14.026l.004-6.53c0-.272.22-.492.499-.492h1.283c.555 0 1.006.438 1.006.92.946 0 2.707-2.777 3.897-6.216 0 0-.288.965.035-.113.322-1.079 1.663-.624 1.685.83-.022 4.203 0 3.684 0 3.684h3.776c.553 0 1.001.455 1.001.998v3.734c0 3.782-4.221 3.679-4.221 3.679z"></path></svg>
            </use>
          </svg>
          为你推荐
      </li>
     <li class="restaurantWr" @click="toShop(item.restaurant.id)" ref="restaurant" 
      v-for="(item, index) in recommendList"  :key="index">
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
        <div class="food"  v-if="item.foods.length">
          <div class="food-c"  v-for="food in item.foods" :key="food.id">
              <img class="food-img" :src="food.image_path|imgUrl" alt="">
              <p class="food-name">{{food.name}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Activities from 'com/activities/activities'
import LoadMore from 'com/loadMore/loadMore'
import axios from 'axios'
export default {
  props: {
    foodList: Array
  },
  data () {
    return {
      shopList:[],
      recommendList: [],
       index: 1,
       show: false,
       scrollMore: false
    }
  },
  mounted() {
    console.log(this.foodList,2222222)
    //https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=%E4%B9%89%E6%B3%B0%E6%98%8C%E7%8E%B0%E7%82%92%E5%BF%AB%E9%A4%90&latitude=22.545935&longitude=114.02684&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5
    axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.$store.state.keyword}&latitude=${this.$store.state.position.lat}&longitude=${this.$store.state.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
    ).then(data => {
      if(data.data.inside[0]&&data.data.inside[0].restaurant_with_foods.length===15){
        this.index++
      }
      if(data.data.inside[0].restaurant_with_foods){
        this.shopList = data.data.inside[0].restaurant_with_foods
      }
      if(data.data.inside[1]){
      this.recommendList = data.data.inside[1].restaurant_with_foods
      }
    })
    this.scrollMore = true;
    this.$parent.$refs.searchfood.addEventListener('scroll', this.handle)
    // this.offsetTop = this.$refs.offsetTop
 },
  components: {
    Activities,
    LoadMore
  },
  methods: {
    handle:function(ev) {
      let scrollTop = this.$refs.shoplist.offsetHeight-this.$parent.$refs.searchfood.offsetHeight
      if(!this.$refs.more.nextElementSibling&&scrollTop-ev.target.scrollTop<=1&&this.scrollMore){
        this.scrollMore=false
        this.loadMore()
      }
    },
    loadMore: function () {
      this.show = true;
       axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=${15*this.index}&limit=15&keyword=${this.$store.state.keyword}&latitude=${this.$store.state.position.lat}&longitude=${this.$store.state.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
    ).then(data => {
       this.show = false;
      let flag = this.index
      if(data.data.inside[0]&&data.data.inside[0].restaurant_with_foods.length===15){
        this.index++
      }
      if(flag===this.index){
        return
      }
      if(data.data.inside[0].restaurant_with_foods){
        this.shopList =[...this.shopList, ...data.data.inside[0].restaurant_with_foods] 
      }
      if(data.data.inside[1]){
        this.shopList =[...this.shopList, ...data.data.inside[0].restaurant_with_foods] 
      }
    })
    },
    toShop: function (shopId) {
    // ev.target.$router.push({name:shop})
    const node = event.target
    this.$router.push({path: `/shop/${shopId}`})
    }
  },
  computed: {
    // shopList: function () {
    //   return this.foodList.filter((item, index) => {
    //      return typeof item.restaurant.closing_count_down === 'undefined'
    //   })
    // },
    // recommendList: function () {
    //   return this.foodList.filter((item, index) => {
    //     console.log(item)
    //      return item.restaurant.closing_count_down === 0
    //   })
    // }
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
    background #f5f5f5
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
  .food
    display: -webkit-flex;
    display: flex;
    background-color: #fff;
    padding-left: 2.346667rem;
    padding-left: 23.466667vw;
    .food-c
      width: 2.346667rem;
      width: 23.466667vw;
      -webkit-flex: none;
      flex: none;
      margin-right: .08rem;
      margin-right: .8vw;    
      .food-img
        width: 2.346667rem;
        width: 23.466667vw;
        height: 2.346667rem;
        height: 23.466667vw;
      .food-name
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .32rem;         
</style>

