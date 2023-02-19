import { createApp } from "vue";
import App from "./App.vue";
import globalComponent from "./components/index";
import store from "./stores";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// import "element-plus/theme-chalk/el-message-box.css";
// import "element-plus/theme-chalk/el-message.css";
// import "element-plus/theme-chalk/overlay.css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import "element-plus/theme-chalk/dark/css-vars.css"; // 暗黑主题

// 项目样式导入
import "@/style/common.less";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册全局组件
for (const componentItme in globalComponent) {
  app.component(componentItme, globalComponent[componentItme]);
}

app.use(store).use(router);
const vm = app.mount("#app");

export default vm;
