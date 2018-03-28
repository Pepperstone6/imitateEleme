<template>
  <div id="goodslist">
    <div class="listWr">
      <main class="list">
        <!-- <div> -->
          <ul v-if="list" class="nav">
            <li v-for="classify in list" :key="classify.id">
              <img v-if="classify.icon_url" :src="classify.icon_url|imgUrl" alt="">
              <span>{{classify.name}}</span>
            </li>
          </ul>
          <section class="food-list">
            <div class="scroller">
              <dl role="menu" v-for="foods in list" :key="foods.id">
                <dt fole="heading" :area-label="foods.description">
                  <div class="foods-info">
                    <strong>{{foods.name}}</strong>
                    <span>{{foods.description}}</span>
                  </div>
                </dt>
                <dd></dd>
              </dl>
            </div>
            <!-- <div></div> -->
          </section>
        <!-- </div> -->
      </main>
    </div>
  </div>
</template>
<script>
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
      list: null
    }
  },
  created () {
    //https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=161677158
    // let str ="06a05b267f338acfeb8bd682d16e836dpng"
    // console.log(str.match(/jpeg|png/)[0])
    axios.get(
      `/apis/restapi/shopping/v2/menu?restaurant_id=${this.info.shopId}`
    ).then(data => {
      console.log(data, 111)
      this.list = data.data
    })
  }
}
</script>
<style lang="stylus" scoped>
#goodslist
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
        .foods-info
          position: relative;
          margin-left: .266667rem;
          margin-left: 2.666667vw;
          padding: .2rem .8rem .2rem 0;
          padding: 2vw 8vw 2vw 0;
          border-bottom: 1px solid #eee;
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
</style>
