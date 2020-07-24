<template>
  <div class="wrapper" ref="wrapper" >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          click: true,
          mouseWheel: true,
          pullUpLoad: this.pullUpLoad
        })
        if(this.probeType > 1){
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll',position)
          })
        }

        if(this.pullUpLoad){
          this.scroll.on('pullingUp', () => {
            this.$emit('finishPullUp')
          })
        }
      })
    },
    methods: {
      scrollTo(x,y,time = 300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll.y
      }
    }
  }
</script>

<style scoped>

</style>
