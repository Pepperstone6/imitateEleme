<template>
  <div >
    <header class="head">
      <div class="head-c">
        <div @click="goback" class="goback">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE2LjU1MiA1LjYzM0wxNC41MDggMy41OSAyLjI0MyAxNS44NTMgMTQuNTA4IDI4LjQxbDIuMDQ0LTIuMDQzLTEwLjIyLTEwLjUxM3oiLz48L3N2Zz4=">
        </div>
        <h1 class="discover-name">发现</h1>
      </div>
    </header>
    <div>
      <a href='javascript:location.href = navigator.userAgent.match(/Eleme/) ? "eleme://web?url=https%3A%2F%2Fapp-resource.ele.me%2Fprod%2FrkQxMonsG.html" : "https://app-resource.ele.me/prod/rkQxMonsG.html";'>
        <img src="https://fuss10.elemecdn.com/a/5c/c19ebf245df0e585f8e7f983c5f68gif.gif" alt="纯品奶茶" class="banner">
      </a>
    </div>
    <section class="port unmerge" v-if="entrys&&item.length" v-for="(item, index) in entrys" :key="index">
      <div class="classify list">
        <a :href="entry.content_url" v-for="entry in item" :key="entry.id">
            <div class="entryWr">
              <p class="entry-title" :style="`color:${entry.title_color}`">{{entry.title}}</p>
              <p class="entry-tips">{{entry.subtitle}}</p>
            </div>
            <img class="icon" :src="entry.main_pic_hash|imgUrl" alt="">
        </a>
      </div>
    </section>
    <section>
      <div class="activity-header">
        <span class="line left"></span>
        <svg class="activity-icon"><use xlink:href="#alarm">
          <svg viewBox="-4 3 30 30" id="alarm" width="100%" height="100%"><g id="alarm_页面"><g id="alarm_发现页_新增天天特价_确认" transform="translate(-31 -1587)"><g id="alarm_商品" transform="translate(-2 1556)"><g id="alarm_Page-1"><path d="M10 29.9c-7.2 0-13-5.8-13-13 0-2 .4-3.9 1.3-5.7C.5 6.7 5 3.9 10 3.9c7.2 0 13 5.8 13 13s-5.8 13-13 13zM.1 12.1C-.7 13.6-1 15.2-1 16.9c0 6.1 4.9 11 11 11s11-4.9 11-11-4.9-11-11-11c-4.3 0-8.1 2.3-9.9 6.2z" class="st0" transform="translate(34 32)"></path><path d="M-1 12.1c-1.8-.9-3-2.7-3-4.8C-4 4.4-1.6 2 1.3 2c2 0 3.8 1.1 4.7 2.8l-1.8 1C3.7 4.7 2.5 4 1.3 4-.5 4-2 5.5-2 7.3c0 1.3.7 2.4 1.8 3l-.8 1.8zM21 11.8l-1-1.7c1-.6 1.6-1.7 1.6-2.8 0-1.8-1.5-3.3-3.3-3.3-1.3 0-2.5.8-3.1 2l-1.8-.8c.8-2 2.8-3.3 4.9-3.3 2.9 0 5.3 2.4 5.3 5.3-.1 2-1 3.7-2.6 4.6zM14.3 20.2h-4.2c-.6 0-1-.4-1-1v-8.1c0-.6.4-1 1-1s1 .4 1 1v7.1h3.2c.6 0 1 .4 1 1s-.4 1-1 1zM-1.2 32c-.2 0-.5-.1-.7-.3-.4-.4-.4-1-.1-1.4l4-4.5c.4-.4 1-.4 1.4-.1.4.4.4 1 .1 1.4l-4 4.5c-.2.3-.4.4-.7.4zM21.5 32c-.3 0-.5-.1-.7-.3l-4-4.5c-.4-.4-.3-1 .1-1.4.4-.4 1-.3 1.4.1l4 4.5c.4.4.3 1-.1 1.4-.2.1-.4.2-.7.2z" class="st0" transform="translate(34 32)"></path></g></g></g></g></svg></use></svg>
        限时好礼
        <span class="line right"></span>
      </div>
      <p class="activity-title">金币换豪礼</p>
      <div class="activity-suggest">
        <a :href="suggest.url" class="discover-food" ubt-data-title="限时好礼" v-if="index<3" v-for="(suggest, index) in suggests" :key="suggest.id">
          <img class="promite-img" :src="suggest.image_hash|imgUrl" alt="">
          <div>
            <p class="promite-title">{{suggest.title}}</p>
            <div class="food-info">
              <div class="food-price">
                <span class="price">
                  {{suggest.points_required}}金币
                </span>
                <del class="del">
                  {{suggest.original_price}}
                </del>
              </div>
            </div>
          </div>
          <span class="promite-icon">{{suggest.corner_marker}}</span>
        </a>
      </div>
      <p class="loadmore">
        查看更多
        <svg class="svg-next"><use xlink:href="#tab_found_next_page">
          <svg viewBox="0 0 16 25" id="tab_found_next_page" width="100%" height="100%"><path fill="none" fill-rule="evenodd" stroke="#CCC" stroke-linecap="round" stroke-width="3" d="M2.127 2l10.87 10.582L2.291 23.11"></path></svg></use></svg>
      </p>
    </section>
    <tail></tail>
  </div>
</template>
<script>
import Tail from 'com/tail/tail'
import axios from 'axios'
export default {
  data () {
    return {
      entrys: null,
      suggests: null
    }
  },
  mounted(){
    axios.get(
      `/apis/restapi/member/v1/discover?platform=1&block_index=0`
    ).then(data => {
      this.entrys = data.data
    })
    axios.get(
      `/apis/restapi/member/gifts/suggest`
    ).then(suggest => {
      console.log(suggest)
      this.suggests = suggest.data
    })
  },
  methods: {
    goback: function () {
      this.$router.go(-1)
    }
  },
  components: {
    Tail
  }
}
</script>
<style scoped lang="stylus">
img {
    max-width: 100%;
}
html{
  background #f5f5f5
}
a
  text-decoration none
.head
  height: 1.173333rem;
  height: 11.733333vw;
  .head-c
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    width: 100%;
    height: 1.173333rem;
    height: 11.733333vw;
    color: #fff;
    font-size: .48rem;
    background: #2395ff;
    position: fixed;
    top: 0;
    left: 0;
    background-image: linear-gradient(90deg,#0af,#0085ff);
  .discover-name
    position: absolute;
    top: 0;
    left: 50%;
    height: 1.173333rem;
    height: 11.733333vw;
    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 1em;
    line-height: 1.173333rem;
    line-height: 11.733333vw;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  .goback
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 1.173333rem;
    width: 11.733333vw;
    height: 1.173333rem;
    height: 11.733333vw;
    &>img 
      width: .32rem;
      width: 3.2vw; 
.banner
  line-height: 1;
  width: 100%;
  display: block;
section
  margin-bottom: .28rem;
  margin-bottom: 2.8vw;
  background: #fff;
  border-top: 1px solid #eee;
  border-bottom: .013333rem solid #eee;
  border-bottom: .133333vw solid #eee;
  &.port
    border-bottom: none;
    background: transparent none repeat 0 0/auto auto padding-box border-box scroll;
    background: initial;
    .classify
      border-width: 1px 0;
      box-sizing: border-box;
      overflow: hidden;
      display: -webkit-flex;
      display: flex;
      background: #fff;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      a
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
        width: 100%;
        height: 2.133333rem;
        height: 21.333333vw;
        padding: 0 .4rem;
        padding: 0 4vw;
        box-sizing border-box
        border-bottom: 1px solid #ededed;
        &:nth-child(3n+1)
          border-right: 1px solid #ededed;
        &:first-child
          position: absolute;
          -webkit-justify-content: space-between;
          justify-content: space-between;
          -webkit-align-items: flex-start;
          align-items: flex-start;
          -webkit-align-items: normal;
          align-items: normal;
          height: 4.266667rem;
          height: 42.666667vw;
          box-sizing border-box
          padding: .586667rem .293333rem .16rem .426667rem;
          padding: 5.866667vw 2.933333vw 1.6vw 4.266667vw; 
    .list
      position relative
      a
        width: 50%;
.unmerge>.classify:first-child {
    margin-bottom: .28rem;
    margin-bottom: 2.8vw;
}      
.unmerge>.classify:last-child {
    border-top: 1px solid #ededed;
}
.classify:first-child {
    border-top: 0;
}
.entryWr
  max-width: 3rem;
  max-width: 30vw;
  .entry-title
    line-height: 1.2;
    font-size: .426667rem;
    margin-bottom: .16rem;
    margin-bottom: 1.6vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  .entry-tips
    line-height: 1.2;
    font-size: .32rem;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;  
.icon
  -webkit-align-self: flex-end;
  align-self: flex-end;
  width: 2rem;
  width: 20vw;
.classify.list a:nth-child(2), .classify.list a:nth-child(3) {
  margin-left: 50%;
}
.activity-header
  padding-top: .52rem;
  padding-top: 5.2vw;
  text-align: center;
  font-size: .48rem;
  font-weight: 700;
  color: #333;
  .line
    display: inline-block;
    margin: .213333rem .093333rem .173333rem;
    margin: 2.133333vw .933333vw 1.733333vw;
    border: 1px solid #333;
    width: .4rem;
    width: 4vw;
    height: 0;
    position: relative;
    &::after
      position: absolute;
      top: -.066667rem;
      top: -.666667vw;
      content: "";
      background: #333;
      height: .133333rem;
      height: 1.333333vw;
      width: .133333rem;
      width: 1.333333vw;
      border-radius: 50%;
    &.left::after
      right: -.066667rem;
      right: -.666667vw;
    &.right::after
      left: -.066667rem;
      left: -.666667vw; 
.activity-icon
  position: relative;
  top: .053333rem;
  top: .533333vw;
  width: .44rem;
  width: 4.4vw;
  height: .44rem;
  height: 4.4vw;     
  fill: #ff4040
.activity-title
  font-size: .293333rem;
  color: #999;
  text-align: center;
  padding-bottom: .213333rem;
  padding-bottom: 2.133333vw;
.activity-suggest
  padding: .32rem 0 .4rem .4rem;
  padding: 3.2vw 0 4vw 4vw;
  white-space: nowrap;
.discover-food
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 2.96rem;
  width: 29.6vw;
  margin-right: .16rem;
  margin-right: 1.6vw;
.promite-img
  width: 4.32rem;
  width: 43.2vw;
  height: 2.933333rem;
  height: 29.333333vw;
  margin-bottom: .253333rem;
  margin-bottom: 2.533333vw;
.promite-icon
  position: absolute;
  top: 0;
  left: 0;
  font-size: .293333rem;
  color: #fff;
  background: #413d3c;
  padding: .066667rem;
  padding: .666667vw; 
.promite-title
  font-size: .346667rem;
  color: #333;
  margin-bottom: .133333rem;
  margin-bottom: 1.333333vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
.food-info
  &::before,&::after 
    display: table;
    line-height: 0;
    content: "";
    clear: both;
  .food-price
    height: .64rem;
    height: 6.4vw;
    line-height: .64rem;
    line-height: 6.4vw;
.price
  font-size: .346667rem;
  height: .48rem;
  height: 4.8vw;
  line-height: .48rem;
  line-height: 4.8vw;
  color: #ff5339;
  margin-right: .093333rem;
  margin-right: .933333vw;
  max-width: 1.333333rem;
  max-width: 13.333333vw;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;    
.del
  font-size: .293333rem;
  color: #aaa;
  max-width: 1.066667rem;
  max-width: 10.666667vw;
  display: inline-block;
  vertical-align: middle;                 
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
.loadmore
  font-size: .346667rem;
  color: #999;
  text-align: center;
  padding: .4rem 0 .48rem;
  padding: 4vw 0 4.8vw;
  .svg-next
    height: .24rem;
    height: 2.4vw;
    width: .133333rem;
    width: 1.333333vw;
    margin-left: .146667rem;
    margin-left: 1.466667vw;       
</style>
