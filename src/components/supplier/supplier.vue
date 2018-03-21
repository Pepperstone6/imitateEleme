<template>
  <div id="supplier">
    <div class="recommend">推荐商家</div>
    <ul v-if="restaurant">
      <li class="restaurant" v-for="item in restaurant" :key="item.restaurant.id">
          <div class="supplierImg">
             <img :src="item.restaurant.image_path | imgUrl" alt="">
          </div>
          <div class="supperInfo">
            <div>
              <div class="supplierName">
                <i v-if="item.restaurant.is_premium" content="品牌" class="brand">品牌</i>
                {{item.restaurant.name}}
              </div>
            </div>
            <div></div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    supplier: {
      type: Object
    }
  },
  data () {
    return {
      restaurant: null
    }
  },
  mounted () {
    console.log(this.supplier, 1)
    this.restaurant = this.supplier.data.items
    console.log(this.restaurant, this.supplier)
  }
}
</script>
<style lang="stylus" scoped>
#supplier
  .recommend
    font-size .4rem
    height 9.6vw
    color #000
    display flex
    justify-content center
    align-items center
    &::before, &::after
      content ''
      display block
      height .266667vw
      width 5.333333vw
      background-color #999
    &::before  
      margin-right 3.466667vw
    &::after  
      margin-left 3.466667vw
  .restaurant
    display flex
    padding 0 2.666667vw
  .supplierImg
    width 17.333333vw
    height 17.333333vw
    img
      width 100%
      height 100%
  .supperInfo
    display flex
    padding-left 2.666667vw
    .supplierName
      font-size .4rem
      font-weight 700
      .brand
        position: relative;
        margin-right: .133333rem;
        margin-right: 1.333333vw;
        padding: .026667rem .066667rem;
        padding: .266667vw .666667vw;
        color: transparent;
        text-align: center;
        white-space: nowrap;
        font-weight: 700;
        font-size: .093333rem;
        font-style: normal;
        line-height: normal;
        &::after
          background-image: linear-gradient(-139deg,#fff100,#ffe339);
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          content: attr(content);
          padding: .533333vw 1.333333vw;
          color: #6f3f15;
          font-weight: 700;      
</style>

