<template>
  <div class="login">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <div class="login_form">
          <el-input class="login_in" v-model="name" placeholder="请输入用户名"></el-input>
          <el-input class="login_in" v-model="passwd" placeholder="请输入密码"></el-input>
          <el-button type="primary" class="login_in" id="login">登陆</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: '',
      passwd: ''
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
