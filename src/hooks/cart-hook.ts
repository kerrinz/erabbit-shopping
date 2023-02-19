import { checkAllCart, deleteCart, findCart, findCartCount, updateCart } from "@/api/cart";
import useAccountStore from "@/stores/account";
import useCartStore from "@/stores/cart";
import type { CartModel } from "@/model/cart-model";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { LoadingState } from "@/model/emun";

/** 购物车商品数量，响应式数据
 * - 已登录时获取远程数据，缓存购物车商品数量
 * - 未登录时仅使用本地缓存的购物车列表中的商品数量
 * @returns (number) 数量
 */
export const useCartCount = () => {
  const cartStore = useCartStore();
  const count = storeToRefs(cartStore).validCount;
  if (useAccountStore().isLoggedIn) {
    findCartCount().then((res) => {
      useCartStore().setValidCount(res.result.count);
    });
  }
  // 已登录，但本地缓存的购物车列表不为空，那就需要合并到远程
  if (useAccountStore().isLoggedIn && cartStore.cartList.length > 0) {
    cartStore.mergeCart();
  }
  return { count };
};

/** 购物车商品列表 */
export const useCartList = () => {
  const loadingState = ref(LoadingState.loading);
  const cartList = ref<CartModel[]>([]);

  /** 有效商品列表 */
  const validList = computed(() => cartList.value.filter((item) => item.isEffective && item.stock > 0));
  /** 有效商品总金额 */
  const validAmount = computed(
    () => validList.value.reduce((p, c) => p + Math.round(Number(c.nowPrice) * 100) * c.count, 0) / 100
  );
  /** 有效商品总件数 */
  const totalValid = computed(() => validList.value.reduce((p, c) => p + c.count, 0));
  /** 失效商品列表 */
  const invalidList = computed(() => cartList.value.filter((item) => !item.isEffective || item.stock <= 0));
  /** 失效商品总件数 */
  const totalInvalid = computed(() => invalidList.value.reduce((p, c) => p + c.count, 0));
  /**已选商品列表 */
  const selectedList = computed(() => validList.value.filter((item) => item.selected));
  /**已选商品总件数 */
  const totalSelected = computed(() => selectedList.value.reduce((p, c) => p + c.count, 0));
  /**已选商品总金额 */
  const selectedAmount = computed(
    () => selectedList.value.reduce((p, c) => p + Math.round(Number(c.nowPrice) * 100) * c.count, 0) / 100
  );
  /**是否全选 */
  const isCheckAll = computed(
    () => validList.value.length !== 0 && selectedList.value.length === validList.value.length
  );

  // 是否已登录
  const isLoggedIn = storeToRefs(useAccountStore()).isLoggedIn;

  if (isLoggedIn.value) {
    // 已登录时
    findCart()
      .then((res) => {
        cartList.value = res.result;
        loadingState.value = LoadingState.success;
      })
      .catch(() => (loadingState.value = LoadingState.failed));
    watch(
      cartList,
      () => {
        // 监听有效商品数量的变化，更新Store中的购物车商品数量
        useCartStore().setValidCount(validList.value.reduce((previous, current) => previous + current.count, 0));
      },
      { deep: true }
    );
  } else {
    // 未登录时
    const cartStore = storeToRefs(useCartStore());
    cartList.value = cartStore.cartList.value;
    loadingState.value = LoadingState.success;

    watch(cartList, () => {
      // 监听购物车列表的变化，更新Store中的购物车列表
      useCartStore().setCartList(cartList.value);
    });
  }

  /** 更新购物车某个商品 */
  const doUpdateItem = async (data: { skuId: string; selected: boolean | undefined; count: number }) => {
    if (isLoggedIn.value) {
      await updateCart(data);
    }
    const item = cartList.value.find((item) => item.skuId === data.skuId);
    if (item) {
      if (data.selected != undefined) item.selected = data.selected;
      item.count = data.count;
    }
  };
  /** 全选商品
   * @param reversed 反向全选（即全不选）
   */
  const doCheckAll = async (reversed = false) => {
    const selected = reversed ? false : true;
    if (isLoggedIn.value) {
      const res = await checkAllCart({ selected: selected, ids: [] });
      console.log(res);
    }
    for (const item of cartList.value) {
      item.selected = selected;
    }
  };
  /** 删除一个或者多个商品
   * @param ids SKUID列表，非商品的普通ID！
   */
  const doRemove = async (ids: Array<string>) => {
    if (isLoggedIn.value) {
      const res = await deleteCart(ids);
      console.log(res);
    }
    cartList.value = cartList.value.filter((value) => !ids.find((id) => id == value.skuId));
  };
  return {
    loadingState,
    cartList,
    validList,
    invalidList,
    selectedList,
    validAmount,
    selectedAmount,
    totalValid,
    totalInvalid,
    totalSelected,
    isCheckAll,
    doUpdateItem,
    doCheckAll,
    doRemove,
  };
};
