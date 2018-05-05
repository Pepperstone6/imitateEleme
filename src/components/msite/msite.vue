<template>
  <div id='msite'>
    <div class="scrollNode">
      <div>
        <header class='head'>
          <div class='location'>
            <div id='allmap' style='width:0;height:0;'></div>
            <div  >
              <svg class="positionsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31"><path fill="#FFF" fill-rule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path></svg>
              <span ref='tip' id='tip'>定位中...</span>
              <svg class="sub" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" ><path fill="#FFF" fill-rule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path></svg>
            </div>
          </div>
          <div class="fixedSearch" v-if="searchShow">
            <search></search>
          </div> 
        </header>
        <div class='search'>
          <router-link to="/search">
          <div class='seach-content'>
              搜索你喜欢的商品
          </div>
          </router-link>
        </div>
        <!-- <div v-if="slideInfo.length" ref='silder-wr'  class='mint-swipe-items-wrap'> -->
            <!-- <slider>
                <div class="slider-item" ref="sliderItem" v-for='silde in slideInfo' :key='silde.id'>
                  <a :href='silde.link'>
                    <img :src="silde.image_hash | imgUrl" alt="">
                  </a>
                </div>
            </slider> -->
            <div id="slider-wr">
              <mt-swipe  :auto="3000">
                <mt-swipe-item ref="slideItem"  v-for='silde in slideInfo' :key='silde.id'>
                  <a :href="silde.link | aPath">
                    <img ref="imgAd" :src="silde.image_hash | imgUrl" alt="">
                  </a>
                </mt-swipe-item>
              </mt-swipe>
            </div>
            <div id="classify">
              <mt-swipe  :auto="0">
                <mt-swipe-item ref="classifyItem"  v-for='(classItem, key) in classify' :key='key'>
                  <div class="itemWr">
                    <div class="classifyItem" v-for="item in classItem" :key="item.id">
                      <a v-if="geohash" :href="item.link|aPath(geohash)">
                        <div class="itemImg"><img :src="item.image_hash | imgUrl" alt=""></div>
                        <div class="classname">{{item.name}}</div>
                      </a>
                    </div>
                  </div>
                </mt-swipe-item>
              </mt-swipe>
            </div>
        <!-- </div> -->
            <div >
                <supplier :supplier='supplier' v-if="supplier"></supplier>
            </div>
           
      </div>
    </div>  
     <tail></tail>     
  </div>
</template>
<script>
import axios from 'axios'
import BMap from 'BMap'
import Search from 'com/search/search'
import Supplier from 'com/supplier/supplier'
import Tail from 'com/tail/tail'
import BScroll from 'better-scroll'
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
import { setSession, getSession, createPosition } from '@/common/public'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  data () {
    return {
      latitude: 0,
      longitude: 0,
      slideInfo: [],
      imgQuery: 'imageMogr/format/webp/',
      classify: [],
      classifyBig:[],
      supplier: null,
      position: null,
      searchShow: false,
      geohash: ''
    }
  },
  beforeCreate () {
    // console.log(this.$store.dis)
  },
  mounted () {
    let _this = this
    // this.latitude = getSession('latitude')
    // this.longitude = getSession('longitude')
       createPosition().then(position => {
         _this.$store.dispatch('getPosition', position)
          _this.position = _this.$store.state.position
       })
      .then(()=>{
        async function request () {
          try {
                //   console.log(_this.$store.state)
                //  console.log(_this.$store.state.position, typeof _this.$store.state.position)
              let [response1, response2, response3, response4] = await Promise.all([_this.request1(_this.position.lat, _this.position.lng),
                _this.request2(_this.position.lat, _this.position.lng), _this.request3(_this.position.lat, _this.position.lng),
                _this.request4(_this.position.lat, _this.position.lng)])
              return {response1, response2, response3, response4}
          }catch (e) {
            console.log(e)
            }
          }
          request().then(data => {
            const tipNode = document.getElementById('tip')
            // let addressInfo = data[1]
            // let swipeInfo = data[0]
            let {response1: swipeInfo, response2: addressInfo, response3: classify, response4: restaurant} = data
            tipNode.innerHTML = addressInfo.data.name
            // setSession('cityId', addressInfo.data.city_id)
            _this.$store.dispatch('addPositionInfo', {key:'cityId', val: addressInfo.data.city_id})
            _this.$store.dispatch('addPositionInfo', {key:'geohash', val: addressInfo.data.geohash}),
            _this.geohash = addressInfo.data.geohash
            setSession('slider', swipeInfo.data[0].entries)
            setSession('classify', classify.data)
            setSession('supplier', restaurant)
            _this.slideInfo = swipeInfo.data[0].entries
            _this.classify = _this.separation(_this, classify.data[0].entries)
            _this.supplier = restaurant.data.items
        })
      })
      
   
    // if (!this.latitude && !this.longitude) {
    //   _this.createdMp()
    //     .then(data => {
    //       setSession('latitude', data.point.lat)
    //       setSession('longitude', data.point.lng)
    //       _this.latitude = data.point.lat
    //       _this.longitude = data.point.lng
    //       async function request () {
    //         try {
    //             let [response1, response2, response3, response4] = await Promise.all([_this.request1(_this.latitude, _this.longitude),
    //              _this.request2(_this.latitude, _this.longitude), _this.request3(_this.latitude, _this.longitude),
    //               _this.request4(_this.latitude, _this.longitude)])
    //             return {response1, response2, response3, response4}
    //         }catch (e) {
    //           console.log(e)
    //         }
    //       }
    //       request().then(data => {
    //         const tipNode = document.getElementById('tip')
    //         // let addressInfo = data[1]
    //         // let swipeInfo = data[0]
    //         let {response1: swipeInfo, response2: addressInfo, response3: classify, response4: restaurant} = data
    //         tipNode.innerHTML = addressInfo.data.name
    //          setSession('cityId', addressInfo.data.city_id)
    //         setSession('slider', swipeInfo.data[0].entries)
    //         setSession('classify', classify.data)
    //         setSession('supplier', restaurant)
    //         _this.slideInfo = swipeInfo.data[0].entries
    //         _this.classify = _this.separation(_this, classify.data[0].entries)
    //         _this.supplier = restaurant
    //       })
    //     })
    // } else {
    //   _this.slideInfo = JSON.parse(getSession('slider'))
    //   _this.supplier = JSON.parse(getSession('supplier'))
    //   console.log(_this.supplier)
    //   _this.classify = _this.separation(_this, JSON.parse(getSession('classify'))[0].entries)
    //   axios
    //     .get(
    //        `/apis/restapi/bgs/poi/reverse_geo_coding?latitude=${
    //         this.latitude
    //       }&longitude=${this.longitude}`
    //     )
    //     .then(data => {
    //       setSession('cityId', data.data.city_id)
    //       const tipNode = document.getElementById('tip')
    //       tipNode.innerHTML = data.data.name
    //     })
    // }
    const scroller = document.getElementById('msite')
    window.addEventListener('scroll', function(ev) {
      if(this.scrollY>81){
        _this.searchShow = true
      }else{
        _this.searchShow = false
      }
    })
  },
  methods: {
    initScroll: function () {
        if (!this.Bscroll) {
          this.Bscroll = new BScroll('.scrollNode', {
          scrollX: false,
          scrollY: true,
          // bounce: true,
          click:true
          })
        }else{
          this.Bscroll&&this.Bscroll.refresh()
        }
    },
    getAddress: function () {
      const _this = this
      const tipNode = document.getElementById('tip')
      setTimeout(function () {
        axios
          .get(
            `/apis/restapi/bgs/poi/reverse_geo_coding?latitude=${tipNode.getAttribute(
              'latitude'
            )}&longitude=${tipNode.getAttribute('longitude')}`
          )
          .then(data => {
            setSession('cityId', data.data.city_id)
            tipNode.innerHTML = data.data.name
          })
      }, 3000)
    },
    createdMp: function () {
      return new Promise((resolve, reject) => {
        var map = new BMap.Map('allmap')
        var point = new BMap.Point(116.331398, 39.897445)
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(
          function (r) {
            if (this.getStatus() === 0) {
              // var mk = new BMap.Marker(r.point)
              // map.addOverlay(mk)
              // map.panTo(r.point)
              resolve(r)
            } else {
              alert('failed' + this.getStatus())
            }
          },
          { enableHighAccuracy: true }
        )
      })
    },
    request1: function (latitude, longitude){
      return axios.get(
        `/apis/restapi/shopping/v2/entries?latitude=${
        latitude
        }&longitude=${
        longitude
        }&templates[]=big_sale_promotion_template`
      )
    },
    request2: function (latitude, longitude) {
      return axios.get(
        `/apis/restapi/bgs/poi/reverse_geo_coding?latitude=${
        latitude
        }&longitude=${longitude}`
      )
    },
    request3: function (latitude, longitude) {
      return axios.get(
        `/apis/restapi/shopping/openapi/entries?
        latitude=${latitude}&longitude=${longitude}&templates[]=main_template&
        templates[]=favourable_template&templates[]=svip_template`
      )
    },
    request4: function (latitude, longitude) {
      return axios.get(
        `/apis/restapi/shopping/v3/restaurants?latitude=${latitude}&longitude=${longitude}
        &offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5`
      )
    },
    separation: function (obj, arr,newarr) {
      let arr1 = newarr || []
      let arr2 = []
      if (arr.length-10>0) {
        arr2 = arr.splice(0,10)
        arr.slice(0,10)
        arr1.push(arr2)
        obj.separation(arr, arr1)
      }
      arr1.push(arr)
      return arr1
    }
  },
  components: {
    Supplier,
    Tail,
    Search
  }
  // mounted () {
  // }
}
</script>
<style lang='stylus' scoped>
html{
  background #fff
}
.sub
  width: .186667rem;
  width: 1.866667vw;
  height: .093333rem;
  height: .933333vw;
  fill: #fff;
  margin-left -3vw
.positionsvg
  width: .346667rem;
  width: 3.466667vw;
  height: .413333rem;
  height: 4.133333vw;
  fill: #fff;
  margin-right: -3vw;
.fixedSearch
  position fixed
  width 100%
  top 0
  left 0
  z-index 99
.head {
  background-image: linear-gradient(90deg, #0af, #0085ff)
  padding: 2.666667vw 3.733333vw 0
  .location {
    width: 60%
    font-weight: 700

    #tip {
      color: #fff
      margin: 0 1.333333vw
      font-size: 0.453333rem
      max-width: 80%
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    }
  }
}
.search {
  background-image: linear-gradient(90deg, #0af, #0085ff)
  top: 0px
  z-index: 999
  padding: 2vw 3.733333vw
  margin: -0.133333vw 0
  a {
    text-decoration none
  }
  .seach-content {
    height: 9.6vw
    background: #fff
    font-size: 0.3332rem
    color: #999
    text-align: center
    line-height: 9.6vw
  }
}

#slider-wr
  height 90px
#slider-wr
  a
    width 100%
    display block
    img
      width  100%
      display block
#classify
  height 47.2vw
  .itemWr
    overflow hidden
    a
      color #666
      font-size .32rem
      text-decoration none
    .classifyItem
      float left
      width 20%
      margin-top 2.9333333vw
      .itemImg
        width  12vw
        height 12vw
        margin 0 auto
        img
          width 100%
          display block
      .classname
        text-align center
        color #666
        font-size .32rem   
</style>
