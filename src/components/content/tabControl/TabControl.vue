<template>
  <div class="tab-control">
    <div class="tab-control-item"  v-for="(t,index) in tabs" @click="tabClick(index)">
      <div class="tab-title" :class="{active: tabIndex===index}">{{t.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      tabIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      tabClick(index) {
        this.$emit('changeType',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    width: 100vm;
    display: flex;
    text-align: center;
    background-color: #fff;

  }
  .tab-control-item {
    flex: 1;
    line-height: 32px;
    display: flex;
    justify-content: center;
    /*margin: 5px 20px;*/
  }
  .tab-title.active {
    color: var(--color-high-text);
    border-bottom: 2px solid deeppink;
  }
  .tab-title {
    padding: 5px;
    width: 80%;
    height: 100%;
  }
</style>
