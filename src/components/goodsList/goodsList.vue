<template>
  <div id="goodslist">
    <div class="listWr">
      <main class="list">
        <!-- <div> -->
          <ul v-if="list" class="nav">
            <li @click="foodClass(key)" role="food" class=""  v-for="(classify,key) in list" :key="classify.id">
              <img v-if="classify.icon_url" :src="classify.icon_url|imgUrl" alt="">
              <span>{{classify.name}}</span>
            </li>
          </ul>
          <section class="food-list">
            <div class="scroller">
              <dl role="menu" v-for="foods in list" :key="foods.id">
                <dt class="food-head" role="heading" :aria-label="foods.description">
                  <div class="foods-info">
                    <strong>{{foods.name}}</strong>
                    <span>{{foods.description}}</span>
                  </div>
                </dt>
                <dd  v-for="food in foods.foods"  :aria-label="food.description" :key="food.id">
                  <div class="food-detail">
                    <span class="food-left"><span v-if="food.attrs.length"  class="brand">招牌<span>招牌</span></span>
                       <img :src="food.image_path|imgUrl" alt="">
                    </span>
                    <section class="food-right">
                      <p class="food-name">{{food.name}}</p>
                      <p v-if="food.description" class="food-description">{{food.description}}</p>
                      <p class="food-info">
                        <span>月售{{food.month_sales}}份</span>
                        <span>好评率{{food.satisfy_rate}}%</span>
                      </p>
                      <div class="discountWr" v-if="food.activity">
                        <span class="food-discount">
                          <span class="discount-num">{{Math.round(food.activity.fixed_price/food.specfoods[0].original_price*100)/10}}折<span>{{Math.round(food.activity.fixed_price/food.specfoods[0].original_price*100)/10}}折</span></span>
                          <span v-if="food.activity.applicable_quantity_text" class="discount-c">
                            {{food.activity.applicable_quantity_text}}
                            <span>{{food.activity.applicable_quantity_text}}</span>
                          </span>
                        </span>
                      </div>
                      <strong class="food-price">
                        <span class="newP">{{food.specfoods[0].price}}</span>
                        <del v-if="food.specfoods[0].original_price" class="oldP">￥{{food.specfoods[0].original_price}}</del> 
                      </strong>
                      <div class="food-buttons">
                        <span >
                          <add-cart :updataCount="updataCount" :food="food" ></add-cart>
                        </span>
                      </div>
                    </section>
                  </div>
                </dd>
              </dl>
            </div>
            <!-- <div></div> -->
          </section>
        <!-- </div> -->
      </main>
      <shop-cart></shop-cart>
    </div>
  </div>
</template>
<script>
import addCart from 'com/addCart/addCart'
import shopCart from 'com/shopCart/shopCart'
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  props: {
    info: {
      type: Object
    }
  },
  data () {
    return {
      list: null,
      scrollDistance: [],
      index: 0,
      isShow:false,
      num: 1,
      food:[]
    }
  },
  methods: {
    updataCount: function (food, count) {
      food.count = count
      console.log(food.count)
    },
    foodClass: function (key) {
      const scrollNode = document.querySelector('.scroller')
      const nameNodes = document.querySelectorAll('[role="heading"]')
      const menuNode = document.querySelectorAll('[role="menu"]')
        scrollNode.scrollTop > menuNode[key].offsetTop ? this.toMark(scrollNode, menuNode, key, false) : this.toMark(scrollNode, menuNode, key, true);
    },
    toMark: function (scrollNode, menuNode, key, to) {
      const _this = this
      _this.timer && clearInterval(_this.timer)
      _this.timer2 && clearInterval(_this.timer2)
      if (to) {
        let distance = ((menuNode[key].offsetTop - scrollNode.scrollTop)/15)
        _this.timer = setInterval(function () {
            scrollNode.scrollTop += distance
            if( scrollNode.scrollTop >= menuNode[key].offsetTop) {
              scrollNode.scrollTop = menuNode[key].offsetTop
              clearInterval(_this.timer)
              clearInterval(_this.timer2)
              return 
            }
        }, 10)
      } else {
        let distance = (scrollNode.scrollTop - menuNode[key].offsetTop)/15
          _this.timer2 = setInterval(function () {
          scrollNode.scrollTop -= distance
            if ( scrollNode.scrollTop <= menuNode[key].offsetTop) {
               scrollNode.scrollTop = menuNode[key].offsetTop
              clearInterval(_this.timer2)
              clearInterval(_this.timer)
              return
            }
          }, 20)
        } 
    }
  },
  created () {
    console.log(this)
    //https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=161677158
    // let str ="06a05b267f338acfeb8bd682d16e836dpng"
    // console.log(str.match(/jpeg|png/)[0])
    axios.get(
      `/apis/restapi/shopping/v2/menu?restaurant_id=${this.info.shopId}`
    ).then(data => {
      this.list = data.data
    })
    
  },
  updated () {
    const menuNode = document.querySelectorAll('[role="menu"]')
    const _this = this
    const scrollNode = document.querySelector('.scroller')
    const foodNode = document.querySelectorAll('[role="food"]')
    let h = ''
    foodNode[this.index].className='bg'
    // Array.map.bind(menuNode)
    Array.prototype.map.bind(menuNode)
    scrollNode.addEventListener('scroll', function (ev) {
      // foodNode[this.index].className = ' '
      // console.log(foodNode[this.index])
      // _this.timer && clearInterval(_this.timer)
      // _this.timer2 && clearInterval(_this.timer2)
      for (let m=0; m<menuNode.length;m++){
       foodNode[m].className=' '
       if(m<menuNode.length-1) {
          if (scrollNode.scrollTop>=menuNode[m].offsetTop&& scrollNode.scrollTop<menuNode[m+1].offsetTop) {
          this.index = m
          foodNode[this.index].className = 'bg'
        }
       } else {
         if (scrollNode.scrollTop >= menuNode[menuNode.length-1].offsetTop) {
            foodNode[menuNode.length-1].className = 'bg'
         }
       }
      }
    })
  },
  components: {
    addCart,
    shopCart
  }
}
</script>
<style lang="stylus" scoped>
#goodslist
  height 626px
  .scroller
    height: 100%;
    padding-bottom: 1.066667rem;
    padding-bottom: 10.666667vw;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .food-right
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      position: relative;
      padding-bottom: .666667rem;
      padding-bottom: 6.666667vw;
      .food-name
        font-size: .4rem;
        font-weight: 700;
        line-height: 1.2;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: start;
        -webkit-align-items: start;
        -ms-flex-align: start;
        align-items: start;
        padding-right: .533333rem;
        padding-right: 5.333333vw;
        word-break: break-word;
      .food-description
        margin: .133333rem 0!important;
        margin: 1.333333vw 0!important;
        font-size: .253333rem;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 4.8rem;
        width: 48vw;
      .food-info
        margin: .173333rem 0!important;
        margin: 1.733333vw 0!important;
        color: #666;
        font-size: .293333rem;
        line-height: 1;
        span
          vertical-align: middle;
          margin: .173333rem 0!important;
          margin: 1.733333vw 0!important;
          color: #666;
          font-size: .293333rem;
          line-height: 1;
      .food-price
        font-weight: 700;
        font-size: .426667rem;
        line-height: .426667rem;
        line-height: 4.266667vw;
        color: #f60;
        padding-bottom: .093333rem;
        padding-bottom: .933333vw;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: baseline;
        -webkit-align-items: baseline;
        -ms-flex-align: baseline;
        align-items: baseline;
        position: absolute;
        bottom: 0;
        .newP
          margin-right: .106667rem;
          margin-right: 1.066667vw;
          font-weight: 700;
          font-size: .426667rem;
          line-height: .426667rem;
          line-height: 4.266667vw;
          color: #f60;
          padding-bottom: .093333rem;
          padding-bottom: .933333vw;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: baseline;
          -webkit-align-items: baseline;
          -ms-flex-align: baseline;
          align-items: baseline;
          &::before
            font-weight: 400;
            content: "\A5";
            font-size: .32rem;
            margin-right: .053333rem;
            margin-right: .533333vw;
            display: inline-block;
        .oldP
          font-weight: 700;
          font-size: .426667rem;
          line-height: .426667rem;
          line-height: 4.266667vw;
          color: #f60;
          padding-bottom: .093333rem;
          padding-bottom: .933333vw;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: baseline;
          -webkit-align-items: baseline;
          -ms-flex-align: baseline;
          align-items: baseline;
          font-size: .32rem;
          color: #666;
          font-weight: 400;
          vertical-align: top;
      .food-buttons
        position: absolute;
        right: 0;
        bottom: -.066667rem;
        bottom: -.666667vw;
        .food-buttonWr
          display: inline-block;
          font-size: .346667rem;
          // white-space: nowrap;
          a
            display: inline-block;
            padding: .093333rem;
            padding: .933333vw;
            vertical-align: middle;
            text-decoration: none;
            outline: none;
            svg
              width: 40px;
              height: 40px;
              width: 20px;
              height: 20px;
              vertical-align: middle;
              fill: #2395ff;
          span
            display: inline-block;
            text-align: center;
            color: #666;
            vertical-align: middle;
            font-size: .373333rem;
            min-width: .4rem;
            min-width: 4vw;
            max-width: 2em;
            overflow: hidden;              
      .discountWr
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        .food-discount
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          .discount-num
            height: .346667rem;
            height: 3.466667vw;
            padding: 0 .08rem;
            padding: 0 .8vw;
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
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              -ms-flex-pack: center;
              justify-content: center;
              font-size: .533333rem;
              background-image: -webkit-gradient(linear,left top,right top,from(#ff7416),color-stop(98%,#ff3c15));
              background-image: -webkit-linear-gradient(left,#ff7416,#ff3c15 98%);
              background-image: linear-gradient(90deg,#ff7416,#ff3c15 98%);
              border-top-left-radius: .013333rem;
              border-top-left-radius: .133333vw;
              border-top-right-radius: .013333rem;
              border-top-right-radius: .133333vw;
              color: #fff;
          .discount-c
            height: .346667rem;
            height: 3.466667vw;
            padding: 0 .08rem;
            padding: 0 .8vw;
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
              display: -webkit-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -webkit-align-items: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: center;
              -webkit-justify-content: center;
              -ms-flex-pack: center;
              justify-content: center;
              font-size: .533333rem;
              color: #f07373;
              border: 2px solid #ff3c15;
              border-left: none;          
  .listWr
    height: 100%;
    padding-bottom: 1.28rem;
    padding-bottom: 12.8vw;
    background-color: #fff;
    .list
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      height: 100%;
      .nav
        padding: 0 0 1.066667rem;
        padding: 0 0 10.666667vw;
        list-style: none;
        -webkit-box-flex: 0;
        -webkit-flex: none;
        -ms-flex: none;
        flex: none;
        margin: 0;
        overflow-y: auto;
        height: 100%;
        background-color: #f8f8f8;
        webkit-overflow-scrolling: touch;
        width: 2.053333rem;
        width: 20.533333vw;
        height: 100%;
        li
          position: relative;
          padding: .466667rem .2rem;
          padding: 4.666667vw 2vw;
          border-bottom: 1px solid #e8e8e8;
          font-size: .32rem;
          color: #666;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          &.bg
            background-color #fff
          img
            width: .346667rem;
            width: 3.466667vw;
            height: .346667rem;
            height: 3.466667vw;
            vertical-align: top;
            margin-right: .08rem;
            margin-right: .8vw;
      .food-list
        position: relative;
        height: 100%;
        height: 100%;
        width: 7.946667rem;
        width: 79.466667vw;
        display: flex;
        .foods-info
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          overflow: hidden;
          strong
            margin-right: .133333rem;
            margin-right: 1.333333vw;
            font-weight: 700;
            font-size: .32rem;
            color: #666;
            -webkit-box-flex: 0;
            -webkit-flex: none;
            -ms-flex: none;
            flex: none;
          span
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            color: #999;
            font-size: .266667rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -text-size-adjust:none
            user-select: none;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust:none
        dd
          position: relative;
          margin: 0;
          min-height: 3.066667rem;
          min-height: 30.666667vw;
          padding-left: .266667rem;
          padding-left: 2.666667vw;
          .food-detail
            padding: .266667rem .266667rem .266667rem 0;
            padding: 2.666667vw 2.666667vw 2.666667vw 0;
            margin-bottom: 1px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            min-height: 2.746667rem;
            min-height: 27.466667vw;
            position: relative;
            .food-left
              width: 2.026667rem;
              width: 20.266667vw;
              height: 2.026667rem;
              height: 20.266667vw;
              vertical-align: top;
              -webkit-box-flex: 0;
              -webkit-flex: none;
              -ms-flex: none;
              flex: none;
              margin-right: .266667rem;
              margin-right: 2.666667vw;
              position: relative;
              img
                width: 100%;
                border-radius: .053333rem;
                border-radius: .533333vw
              .brand
                position: absolute;
                left: 0;
                top: 0;
                border-top-left-radius: .053333rem;
                border-top-left-radius: .533333vw;
                border-bottom-right-radius: .053333rem;
                border-bottom-right-radius: .533333vw;
                font-size: .266667rem;
                color: transparent;
                width: .64rem;
                width: 6.4vw;
                height: .346667rem;
                height: 3.466667vw;
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
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-align: center;
                  -webkit-align-items: center;
                  -ms-flex-align: center;
                  align-items: center;
                  -webkit-box-pack: center;
                  -webkit-justify-content: center;
                  -ms-flex-pack: center;
                  justify-content: center;
                  font-size: .533333rem;
                  color: #fff;
                  background-image: -webkit-linear-gradient(315deg,#ffae1b,#f57751);
                  background-image: linear-gradient(135deg,#ffae1b,#f57751);     
    .food-head
      position: relative;
      margin-left: .266667rem;
      margin-left: 2.666667vw;
      padding: .2rem .8rem .2rem 0;
      padding: 2vw 8vw 2vw 0;
      border-bottom: 1px solid #eee;            
</style>
