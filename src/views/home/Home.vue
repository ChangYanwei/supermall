<template>
  <div id="home">

    <!-- 顶部导航-->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <tab-control
            @tab-click="tabClick"
            class="tab-control"
            :titles="['流行','新款','精选']"
            ref="tabControl1"
            v-show="isTabFixed"/>

    <!--此处需要加上：，加上：传过去的是数字3，只要不加：，传过去的是字符串3-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @get-more-goods="getMoreGoods">
      <!--轮播图-->
      <home-swiper :banners="banner" @swiper-image-load="swiperImageLoad"/>
      <!--推荐信息-->
      <home-recommend-view :recommends="recommend"/>
      <!--本周流行-->
      <home-feature/>
      <tab-control
              @tab-click="tabClick"
              :titles="['流行','新款','精选']"
              ref="tabControl2"/>
      <!--商品列表-->
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <!--在我们需要监听一个组件的原生事件时,必须给对应的事件加上.native修饰符,才能进行监听-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  //页面内使用的组件
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommendView from "./childComponents/HomeRecommendView";
  import HomeFeature from "./childComponents/HomeFeature";
  import GoodList from "components/content/goods/GoodList";

  import {
    getHomeMultiData,
    getHomeGoods
  } from "network/home";
  import {debounce} from "common/utils/utils";

  export default {
    name: "home",
    components: {
      NavBar,
      TabControl,
      Scroll,
      BackTop,

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
        currentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
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
      console.log("created");
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      console.log(this.saveY);
    },
    mounted() {
      //1.监听GoodListItem中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 500);
      this.$bus.$on("imageLoad", () => {
        //刷新，让better-scroll重新计算可滚动的高度
        refresh();
      });
    },
    methods: {
      //1.网络请求相关
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
          console.log(type, "第", page, "页商品数据", res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      },

      //2.事件监听相关
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      //点击后返回页面顶部
      backTop() {
        //scrollTo(x,y,毫秒数),此时调用的是Scroll.vue组件中的额方法
        this.$refs.scroll.scrollTo(0, 0, 500);
      },

      //监听页面滚动
      contentScroll(position) {
        //1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > 800;
        //2.决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },

      getMoreGoods() {
        this.getGoods(this.currentType);
      },

      swiperImageLoad() {
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }

    }
  }
</script>

<style scoped>

  #home {
    /*vh是视口高度*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    /*
    疑问：为什么base.css中的内容在这里也可以用？
    答：因为base.css文件在App.vue中被引用，而App.vue的style没有scoped属性
    */
    background-color: var(--color-tint);
    color: white;
    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*!*需要加上right:0;不加的话，组件的宽度会出现异常*!*/
    /*right: 0;*/
    /*z-index: 100;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 100;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
