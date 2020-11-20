import {
  ADD_COUNT,
  ADD_TO_CART
} from "./mutation-types";

export default {
  /*
    * mutations唯一的目的就是修改state中状态
    * mutations中的每个方法尽可能完成的事件比较单一
    * */
  [ADD_COUNT](state, payload) {
    payload.count += 1;
  },

  [ADD_TO_CART](state,payload){
    payload.count = 1
    state.cartList.push(payload);
    payload.checked = true;
  }
}
