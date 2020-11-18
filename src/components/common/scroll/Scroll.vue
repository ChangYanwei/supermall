<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        //必须设置click:true,那么div才能监听点击
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad//上拉加载更多的功能
      });

      //监听滚动的位置
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position)
      })

      //监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          console.log("加载更多----------");
          this.$emit("get-more-goods");
        })
      }

    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
