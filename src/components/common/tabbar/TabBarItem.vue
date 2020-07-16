<template>
  <div class="tab-bar-item" @click="$emit('tip',index)">
    <img :src=" current === index ? activeImg  : defaultImg " alt="">
    <div :style="{ color: current === index? activeColor : defaultColor}">{{title}}</div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      current: Number,
      index: Number,
      defaultImg: String,
      activeImg: String,
      title: String,
      activeColor: {
        type: String,
        default: 'red'
      },
      defaultColor: {
        type: String,
        default: 'black'
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    /*border: 1px solid black;*/
    text-align: center;
    height: 49px;

    font-size: 14px;
    margin-top: 3px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px ;
  }
</style>
