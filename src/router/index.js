import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Msite = (resolve) =>{
  import ('com/msite/msite').then(module => {
    resolve(module)
  })
}
const SearchPage = (resolve) =>{
  import ('com/searchPage/searchPage').then(module => {
    resolve(module)
  })
}
const SearchShop = (resolve) =>{
  import ('com/searchShop/searchShop').then(module => {
    resolve(module)
  })
}
const Shop = (resolve) =>{
  import ('com/shop/shop').then(module => {
    resolve(module)
  })
}
export default new Router({
  mode: 'hash',
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
    },{
      path: '/search',
      name: 'searchPage',
      component: SearchPage,
      children:[
        {
          path: 'shop',
          name: 'searchShop',
          component: SearchShop
        }
      ]
    }
  ]
})
