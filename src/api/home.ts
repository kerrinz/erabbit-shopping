import type { BannerModel } from "@/model/banner-model";
import { request } from "@/request/request";

// any 就 any 吧，开摆！

/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 */
export const findBrand = (limit = 6) => {
  return request("get", "/home/brand", { limit });
};

/**
 * 获取广告区轮播图
 */
export const findBanner = () => {
  return request<BannerModel[]>("get", "/home/banner");
};

/**
 * 获取新鲜好物
 */
export const findNew = () => {
  return request<any>("get", "/home/new");
};

/**
 * 获取人气推荐
 */
export const findHot = () => {
  return request<any>("get", "/home/hot");
};

/**
 * 获取商品板块
 */
export const findGoods = () => {
  return request<any>("get", "/home/goods");
};

/**
 * 获取最新专题
 */
export const findSpecial = () => {
  return request<any>("get", "/home/special");
};
