<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list class="cart-list"/>

    <!--底部汇总-->
    <cart-bottom-bar />
  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";

  //页面组件
  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";


  import {mapGetters} from "vuex";

  export default {
    name: "Shop",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        "cartLength"
      ]),

      //此写法可以重命名
      // ...mapGetters({
      //   length:"cartLength"
      // })
    }
  }
</script>

<style scoped>

  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
