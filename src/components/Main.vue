<template>
  <div id="main">
    <div>
      <el-row>
        <el-col :span="22">
          <el-menu :default-active="index" class="el-menu-top" mode="horizontal">
            <el-menu-item index="1">
              <router-link to="/home" class="tabs">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/blog" class="tabs">博客</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/about" class="tabs">关于</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button v-show="user!==undefined" id="login" size="small" type="text" @click="addBlog">发博客</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  mounted: function() {
    console.log(this.logIp);
    this.$router.push({ path: '/home' })
  },
  data() {
    return {
      user: sessionStorage.getItem('user'),
      index: '1',
      dialogFormVisible: false,
      formLabelWidth: '80px',

    }
  },
  methods: {
    addBlog: function() {
      this.$router.push({ path: '/addBlog' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabs {
  padding: 20px 50px;
}

#login {
  display: inline;
  line-height: 50px;
}
</style>
