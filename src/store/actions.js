import {
  ADD_COUNT,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //查找购物车中是否已经有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct);
        resolve("商品数量加1")
      } else {
        context.commit(ADD_TO_CART, payload);
        resolve("商品添加到购物车")
      }
    })

  }
}
