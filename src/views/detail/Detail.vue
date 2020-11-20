<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :banners="banner"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <good-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />

    <!--在我们需要监听一个组件的原生事件时,必须给对应的事件加上.native修饰符,才能进行监听-->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>

    <toast :message="message" :show="show" />
  </div>
</template>

<script>

  //公共组件
  import Scroll from "components/common/scroll/Scroll";
  import GoodList from "components/content/goods/GoodList";
  import {backTopMixin} from "common/utils/mixin";

  //页面组件
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo"
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";
  import Toast from "components/common/Toast/Toast";

  import {getDetailData, Goods, Shop, GoodsParam, getDetailRecommend} from "network/detail"
  import {mapActions} from "vuex";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        banner: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        topY: [],
        currentIndex:0,
        message:"",
        show:false
      }
    },
    mixins:[backTopMixin],
    components: {
      Scroll,
      GoodList,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Toast
    },
    created() {
      //1.保存商品的id
      this.iid = this.$route.params.iid;

      //2.请求商品的详情数据
      this.getData();

      //3.请求推荐数据
      this.getRecommend();

    },
    methods: {

      //将store中的actions进行映射
      ...mapActions["addCart"],

      //1.网络请求相关
      getData() {
        getDetailData(this.iid).then(res => {
          //拿到数据后，页面不会立即更新，还需要做一个渲染
          console.log("商品详情", res);
          let data = res.result;
          //1.顶部图片的轮播数据
          this.banner = data.itemInfo.topImages;

          //2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //3.店铺信息
          this.shop = new Shop(data.shopInfo);

          //4.商品详情
          this.detailInfo = data.detailInfo;

          //5.参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          //6.评论信息
          if (data.rate.cRate > 0) {
            this.commentInfo = data.rate.list[0];
          }

          //在DOM更新完成之后，会回调该函数
          // this.$nextTick(() => {
          //   //根据最新的数据,对应的DOM是已经被渲染出来
          //   //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片).
          //
          //   this.topY = [];
          //   this.topY.push(0);
          //   this.topY.push(this.$refs.param.$el.offsetTop);
          //   this.topY.push(this.$refs.comment.$el.offsetTop);
          //   this.topY.push(this.$refs.recommend.$el.offsetTop);
          //   console.log(this.topY);
          // });

        })
      },

      getRecommend() {
        getDetailRecommend().then(res => {
          this.recommends = res.data.list;
          console.log("推荐数据",this.recommends);
        })
      },

      //2.事件监听相关
      imageLoad() {
        this.$refs.scroll.refresh();

        this.topY = [];
        this.topY.push(0);
        this.topY.push(this.$refs.param.$el.offsetTop);
        this.topY.push(this.$refs.comment.$el.offsetTop);
        this.topY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.topY);
      },

      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.topY[index], 300)
      },

      contentScroll(position) {

        this.listenBackTop(position);

        //1.获取y值
        let positionY = -position.y;

        let topY = this.topY;

        //2.和topY中的值进行对比
        let length = topY.length;
        for (let i = 0; i < topY.length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= topY[i] && positionY < topY[i + 1])
              || (i === length - 1 && positionY >= topY[i]))) {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },

      addToCart(){
        //1.获取购物车需要展示的商品信息
        let product = {};
        product.image = this.banner[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        console.log(product);

        //2.将商品添加到购物车中
        // this.$store.commit("addCart",product);
        this.$store.dispatch("addCart",product).then(res => {
          this.$toast.show(res,1500);

          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          // },1500)
          // console.log(res);
        })
        // this.addCart(product).then(res => {
        //   console.log(res);
        // })
      }
    }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    /*把底部的tabbar组件遮住*/
    z-index: 100;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 100;
    background-color: #fff;
  }

  .content {
    /*此处高度的100%是相对于父级高度而言*/
    height: calc(100% - 44px - 58px);
  }
</style>
