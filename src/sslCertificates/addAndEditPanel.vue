<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow">
         <el-form-item label="名称">
            <el-input v-model="editRow.flowName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
             <el-radio-group v-model="editRow.flowType">
              <el-radio :label="1">域名操作</el-radio>
              <el-radio :label="2">ICP备案操作</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="第一审批人">
            <el-select v-model="editRow.flowPath1" style="width:100%">
              <el-option :key="user.id" :label="user.userName" :value="user.userName" v-for="user in userList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第二审批人">
            <el-select v-model="editRow.flowPath2" style="width:100%">
              <el-option :key="user.id" :label="user.userName" :value="user.userName" v-for="user in userList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第三审批人">
            <el-select v-model="editRow.flowPath3" style="width:100%">
              <el-option :key="user.id" :label="user.userName" :value="user.userName" v-for="user in userList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第四审批人">
            <el-select v-model="editRow.flowPath4" style="width:100%">
              <el-option :key="user.id" :label="user.userName" :value="user.userName" v-for="user in userList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开启">
            <el-switch
              v-model="editRow.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row class="p-sm">
      <el-col align="right">
        <el-button @click="handlerCancel" size="small">
          取消
        </el-button>
        <el-button @click="handlerSave" type="primary" size="small">
          提交
        </el-button>
      </el-col>
    </el-row>
    </div>    
  </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      userList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const url = '/apis/usersall';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      let url = '/apis/approveModule';
      let func = this.editRow.id ? $http.put : $http.post;
      if (this.editRow.id) {
        url += '/' + this.editRow.id;
      }
      func(url, this.editRow).then(() => {
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