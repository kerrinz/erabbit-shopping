<template>
  <header>
    <div class="page-container container">
      <RouterLink class="back" to="/">
        <el-icon><ArrowLeft /></el-icon>返回首页
      </RouterLink>
    </div>
  </header>
  <main>
    <!-- 登录面板 -->
    <div class="login-panel">
      <h3 class="title">账号登录</h3>
      <!-- 表单 -->
      <el-form ref="formRef" :model="form" status-icon :rules="rules" label-position="left">
        <el-form-item class="form_item" label-width="40px" prop="name">
          <template v-slot:label>
            <el-icon class="icon"><User /></el-icon>
          </template>
          <el-input v-model="form.name" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item class="form_item" label-width="40px" prop="pass">
          <template v-slot:label>
            <el-icon class="icon"><Lock /></el-icon>
          </template>
          <el-input v-model="form.pass" type="password" placeholder="请输入密码" />
        </el-form-item>
        <div>
          <router-link to="/register">
            <!-- <el-link>没有账号？立即注册></el-link> -->
          </router-link>
        </div>
        <!-- 同意协议条款 -->
        <div class="protocol">
          <el-form-item prop="protocol">
            <el-checkbox v-model="form.protocol" size="large" name="protocol">
              <slot name="label">
                同意《<a type="primary" link>用户协议</a>》和《<a type="primary" link>隐私政策</a>》
              </slot>
            </el-checkbox>
          </el-form-item>
        </div>
      </el-form>
      <el-button class="btn_loggin" type="primary" @click="submitForm(formRef)">确认登录</el-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeft } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { doLogin } from "@/api/auth-api";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { RouterLink, useRouter } from "vue-router";
import useAccountStore from "@/stores/account";

const router = useRouter();
// 账号存储
const accountStore = useAccountStore();

// 重定向地址
const redirectUrl = router.currentRoute.value.query["redirectUrl"] as string | undefined;

// 表单
const formRef = ref<FormInstance>();
const form = reactive({
  name: "xiaotuxian001",
  pass: "123456",
  protocol: false,
});
// 校验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 5, max: 20, message: "账号长度需要5~20个字符", trigger: "blur" },
  ],
  pass: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (typeof value === "string" && value.includes(" ")) {
          callback(new Error("不允许存在空格"));
        } else {
          callback();
        }
      },
      required: true,
      trigger: "blur",
    },
    { min: 6, max: 20, message: "密码长度需要6~20个字符", trigger: "blur" },
  ],
  protocol: [
    {
      validator: (_rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error("请勾选同意条款"));
        }
      },
      required: true,
      trigger: "change",
    },
  ],
});

// 提交登录表单
const submitForm = (fr: FormInstance | undefined) => {
  if (!fr) return;
  fr.validate((valid) => {
    if (!valid) {
      console.log("请检查账号或者密码是否正确!");
    } else {
      login();
    }
  });
};

// 登录按钮事件
const login = () => {
  doLogin(form.name, form.pass)
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        ElMessage({
          showClose: true,
          message: `登录成功`,
          type: "success",
        });
        accountStore.setAccount(form.name, res.data.result);
        router.push(redirectUrl ?? "/");
      } else {
        ElMessage({
          showClose: true,
          message: `登录失败，${res.data.msg}`,
          type: "error",
        });
      }
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: `登录出现异常，${err}`,
        type: "error",
      });
    });
};
</script>

<style scoped lang="less">
header {
  height: 100px;
  background: @surfaceColor;
  .container {
    line-height: 100px;
    .back {
      font-size: 1em;
      margin: 0 1em;
      transition: color.2s;
      &:hover {
        color: @primaryColor;
      }
      > * {
        vertical-align: middle;
      }
    }
  }
}

main {
  height: 500px;
  background: url(@/assets/images/login-bg.png) no-repeat;
  background-position: center;
  background-size: cover cover;
  position: relative;
  .login-panel {
    background-color: var(--color-surface);
    border-radius: 12px;
    margin: 1rem auto;
    padding: 2rem;
    width: 320px;
    position: absolute;
    top: 50%;
    right: 15%;
    transform: translateY(-50%);
    .form_item {
      margin: 1.5em 0;
      .icon {
        font-size: 1.5em;
        padding-top: 4px;
      }
    }
    // 覆盖 required 的 * 符号
    :deep(.el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label:before) {
      content: none;
    }
    > .title {
      margin-top: 0;
    }
    // 协议条款
    .protocol {
      label {
        height: 2em;
      }
      :deep(.el-checkbox__label) {
        color: @text2Color;
      }
      a {
        transition: all.2s;
        color: @primaryColor;
        &:hover {
          text-decoration: underline;
        }
      }
      margin: 24px 0;
    }
    // 登录按钮
    .btn_loggin {
      width: 100%;
    }
  }
}
</style>
