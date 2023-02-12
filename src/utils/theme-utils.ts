/** 媒体查询深色模式 */
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

/** 切换至浅色模式 */
export function switchToLightMode(): void {
  document.documentElement.classList.remove("dark");
}

/** 切换至深色模式 */
export function switchToDarkMode(): void {
  document.documentElement.classList.add("dark");
}

/** 操作系统是否正处于深色模式 */
export function isDarkModeInSystem(): boolean {
  return darkModeQuery.matches;
}

/** 当前网页是否正处于深色模式 */
export function isDarkModeInWeb(): boolean {
  return document.documentElement.classList.value.includes("dark");
}

export { darkModeQuery };
