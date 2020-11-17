<template>
  <tab-bar>
    <!--  在dom中使用路径别名,前边需要加上波浪号~  -->
    <tab-bar-item path="/home">
      <img src="~assets/images/tabbar/home.png" slot="item-icon">
      <img src="~assets/images/tabbar/home-active.png" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/images/tabbar/category.png" slot="item-icon">
      <img src="~assets/images/tabbar/category-active.png" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="~assets/images/tabbar/cart.png" slot="item-icon">
      <img src="~assets/images/tabbar/cart-active.png" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/images/tabbar/profile.png" slot="item-icon">
      <img src="~assets/images/tabbar/profile-active.png" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>

  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
