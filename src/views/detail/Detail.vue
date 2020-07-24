<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="refresh"></detail-goods-info>
      <detail-param-info :param-info="goodsParam"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";

  import DetailNavBar from "./childComs/DetailNavBar";
  import DetailSwiper from "./childComs/DetailSwiper";
  import DetailBaseInfo from "./childComs/DetailBaseInfo";
  import DetailShopInfo from "./childComs/DetailShopInfo";
  import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
  import DetailParamInfo from "./childComs/DetailParamInfo";

  import * as ajax from "../../network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsParam: {},
        detailInfo: {}
      }
    },
    methods: {
      refresh() {
        this.$refs.scroll.refresh()
      }
    },
    created() {
      this.iid = this.$route.params.iid
      ajax.getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new ajax.Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new ajax.Shop(data.shopInfo)
        this.detailInfo = data.detailInfo;
        this.goodsParam = new ajax.GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
    },
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    background-color: #fff;
    z-index: 9;
  }
  .detail-scroll {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .detail-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: white;
  }
</style>
