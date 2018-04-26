<template>
   <div class="activityWR">
      <div class="activity">
        <ul ref="activity">
          <li  v-for="(activity, key) in activities" v-show="(key < 2) "   :key="activity.id">
            <div class="gogogo">
              <span class="icon-wr"><span class="activity-icon" :style="`background-color:#${activity.icon_color}`">{{activity.icon_name}}</span></span>
              <span class="activity-name">{{activity.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div @click="showActivity(index, $event)" v-if="activities.length > 2" class="activity-cz">
        {{activities.length}}个活动
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" :class="{open:!index}">
        <!-- <svg class>
          <use xlink:href="#activity-more.c46fec1">
            <svg viewBox="0 0 12 6" id="#activity-more.c46fec1" width="100%" height="100%">
              <path fill-rule="evenodd" d="M4.577 5.423c.79.77 2.073.767 2.857 0l4.12-4.026C12.345.625 12.09 0 10.985 0H1.027C-.077 0-.33.63.457 1.397l4.12 4.026z"></path>
            </svg>
          </use> 
        </svg>  -->
      </div>
    </div>
</template>
<script>
export default {
  props:{
    activities: Array
  },
  data () {
    return {
      index: true
    }
  },
  methods:{
     showActivity: function (num, ev) {
      // document.getElementsByTagName
      ev.cancelBubble = true
      let liNodes = ev.target.parentNode.getElementsByTagName('li')
      if(num){
        for (let i=0; i<liNodes.length; i++) {
          liNodes[i].style.display = 'block'
        }
      }else{
        for (let i=0; i<liNodes.length; i++) {
        if ( i > 1 ) {
            liNodes[i].style.display = 'none'
          }
        }
      }
      this.index = !num
    }
  }
}
</script>
<style lang="stylus" scoped>
.activityWR
    padding-top: 1.76vw;
    padding-left: 2.266667rem;
    padding-left: 22.666667vw;
    display: flex;
    position: relative;
    -webkit-justify-content: space-between;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    overflow: hidden;
    .activity-cz
      padding: .08rem .266667rem 0 0;
      padding: .8vw 2.666667vw 0 0;
      color: #999;
      text-align: right;
      font-size: .266667rem;
      line-height: 1;
      &>img
        width: .173333rem;
        width: 1.733333vw;
        opacity: .9;
        margin-left: .106667rem;
        margin-left: 1.066667vw;
        transition: all .3s ease-in-out;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        fill: currentColor;
        will-change: transform;
        vertical-align: middle;
        &.open
          transform : rotate(180deg)
      svg
        width: .173333rem;
        width: 1.733333vw;
        height: .173333rem;
        height: 1.733333vw;
        opacity: .9;
        margin-left: .026667rem;
        margin-left: .266667vw;
        -webkit-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        fill: currentColor;
        will-change: transform;
        transform-origin: 50% 50% 0px;
    .activity
      -webkit-flex: 1;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding-right: .266667rem;
      padding-right: 2.666667vw;
      overflow: hidden;
      .gogogo
        display flex
        align-items center
      .activity-name
        color #666
        font-size: .293333rem;
        line-height: .48rem;
        line-height: 4.8vw;
        display: inline-block;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      .icon-wr
        display: inline-block;
        position: relative;
        margin-right: .16rem;
        margin-right: 1.6vw;
        height: .373333rem;
        height: 3.733333vw;
        width: .373333rem;
        width: 3.733333vw;
        vertical-align: middle;
        font-size: .293333rem;
        line-height: .48rem;
        line-height: 4.8vw;
        .activity-icon
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          height: .746667rem;
          height: 7.466667vw;
          width: .746667rem;
          width: 7.466667vw;
          font-size: .56rem;
          color: #fff;
          display: -webkit-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-justify-content: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border-radius: .106667rem;
          border-radius: 1.066667vw;
          -webkit-transform: scale(.5);
          transform: scale(.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
</style>

