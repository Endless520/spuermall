<template>
  <div id="app">
    <router-view/>
    <mian-tabbar :tabbar="tabbar"></mian-tabbar>
  </div>
</template>

<script>
  import MianTabbar from "./components/content/mianTabbar/MianTabbar";
  export default {
    name: 'App',
    data() {
      return {
        tabbar: {
          tabBarItems: [
            {
              imgUrl: {
                default: "home",
                active: "home_active"
              },
              title: '首页',
              link: '/home'
            },
            {
              imgUrl: {
                default: "category",
                active: "category_active"
              },
              title: '分类',
              link: '/category'
            },
            {
              imgUrl: {
                default: "shopcart",
                active: "shopcart_active"
              },
              title: '购物车',
              link: '/cart'
            },
            {
              imgUrl: {
                default: "profile",
                active: "profile_active"
              },
              title: '我的',
              link: '/profile'
            }
          ],
          currentIndex: 0
        }
      }
    },
    components: {
      MianTabbar
    }
  }
</script>

<style lang="css">
  @import "assets/css/base.css";
</style>
