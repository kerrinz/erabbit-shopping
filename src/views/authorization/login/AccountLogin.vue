<template class="as">
  <main class="login-panel">
    <h3>登录到系统</h3>
    <p>测试账号与密码：test</p>
    <el-form
      ref="formRef"
      :model="form"
      status-icon
      :rules="rules"
      label-width="120px"
      label-position="top"
      class="demo-ruleForm"
    >
      <el-form-item label="User name" prop="name">
        <el-input v-model="form.name" placeholder="Please username." />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="form.pass"
          type="password"
          placeholder="Please password."
        />
      </el-form-item>
    </el-form>
    <div>
      <RouterLink to="/register">
        <el-link>没有账号？立即注册></el-link>
      </RouterLink>
    </div>
    <el-button @click="submitForm(formRef)">确认登录</el-button>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { doLogin } from "@/api/auth-api";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { RouterLink, useRouter } from "vue-router";
import useAccountStore from "@/stores/account";

const router = useRouter();
// 账号存储
const accountStore = useAccountStore();

// 重定向地址
const redirectUrl = router.currentRoute.value.query["redirectUrl"] as
  | string
  | undefined;

// 表单
const formRef = ref<FormInstance>();
const form = reactive({
  name: "xiaotuxian001",
  pass: "123456",
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

<style scoped lang="css">
.login-panel {
  background-color: var(--color-surface);
  margin: 1rem auto;
  padding: 1rem;
  width: 400px;
}
</style>
