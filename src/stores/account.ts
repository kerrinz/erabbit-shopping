import { defineStore } from "pinia";
import { ModulesEnum } from ".";
import type { LoginModel } from "@/model/auth-model";

/** 账号相关存储器 */
const useAccountStore = defineStore(ModulesEnum.account.toString(), {
  state: () => {
    return {
      profile: null as LoginModel | null,
    };
  },
  actions: {
    setAccount(account: string, profile: LoginModel) {
      this.profile = profile;
      this.profile.account = account;
    },
    clear() {
      this.profile = null;
    },
  },
  // 持久化
  persist: true,
});

export default useAccountStore;
