import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      // less: {
      //   modifyVars: {
      //     hack: `true; @import (reference) "${path.resolve(
      //       "src/assets/css/base.less"
      //     )}";`,
      //   },
      //   javascriptEnabled: true,
      // },
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/style/common.less"
        )}";`,
      },
    },
  },
  server: {
    proxy: {
      // "/": "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
    },
  },
});
