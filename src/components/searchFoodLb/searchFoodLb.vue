<template>
  <div ref="foodlist">
  <div class="res-wr" v-for="food in foodList" :key="food.id">
    <div class="res">
      <div class="res-c">
        <img class="res-icon" :src="food.restaurant.image_path|imgUrl" alt="">
        <div class="res-info">
          <div class="res-c-t">
            <p class="res-name">
              <span class="res-t">
                {{food.restaurant.name}}
              </span>
            </p>
            <div class="fn" v-if="food.restaurant.delivery_mode">
              <span class="fn-wr">{{food.restaurant.delivery_mode.text}}<span class="fn-in">{{food.restaurant.delivery_mode.text}}</span></span>
            </div>
          </div>
          <div class="res-attr">
            <p>
              <span>评价{{food.restaurant.rating}}</span>
              <span>起送费{{food.restaurant.float_minimum_order_amount}}</span>
              <span>配送费{{food.restaurant.float_delivery_fee}}</span>
            </p>
            <p>
              <span>
                {{food.restaurant.distance|distance}}
              </span>
              <span>
                {{food.restaurant.order_lead_time}}分钟
              </span>
            </p>
          </div>
        </div>
      </div>
      <search-food-list :foods="food.foods">
      </search-food-list>
    </div>
  </div>
      <load-more ref="more" :loadMore="loadMore" :show="show"></load-more>
  </div>
</template>
<script>
import SearchFoodList from 'com/searchFoodList/searchFoodList'
import LoadMore from 'com/loadMore/loadMore'
import axios from 'axios'
export default {
  components: {
    SearchFoodList,
    LoadMore
  },
  data(){
    return {
      foodList: [],
      index: 1,
      show: false,
      scrollMore: false
    }
  },
  methods: {
      handle:function(wrapNode, ev) {
      var ev = ev||event
      let scrollTop = wrapNode.offsetHeight-this.$parent.$refs.searchfood.offsetHeight
      if(scrollTop-ev.target.scrollTop<=1&&this.scrollMore){
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
        this.foodList =[...this.foodList, ...data.data.inside[0].restaurant_with_foods] 
      }
      if(data.data.inside[1]){
        this.foodList =[...this.foodList, ...data.data.inside[0].restaurant_with_foods] 
      }
    })
    },
  },
  mounted () {
    this.scrollMore=true
    axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=${15*this.index}&limit=15&keyword=${this.$store.state.keyword}&latitude=${this.$store.state.position.lat}&longitude=${this.$store.state.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
    ).then(data => {
      console.log(data)
      if(data.data.inside[3]&&data.data.inside[3].restaurant_with_foods.length===15){
        this.index++
      }
      if(data.data.inside[3].restaurant_with_foods){
        this.foodList = data.data.inside[3].restaurant_with_foods
      }
    })
     this.$parent.$refs.searchfood.addEventListener('scroll', this.handle.bind(this,this.$refs.foodlist))
  }
}
</script>
<style lang="stylus">
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
</style>
