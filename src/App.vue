<template>
  <div id="app">
    
    <!-- 路由接口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value1: 55,
      isActive: true,
      isActive: true,
      error: null,
    };
  },
  computed: {
   
  },
};
</script>


<style lang="less">
</style>
