<template>
<div class="shop-wr">
  <div class="shop">
    <div class="shop-header">
      <aside class="filter">  
        <div class="filter-header">
          <a href="javascript:;"  @click="czClass('open', 0, $event)" class="filter-nav">
            <span ref="classify">分类</span>
            <svg data-v-be2a2fa8="" viewBox="0 0 72 32"><path data-v-be2a2fa8="" d="M36 32l36-32h-72z"></path></svg>
          </a>
          <a href="javascript:;" @click="czClass('open', 1, $event)" class="filter-nav">
            <span>综合排序</span>
            <svg data-v-be2a2fa8="" viewBox="0 0 72 32"><path data-v-be2a2fa8="" d="M36 32l36-32h-72z"></path></svg>
          </a>
          <a href="javascript:;" @click="czClass('active', 2, $event)" class="filter-nav-more">
            <span>筛选</span>
            <svg data-v-be2a2fa8="">
              <use data-v-be2a2fa8="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#more-filter">
              <svg viewBox="0 0 26 26" id="more-filter" width="100%" height="100%"><path d="M9.001 15.009V23a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7.981l7.788-10.01a1 1 0 0 0-1.578-1.228l-8 10.28a1 1 0 0 0-.21.615V22h-4v-7.324a1 1 0 0 0-.2-.6L4.001 5h14a1 1 0 0 0 0-2H2a1 1 0 0 0-.8 1.6L9 15.009z"></path></svg>
              </use>
            </svg>
          </a>
        </div>
        <section class="filter-extend filter-category">
          <div class="filter-scroll">
            <ul>
              <li @click="showFoods(shop.sub_categories)" v-for="(shop, index) in shopList" :key="index">
                <span>{{shop.name}}</span>
                <span class="count">{{shop.count}}</span>
              </li>  
            </ul>
            <ul>
              <li @click="showList(food.name)" v-for="food in foodsList" v-if="foodsList" :key="food.id">
                <img :src="food.image_url|imgUrl" alt="">
                <span>{{food.name}}</span>
                <span class="count">{{food.count}}</span>
              </li>
            </ul>
          </div>
        </section>
        <section class="filter-extend filter-sort">
          <ul>
            <li @click="sort(0,$event)">
              <span>综合排序</span>
              <img class="selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII=" alt="">
            </li>
            <li @click="sort(1,$event)">
              <span>销量最高</span>
              <img class="selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII=" alt="">
            </li>
            <li @click="sort(2,$event)">
              <span>起送价最低</span>
              <img class="selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII=" alt="">
            </li>
            <li @click="sort(3,$event)">
              <span>配送最快</span>
              <img class="selected" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkFJREFUSA3tlbtrVFEQxr/JusEkdqYR0mU3EGyECCKCIEIghIgSfBSCCkbwWqTQykoQ41+QbHaRRC0MSDCgjeADO0ERQRBB10YsU/gC89jd8ZuNez17H7gmN2BxT7Fnzpw587vzzbl3gXSkCqQKJKSAJJQnlKb3huawjDkCZj94KIiIukGbAs5P636t4h5J2w1GyHz5ghx1wW3uIgm7b0pPaQ2PHOg3tGEimDsxsKpKbkonqoqbqmivgwRLksFI+by8DoITkXqgqJ1fq7hN4GgDwMQVajxa9uR+w+fOW9zFeuz+ou74UoEl3+2fFyilPPs+BmpxkVLnpnVvflLHTT4/WYSRL+mu1QpecOsPlAseukTorYgjviuU2F4DWcFzytbNqCfSjtPlMfnsn/htsJ+HoLjDS9Tl7ongOuW97Pqi7FDFslzvlUFtHNRVvOkr6Im15dpvb0Ev8sEWglCWWmoFallCFeeLuqdWxVNW0+nCaM9JB8bxE9cIHAvsWaL5kx6OXxGpBfei1iGwBeUmdYTdXSA84x6ijCv+q9K0gcdbuzH89hib1OIISW3n+JV5wMkL5oiBviT0yL9ALW8k2DY+elLidNXsuEEF3mW7METoj7iYOH+k1G4wb+8MKz3j+uq24JNksS/qxodiIxyxFTdie/pxjk/3sLG2mZUu8sszuF5oPYebMM7eeVe3LS3iGS/bAKHfeasPsBWv4uJb8f+1YktiPezIYth6mhEc3ii0lQdriuGfQbbJkS5SBf5HBX4Bvl6o9YDxgOsAAAAASUVORK5CYII=" alt="">
            </li>
          </ul>
        </section>
        <section class="filter-extend"></section>
        <section @click="closeTab('open', $event)" ref="modal" class="filter-modal"></section>
      </aside>
      <ul id='nav' v-if="navList.length" class="nav">
        <li @click="navWord(list.name)" class="list" v-for="(list, index) in navList" :key="index">
          {{list.name}}
        </li>
      </ul>
    </div>
    <search-food :keyword ="keyword"></search-food>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import { hasClass, addClass, removeClass } from '@/common/dom.js'
import {setSession, getSession, setLocation, getLocation} from '@/common/public.js'
import searchFood from '@/components/searchFood/searchFood'
export default {
  data () {
    return {
      keyword: null,
      shopInfo: null,
      shopList:null,
      foodsList: null,
      lastIndex: null,
      orderBy:null,
      position: null,
      navList: []
    }
  },
  mounted() {
    // this.lat = getSession('latitude')
    // this.lon = getSession('longitude')
    // this.cityId = getSession('cityId')
    const _this = this
    this.position = this.$store.state.position
    this.$parent.searchIndex = false
    this.keyword = this.$store.state.keyword
    // this.keyword = this.$route.query.keyword
    this.$parent.hintInfo = this.$store.state.keyword
    axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.keyword}&latitude=${this.position.lat}&longitude=${this.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`
      ).then(data => {
          this.shopInfo = data.data
         this.manage(_this.shopInfo.inside)
      })
  },
  // mounted() {
  // },
  methods: {
    navWord: function (keyword) {
      this.keyword = keyword
      this.$store.dispatch('setKeyWord', keyword)
    },
    manage: function (obj) {
      const _this = this
      return Object.values(obj).forEach((item, index) => {
        if(item.filter instanceof Object) {
          Object.values(item.filter).forEach((arr, key) => {
            if (arr.length>0) {
            _this.navList = [..._this.navList, ...arr]
            }
          })
        }
      })
    },
    czClass: function(styl, num, ev){
      let node = ev.currentTarget
      let fliterNode = document.querySelectorAll('.filter-extend')
      if(num === this.lastIndex){
          this.lastIndex = node.parentNode.children.length
          removeClass(node, styl)
          removeClass(fliterNode[num], 'open')
          removeClass(this.$refs.modal, 'open')
        return
      }
      removeClass(fliterNode[this.lastIndex], 'open')
      this.lastIndex = num
      for(let item of node.parentNode.children){
      item.className = item.className.replace(/active|open/g, '')
      }
     addClass(node, styl)
      if(num === 0){
         axios.get(
          `/apis/restapi/shopping/v2/restaurant/category?latitude=${this.position.lat}&longitude=${this.position.lng}`
          ).then(data => {
            this.shopList = data.data
            console.log(this.shopList)
          })
      }
    addClass(this.$refs.modal, 'open')
    addClass(fliterNode[num], 'open')
    },
    showFoods: function(list){
      this.foodsList = list
    },
    showList: function(food){
      this.$refs.classify.innerHTML = food

    },
    closeTab: function (styl, ev) {
      let node = ev.currentTarget
      let tabNode = document.querySelector('.filter-header')
      let fliterNode = document.querySelectorAll('.filter-extend')
      for(let item of tabNode.children){
        item.className = item.className.replace(/active|open/g, '')
      }
      removeClass(node, styl)
      removeClass(fliterNode[this.lastIndex], 'open')
      this.lastIndex = tabNode.children.length
    },
    sort: function(num, ev){
      let node = ev.currentTarget
      this.orderBy = num
      axios.get(
      `/apis/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.keyword}&latitude=${this.position.lat}&longitude=${this.position.lng}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&order_by=${num}`
      ).then(data => {
        console.log(data)
      })
    }
  },
  components:{
    searchFood
  }
}
</script>
<style lang="stylus" scoped>
a 
  text-decoration none
.shop-wr
  height: calc(100vh - 1.36rem);
  height: calc(100vh - 13.6vw);  
.count
  position: absolute;
  right: .266667rem;
  right: 2.666667vw;
  top: 50%;
.shop
    height: 100%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    .shop-header
      border-bottom: 1px solid hsla(0,0%,89%,.5);
      position: relative;
      z-index: 51;
      .filter
        position: relative;
        border-bottom: 1px solid #ddd;
        height: 1.066667rem;
        height: 10.666667vw;
        line-height: 1.04rem;
        line-height: 10.4vw;
        z-index: 101;
        .filter-header
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          display: -webkit-flex;
          display: flex;
          z-index: 3;
          background-color: #fff;
          .filter-nav
            -webkit-flex: 1;
            flex: 1;
            text-align: center;
            color: #666;
            position: relative;
            font-size: .346667rem;
            &>svg
              width: .24rem;
              width: 2.4vw;
              height: .106667rem;
              height: 1.066667vw;
              margin-left: .053333rem;
              margin-left: .533333vw;
              margin-bottom: .053333rem;
              margin-bottom: .533333vw;
              fill: #999;
              will-change: transform;
              transition: -webkit-transform .3s;
              transition: transform .3s;
              transition: transform .3s,-webkit-transform .3s;
            &.open
              color: #3190e8;
              &>svg 
                fill: currentColor;
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
          .filter-nav-more
            -webkit-flex: 1;
            flex: 1;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-align-items: center;
            align-items: center;
            color: #666;
            font-size: .346667rem;
            &>svg 
              width: .373333rem;
              width: 3.733333vw;
              height: .373333rem;
              height: 3.733333vw;
            &.active
              color #3190e8
              &>svg
                fill: currentColor
      .filter-category 
        z-index: 200;
        height: 1000%;
        padding-bottom: 0;
        color: #666;
        .count
          line-height: .373333rem;
          line-height: 3.733333vw;
          margin-top: -.186667rem;
          margin-top: -1.866667vw;
          border-radius: .266667rem;
          border-radius: 2.666667vw;
          border: .013333rem solid #eee;
          border: .133333vw solid #eee;
          background-color: #fff;
          padding: 0 .133333rem;
          padding: 0 1.333333vw;
          font-size: .293333rem;
        .filter-scroll
          display: -webkit-flex;
          display: flex;
          height: 100%;
          ul
            -webkit-flex: 3;
            flex: 3;
            list-style: none;
            margin: 0;
            padding: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            li
              position: relative;
              line-height: 1.2rem;
              line-height: 12vw;
              font-size: 12px;
            &:first-child
              background-color: #fafafa;
              -webkit-flex: 2;
              flex: 2;  
              li
                padding: 0 .133333rem 0 .266667rem;
                padding: 0 1.333333vw 0 2.666667vw;  
            &:nth-of-type(2)
              span
                vertical-align: middle;  
              img
                margin-right: .2rem;
                margin-right: 2vw;
                width: .666667rem;
                width: 6.666667vw;
                height: .666667rem;
                height: 6.666667vw;
                vertical-align: middle; 
      .filter-extend
        left: 0;
        right: 0;
        top: 100%;
        border-top: 1px solid #ddd;
        position: absolute;
        max-height: 0;
        background-color: #fff;
        transition: all .2s ease-in-out;
        visibility: hidden;
        overflow: auto;
        opacity: 0;
        z-index: 3;
        &.open
          opacity: 1;
          visibility: visible;
          max-height: 1500%; 
    .filter-modal
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
      background: rgba(0,0,0,.2);
      visibility: hidden;
      opacity: 0;
      transition: all .3s ease-in-out;
      -webkit-backdrop-filter: blur(.133333rem);
      -webkit-backdrop-filter: blur(1.333333vw);
      backdrop-filter: blur(.133333rem);
      backdrop-filter: blur(1.333333vw); 
      &.open
        opacity: 1;
        visibility: visible;
    .filter-sort
      padding-top: .213333rem;
      padding-top: 2.133333vw;
      padding-bottom: .32rem;
      padding-bottom: 3.2vw;
      font-size: .373333rem;
      color: #333;
      li
        position: relative;
        padding-left: .533333rem;
        padding-left: 5.333333vw;
        line-height: 1.066667rem;
        line-height: 10.666667vw;
      .selected
        position: absolute;
        right: .373333rem;
        right: 3.733333vw;
        top: 50%;
        width: .4rem;
        width: 4vw;
        height: .4rem;
        height: 4vw;
        display: none;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
  .nav
    margin-top: -.013333rem;
    margin-top: -.133333vw;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    height: 1.253333rem;
    height: 12.533333vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    background-color: #fff;
    padding: 0 .426667rem;
    padding: 0 4.266667vw;
    .list
      height: .88rem;
      height: 8.8vw;
      line-height: .88rem;
      line-height: 8.8vw;
      background-color: #f5f5f5;
      border-radius: .04rem;
      border-radius: .4vw;
      color: #666;
      font-size: .32rem;
      padding: 0 .426667rem;
      padding: 0 4.266667vw;
      -webkit-flex: none;
      flex: none;
      margin-right: .213333rem;
      margin-right: 2.133333vw;
    &::after
      display: block;
      content: "";
      width: .16rem;
      width: 1.6vw;
      -webkit-flex: none;
      flex: none;
      height: .026667rem;
      height: .266667vw;
    &::-webkit-scrollbar
      background-color: #fff
      height 0px                      
  </style>
