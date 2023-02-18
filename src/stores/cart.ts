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
    /** 有效商品总件数 */
    // validTotal(): number {
    //   return this.validList.reduce((previous, current) => previous + current.count, 0);
    // },
    /** 有效商品总金额 */
    validAmount(): number {
      return this.validList.reduce((p, c) => p + Math.round(Number(c.nowPrice) * 100) * c.count, 0) / 100;
    },
    /** 无效商品列表 */
    invalidList: (state) => state.cartList.filter((item) => item.isEffective && item.stock <= 0),
    /**已选商品列表 */
    selectedList(): Array<CartModel> {
      return this.validList.filter((item) => item.selected);
    },
    /**已选商品总件数 */
    totalSelected(): number {
      return this.selectedList.reduce((p, c) => p + c.count, 0);
    },
    /**已选商品总金额 */
    selectedAmount(): number {
      return this.selectedList.reduce((p, c) => p + Math.round(Number(c.nowPrice) * 100) * c.count, 0) / 100;
    },
    /**是否全选 */
    isCheckAll(): boolean {
      return this.validList.length !== 0 && this.selectedList.length === this.validList.length;
    },
  },
  actions: {
    setCartList(cartList: Array<CartModel>) {
      this.cartList = cartList;
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
    /** 加入购物车，自动处理本地与远程 */
    async insertCart(item: CartModel) {
      if (useAccountStore().isLoggedIn) {
        const res = await insertCart(item);
        this.cartList.unshift(res.result);
      } else {
        this.cartList.unshift(item);
      }
    },
    /** 设置购物车有效商品数量（仅限已登录时使用） */
    setValidCount(count: number) {
      this._count = count;
    },
    /** 刷新商品的有效性（仅限未登录时使用） */
    // refreshValidity() {
    //   return new Promise((resolve, reject) => {
    //     if (ctx.rootState.user.profile.token) {
    //       // 已登录
    //       findCart().then((data) => {
    //         ctx.commit("setCart", data.result);
    //         resolve();
    //       });
    //     } else {
    //       // 未登录
    //       // 同时发送请求（有几个商品发几个请求）等所有请求成功，一并去修改本地数据。
    //       // Promise.all(promise数组).then((dataList)=>{})  同时发请求，所有请求成功，得到所有成功结果
    //       // Promise.resolve() Promise.reject() new Promise()
    //       // Promise.race(promise数组).then((data)=>{}) 同时发请求，最快的请求成功，得到成功结果
    //       const promiseArr = ctx.state.list.map((goods) => {
    //         return getNewCartGoods(goods.skuId);
    //       });
    //       // dataList成功结果的集合，数据顺序和promiseArr顺序一致，它又是根据state.list而来
    //       Promise.all(promiseArr).then((dataList) => {
    //         // 更新本地购物车
    //         dataList.forEach((data, i) => {
    //           ctx.commit("updateCart", { skuId: ctx.state.list[i].skuId, ...data.result });
    //         });
    //         // 调用resolve代表操作成功
    //         resolve();
    //       });
    //     }
    //   });
    // },
  },
  persist: {
    paths: ["cartList"],
    storage: localStorage,
  },
});

export default useCartStore;
