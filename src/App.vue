<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

  import MainTabBar from "components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /*这个style中没有加scoped属性，代表其中声明的样式可以在全局使用*/

  /* 已经配置了路径的别名，可以直接使用assets */
  @import "assets/css/base.css";
</style>
