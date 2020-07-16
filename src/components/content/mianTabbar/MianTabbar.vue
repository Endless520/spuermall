<template>
  <tab-bar>
    <tab-bar-item v-for="(item,index) in tabbar.tabBarItems" :index="index" :current="tabbar.currentIndex"
                  :default-img="require('assets/img/tabbar/'+ item.imgUrl.default  +'.svg')"
                  :active-img="require('assets/img/tabbar/'+ item.imgUrl.active  +'.svg')"
                  :title="item.title" :key="item.title"
                  @tip="tip">
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MianTabbar",
    components: {
      TabBar,
      TabBarItem
    },
    props: {
      tabbar: {
        type: Object,
        default: {
          tabBarItems: [],
          currentIndex: 0
        }
      }
    },
    methods: {
      tip(index) {
        if(this.tabbar.currentIndex != index){
          this.$router.push(this.tabbar.tabBarItems[index].link)
          this.tabbar.currentIndex = index
        }
      }
    }
  }
</script>

<style scoped>

</style>
