import { findCart, findCartCount, updateCart } from "@/api/cart";
import useAccountStore from "@/stores/account";
import useCartStore from "@/stores/cart";
import type { CartModel } from "@/model/cart-model";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { LoadingState } from "@/model/emun";

/** 购物车商品数量，响应式数据
 * - 已登录时获取远程数据并更新缓存
 * - 未登录时仅使用本地缓存的购物车列表中的有效商品数量
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
  return { count };
};

/** 购物车商品列表 */
export const useCartList = () => {
  const loadingState = ref(LoadingState.loading);
  const cartList = ref<CartModel[]>([]);
  if (useAccountStore().isLoggedIn) {
    // 已登录时
    findCart()
      .then((res) => {
        cartList.value = res.result;
        loadingState.value = LoadingState.success;
      })
      .catch((_) => (loadingState.value = LoadingState.failed));
  } else {
    // 未登录时
    const cartStore = storeToRefs(useCartStore());
    cartList.value = cartStore.cartList.value;
    loadingState.value = LoadingState.success;

    watch(cartList, () => {
      if (!useAccountStore().isLoggedIn) {
        useCartStore().setCartList(cartList.value);
      }
    });
  }

  /** 有效商品列表 */
  const validList = computed(() => cartList.value.filter((item) => item.isEffective && item.stock > 0));
  /** 无效商品列表 */
  const invalidList = computed(() => cartList.value.filter((item) => item.isEffective && item.stock <= 0));
  /** 有效商品总金额 */
  const validAmount = computed(
    () => validList.value.reduce((p, c) => p + Math.round(Number(c.nowPrice) * 100) * c.count, 0) / 100
  );
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

  /** 更新购物车某个商品 */
  const updateItem = async (data: { skuId: string; selected: boolean | undefined; count: number }) => {
    if (useAccountStore().isLoggedIn) {
      await updateCart(data);
    }
    const item = cartList.value.find((item) => item.skuId === data.skuId);
    if (item) {
      if (data.selected != undefined) item.selected = data.selected;
      item.count = data.count;
    }
  };
  return {
    loadingState,
    cartList,
    validList,
    invalidList,
    validAmount,
    selectedList,
    totalSelected,
    selectedAmount,
    isCheckAll,
    updateItem,
  };
};
