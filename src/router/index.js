import Vue from 'vue'
import Router from 'vue-router'
import Msite from 'com/msite/msite'
import Shop from 'com/shop/shop'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite
    },{
      path: '/shop/:shopId',
      name: 'shop',
      component: Shop
    }
  ]
})
