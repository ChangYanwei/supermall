## 使用vue开发商城

### 一、划分目录结构

> 主要是划分src源码目录的结构

#### 1.1 src目录

1. **assets**（资源目录）

   - images
   - css

2. **components**（组件）

   > 放置公共的组件

   - common（其中的组件与项目不耦合，抽离出去可以在其它项目中使用）
   - content（和项目业务相关的组件，与项目耦合）

3. **views**（视图）

4. **router**（路由）

5. **store**（管理公共状态）

6. **network**（网络相关）

7. **common**（放置公共的js文件）



### 二、引入css文件

1. 两个基本的css文件
   - **normalize.css**  https://github.com/necolas/normalize.css/tree/master
     - **保护有用的浏览器** ：样式而不是去掉他们。
     - **一般化的样式：** 为大部分HTML元素提供。
     - **修复浏览器自身的bug** 并保证各浏览器的一致性。
     - **优化css可用性：** 用一些小技巧。
     - **解释代码：** 用注释和详细的文档来。

   * **base.css** （自己写的一些在所有页面都会用到的基本样式）

2. 在base.css文件中使用@import引入normalize.css

3. 在App.vue文件中使用@impot引入base.css



### 三、配置路径的别名

1. 在根路径下创建vue.config.js文件

   ```js
   module.exports = {
     configureWebpack: {
       resolve: {
         alias:{
           //vue已经内置了一个路径别名：@，对应src文件夹
           "assets":"@/assets",
           "common":"@/common",
           "components":"@/components",
           "network":"@/network",
           "views":"@/views"
         }
       }
     }
   }
   ```

2. **.editorconfig**

   - vue-CLI2会自动创建该文件，该文件可以配置整个项目的代码风格
   - vue-CLI3不会创建该文件，可以创建一个新的或者将之前项目中的该文件拷贝一份



### 四、引入tabbar和项目模块划分

1. 将之前写的tabbar组件拿过来用
2. 安装vue-router   **npm install vue-router --save**



### 五、开发首页

#### 5.1 封装导航栏组件

#### 5.2 封装网络模块，先拿到数据

- 安装axios **npm install axios --save**
- 在src文件夹中的network文件夹创建home.js文件，对首页中的所有网络请求进行管理

#### 5.3 轮播图

- 封装成组件 **HomeSwiper**

#### 5.4 推荐信息

- 封装成组件 **HomeRecommendView**

#### 5.5 本周流行

- 封装成组件 **HomeFeature**

- ```js
  ul>{列表$}*50
  //可以动态生成50个列表
  ```

#### 5.6 封装**tabControl**组件

- 灵活使用slot，不是说必须用插槽，如果一个组件在应用时只有小部分不同，比如文字，剩下的大部分是相同的。此时可以不用插槽。**没有最好，只有最适合。**

#### 5.7 保存商品的数据结构

- 流行pop
- 新款new
- 精选sell

```javascript
goods:{
	"pop":{page:1,list:[]},
    "new":{},
    "sell":{}
}
```

#### 5.8 商品列表

- **GoodList**组件
- **GoodListItem**组件

#### 5.9 安装使用**better-scroll**，实现更好的滚动效果

- https://better-scroll.github.io/docs/zh-CN/guide/

- ```bash
  npm install better-scroll --save
  ```

- 如何使用 https://zhuanlan.zhihu.com/p/27407024

- **将使用better-scroll的功能抽离成组件，自己再封装一层**，防止项目对better-scroll的依赖度太高，万一某一天它不在继续更新维护，项目也可以很方便的替换掉better-scroll

#### 5.10 backTop组件的封装

- 功能：点击后返回页面顶部
- 监听页面的滚动位置，实时显示和隐藏

#### 5.11 解决首页中**better-scroll**可滚动区域高度的问题

- 问题：
  - scrollerHeight属性是Better-Scroll的content中的子组件的高度
  - 但是我们的首页中,刚开始在计算scrollerHeight属性时,是没有将图片计算在内的。所以,计算出来的高度是错误的
  - 后来图片加载进来之后有了新的高度,但是scrollerHeight属性并没有进行更新。所以滚动出现了问题

- 解决：

  - 监听每—张图片是否加载完成，只要有一张图片加载完成了，执行—次**refresh()**

- 如何监听图片加载完成

  - 原生的JS监听图片：**img.onload = function(){}**

  - Vue中的监听：在img元素上加**@load='方法'**，在methods实现相关的方法

    ```vue
    <img src="" @load="imageLoad">
    ```

- 如何将GoodsListltem.vue中的事件传入到Home.vue中

  - 因为涉及到非父子组件的通信,所以这里我们选择了事件总线
  -  bus ->总线
  - 默认情况下$bus没有值，在mian.js文件中，**Vue.prototype.$bus = new Vue()**
  - this.$bus.emit()
  - this.bus.on('事件名称',回调函数(参数))

- 对于**refresh**非常频繁的问题，进行防抖操作

  - 防抖debounce

  - 如果我们直接执行refresh，那么refresh函数会被执行30次

  - 可以将refresh函数传入到debounce函数中，生成一个新的函数

    ```javascript
    //防抖函数
    debounce(fun,delay){
        let timer = null;
        return function (...args) {
            if (timer){
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fun.apply(this,args);
            },delay)
        }
    }
    ```

    ```javascript
    const refresh = this.debounce (this.$refs.scroll.refresh,500) ;
    
    //监听GoodListItem中图片加载完成
    this.$bus.$on("imageLoad",() => {
      refresh();
    });
    ```

#### 5.13 tabControl的吸顶效果

- 必须知道滚动到多少时,开始有吸顶效果,这个时候就需要获取tabControl的offsetTop但是,如果直接在mounted中
- tabControl的offsetTop,那么值是不正确，如何获取正确的值了?
- 监听HomeSwiper中 img的加载完成
- 加载完成后，发出事件，在Home.vue中,获取正确的值.

* 问题：动态的改变tabControl的样式时, 会出现两个问题:
  * 问题一: 下面的商品内容, 会突然上移
  * 问题二: tabControl虽然设置了fixed, 但是也随着Better-Scroll一起滚出去了.
* 其他方案来解决停留问题.
  * 在最上面, 多复制了一份PlaceHolderTabControl组件对象, 利用它来实现停留效果.
  * 当用户滚动到一定位置时, PlaceHolderTabControl显示出来.
  * 当用户滚动没有达到一定位置时, PlaceHolderTabControl隐藏起来

#### 5.14 从Home首页跳转到其它页面后，保持Home页面的状态

- keep-alive让Home页面创建后不销毁
- 离开时, 保存一个位置信息saveY.
- 进来时, 将位置设置为原来保存的位置saveY信息即可.
  * 最好在回来时, 进行一次refresh()



### 六、详情页

#### 6.1 封装导航栏

#### 6.2 轮播图

#### 6.3 商品基本信息

#### 6.4 店铺信息

#### 6.5 加入滚动

#### 6.6 商品详情

#### 6.7 商品参数

#### 6.8 评论信息

1. 如何将 时间戳 转成 时间格式化字符串？

   - 时间戳：1535694719秒

   - 将时间戳转成Date对象
     - let date = new Date(1535694719 * 1000);
     - 将date进行格式化，转成对应的字符串
     - date.getYear()

#### 6.9 推荐信息

#### 6.10 将商品添加到购物车



#### 6.11 其它

1. 顶部导航栏和内容的联动效果
   - 问题原因
     - created肯定不行,压根不能获取元素
     - mounted也不行,数据不一定获取到
     - 获取到数据的回调中也不行，DOM还没有渲染完
     - $nextTick也不行，因为图片的高度没有被计算在内
     - 在图片加载完成后，获取的高度才是正确
2. 底部工具栏
3. 回到顶部按钮
   - 使用混入mixin

### 七、购物车

#### 7.1 列表

























### 笔记

- ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象

- ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象

- 创建一个新组件**.vue**后，其中的style样式标签默认会有一个**scoped**属性，**scoped**是作用域的意思，代表其中声明的样式只能在该组件中使用

  > App.vue中的style中没有scoped属性，代表其中的样式可以在全局中使用

  ```vue
  <style scoped>
  
  </style>
  ```

- vh是视口高度

  ```css
  height: 100vh;
  ```

- 组件是不能直接加click事件的，需要加**.native**修饰符

  ```vue
  <!--在我们需要监听一个组件的原生事件时,必须给对应的事件加上.native修饰符,才能进行监听-->
  <back-top @click.native="backTop"></back-top>
  ```

- 使用better-scroll

  ```vue
  <!--1.无论是否设置click:false,button都可以点击-->
  <button @click="btnClick">按钮</button>
  
  <!--2.必须设置click:true,那么div才能监听点击-->
  <div @click="divClick"></div>
  ```

- 父组件向子组件传递数据，子组件使用props，其中定义的属性如果使用了驼峰命名形式，如probeType，那么在父组件中使用时要用 **-** 分割，如probe-type

  - ```javascript
    Vue.component('blog-post', {
      // 在 JavaScript 中是 camelCase 的
      props: ['postTitle'],
      template: '<h3>{{ postTitle }}</h3>'
    })
    ```

  - ```html
    <!-- 在 HTML 中是 kebab-case 的 -->
    <blog-post post-title="hello!"></blog-post>
    ```

- 所有的组件都有一个属性 **$el** ，用于获取组件中的元素

  ```javascript
  //this.$refs.tabControl获取到的是组件
  //this.$refs.tabControl获取到的是组件中的跟元素
  this.$refs.tabControl.$el
  ```

- 如何将vue-router中的getter转成计算属性

  - https://vuex.vuejs.org/zh/guide/getters.html

  - ```js
    import {mapGetters} from "vuex";
    ```

  - ```js
    computed:{
          ...mapGetters([
              "cartLength"
          ])
        }
    ```

- 图片懒加载

  - **npm install vue-lazyload**

  - 用法https://segmentfault.com/a/1190000011672452

    - main.js 在入口文件

    - ```js
      import Vue from 'vue'
      import App from './App.vue'
      import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
      
      Vue.use(VueLazyload)
      
      // 或者添加VueLazyload 选项
      Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: 'dist/error.png',
        loading: 'dist/loading.gif',
        attempt: 1
      })
      ```

    - 
