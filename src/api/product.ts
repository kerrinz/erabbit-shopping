// 提供商品相关的API函数
import type { GoodsDetailModel } from "@/model/product-model";
import { request } from "@/request/request";

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id: string) => {
  return request<GoodsDetailModel>("get", "/goods", { id });
};

/**
 * 获取相关推荐商品|猜你喜欢商品
 * @param {String} id - 商品ID，传入相关推荐，不传猜你喜欢
 * @param {Integer} limit - 商品数量
 */
export const findRelevantGoods = (data: { id: string; limit: 16 }) => {
  return request("get", "/goods/relevant", { id: data.id, limit: data.limit });
};

/**
 * 获取热销榜数据
 * @param {String} id - 商品ID
 * @param {Integer} limit - 商品数量
 * @param {Integer} type - 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 */
export const findGoodsHot = (data: { id: string; limit: 3; type: 1 }) => {
  return request("get", "/goods/hot", { id: data.id, limit: data.limit, type: data.type });
};

/**
 * 查询商品评价信息
 * @param {String} id - 商品ID
 * @returns
 */
export const findGoodsCommentInfo = (id: string) => {
  // return request( 'get',`/goods/${id}/evaluate`, 'get')
  // axios 遇见 http https 开头的地址，不会加上基准地址
  return request("get", `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`);
};

/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
export const findGoodsCommentList = (id: string, params: any) => {
  return request("get", `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, params);
};
