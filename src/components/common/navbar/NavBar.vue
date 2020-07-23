<template>
  <div class="nav-bar" >
    <div class="nav-left">
      <slot name="nav-left"></slot>
    </div>
    <div class="nav-center">
      <slot></slot>
    </div>
    <div class="nav-right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    props:{
      backgroundColor: {
        type: String,
        default: 'white'
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    line-height: 44px;
    display: flex;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,0.2);

  }
  .nav-left {
    width: 60px;

  }
  .nav-center {
    flex: 1;

  }
  .nav-right {
    width: 60px;

  }


</style>
