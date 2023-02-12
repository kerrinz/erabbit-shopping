/** 首页分类导航，一级分类项，可能需要使用Array包裹 */
export interface NavCategory {
  id: string;
  name: string;
  // 二级分类列表
  children: NavSubCategory[];
}
/** 首页分类导航，二级分类 */
export interface NavSubCategory {
  id: string;
  name: string;
  picture: string;
  goods: NavSubCategoryGoods[];
}
/** 首页分类导航，二级分类商品 */
export interface NavSubCategoryGoods {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
}

/** 一级分类详细内容 */
export interface CategoryDetail {
  // 该分类的ID，与请求传入的ID一致
  id: string;
  // 分类名
  name: string;
  children: NavSubCategory[];
}
/** 二级分类 */
export interface SubCategory {
  id: string;
  name: string;
  picture: string;
  goods: SubCategoryGoods[];
}
/** 二级分类商品*/
export interface SubCategoryGoods {
  id: string;
  name: string;
  desc: string;
  price: number;
  picture: string;
  discount: number;
}
