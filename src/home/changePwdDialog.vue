<template>
  <el-dialog :visible="true" title="修改密码" width="450px" @close="handlerCancel">
    <el-form ref="form" :model="user">
        <el-form-item label="旧密码">
          <el-input v-model="user.oldpasswd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码">
          <el-input v-model="user.newpasswd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码确认">
          <el-input v-model="user.newpasswdConfirm" show-password></el-input>
      </el-form-item>
      <el-form-item>
          <el-button @click="handlerSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      form: {},
    };
  },
  props: ['user'],
  mounted() {
    
  },
  methods: {
    handlerCancel() {
      this.$emit('close');
    },
    handlerSave() {
      const url = '/apis/change-password';
      $http.post(url, this.user).then(() => {
        this.$emit('close', true);
      });
    }
  }
};
</script>
<style scoped lange="scss">
.left-panel {
    width: 500px;
    text-align: left;
    background: #fff;
}
</style>