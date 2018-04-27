<template>
<div>
  <ul class="food-list">
    <li class="food" v-if="index < show" v-for="(food,index) in foods" :key="food.id">
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
  <!-- <div class="more" @click="isShow(foods.length)"  v-if="show-2<=0">
    展开更多商品{{foods.length-2}}个
    <svg>
      <use xlink:href="#arrow_down">
        <svg viewBox="0 0 10 10" id="arrow_down" width="100%" height="100%"><path fill="#A7A7A7" fill-rule="evenodd" d="M5.04 6.268L.827 2.337a.37.37 0 0 0-.518.017.37.37 0 0 0 .019.518L4.784 7.03a.37.37 0 0 0 .545-.05.437.437 0 0 0 .102-.072l4.225-4.014a.396.396 0 0 0 .013-.564l.047.05a.397.397 0 0 0-.565-.015l-4.11 3.904z"></path></svg>
      </use> 
    </svg>
  </div> -->
  <show-or-hide :isShow="isShow" v-if="foods.length>2"  :show='show' :num="foods.length"></show-or-hide>
  </div>
</template>
<script>
import ShowOrHide from 'com/showOrHide/showOrHide'
export default {
  props: {
    foods: {
      type: Array
    }
  },
  data () {
    return {
      show:2
    }
  },
  mounted () {

  },
  methods: {
    isShow (num) {
      this.show = this.show === 2 ? num : 2
    }
  },
  components: {
    ShowOrHide
  },
};
</script>
<style lang="stylus" scoped>
.food-list {
  padding: 0 0.426667rem;
  padding: 0 4.266667vw;

  &>li {
    height: 2.346667rem;
    height: 23.466667vw;
    padding: 0.32rem 0;
    padding: 3.2vw 0;
    box-sizing: border-box;
    // border-bottom: 1px solid hsla(0,0%,89%,.5);
    display: -webkit-flex;
    display: flex;
  }

  .food {
    height: 2.346667rem;
    height: 23.466667vw;
    padding: 0.32rem 0;
    padding: 3.2vw 0;
    // border-bottom: 1px solid hsla(0,0%,89%,.5);
    display: -webkit-flex;
    display: flex;

    .food-img {
      width: 1.706667rem;
      width: 17.066667vw;
      height: 1.706667rem;
      height: 17.066667vw;
      margin-right: 0.213333rem;
      margin-right: 2.133333vw;
    }
  }
}

.food-info {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: space-between;
  justify-content: space-between;

  .food-name {
    font-size: 0.373333rem;
    color: #100;
  }

  .food-rating {
    color: #666;
    font-size: 0.293333rem;
  }
}

.food-price {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;

  .newP {
    font-size: 0.4rem;
    color: #ff5339;

    &::before {
      content: '\A5';
      display: inline;
      font-size: 0.32rem;
      margin-right: 0.053333rem;
      margin-right: 0.533333vw;
    }
  }

  .odlP {
    font-size: 0.266667rem;
    color: #666;
    margin-left: 0.106667rem;
    margin-left: 1.066667vw;
  }
}

.active {
  height: 0.373333rem;
  height: 3.733333vw;
  box-sizing: border-box;
  margin-left: 0.16rem;
  margin-left: 1.6vw;
  display: inline-block;
  padding: 0 0.053333rem;
  padding: 0 0.533333vw;
  position: relative;
  font-size: 0.266667rem;
  color: transparent;
  white-space: nowrap;

  span {
    position: absolute;
    left: 0;
    top: 0;
    right: -100%;
    bottom: -100%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: 0.533333rem;
  }
}

.more {
  ackground-color: #fff;
  height: 1.066667rem;
  height: 10.666667vw;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-size: 0.293333rem;
  display: -webkit-flex;
  display: flex;

  svg {
    width: 0.24rem;
    width: 2.4vw;
    margin-left: 0.16rem;
    margin-left: 1.6vw;
  }
}
</style>

