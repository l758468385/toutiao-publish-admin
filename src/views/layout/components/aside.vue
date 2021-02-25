<<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
   
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    
    background-color="#8c6e59"
    text-color="#303133"
    active-text-color="gold"
    router
    :collapse="isCollapse"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-shouye"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont icon-neirongguanli"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-sucaiguanli"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-fabu"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-shouye"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fensi"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="iconfont icon-gerenshezhi"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  data() {
    return {
      isCollapse: false,
    };
  },
  props: {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
};
</script>
 
<style lang="less" scoped>
.el-menu {
  border: 0;

  .iconfont {
    margin-right: 10px;
    padding: 0 5px;
    font-size: 20px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>