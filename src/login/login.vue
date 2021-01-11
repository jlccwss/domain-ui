<template>
  <div class="login-bg">
    <div class="login flex">
      <div class="form">
        <div class="title">
          用户登录
        </div>
        <el-form ref="form" :model="form">
          <el-form-item label="账户名称">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="账户密码">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button type="primary" @click="onSubmit">4A认证</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      form: {
        username: '',
        password:''
      }
    };
  },
  mounted() {
    
  },
  methods: {
    onSubmit() {
      let url = '/apis/login';
      $http.post(url, this.form).then(res => {
        if (res.data.status === 0) {
          this.$router.push({
            path: 'home/zones'
          });
        } else {
          this.$notify.error({
            message: res.data.msg
          });
        }
      }, () => {
        this.$notify.error({
          message: 'username or password error!'
        });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login-bg {
  height: 100%;
  padding: 125px;
}

.login {
  justify-content: flex-end;
}

.form {
  padding: 70px;
  width: 450px;
}

.title {
  color: #1791fb;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
}
</style>