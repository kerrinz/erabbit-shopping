import useAccountStore from "@/stores/account";
import { insertCart, mergeCart } from "./../api/cart";
import type { CartModel } from "@/model/cart-model";
import { defineStore } from "pinia";
import { ModulesEnum } from ".";

/** 购物车相关存储器 */
const useCartStore = defineStore(ModulesEnum.cart.toString(), {
  state: () => {
    return {
      /** 购物车列表，仅供未登录时进行缓存，已登录请使用网络请求数据 */
      cartList: [] as Array<CartModel>,
      /** 购物车商品数量，仅限Store内部使用，外部请使用 @validCount */
      _count: 0,
    };
  },
  getters: {
    /** 购物车有效商品的数量 */
    validCount(): number {
      if (useAccountStore().isLoggedIn) {
        // 已登录，使用单独的缓存
        return this._count;
      } else {
        // 未登录，计算本地购物车列表的有效商品数
        return this.validList.reduce((previous, current) => previous + current.count, 0);
      }
    },
    /** 有效商品列表 */
    validList: (state) => state.cartList.filter((item) => item.isEffective && item.stock > 0),
  },
  actions: {
    setCartList(cartList: Array<CartModel>) {
      this.cartList = cartList;
    },
    /** 清除购物车列表 */
    clearCartList() {
      this.cartList = [];
    },
    /** 将本地购物车合并到远程，并清空本地购物车 */
    async mergeCart() {
      const data = this.cartList.map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        };
      });
      await mergeCart(data);
      // 合并后清空本地
      this.cartList = [];
    },
    /** 设置购物车有效商品数量（仅限已登录时使用） */
    setValidCount(count: number) {
      this._count = count;
    },
    /** 添加购物车有效商品数量（仅限已登录时使用） */
    addValidCount(count: number) {
      this._count += count;
    },
  },
  persist: {
    paths: ["cartList"],
    storage: localStorage,
  },
});

export default useCartStore;
