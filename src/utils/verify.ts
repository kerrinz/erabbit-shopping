/* eslint-disable no-useless-escape */
/**
 * 字符串值的正则校验工具
 * 引用自：(https://blog.csdn.net/weixin_44733895/article/details/124990113)
 */

/**
 * 验证百分比（不可以小数）
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberPercentage(val: string): string {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 只能是数字和小数点，不能是其他输入
  v = v.replace(/[^\d]/g, "");
  // 不能以0开始
  v = v.replace(/^0/g, "");
  // 数字超过100，赋值成最大值100
  v = v.replace(/^[1-9]\d\d{1,3}$/, "100");
  // 返回结果
  return v;
}

/**
 * 验证百分比（可以小数）
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberPercentageFloat(val: string): string {
  let v = verifyNumberIntegerAndFloat(val);
  // 数字超过100，赋值成最大值100
  v = v.replace(/^[1-9]\d\d{1,3}$/, "100");
  // 超过100之后不给再输入值
  v = v.replace(/^100\.$/, "100");
  // 返回结果
  return v;
}

/**
 * 小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat(val: string): string {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 只能是数字和小数点，不能是其他输入
  v = v.replace(/[^\d.]/g, "");
  // 以0开始只能输入一个
  v = v.replace(/^0{2}$/g, "0");
  // 保证第一位只能是数字，不能是点
  v = v.replace(/^\./g, "");
  // 小数只能出现1位
  v = v.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 小数点后面保留2位
  v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
  // 返回结果
  return v;
}

/**
 * 正整数验证
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifiyNumberInteger(val: string): string {
  // 匹配空格
  let v = val.replace(/(^\s*)|(\s*$)/g, "");
  // 去掉 '.' , 防止贴贴的时候出现问题 如 0.1.12.12
  v = v.replace(/[\.]*/g, "");
  // 去掉以 0 开始后面的数, 防止贴贴的时候出现问题 如 00121323
  v = v.replace(/(^0[\d]*)$/g, "0");
  // 首位是0,只能出现一次
  v = v.replace(/^0\d$/g, "0");
  // 只匹配数字
  v = v.replace(/[^\d]/g, "");
  // 返回结果
  return v;
}

/**
 * 去掉中文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyCnAndSpace(val: string): string {
  // 匹配中文与空格
  let v = val.replace(/[\u4e00-\u9fa5\s]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
}

/**
 * 去掉英文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyEnAndSpace(val: string): string {
  // 匹配英文与空格
  let v = val.replace(/[a-zA-Z]+/g, "");
  // 匹配空格
  v = v.replace(/(^\s*)|(\s*$)/g, "");
  // 返回结果
  return v;
}

/**
 * 禁止输入空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyAndSpace(val: string): string {
  // 匹配空格
  return val.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 匹配文字变色（搜索时）
 * @param val 当前值字符串
 * @param text 要处理的字符串值
 * @param color 搜索到时字体高亮颜色
 * @returns 返回处理后的字符串
 */
export function verifyTextColor(val: string, text = "", color = "red"): string {
  // 返回内容，添加颜色
  return text.replace(
    new RegExp(val, "gi"),
    `<span style='color: ${color}'>${val}</span>`
  );
}

/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export function verifyPhone(val: string): boolean {
  // false: 手机号码不正确
  if (
    !/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(
      val
    )
  )
    return false;
  // true: 手机号码正确
  else return true;
}

/**
 * 国内电话号码
 * @param val 当前值字符串
 * @returns 返回 true: 国内电话号码正确
 */
export function verifyTelPhone(val: string): boolean {
  // false: 国内电话号码不正确
  if (!/\d{3}-\d{8}|\d{4}-\d{7}/.test(val)) return false;
  // true: 国内电话号码正确
  else return true;
}

/**
 * 登录账号 (字母开头，允许字母数字下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 登录账号正确
 */
export function verifyAccount(val: string, maxLen = 12, minLen = 4): boolean {
  // false: 登录账号不正确
  return RegExp(`/^[a-zA-Z][a-zA-Z0-9_]{${minLen},${maxLen}}$`).test(val);
}

/**
 * 密码 (以字母开头，只能包含字母、数字和下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 密码正确
 */
export function verifyPassword(val: string, maxLen = 18, minLen = 4): boolean {
  // false: 密码不正确
  return RegExp(`/^[a-zA-Z]\w{${minLen},${maxLen}}$`).test(val);
}

/**
 * 强密码 (字母+数字+特殊字符，长度在6-16之间)
 * @param val 当前值字符串
 * @returns 返回 true: 强密码正确
 */
export function verifyPasswordPowerful(val: string): boolean {
  // false: 强密码不正确
  if (
    !/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    return false;
  // true: 强密码正确
  else return true;
}

/**
 * 密码强度
 * @param val 当前值字符串
 * @description 弱：纯数字，纯字母，纯特殊字符
 * @description 中：字母+数字，字母+特殊字符，数字+特殊字符
 * @description 强：字母+数字+特殊字符
 * @returns 返回处理后的字符串：弱、中、强
 */
export function verifyPasswordStrength(val: string): string {
  let v = "";
  // 弱：纯数字，纯字母，纯特殊字符
  if (/^(?:\d+|[a-zA-Z]+|[!@#$%^&\.*]+){6,16}$/.test(val)) v = "弱";
  // 中：字母+数字，字母+特殊字符，数字+特殊字符
  if (
    /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    v = "中";
  // 强：字母+数字+特殊字符
  if (
    /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
      val
    )
  )
    v = "强";
  // 返回结果
  return v;
}

/**
 * IP地址
 * @param val 当前值字符串
 * @returns 返回 true: IP地址正确
 */
export function verifyIPAddress(val: string): boolean {
  // false: IP地址不正确
  if (
    !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
      val
    )
  )
    return false;
  // true: IP地址正确
  else return true;
}

/**
 * 邮箱
 * @param val 当前值字符串
 * @returns 返回 true: 邮箱正确
 */
export function verifyEmail(val: string): boolean {
  // false: 邮箱不正确
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    )
  )
    return false;
  // true: 邮箱正确
  else return true;
}

/**
 * url 处理
 * @param val 当前值字符串
 * @returns 返回 true: url 正确
 */
export function verifyUrl(val: string): boolean {
  // false: url不正确
  if (
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      val
    )
  )
    return false;
  // true: url正确
  else return true;
}
