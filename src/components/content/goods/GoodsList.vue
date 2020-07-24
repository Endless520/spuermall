<template>
  <div class="goods">
    <goods-list-item v-for="g in list" :item="g" ></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
