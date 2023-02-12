<template>
  <el-header class="toolbar">
    <el-container class="container">
      <span class="brand">欢迎光临商城！</span>
      <div class="actions">
        <nav>
          <li v-if="account">
            <RouterLink class="link login" to="/profile">
              {{ account?.account }}
            </RouterLink>
            <a
              class="link logout"
              href="javascript:;"
              @click.prevent="handleLogout"
            >
              退出登录
            </a>
          </li>
          <li v-else>
            <RouterLink class="link login" to="/login"> 请登录 </RouterLink>
          </li>
          <li><a class="link" href="#">我的订单</a></li>
          <li><a class="link" href="#">会员中心</a></li>
          <li><a class="link" href="#">帮助中心</a></li>
          <li><a class="link" href="#">关于我们</a></li>
        </nav>
        <ThemeModeButton class="btn-theme" />
      </div>
    </el-container>
  </el-header>
</template>

<script setup lang="ts">
import useAccountStore from "@/stores/account";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const accountStore = useAccountStore();
const account = storeToRefs(accountStore).profile;

const handleLogout = () => {
  accountStore.clear();
  router.push("/login");
};
</script>

<style lang="less" scoped>
:root.dark {
  .toolbar {
    background-color: #2d2d2d;
  }
}

.toolbar {
  background-color: #3d3d3d;
  width: 100%;
  height: 50px;
  .container {
    .page-container();
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brand {
      float: left;
      color: #ddd;
      padding: 8px;
    }
  }
}

.toolbar nav {
  display: inline-block;
  font-size: 14px;
  li {
    display: inline-block;
    &:not(:last-child)::after {
      content: "";
      width: 1.5px;
      height: 12px;
      display: inline-block;
      background: #777;
    }
    a.link {
      display: inline-block;
      color: #ccc;
      padding: 0 12px;
      text-decoration: none;
      transition: color 0.15s;
      &:hover {
        color: #fff;
      }
      &.login {
        color: @primaryColor;
      }
      &.logout {
        padding-left: 0;
      }
    }
  }
}
.btn-theme {
  color: #ccc;
  background-color: unset;
  border-color: #666;
  &:hover {
    color: @primaryColor;
    background-color: #555;
  }
}
</style>
