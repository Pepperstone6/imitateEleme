<template>
  <div id="active">
    <h2>优惠信息</h2>
    <div @click="colsePopup" class="colse">
      <i class="iconfont icon-jia-copy"></i>
    </div>
    <div class="active-nr">
      <div class="active-list" v-for="active in activities" :key="active.id">
        <span :style="`background-color:#${active.icon_color}`" class="icon-name">{{active.icon_name}}<span>{{active.icon_name}}</span></span>
        <span class="active-name">
          {{active.name}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activities: {
      type: Array,
      default: []
    }
  },
  created () {
    console.log(this.activities)
  },
  methods: {
    colsePopup: function () {
      this.$emit('test', false)
    }
  }
}
</script>
<style lang="stylus" scoped>
#active
  h2
    text-align: center;
    font-size: .453333rem;
    font-weight: 600;
    margin-bottom: .413333rem;
    margin-bottom: 4.133333vw
  .colse
    position: absolute;
    height: .64rem;
    height: 6.4vw;
    width: .64rem;
    width: 6.4vw;
    right: .266667rem;
    right: 2.666667vw;
    top: .266667rem;
    top: 2.666667vw;
    display flex
    justify-content center
    align-items center
    i
      font-size 0.63rem
  .active-nr
    height: 5.08rem;
    height: 50.8vw;
    overflow-y: scroll;
    .active-list
      display: -webkit-flex;
      display: flex;
      font-size: .346667rem;
      -webkit-align-items: center;
      align-items: center;
      margin-bottom: .306667rem;
      margin-bottom: 3.066667vw
      .icon-name
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
        border-radius: .266667v
        position: relative;
        font-size: .266667rem;
        color: transparent;
        white-space: nowrap;
        height: .426667rem;
        height: 4.266667vw;
        padding: .053333rem .16rem;
        padding: .533333vw 1.6vw
        span
          font-size .64rem!important
          font-size: .48rem!important;
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
      .active-name
        font-size: .346667rem;
        line-height: 1.38;
        -webkit-flex: 1;
        flex: 1;
        font-size: .293333rem;          
</style>
