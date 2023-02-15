import axios, { type AxiosRequestConfig, type Method } from "axios";
import useAccountStore from "@/stores/account";
import { useRouter } from "vue-router";

export const baseAxios = axios.create({
  timeout: 10000,
  responseType: "json",
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

/** 响应内容体的模板 */
export interface ResponseBody<D = unknown> {
  // code: string | number;
  result: D;
  msg: string;
}

/*是否有请求正在刷新token*/
// let isRefreshingToken = false;
/*被挂起的请求数组*/
const refreshSubscribers: ((token: string | undefined) => void)[] = [];
const router = useRouter();

// /** 用新的accessToken执行被挂起的请求*/
// function continueRefreshSubscribers(accessToken: string | undefined) {
//   refreshSubscribers.map((item) => item(accessToken));
// }

/** 未登录或者需要重新登录 */
function needLogin() {
  const accountStore = useAccountStore();
  accountStore.clear();
  refreshSubscribers.splice(0, refreshSubscribers.length);
  router.push("/login");
}

/** 请求续签accessToken */
// 可惜接口似乎没有token过期时间
// async function needUpdateAccessToken(
//   config: AxiosRequestConfig
// ): Promise<AxiosRequestConfig> {
//   // 刷新accessToken
//   const res = await doRefreshToken(
//     account.value?.token ?? "",
//     account.value?.mobile ?? "",
//     account.value?.id.toString() ?? ""
//   );
//   isRefreshingToken = false; // 标记未处于刷新状态
//   if (!res) {
//     // 刷新token的请求出现异常，将挂起的请求全部拒绝掉
//     continueRefreshSubscribers(undefined);
//     return config;
//   } else if (res.status != 200) {
//     // 服务器告知无法续签token
//     console.log("服务器响应续签token失败，请重新登录");
//     router.push("/login");
//     return config;
//   } else {
//     console.log("获取到新的token： " + JSON.stringify(res));
//     // 为当前请求使用新的token
//     config.headers
//       ? (config.headers.Authorization = `Bearer ${res.data.token}`)
//       : (config.headers = { Authorization: `Bearer ${res.data.token}` });
//     // 更新鉴权
//     accountStore.setAccount(res.data);
//     // 执行数组里的函数,重新发起被挂起的请求
//     continueRefreshSubscribers(res.data.token);
//     // 执行onRefreshed函数后清空数组中保存的请求
//     refreshSubscribers.splice(0, refreshSubscribers.length);
//     return config;
//   }
// }

/**
 * 请求拦截器
 */
baseAxios.interceptors.request.use(
  (config): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const accountStore = useAccountStore();
    // 本地存放的token
    const localAccessToken = accountStore.profile?.token;
    // 无token
    if (!localAccessToken) {
      // needLogin();
      return config;
    }
    // 有token
    config.headers
      ? (config.headers.Authorization = localAccessToken)
      : (config.headers = { Authorization: localAccessToken });
    return config;
  },
  (error) => {
    // console.log('错误信息',error)
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
baseAxios.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (err) => {
    // 服务器告知鉴权已经失效
    if (err.response && err.response.status === 401) {
      // 清空缓存的账号信息
      const accountStore = useAccountStore();
      accountStore.clear();
      // 当前所处路由地址，并转换编码
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      // 跳转登录，附带回调地址
      router.push("/login?redirectUrl=" + fullPath);
    }
    console.error("响应错误信息：", err);
    return Promise.reject(err);
  }
);

/* 统一的请求方法
 * D: 请求体[ResponseBody]内部 result 的数据模型
 */
export function request<D = unknown>(
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig<unknown>
): Promise<ResponseBody<D>> {
  if (config != null) {
    config.method = method;
    config.url = url;
  }

  return baseAxios.request<D, ResponseBody<D>>({
    // config如果存在，则以config内的参数最优先
    ...config,
    url: url,
    method: method,
    // get请求用params，post请求用data
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
  });
}

export default request;
