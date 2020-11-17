<template>
  <div id="home">

    <!-- 顶部导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <!--轮播图-->
    <home-swiper :banners="banner"/>

    <!--推荐信息-->
    <home-recommend-view :recommends="recommend"/>

    <!--本周流行-->
    <home-feature/>

    <tab-control @tab-click="tabClick" class="tab-control" :titles="['流行','新款','精选']"/>

    <!--商品列表-->
    <good-list :goods="showGoods"></good-list>

  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";

  //页面内使用的组件
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeature from "./childComponents/HomeFeature";
  import GoodList from "components/content/goods/GoodList";
  import GoodListItem from "components/content/goods/GoodListItem";

  import {
    getHomeMultiData,
    getHomeGoods
  } from "network/home";

  export default {
    name: "home",
    components: {
      NavBar,
      TabControl,

      HomeSwiper,
      HomeRecommendView,
      HomeFeature,
      GoodList
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          "pop": {
            page: 0,
            list: []
          },
          "new": {
            page: 0,
            list: []
          },
          "sell": {
            page: 0,
            list: []
          }
        },
        currentType: "pop"
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //在created中只写主要逻辑，将请求数据的详细处理逻辑单独拿出来放到methods中

      //请求轮播图及推荐信息数据
      this.getMultiData();

      //请求商品数据
      this.getGoods("pop");
      this.getGoods("new");
      this.getGoods("sell");
    },
    methods: {
      //网络请求相关
      getMultiData() {
        getHomeMultiData().then(res => {
          // console.log("首页数据:", res);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          console.log("商品数据", res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
      },

      //事件监听相关
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break;
          case 1:
            this.currentType = "new"
            break;
          case 2:
            this.currentType = "sell"
            break;
        }
      }
    }
  }
</script>

<style scoped>

  #home {
    padding-top: 44px;
  }

  .home-nav {
    /*疑问：为什么base.css中的内容在这里也可以用？*/
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    /*需要加上right:0;不加的话，组件的宽度会出现异常*/
    right: 0;
    z-index: 100;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
