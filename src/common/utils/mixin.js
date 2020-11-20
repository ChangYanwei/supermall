//混入

import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    //点击后返回页面顶部
    backTop() {
      //scrollTo(x,y,毫秒数),此时调用的是Scroll.vue组件中的额方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenBackTop(position){
      this.isShowBackTop = (-position.y) > 800;
    }
  }
}
