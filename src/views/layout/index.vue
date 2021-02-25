<template>
  <div class="layout_container">
    <el-container class="contanier">
      <el-aside width="auto">
        <AppSide class="appaside"></AppSide>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <div class="header_left">
            <span class="iconfont icon-zhedie1"></span>
            <span class="title_text">练手后台管理系统</span>
          </div>
          <div>
            <el-dropdown>
              <div class="el-dropdown-link">
                <img
                  class="profile"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1124226808,3458204310&fm=26&gp=0.jpg"
                  alt=""
                />
                <span class="userName">{{ userInfo.name }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item @click.native="logOutClick"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main width="auto">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppSide from "./components/aside";

import { getUserInfo } from "@/api/user.js";
export default {
  components: {
    AppSide,
  },
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    logOutClick() {
      this.$confirm("确认退出操作吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("user");
          this.$message({
            type: "success",
            message: "退出成功",
          });
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作取消",
          });
        });
    },
  },
  created() {
    getUserInfo()
      .then((res) => {
        this.userInfo = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.layout_container {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.el-header {
  background-color: #ffd269;
  color: #333;
  text-align: center;
  line-height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: justify;
  .header_left {
    display: flex;
    .iconfont {
      font-size: 35px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .userName {
    color: cornflowerblue;
  }
}
.el-aside {
  background-color: #8c6e59;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #263238;
  color: blueviolet;

  border-left: 1px rgba(0, 0, 0, 0.1) solid;
  border-top: 1px rgba(0, 0, 0, 0.1) solid;
}
.el-dropdown {
  display: flex;
  align-items: center;
  .el-dropdown-link {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #fff;
  }
}
.profile {
  width: 50px;
  padding: 2px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid aqua;
  margin-right: 5px;
  vertical-align: middle;
}
.appaside {
  color: red;
}
</style>
