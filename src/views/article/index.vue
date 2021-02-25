<template>
  <div>
    <el-card class="top_card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        v-loading="isLoading"
        ref="form"
        border
        :model="form"
        label-width="50px"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">全部删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="selectedChannel" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            format="yyyy-MM-dd"
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="filterBtn" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <span>根据赛选条件共查询到{{ totalCount }}条记录：</span>
      </div>
      <el-table
        v-loading="isLoading"
        :data="tableData"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.photo"
              fit="cover"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="stateInfo[scope.row.status].type">{{
              stateInfo[scope.row.status].textInfo
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              @click="deleteBtn(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="paginationBtn"
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="per_page"
        :disabled="isLoading"
        :current-page.sync="page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getChannels, deleteArticle } from "../../api/article";
export default {
  name: "Article",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: null,
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      tableData: [],
      stateInfo: [
        { textInfo: "草稿", type: "" },
        { textInfo: "待审核", type: "info" },
        { textInfo: "审核通过", type: "success" },
        { textInfo: "审核失败", type: "warning" },
        { textInfo: "已删除", type: "danger" },
      ],
      totalCount: null,
      page: 1,
      per_page: 10,
      status: null,
      isLoading: false,
      channels: [],
      selectedChannel: null,
      begin_pubdate: null,
      end_pubdate: null,
    };
  },
  methods: {
    articleInfo(page) {
      this.isLoading = true;
      getArticle({
        page,
        per_page: this.per_page,
        status: this.status,
        channel_id: this.selectedChannel,
        begin_pubdate: this.form.date1 ? this.form.date1[0] : null,
        end_pubdate: this.form.date1 ? this.form.date1[1] : null,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data.results;
        this.totalCount = res.data.data.total_count;
        this.isLoading = false;
        console.log(res);
        // console.log(this.tableData);
      });
    },

    paginationBtn(index) {
      console.log(index);

      this.page = index;

      this.articleInfo(this.page);
    },
    filterBtn() {
      this.articleInfo();
    },
    getChannelsInfo() {
      getChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    deleteBtn(articleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(articleId)
            .then((res) => {
             this.articleInfo()
            })
            .catch((err) => {});
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.articleInfo(this.page);
    this.getChannelsInfo();
  },
};
</script>

<style lang="less" scoped>
.top_card {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 10px;
}
.fengmian {
  width: 100px;
}
</style>
