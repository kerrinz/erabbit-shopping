/** 购物车商品列表中的商品项 */
export interface CartModel {
  /** SPUID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 图片 */
  picture: string;
  /** 加入时的价格 */
  price: string;
  /** 数量 */
  count: number;
  /** SKUID */
  skuId: string;
  /** 属性文字，例如“颜色:瓷白色 尺寸：8寸” */
  attrsText: string;
  /** 是否选中 */
  selected: boolean;
  /** 当前的价格 */
  nowPrice: string;
  /** 库存 */
  stock: number;
  /** 是否收藏 */
  isCollect: boolean;
  /** 折扣信息 */
  discount: number;
  /** 是否为有效商品 */
  isEffective: boolean;
}
