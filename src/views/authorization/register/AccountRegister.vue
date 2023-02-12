<template class="as">
  <main class="login-panel">
    <h3>注册</h3>
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
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Please email." />
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input
          v-model="form.pass"
          type="password"
          placeholder="Please password."
        />
      </el-form-item>
      <el-form-item label="Password Again" prop="passAgain">
        <el-input
          v-model="form.passAgain"
          type="password"
          placeholder="Please password again."
        />
      </el-form-item>
    </el-form>
    <div>
      <RouterLink to="/login">
        <el-link>已有账号？立即登录></el-link>
      </RouterLink>
    </div>
    <el-button @click="submitForm(formRef)">提交注册</el-button>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, h } from "vue";
import { doRegister } from "@/api/auth-api";
import router from "@/router";
import { ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { verifyEmail } from "@/utils/verify";
import { RouterLink } from "vue-router";

// 表单
const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  email: "",
  pass: "",
  passAgain: "",
});

// 校验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input user name", trigger: "blur" },
    { min: 4, max: 12, message: "Length should be 4 to 12", trigger: "blur" },
  ],
  email: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback();
        } else if (typeof value === "string" && value.includes(" ")) {
          callback(new Error("Spaces are not allowed"));
        } else if (!verifyEmail(value)) {
          callback(new Error("Email format error"));
        } else {
          callback();
        }
      },
      required: false,
      trigger: "blur",
    },
  ],
  pass: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error("Please input the password"));
          return;
        } else if (typeof value === "string" && value.includes(" ")) {
          callback(new Error("Spaces are not allowed"));
        } else {
          callback();
        }
        if (form.passAgain !== "") {
          if (!formRef.value) return;
          formRef.value.validateField("passAgain", () => null);
        }
      },
      required: true,
      trigger: "blur",
    },
    { min: 4, max: 18, message: "Length should be 4 to 18", trigger: "blur" },
  ],
  passAgain: [
    {
      validator: (_rule, value, callback) => {
        if (value === "") {
          callback(new Error("Please input the password again"));
        } else if (value !== form.pass) {
          callback(new Error("Two inputs don't match!"));
        } else {
          callback();
        }
      },
      required: true,
      trigger: "blur",
    },
    { min: 4, max: 18, message: "Length should be 4 to 18", trigger: "blur" },
  ],
});

// 提交登录表单
const submitForm = (fr: FormInstance | undefined) => {
  if (!fr) return;
  fr.validate((valid) => {
    if (!valid) {
      console.log("Please check submit value!");
    } else {
      register();
    }
  });
};

const register = () => {
  doRegister(form.name, form.pass, form.email).then((body) => {
    switch (body.status) {
      case 200:
        ElMessageBox.alert("", "注册成功", {
          message: h("p", null, [
            h("span", null, "您的账号是"),
            h("span", { style: "color: coral" }, form.name),
          ]),
          confirmButtonText: "前往登录",
          callback: (action: "confirm" | "close" | "cancel") => {
            if (action == "confirm") {
              router.push("/login");
            }
          },
        });
        break;
      default:
        ElMessageBox.alert("", "注册失败", {});
        console.log(body);
    }
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
