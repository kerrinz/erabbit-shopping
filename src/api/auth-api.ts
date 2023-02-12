import type { LoginModel } from "@/model/auth-model";
import { authAxios } from "../request/auth-http-request";
import type { AxiosResponse } from "axios";
import type { ResponseBody } from "@/request/request";

// 站点用户登录
export const doLogin = (
  account: string,
  password: string
): Promise<AxiosResponse<ResponseBody<LoginModel>>> =>
  authAxios.post<ResponseBody<LoginModel>>(`/login`, {
    account: account,
    password: password,
  });

// 站点用户刷新token
export const doRefreshToken = (
  oldToken: string,
  account: string,
  id: string
): Promise<AxiosResponse<ResponseBody<LoginModel>>> =>
  authAxios.put(
    `/login/refresh`,
    {
      account: account,
      id: id,
    },
    {
      headers: { Authorization: `Bearer ${oldToken}` }, // "Authorization":"Bearer ${token}"
    }
  );

// 站点用户注册
export const doRegister = (
  account: string,
  password: string,
  email: string
): Promise<AxiosResponse<null>> =>
  authAxios.post(`/register`, {
    account: account,
    password: password,
    email: email,
  });
