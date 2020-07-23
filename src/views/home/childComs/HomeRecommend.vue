<template>
  <div class="recommend">
    <div class="re-item" v-for="r in recommend">
      <a :href="r.link">
        <img :src="r.image" alt="">
        <div>{{r.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommend: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100vw;
    padding-top: 3px;
    padding-bottom: 12px;
    border-bottom: 8px solid #eee;
    display: flex;
  }
  .re-item {
    flex: 1;
    padding: 5px;
    text-align: center;
  }
  .re-item img {
    width: 100%;
  }
</style>
