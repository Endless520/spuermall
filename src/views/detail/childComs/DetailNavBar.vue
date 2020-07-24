<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template v-slot:nav-left>
        <div class="back" @click="backClick">
          <img  src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:default>
        <tab-control class="detail-nav-tab-control" :tabs="tabs" :tab-index="tabIndex" @changeType="changeType"></tab-control>
      </template>
      <template v-slot:nav-right>

      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  import TabControl from "../../../components/content/tabControl/TabControl";
  export default {
    name: "DetailNavBar",
    data() {
      return {
        tabs: [
          {title: '商品', type: ''},
          {title: '参数', type: ''},
          {title: '评论', type: ''},
          {title: '推荐', type: ''}
        ],
        tabIndex: 0
      }
    },
    methods: {
      changeType(index) {
        this.tabIndex = index
      },
      backClick() {
        this.$router.back()
      }
    },
    created() {

    },
    components: {
      NavBar,
      TabControl
    }
  }
</script>

<style scoped>
  .detail-nav-tab-control {
    margin: 0;
    height: 44px;
  }
  .back img{
    position: relative;
    top: 6px;
  }

</style>
