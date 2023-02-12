export interface LoginModel {
  id: number;
  /** 手机号 */
  mobile: string;
  token: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  /** 城市编码 */
  cityCode: string;
  /** 省份编码	*/
  provinceCode: string;
  /** 职业*/
  profession: string;
  account: string | null;
}
