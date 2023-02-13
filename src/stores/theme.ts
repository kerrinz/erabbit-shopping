import { defineStore } from "pinia";
import { ModulesEnum } from ".";

/** 主题相关存储器 */
const useThemeStore = defineStore(ModulesEnum.theme.toString(), {
  state: () => {
    return {
      // 是否深色模式
      isDark: undefined as boolean | undefined,
    };
  },
  actions: {
    /** 设置是否深色模式 */
    setIsDarkMode(isDark: boolean) {
      this.isDark = isDark;
    },
  },
  // 持久化
  persist: true,
});

export default useThemeStore;
