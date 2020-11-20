import Toast from "./Toast"

const obj = {}

//在main.js文件中导入该文件，重命名为toast，并执行Vue.use(toast)，接下来就会执行install 函数
obj.install = function (vue) {

  //创建组件构造器
  const toastConstructor = vue.extend(Toast);

  //创建组件对象
  const toast = new toastConstructor();

  //将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement("div"));

  document.body.appendChild(toast.$el);


  vue.prototype.$toast = toast;
}

export default obj
