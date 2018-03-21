<template>
  <div ref='swiperWr' >
		<div ref='swipe'  class='mint-swipe'>
			<slot></slot>
		</div>
		<div class='mint-swipe-indicators'>
			<div class='mint-swipe-indicator'>
			</div>
		</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  mounted () {
		this.$nextTick(()=>{
			this.initSilde()
		})
		window.addEventListener('resize', () => {
			this.slideWidth()
			this.slider.refresh()
		})
	},
  methods: {
    slideWidth: function () {
			let width = 0;
			let swipeNode = this.$refs.swipe
			let swiperItem = this.$parent.$refs.sliderItem
			for (let f of swiperItem) {
				 f.style.width = document.documentElement.clientWidth + 'px'
				 width += document.documentElement.clientWidth
			}
      swipeNode.style.width = width + 'px'
		},
    initSilde: function () {
      new BScroll({
        scrollX: true,
        scrollY: false
			})
		}
	}  
}	
</script>
<style lang='stylus'>
// .mint-swipe 
// overflow: hidden
// position: relative
// height: 100%
// 
.mint-swipe 
	position: relative
	overflow: hidden
	white-space: nowrap
	.slider-item 
		float: left
		box-sizing: border-box
		overflow: hidden
		text-align: center
		a 
			display: block
			width: 100%
			overflow: hidden
			text-decoration: none
		img
			display: block
			width: 100%

.mint-swipe-items-wrap > div 
	position: absolute
	-webkit-transform: translateX(-100%)
	transform: translateX(-100%)
	width: 100%
	height: 100%
	display: none
.mint-swipe-items-wrap > div.is-active 
	display: block
	-webkit-transform: none
	transform: none
.mint-swipe-indicators 
	position: absolute
	bottom: 10px
	left: 50%
	-webkit-transform: translateX(-50%)
	transform: translateX(-50%)
.mint-swipe-indicator 
	width: 8px
	height: 8px
	display: inline-block
	border-radius: 100%
	background: #000
	opacity: 0.2
	margin: 0 3px
.mint-swipe-indicator.is-active 
	background: #fff
</style>
