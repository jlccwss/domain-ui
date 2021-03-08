<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow" :rules="rules">
         <el-form-item label="模板名称">
            {{ editRow.name }}
        </el-form-item>
        <el-form-item label="注册类型">
            <el-select disabled style="width:100%" v-model="editRow.role">
              <el-option :key="role.id" :label="role.name" :value="role.role" v-for="role in roleList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
            <el-input disabled v-model="editRow.certificateType"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名(中文)">
            <el-input disabled v-model="editRow.gender"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名(英文)">
            <el-input disabled v-model="editRow.employeeCode"></el-input>
        </el-form-item>
        <el-form-item label="联系人整件号码">
            <el-input disabled v-model="editRow.employeeFirstName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input disabled v-model="editRow.employeeLastName"></el-input>
        </el-form-item>
        <el-form-item label="省份城市">
            <el-input disabled v-model="editRow.mobileTelephone"></el-input>
        </el-form-item>
        <el-form-item label="地址(中文)">
            <el-input disabled v-model="editRow.officeTelephone"></el-input>
        </el-form-item>
        <el-form-item label="地址(英文)">
            <el-input disabled v-model="editRow.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-row class="form-row">
            <el-col disabled :span="13"><el-input disabled v-model="editRow.companyCode"></el-input></el-col>
            <el-col class="ml-sm" :span="2">分机</el-col>
            <el-col disabled :span="8"><el-input disabled v-model="editRow.companyCode"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="传真">
          <el-row class="form-row">
            <el-col :span="13"><el-input disabled v-model="editRow.companyCode"></el-input></el-col>
            <el-col class="ml-sm" :span="2">分机</el-col>
            <el-col :span="8"><el-input disabled v-model="editRow.companyCode"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="邮编">
            <el-input disabled v-model="editRow.departmentCode"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row class="p-sm">
      <el-col align="right">
        <el-button @click="handlerCancel" size="small">
          取消
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
      roleList: [],
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
      let url = '/apis/users';
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