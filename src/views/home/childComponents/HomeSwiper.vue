<template>
  <!--  对首页轮播图再做一层单独的封装 -->
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a href="item.link">
          <img :src="item.image" :alt="item.title" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>

  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        //只需要发出一次事件就可以知道轮播图的高度了
        if (!this.isLoad) {
          this.$emit("swiper-image-load");
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
