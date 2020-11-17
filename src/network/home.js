//对首页中的所有网络请求进行管理
import {request} from "./request";

export function getHomeMultiData() {
  return request({
    url:"/home/multidata"
  })
}

//获取商品信息
export function getHomeGoods(type,page) {
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  })
}
