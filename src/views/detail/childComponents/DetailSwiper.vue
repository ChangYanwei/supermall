<template>
  <!--只有一个元素时，外层可以不加div-->
  <swiper class="detail-swiper">
    <swiper-item v-for="item in banners">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from "components/common/swiper";

  export default {
    name: "DetailSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
