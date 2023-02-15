/** 通用的商品小模型 */
export interface GoodsModel {
  id: string;
  name: string;
  desc: string;
  orderNum: number | null;
  picture: string;
  price: string;
  discount: number | null;
}

/** 商品详情数据 */
export interface GoodsDetailModel {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: {
    id: string;
    name: string;
    nameEn: string;
    logo: null;
    picture: null;
    type: null;
    desc: null;
    place: null;
  };
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: [];
  videoScale: number;
  mainPictures: string[];
  specs: [];
  skus: [];
  categories: _Categories[];
  details: {
    pictures: string[];
    properties: {
      name: string;
      value: string;
    }[];
  };
  isPreSale: false;
  isCollect: false;
  recommends: null;
  userAddresses: [];
  similarProducts: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount: null;
    orderNum: number;
  }[];
  hotByDay: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount: null;
    orderNum: number;
  }[];
  evaluationInfo: null;
}

interface _Categories {
  id: string;
  name: string;
  layer: number;
  parent: _Categories[];
}
