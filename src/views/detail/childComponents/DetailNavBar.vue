<template>
  <div class="detail-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:currentIndex === index}"
             @click="itemClick(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick",index);
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>

  .detail-bar {
      border-bottom: 2px solid rgba(211,211,211,0.5);
  }

  .title {
    display: flex;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
