<template>
  <div class="searchfood">
    <div v-if="foodList.length" v-for="(restaurant) in foodList" :key="restaurant.restaurant.id">
      <div class="res-wr">
        <div class="res">
          <div class="res-c">
            <img class="res-icon" :src="restaurant.restaurant.image_path|imgUrl" alt="">
            <div class="res-info">
              <div class="res-c-t">
                <p class="res-name">
                  <span class="res-t">
                    {{restaurant.restaurant.name}}
                  </span>
                </p>
                <div class="fn" v-if="restaurant.restaurant.delivery_mode">
                  <span class="fn-wr">{{restaurant.restaurant.delivery_mode.text}}<span class="fn-in">{{restaurant.restaurant.delivery_mode.text}}</span></span>
                </div>
              </div>
              <div class="res-attr">
                <p>
                  <span>评价{{restaurant.restaurant.rating}}</span>
                  <span>起送费{{restaurant.restaurant.float_minimum_order_amount}}</span>
                  <span>配送费{{restaurant.restaurant.float_delivery_fee}}</span>
                </p>
                <p>
                  <span>
                    {{restaurant.restaurant.distance|distance}}
                  </span>
                  <span>
                    {{restaurant.restaurant.order_lead_time}}分钟
                  </span>
                </p>
              </div>
            </div>
          </div>
          <ul class="food-list">
            <li class="food" v-for="food in restaurant.foods" :key="food.id">
              <img class="food-img" :src="food.image_path| imgUrl" alt="">
              <div class="food-info">
                <p class="food-name">{{food.name}}</p>
                <p class="food-rating">月售{{food.month_sales}}份&nbsp;好评率{{food.satisfy_rate}}%</p>
                <p class="food-price">
                  <!-- <span > -->
                    <span class="newP">{{food.price}} </span>
                    <del class="odlP" v-if="food.original_price">
                      ￥{{food.original_price}}
                    </del> 
                  <!-- </span> -->
                  <span
                    class="active" 
                    v-if="active.background"
                    v-for="active in food.activities"
                    :key="active.id"
                    >
                      {{active.description}}
                      <span
                       :style="`background-image:linear-gradient(-135deg, #${active.background.rgb_from} 0%,  #${active.background.rgb_to} 100%);color: #fff`"
                      >{{active.description}}</span>
                  </span>
                  <span
                    class="active" 
                    v-if="active.is_exclusive_with_food_activity"
                    v-for="active in food.activities"
                    :key="active.id"
                    >{{active.description}}<span
                       :style="`color:#${active.icon_color}; border: 2px solid #${active.icon_color}`"
                      >{{active.description}}</span>
                  </span>
                </p>
              </div>
            </li>
          </ul>
          <div class="more">
            展开更多商品{{restaurant.foods.length}}个
            <svg>
              <use xlink:href="#arrow_down">
                <svg viewBox="0 0 10 10" id="arrow_down" width="100%" height="100%"><path fill="#A7A7A7" fill-rule="evenodd" d="M5.04 6.268L.827 2.337a.37.37 0 0 0-.518.017.37.37 0 0 0 .019.518L4.784 7.03a.37.37 0 0 0 .545-.05.437.437 0 0 0 .102-.072l4.225-4.014a.396.396 0 0 0 .013-.564l.047.05a.397.397 0 0 0-.565-.015l-4.11 3.904z"></path></svg>
              </use> 
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import index from 'axios';
export default {
  props: {
    keyword: {
      type: String
    }
  },
  data() {
    return {
      position: null,
      foodList: []
    }
  },
  beforeMount() {
    this.position = this.$store.state.position
    //https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=沙拉&latitude=22.545935&longitude=114.02684&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5
    axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.keyword}&latitude=${this.position.lat}&longitude=${this.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
    ).then((data) => {
      this.manage(data.data.inside)
      console.log(this.foodList,1111111)
    })
 },
 methods: {
   manage: function (obj) {
     Object.values(obj).forEach((item, index) => {
      //  console.log(item)
       if(item.restaurant_with_foods instanceof Array && item.restaurant_with_foods.length>0){
          this.foodList = [...this.foodList, ...item.restaurant_with_foods]
       }
     })
   }
 },
 watch: {
    keyword: function (val) {
      this.foodList = []
      axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.keyword}&latitude=${this.position.lat}&longitude=${this.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
      ).then((data) => {
        this.manage(data.data.inside)
        console.log(this.foodList)
      })
    }
 }
}
</script>
<style lang="stylus" scoped>
img
  max-width 100%
.searchfood
  // -webkit-flex: 1;
  // flex: 1;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
.res
  background-color #fff
  .res-c
    height:~ 1.706667rem;
    height: 17.066667vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid hsla(0,0%,89%,.5);
    padding: 0 .426667rem;
    padding: 0 4.266667vw;
    .res-icon
      width: .853333rem;
      width: 8.533333vw;
      margin-right: .16rem;
      margin-right: 1.6vw;
      height: .853333rem;
      height: 8.533333vw;
  .res-info
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    height: .853333rem;
    height: 8.533333vw;
  .res-c-t
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center; 
    -webkit-justify-content: space-between;
    justify-content: space-between;
  .res-name
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    margin: 0;
    font-weight: 400;
    &::before
      margin-right: .133333rem;
      margin-right: 1.333333vw;
      padding: 0 .066667rem;
      padding: 0 .666667vw;
      height: .4rem;
      height: 4vw;
      line-height: .4rem;
      line-height: 4vw;
      border-radius: .053333rem;
      border-radius: .533333vw;
      background-image: linear-gradient(-139deg,#fff100,#ffe339);
      color: #6f3f15;
      content: "\54C1\724C";
      text-align: center;
      white-space: nowrap;
      font-weight: 700;
      font-size: .293333rem;
      -webkit-flex: none;
      flex: none;
    .res-t
      color: #333;
      font-size: .373333rem;
      max-width: 4.133333rem;
      max-width: 41.333333vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  .fn
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    .fn-wr
      height: .346667rem;
      height: 3.466667vw;
      width: 1.253333rem;
      width: 12.533333vw;
      margin-left: .106667rem;
      margin-left: 1.066667vw;
      position: relative;
      font-size: .266667rem;
      color: transparent;
      white-space: nowrap;
      .fn-in
        border-radius: .026667rem;
        border-radius: .266667vw;
        background-image: linear-gradient(45deg,#0085ff,#0af);
        color: #fff;
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
        font-size: .533333rem;
  .res-attr
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: .266667rem;
    color: #666;
    margin-top: .106667rem;
    margin-top: 1.066667vw;
    span:not(:first-child)
      &::before
        margin: .08rem;
        margin: .8vw;
        color: #ddd;
        content: "|";
  .food-list
    padding: 0 .426667rem;
    padding: 0 4.266667vw;
    &>li
      height: 2.346667rem;
      height: 23.466667vw;
      padding: .32rem 0;
      padding: 3.2vw 0;
      box-sizing border-box
      // border-bottom: 1px solid hsla(0,0%,89%,.5);
      display: -webkit-flex;
      display: flex;
    .food
      height: 2.346667rem;
      height: 23.466667vw;
      padding: .32rem 0;
      padding: 3.2vw 0;
      // border-bottom: 1px solid hsla(0,0%,89%,.5);
      display: -webkit-flex;
      display: flex;
      .food-img
        width: 1.706667rem;
        width: 17.066667vw;
        height: 1.706667rem;
        height: 17.066667vw;
        margin-right: .213333rem;
        margin-right: 2.133333vw;  
  .more
    ackground-color: #fff;
    height: 1.066667rem;
    height: 10.666667vw;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: .293333rem;
    display: -webkit-flex;
    display: flex;
    svg
      width: .24rem;
      width: 2.4vw;
      margin-left: .16rem;
      margin-left: 1.6vw;  
  .food-info
    display: -webkit-flex;
    display: flex;  
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    .food-name
      font-size: .373333rem;
      color: #100; 
    .food-rating
      color: #666;
      font-size: .293333rem;
  .food-price
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    .newP
      font-size: .4rem;
      color: #ff5339;
      &::before
        content: "\A5";
        display: inline;
        font-size: .32rem;
        margin-right: .053333rem;
        margin-right: .533333vw;
    .odlP
      font-size: .266667rem;
      color: #666;
      margin-left: .106667rem;
      margin-left: 1.066667vw;              
  .active
    height: .373333rem;
    height: 3.733333vw;
    box-sizing border-box
    margin-left: .16rem;
    margin-left: 1.6vw;
    display: inline-block;
    padding: 0 .053333rem;
    padding: 0 .533333vw;
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
      font-size: .533333rem;              
</style>

