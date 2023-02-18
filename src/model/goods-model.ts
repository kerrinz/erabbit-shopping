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
  /** 库存商品列表 */
  skus: {
    id: string;
    /** 库存 */
    inventory: number;
    oldPrice: string;
    price: string;
    skuCode: string;
    // 该商品在全部规格组内对应的规格属性
    specs: {
      /** 所属规格组的组名 */
      name: string;
      /** 对应的规格值名，即选择项的名称 */
      valueName: string;
    }[];
  }[];
  /** 全部规格组 */
  specs: {
    /** 规格组的组名 */
    name: string;
    /** 某一个规格组的多个选择项 */
    values: {
      /** 规格名 */
      name: string;
      desc: string;
      /** 显示的小封面图，如果为null则无图片请使用@param name */
      picture: string | null;
    }[];
  }[];
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
