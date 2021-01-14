<template>
  <div class="login-bg">
    <div class="login flex">
      <div class="bg-img"></div>
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
            <el-button type="primary" class="login-btn" @click="onSubmit" size="small">确认登录</el-button>
            <el-button type="primary" class="login-btn" @click="onSubmit" size="small">4A认证</el-button>
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
  padding: 130px;
  background-image: linear-gradient(-44deg, #0094FF 0%, #5019C5 100%);
}

.bg-img {
  width: 1100px;
  background: url('./../assets/loginbg.png');
  background-size: cover;
  background-repeat: no-repeat;
  flex: 2;
}

.login {
  height: 100%;
}

.form {
  padding: 90px;
  width: 560px;
  background: #fff;
  flex: 1;
  background: url('./../assets/formbg.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  color: #1791fb;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
}

.login-btn {
  background-image: linear-gradient(-44deg, #0094FF 0%, #5019C5 100%);
  border-radius: 8px;
  border-radius: 8px;
}
</style>