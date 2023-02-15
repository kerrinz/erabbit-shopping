import type { GoodsModel } from "./goods-model";

/** 一级分类 */
export interface MainCategory {
  id: string;
  name: string;
  picture: null;
  children: SubCategory[];
}

/** 二级分类 */
export interface SubCategory {
  id: string;
  name: string;
  picture: string | null;
  parentId: string | null;
  parentName: string | null;
  goods: GoodsModel[];
  categories:
    | null
    | {
        id: string;
        name: string;
        layer: number;
        parent: null;
      }[];
  /** 品牌 */
  brands:
    | null
    | {
        id: string;
        name: string;
        nameEn: string;
        logo: string;
        picture: string;
        type: null;
        desc: string;
        place: string;
      }[];
  /** 销售属性 */
  saleProperties:
    | null
    | {
        id: string;
        name: string;
        properties: {
          id: string;
          name: string;
        }[];
      }[];
}

/** 子分类的筛选商品 */
export interface FilterGoodsModel {
  counts: number;
  pageSize: number;
  pages: number;
  page: number;
  items: GoodsModel[];
}

/** 子分类商品的筛选条件，用于 request */
export interface FilterParams {
  /** 必须		分类ID */
  categoryId: string;
  /** categoryId: number;
  /** 非必须		是否有库存 */
  inventory: boolean | undefined;
  /** 非必须		只显示特惠 */
  onlyDiscount: boolean | undefined;
  /** 非必须		品牌ID */
  brandId: number | undefined;
  /** 非必须		属性条件数组 */
  attrs:
    | undefined
    | {
        /** 非必须		属性组名称 */
        groupName: string | undefined;
        /** 非必须		属性名称 */
        propertyName: string | undefined;
      }[];
  /** 非必须		排序字段，取值范围：[publishTime,orderNum,price,evaluateNum] */
  sortField: string | undefined;
  /** 非必须		排序规则，asc为正序，desc为倒序，默认为desc */
  sortMethod: string | undefined;
  /** 非必须	当前页，最大值: 100，最小值: 1，默认值为1 */
  page: number | undefined;
  /** 非必须		页条数 */
  pagsize: number | undefined;
  /** 非必须		最低价 */
  lowPrice: number | undefined;
  /**非必须		最高价 */
  highPrice: number | undefined;
}
