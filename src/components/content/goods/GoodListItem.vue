<template>
  <div class="goods-item" @click="goodClick">
    <img v-lazy="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodItemData.title}}</p>
      <span class="price">{{goodItemData.price}}</span>
      <span class="collect">{{goodItemData.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodItemData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        //该组件在Home页面和Detail页面都有使用，但是图片的路径不同，故做此处理
        return this.goodItemData.image || this.goodItemData.show.img;
      }
    },
    methods: {
      //监听图片加载
      imageLoad() {
        //使用事件总线
        this.$bus.$emit("imageLoad")
      },
      goodClick() {
        this.$router.push("/detail/" + this.goodItemData.iid);
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    /*让文字在一行显示，多余的文字用...代替*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>
