import type { CartModel } from "@/model/cart-model";
import { request } from "@/request/request";

/**
 * 获取购物车商品数量
 * @returns @param count - 数量
 */
export const findCartCount = () => {
  return request<{ count: number }>("get", "/member/cart/count");
};

/**
 * 获取购物车列表
 * @returns
 */
export const findCart = () => {
  return request<Array<CartModel>>("get", "/member/cart");
};

/**
 * 加入购物车
 * @param {String} skuId - SKUID
 * @param {Number} count - 加入购物车数量
 * @returns
 */
export const insertCart = (data: { skuId: string; count: number }) => {
  return request<CartModel>("post", "/member/cart", data);
};

/**
 * 删除购物车商品，支批量
 * @param {Array<string>} ids - skuId 的集合
 */
export const deleteCart = (ids: Array<string>) => {
  return request("delete", "/member/cart", { ids });
};

/**
 * 修改购物车商品（状态，数量）
 * @param {String} skuId - SKUID（必须）
 * @param {Number} count - 加入购物车数量（必须）
 * @param {Boolean} selected - 是否选中（非必须）
 */
export const updateCart = (data: { skuId: string; selected: boolean | undefined; count: number }) => {
  return request("put", `/member/cart/${data.skuId}`, { ...data, skuId: undefined });
};

/**
 * 全部选中&取消全选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - skuId 的集合
 */
export const checkAllCart = (data: { selected: boolean; ids: Array<string> }) => {
  return request<null>("put", "/member/cart/selected", data);
};

/**
 * 获取商品的 最新价格  库存  是否有效
 * @param {String} skuId - SKU id
 */
export const getNewCartGoods = (skuId: string) => {
  return request("get", `/goods/stock/${skuId}`);
};

/**
 *  获取商品对应的sku数据
 *  @param {String} skuId - SKU id
 */
export const getGoodsSku = (skuId: string) => {
  return request("get", `/goods/sku/${skuId}`);
};

/**
 * 合并购物车
 * @param list - 购物车信息列表
 * |——@param skuId - SKUID
 * |——@param selected - 选中状态
 * |——@param count - 数量
 */
export const mergeCart = (list: Array<{ skuId: string; selected: boolean; count: number }>) => {
  return request("post", "/member/cart/merge", list);
};
