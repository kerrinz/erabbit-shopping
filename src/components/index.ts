/*
 * 导出全局注册组件
 * 全局组件存放于components/global
 */
const components = import.meta.glob("./global/*.vue"); // 异步方式
export default components;
