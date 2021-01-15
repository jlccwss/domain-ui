<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow">
         <el-form-item label="用户名">
            <el-input v-model="editRow.userName"></el-input>
        </el-form-item>
        <el-form-item label="角色">
            <el-select style="width:100%" v-model="editRow.role">
              <el-option :key="role.id" :label="role.name" :value="role.role" v-for="role in roleList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="editRow.passWord" show-password></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-input v-model="editRow.gender"></el-input>
        </el-form-item>
        <el-form-item label="员工编号">
            <el-input v-model="editRow.employeeCode"></el-input>
        </el-form-item>
        <el-form-item label="员工姓">
            <el-input v-model="editRow.employeeFirstName"></el-input>
        </el-form-item>
        <el-form-item label="员工名">
            <el-input v-model="editRow.employeeLastName"></el-input>
        </el-form-item>
        <el-form-item label="移动电话">
            <el-input v-model="editRow.mobileTelephone"></el-input>
        </el-form-item>
        <el-form-item label="办公电话">
            <el-input v-model="editRow.officeTelephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="editRow.email"></el-input>
        </el-form-item>
        <el-form-item label="公司编号">
            <el-input v-model="editRow.companyCode"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
            <el-input v-model="editRow.companyName"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
            <el-input v-model="editRow.departmentCode"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
            <el-input v-model="editRow.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="职位编号">
            <el-input v-model="editRow.positionCode"></el-input>
        </el-form-item>
        <el-form-item label="职位名称">
            <el-input v-model="editRow.positionName"></el-input>
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
      roleList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      const url = '/apis/roles';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.roleList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      const url = '/apis/users';
      $http.post(url, this.editRow).then(() => {
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