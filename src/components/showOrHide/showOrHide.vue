<template>
   <div class="more" @click="look(num, $event)"  >
    {{show===limit ? `展开更多商品${num-limit}个`:'收起'}}
    <svg>
      <use :xlink:href="show===limit?'#arrow_down':'#arrow_up'">
        <svg viewBox="0 0 10 10" id="arrow_down" width="100%" height="100%"><path fill="#A7A7A7" fill-rule="evenodd" d="M5.04 6.268L.827 2.337a.37.37 0 0 0-.518.017.37.37 0 0 0 .019.518L4.784 7.03a.37.37 0 0 0 .545-.05.437.437 0 0 0 .102-.072l4.225-4.014a.396.396 0 0 0 .013-.564l.047.05a.397.397 0 0 0-.565-.015l-4.11 3.904z"></path></svg>
      </use> 
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    limit:Number,
    num: Number,
    isShow: Function,
    show: Number
  },
  methods: {
      look : function (num, ev) {
        console.log(this.limit, this.show)
      this.isShow(num, ev)
    }
  }
}
</script>
<style lang="stylus">

.more {
  ackground-color: #fff;
  height: 1.066667rem;
  height: 10.666667vw;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-size: 0.293333rem;
  display: -webkit-flex;
  display: flex;

  svg {
    width: 0.24rem;
    width: 2.4vw;
    height : 0.24rem;
    height: 2.4vw;
    margin-left: 0.16rem;
    margin-left: 1.6vw;
  }
}
</style>
