<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tabbar {
    display: flex;
    background-color: #f5f6fa;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    box-shadow: 0px -3px 1px #dcdde180;
  }
</style>
