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
    <svg>
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus">
        <svg viewBox="0 0 44 44" id="cart-minus" width="100%" height="100%"><path fill="none" d="M0 0h44v44H0z"></path><path fill-rule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clip-rule="evenodd"></path></svg>
      </use>
    </svg>
    </router-link>
  </span>
</template>
<script>
export default {
  props: {
    updataCount: {
      type: Function
    },
    food: {
      type: Object
    }
  },
  data () {
    return {
      isShow: false,
      num: 1
    }
  },
  methods: {
     add: function (ev) {
      ev.cancelBubble = false
      const node = ev.target
      if (this.num ===1 && this.isShow === false) {
        this.updataCount(this.food, this.num)
        this.isShow=true
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
    jian: function () {
       if (this.num ===1 && this.isShow === true) {
          this.updataCount(this.food, 0)
        this.isShow= false
        return
      }
       this.num--
        this.updataCount(this.food, this.num)
    },
  }
};
</script>
<style lang="stylus" scoped>
.food-buttonWr
          display: inline-block;
          font-size: .346667rem;
          white-space: nowrap;
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
</style>

