<template>
  <div class="login_container">
    <div class="login_wrapper">
      <el-form
        :model="login_form"
        :rules="loginFormRules"
        ref="login_form"
        s
        class="demo-ruleForm"
      >
        <el-form-item prop="mobile">
          <el-input v-model="login_form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="login_form.code"></el-input>
        </el-form-item>

        <el-form-item  prop="isAgree">
          
            <el-checkbox  v-model="login_form.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>

          
        </el-form-item>

        <el-form-item>
          <el-button  @click="login_btn">立即创建</el-button>
        </el-form-item>
      </el-form>
      <img class="login_title" src="./touxiang.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  data() {
    return {
      login_form: {
        mobile: "13911111111",
        code: "246810",
        isAgree: true,
      },

      isLoading: false,
      loginFormRules: {
        mobile: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请勾选用户协议"));
              } else {
                callback();
              }
            },
            trigger: "this.login_btn",
          },
        ],
      },
    };
  },
  methods: {
    login_btn() {
      this.$refs.login_form.validate((val) => {
        if (val) {
          this.userLogin();
        }
      });
    },
    userLogin() {
      this.isLoading = true;
      login(this.login_form)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          if (res.status === 201) {
            this.$message.success("登录成功");

            const token = JSON.stringify(res.data.data);
            window.localStorage.setItem("user", token);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.$message.error("手机或者验证码输入错误，请重试");
        });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: aquamarine;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./bg.jpg") no-repeat;
  background-size: cover;

  .login_wrapper {
    width: 300px;
    border-radius: 0.3em;
    padding: 3em 3em 1em 3em;
    background-color: #4c4a48;
    position: relative;

    .login_title {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      top: -70px;
      left: calc(50% - 50px);
      position: absolute;
      box-shadow: 0 0 40px 13px #f6dce6;
      border: 2px solid #f6dce6;
    }
  }
  .login_btn {
  }
}
</style>

