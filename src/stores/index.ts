import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

/** 所有的Store模块 */
export const enum ModulesEnum {
  /** 登录账号的信息 */
  account,
  /** 购物车 */
  cart,
}
