// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/static/css/reset.css'
import '@/static/iconfont/iconfont.css'
import '@/common/adaptive'
import '@/common/public.js'
import'mint-ui/lib/style.css'

import store from '@/store/index.js'
// import Mint from 'mint-ui'
// Vue.use(Mint)
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('imgUrl', function (value) {
  if (typeof value === 'string') {
    value = value.split('')
    value.splice(1, 0, '/')
    value.splice(4, 0, '/')
    value = value.join('')
    if (value.match(/jpeg|png/)) {
      return `//fuss10.elemecdn.com/${value}.${value.match(/jpeg|png/)[0]}`
    }
    
  }
})
Vue.filter('aPath', function (value, hash) {
  if(!value.match(/url.*&/)){
    let hp = value.replace('eleme://restaurants?', '')
    return `https://h5.ele.me/msite/food/${hp}`
  }
  // let str = value.match(/url.*?&/)[0]
  value = window.decodeURIComponent(value) 
  let str = value.match(/url.*?&/)[0]
  return str.substring(4,str.length-1)+'&geohash='+hash
})
Vue.filter('distance', function (value) {
  if (value >= 1000) {
    return (value/1000).toFixed(2)+'km'
  }
  return value + 'm'
})
Vue.filter('word', function (value){
  console.log(value)
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach(function(to, from, next) {
  window.scrollTo(0, 0)
  next()
})