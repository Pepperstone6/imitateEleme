<template>
  <div class="loadMore" @click="loading($event)">
    <svg v-if="show" class="load">
        <use xlink:href="#loading">
          <svg viewBox="0 0 64 64" id="loading" width="100%" height="100%"><path fill-rule="evenodd" d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"></path></svg>
        </use>
        </svg>
        <span v-if="show">正在加载...</span>
        <span v-if="!show">没有更多了哦~</span>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    loadMore: Function
  },
  methods: {
    loading: function (ev) {
      this.loadMore(ev)
    }
  }
}
</script>
<style lang="stylus" scoped>
@keyframes loadMore-2VpIQ {
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
} 
}
.loadMore
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    min-height: 1.066667rem;
    min-height: 10.666667vw;
    background-color: #fff;
    color: #555;
    font-size: .346667rem;  
    .load
      display: block;
      margin-right: .2rem;
      margin-right: 2vw;
      width: .4rem;
      width: 4vw;
      height: .4rem;
      height: 4vw;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-animation: loadMore-2VpIQ 1s linear infinite;
      animation: loadMore-2VpIQ 1s linear infinite;
</style>

