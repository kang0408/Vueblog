<template>
  <div id="main">
    <div>
      <el-row>
        <el-col :span="22">
          <el-menu :default-active="index" class="el-menu-top" mode="horizontal" @select="handleSelect">
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
            <el-button id="login" size="small" type="text" @click="dialogFormVisible = true">登陆</el-button>
            <el-dialog size="tiny" modal=true title="登陆" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="form.passwd" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        name: '',
        passwd: ''
      }
    }
  },
  methods: {
    login: function() {
      if (this.form.user != '' && this.form.passwd != '') {
        this.dialogFormVisible = false
      } else {
        this.$message({
          showClose: true,
          message: '用户名密码不能为空',
          type: 'error'
        });
      }
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
