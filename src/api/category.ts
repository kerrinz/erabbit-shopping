import type { MainCategory, SubCategory, FilterGoodsModel, FilterParams } from "@/model/category-model";
import request from "@/request/request";

/**
 * 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @returns Promise
 */
export const findNavCategory = () => request<MainCategory[]>("get", "/home/category/head");

/**
 * 获取一级分类详细信息
 * @param {string} id - 顶级类目ID
 */
export const findCategory = (id: string) => {
  return request<MainCategory>("get", "/category", { id: id });
};

/**
 * 获取二级类目的筛选条件数据
 * @param {string} id - 二级类目ID
 * @returns
 */
export const findSubCategoryFilter = (id: string) => {
  return request<SubCategory>("get", "/category/sub/filter", { id: id });
};

/**
 * 获取分类下的商品
 * @param params - 筛选条件
 */
export const findSubCategoryGoods = (params: FilterParams) => {
  return request<FilterGoodsModel>("post", "/category/goods/temporary", params);
};
