<template>
  <div id="home">
    <nav-bar class="home-nav">吴迪的购物街</nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComs/HomeSwiper";
  import HomeRecommend from "./childComs/HomeRecommend";

  import * as ajax from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend
    },
    data(){
      return {
        results: null,
        banner: null,
        recommend: null
      }
    },
    created() {
      ajax.getHomeMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  #home {

  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  }
  .swiper-img {
    width: 100vw;
  }
</style>
