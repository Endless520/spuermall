<template>
  <div id="home">
    <nav-bar class="home-nav">吴迪的购物街</nav-bar>
    <tab-control v-show="fixTab" class="fix-tab-control" :tab-index="currentTabIndex" :tabs="tabs" @changeType="changeType"  ></tab-control>
    <scroll class="wrapper" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="scrollPosition" @finishPullUp="getNextPageData">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control ref="tabControl" :tab-index="currentTabIndex" :tabs="tabs" @changeType="changeType"></tab-control>
      <goods-list :list="goodsList"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="top"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";

  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComs/HomeSwiper";
  import HomeRecommend from "./childComs/HomeRecommend";
  import HomeFeature from "./childComs/HomeFeature";

  import * as ajax from "../../network/home";
  import utils from "../../common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,

    },
    data(){
      return {
        results: null,
        banner: null,
        recommend: null,
        tabs: [
          {title: '流行',type: 'pop'},
          {title: '热门',type: 'sell'},
          {title: '新品',type: 'new'}
          ],
        goods: {
          pop: {page: 0,list: []},
          new: {page: 0,list: []},
          sell: {page: 0,list: []}
        },
        currentTabIndex: 0,
        top: false,
        tabOffsetTop: 0,
        fixTab: false,
        saveY: 0
      }
    },
    created() {

      this.getMultiData()
      this.getGoods('pop')
      this.getGoods('sell')
      this.getGoods('new')

    },
    mounted() {
      this.refresh = utils.debounce(this.$refs.scroll.refresh,200)
      this.$EventBus.$on('itemImgLoad', () => {
        this.refresh()
      })
      //应该监听图片加载完成，这里使用异步等待0.8秒
      setTimeout(() => {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },800)
    },
    // activated() {
    //   this.saveY = this.$refs.scroll.scrollTo(0,this.saveY,0)
    //   this.$refs.scroll.refresh()
    // },
    // deactivated() {
    //   this.saveY = this.$refs.scroll.getScrollY()
    //   console.log(this.saveY);
    // },
    methods: {
      /**
       * 网络请求
       */
      getMultiData(){
        ajax.getHomeMultidata().then(res => {
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      getGoods(type){
        const page = this.goods[type].page + 1
        return ajax.getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
          return ''
        })
      },
      /**
       * 事件监听
       * @param index
       */
      changeType(index) {
        this.currentTabIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      scrollPosition(position) {
        this.top = position.y < -999
        this.fixTab = this.tabOffsetTop >0 && position.y < -this.tabOffsetTop
      },
      getNextPageData() {
        this.getGoods(this.tabs[this.currentTabIndex].type).then(res => {
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      goodsList() {
        return this.goods[this.tabs[this.currentTabIndex].type].list
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .fix-tab-control {
    position: relative;
    z-index: 9;
  }
  .wrapper {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  /*.content {*/
  /*  margin-top: 44px;*/
  /*  height: calc(100vh - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
