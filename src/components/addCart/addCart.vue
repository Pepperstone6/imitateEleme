<template>
  <span class="food-buttonWr">
    <router-link to="#" ref="sub" @click.native="jian" v-show="isShow" role="button" aria-label="删减商品">
    <svg>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add">
        <svg viewBox="0 0 44 44" id="cart-add" width="100%" height="100%"><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clip-rule="evenodd"></path></svg>
      </use>
    </svg>
    </router-link>
    <span class="add-num" ref="num" v-show="isShow" aria-label="已选一份" role="button">{{num}}</span>
    <router-link ref="add" to="#" @click.native="add($event)" role="button" aria-label="添加商品">
    <svg v-if="specs">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus">
        <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg>
      </use>
    </svg>
    <span class="rule" @click="chooseSpecs" v-if="!specs">规格</span>
    </router-link>
    <mt-popup
  v-model="popup"
  popup-transition="popup-fade" 
  >
 <div class="popup-wr">
    <h1 class="specs-name">{{food.name}}</h1>
    <div class="specs-in" v-if="food.specifications.length > 0" v-for=" (specs,key) in food.specifications" :key="key">
      <div>
        <h2>
          {{specs.name}}
        </h2>
         <a href="javascript:" @click="goSpecs(index, item)" :class="{choose:index === sub}" class="specs-num" v-if="specs.values.length>0" v-for="(item,index) in specs.values" :key="index">
          {{item}}
        </a>
      </div>
    </div>
    <div class="specs-in" v-if="food.attrs.length > 0" v-for=" (attr,key) in food.attrs" :key="key+1">
      <div>
        <h2>
          {{attr.name}}
        </h2>
         <a href="javascript:" class="specs-num" @click = goAttr(index,key,mark[key]) :class="{choose:index === mark[key]}" v-if="attr.values.length>0" v-for="(item,index) in attr.values" :key="index">
          {{item}}
        </a>
      </div>
    </div>
    <div class="popup-submit">
      <p class="specs-price">
        <span class="specs-yuan">￥</span>
        <span class="specs-jia">{{price}}</span>
        <small class="specs-qi" v-if="goShow">起</small>
      </p>
      <div>
        <button class="specs-tj" @click="completed($event)" :class="{over:goShow}" >{{goShow?'已售完': '已选好'}}</button>
      </div>
    </div>
 </div>
</mt-popup>
  </span>
</template>
<script>
import Vue from "vue"
import { Popup } from "mint-ui"
Vue.component(Popup.name, Popup)
export default {
  props: {
    updataCount: {
      type: Function
    },
    food: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false,
      num: 1,
      specs: true,
      popup: false,
      sub: 0,
      mark: [],
      price: 0,
      goShow: false
    }
  },
  beforeMount() {
    if (this.food.specfoods.length > 1) {
      this.specs = false
    }
  },
  mounted() {
    if (this.food.attrs.length > 0) {
      this.food.attrs.forEach((item, index) => {
        this.mark.push(0)
      })
    }
    this.price = this.food.specfoods[0].price
  },
  methods: {
    completed: function(ev) {
      console.log(ev)
    },
    goAttr: function(index, key) {
      this.$set(this.mark, key, index)
    },
    goSpecs: function(index, item) {
      this.goShow = false
      if (item === "默认") {
        this.goShow = true
      }
      this.sub = index
      this.price = this.food.specfoods[index].price
    },
    chooseSpecs: function() {
      this.popup = true
    },
    add: function(ev) {
      console.log(this.food)
      ev.cancelBubble = false
      const node = ev.target
      if (this.num === 1 && this.isShow === false) {
        this.updataCount(this.food, this.num)
        this.isShow = true
        return
      }
      // this.isShow=true
      this.num++
      let qiu = {
        top: node.offsetTop
      }
      this.food.count++
      this.updataCount(this.food, this.num)
      // updataCount()
    },
    jian: function() {
      if (this.num === 1 && this.isShow === true) {
        this.updataCount(this.food, 0)
        this.isShow = false
        return
      }
      this.num--
      this.updataCount(this.food, this.num)
    }
  }
}
</script>
<style lang="stylus" scoped>
.food-buttonWr {
  display: inline-block
  font-size: 0.346667rem

  // white-space: nowrap
  &>a {
    display: inline-block
    padding: 0.093333rem
    padding: 0.933333vw
    vertical-align: middle
    text-decoration: none
    outline: none

    svg {
      width: 40px
      height: 40px
      width: 20px
      height: 20px
      vertical-align: middle
      fill: #2395ff
    }
  }

  &>span {
    display: inline-block
    text-align: center
    color: #666
    vertical-align: middle
    font-size: 0.373333rem
    min-width: 0.4rem
    min-width: 4vw
    max-width: 2em
    overflow: hidden
  }

  .rule {
    display: inline-block
    vertical-align: middle
    color: #fff
    background-color: #3199e8
    text-decoration: none
    padding: 0 0.2rem
    padding: 0 2vw
    font-size: 0.32rem
    border-radius: 0.346667rem
    border-radius: 3.466667vw
    line-height: 0.666667rem
    line-height: 6.666667vw
    box-sizing: border-box
  }
}

.popup-wr {
  width: 80vw

  .specs-name {
    margin: 0
    text-align: center
    background-color: inherit
    color: #333
    font-size: 0.426667rem
    line-height: 0.6rem
    line-height: 6vw
    padding: 0.333333rem 0.8rem
    padding: 3.333333vw 8vw
    box-sizing: border-box
  }

  .specs-in {
    max-height: 6.666667rem
    max-height: 66.666667vw
    // overflow-y: auto
    -webkit-overflow-scrolling: touch
    padding: 0 0 0.533333rem 0.4rem
    padding: 0 0 5.333333vw 4vw
    box-sizing: border-box

    h2 {
      font-size: 0.346667rem
      color: #666
      line-height: 0.533333rem
      line-height: 5.333333vw
    }

    .specs-num {
      display: inline-block
      vertical-align: middle
      white-space: nowrap
      border: 1px solid #999
      border-radius: 0.533333rem
      border-radius: 5.333333vw
      margin: 0.173333rem 0.4rem 0 0
      margin: 1.733333vw 4vw 0 0
      padding: 0 0.24rem
      padding: 0 2.4vw
      min-width: 1.333333rem
      min-width: 13.333333vw
      line-height: 0.64rem
      line-height: 6.4vw
      height: 0.64rem
      height: 6.4vw
      font-size: 0.346667rem
      text-decoration: none
      text-align: center
      color: #666
      box-sizing: border-box

      &.choose {
        font-weight: 700
        color: #3199e8
        border-color: #3199e8
        background-color: #f6fbff
      }
    }
  }

  .popup-submit {
    display: -webkit-box
    display: -webkit-flex
    display: -ms-flexbox
    display: flex
    -webkit-box-pack: justify
    -webkit-justify-content: space-between
    -ms-flex-pack: justify
    justify-content: space-between
    -webkit-box-align: center
    -webkit-align-items: center
    -ms-flex-align: center
    align-items: center
    padding: 0.333333rem 0.4rem
    padding: 3.333333vw 4vw
    border-top: 1px solid #eee
    border-bottom: 1px solid #eee
    background-color: #f9f9f9
    box-sizing: border-box

    .specs-price {
      font-size: 0.56rem
      line-height: 1
      color: #ff6000

      .specs-yuan {
        position: relative
        font-size: 0.293333rem
        top: -0.04rem
        top: -0.4vw
        margin-right: -0.133333rem
        margin-right: -1.333333vw
        vertical-align: bottom
      }

      .specs-jia {
        font-weight: 700
      }
    }
  }

  .specs-tj {
    box-sizing: border-box
    outline: none
    border: none
    -webkit-appearance: none
    font-size: 0.373333rem
    color: #fff
    padding: 0 0.333333rem
    padding: 0 3.333333vw
    text-align: center
    line-height: 0.866667rem
    line-height: 8.666667vw
    border-radius: 0.08rem
    border-radius: 0.8vw
    background-color: #3199e8
    text-decoration: none

    &.over {
      background-color: #ccc
    }
  }

  .specs-qi {
    font-size: 0.293333rem
    color: #999
  }
}
</style>

