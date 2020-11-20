import {request} from "./request";

export function getDetailData(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

//商品基本信息
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

//店铺信息
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score =  shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

//商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//推荐商品
export function getDetailRecommend() {
  return request({
    url:"/recommend"
  })
}
