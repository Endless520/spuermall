<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @changeType="changeType" :tab-index="tabIndex"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="scrolRefresh"></detail-goods-info>
      <detail-param-info ref="param" :param-info="goodsParam"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommend"></detail-recommend-info>
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
  import DetailCommentInfo from "./childComs/DetailCommentInfo";
  import DetailRecommendInfo from "./childComs/DetailRecommendInfo";

  import * as ajax from "../../network/detail";
  import utils from "../../common/utils";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsParam: {},
        detailInfo: {},
        commentInfo: {},
        recommend: [],
        offsetTop: {
          good: 0,
          param: 0,
          comment: 0,
          recommend: 0
        },
        tabIndex: 0
      }
    },
    methods: {
      scrolRefresh() {
        this.$refs.scroll.refresh()
      },
      scroll(position) {
        if (-position.y > this.offsetTop.recommend){
          this.tabIndex = 3
        }else if (-position.y > this.offsetTop.comment) {
          this.tabIndex = 2
        }else if (-position.y > this.offsetTop.param) {
          this.tabIndex = 1
        }else {
          this.tabIndex = 0
        }
      },
      changeType(type,index) {
        this.$refs.scroll.scrollTo(0,-this.offsetTop[type],0)
        this.tabIndex = index
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
        if (data.rate.cRate !== 0 ){
          this.commentInfo = data.rate.list[0]
        }
      })

      ajax.getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    mounted() {
      this.refresh = utils.debounce(this.$refs.scroll.refresh,200)
      this.$EventBus.$on('detailItemImgLoad', () => {
        this.refresh()
      })
      //应该监听图片加载完成，这里使用异步等待0.8秒
      setTimeout(() => {
        this.offsetTop.param = this.$refs.param.$el.offsetTop
        this.offsetTop.comment = this.$refs.comment.$el.offsetTop
        this.offsetTop.recommend = this.$refs.recommend.$el.offsetTop
      },800)
    },
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo
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
