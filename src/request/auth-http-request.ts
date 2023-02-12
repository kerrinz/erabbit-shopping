import axios from "axios";

export const authAxios = axios.create({
  timeout: 10000,
  responseType: "json",
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
  // 状态码允许 resolve 的范围
  validateStatus(status) {
    return status < 500;
  },
});

/**
 * 响应拦截器
 * return Promise.reject(xxx)会传递到上层Promise的catch()里
 * 50012，token过期
 */
authAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("请求发生异常，" + error);
    return Promise.reject(error.response);
  }
);

export default authAxios;
