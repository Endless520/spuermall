<template>
  <swiper>
    <swiper-item v-for="b in banner">
      <a :href="b.link">
        <img :src="b.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "../../../components/common/swiper/index";
  export default {
    name: "HomeSwiper",
    props: {
      banner: {
        type: Array,
        default: []
      }
    },
    components: {
      Swiper,SwiperItem
    }
  }
</script>

<style scoped>

</style>
