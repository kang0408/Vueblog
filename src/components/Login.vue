<template>
  <div class="login">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <div class="login_form">
          <el-input class="login_in" v-model="form.name" placeholder="请输入用户名"></el-input>
          <el-input class="login_in" v-model="form.passwd" placeholder="请输入密码"></el-input>
          <el-button type="primary" class="login_in" id="login" v-on:click="login">登陆</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        name: '',
        passwd: ''
      }
    }
  },
  methods: {
    login() {
      var self = this
      if (this.form.user != '' && this.form.passwd != '') {
        jQuery.ajax({
          type: 'POST',
          data: self.form,
          dataType: "json",
          url: self.$commonConfig + "/net/user/login",
          success: function(data) {
            if (data.status == 200) {
              self.message('登录成功', 'success')
              sessionStorage.setItem('user', data.data)
              self.user = data.data
              self.$router.push({ path: '/home' })
            } else {
              self.message(data.msg, 'error')
            }
          },
          error: (error) => {
            self.message('登录失败', 'error')
          }
        })
      } else {
        self.message('用户名密码不能为空', 'error')
      }
    },
    message(msg, type) {
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_in {
  margin: 10px 10px;
}

.login_form {
  text-align: center;
}
</style>
