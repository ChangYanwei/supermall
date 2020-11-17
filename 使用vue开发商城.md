## 使用vue开发商城

### 一、划分目录结构

> 主要是划分src源码目录的结构

#### src目录

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
3. 





