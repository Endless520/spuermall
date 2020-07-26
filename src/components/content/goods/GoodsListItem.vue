<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" @load="imgLoad">
    <div class="good-detail">
      <p class="good-desc">{{item.title}}</p>
      <span class="price">￥:{{item.price}}</span>
      <span class="collect">热度{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      showImg() {
        return this.item.show ? this.item.show.img : this.item.image
        // return   this.item.image || this.item.show.img
      }
    },
    methods: {
      imgLoad() {
        if (this.$route.path.indexOf('/home') !== -1){
          this.$EventBus.$emit('itemImgLoad')
        }else if (this.$route.path.indexOf('/detail') !== -1){
          this.$EventBus.$emit('detailItemImgLoad')
        }
      },
      itemClick() {
        this.$router.push('/detail/'+this.item.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 50%;
    padding: 10px;
  }
  .goods-item img{
    width: 100%;
    height: 250px;
  }
  .good-desc {
    font-size: 13px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    float: left;
    color: var(--color-high-text);
  }
  .collect {
    float: right;
  }
  .collect::before {
    /*content: '';*/
    /*position: absolute;*/
    /*left: 144px;*/
    /*width: 14px;*/
    /*height: 14px;*/
    /*margin-top: 2px;*/
    /*background: url("~assets/img/common/collect.svg") 0 0/14px 14px;*/
  }
</style>
