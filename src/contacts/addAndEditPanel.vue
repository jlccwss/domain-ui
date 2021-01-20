<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow" :rules="rules">
         <el-form-item label="模板名称" prop="userName">
            <el-input v-model="editRow.userName"></el-input>
        </el-form-item>
        <el-form-item label="注册类型">
            <el-select style="width:100%" v-model="editRow.role">
              <el-option :key="role.id" :label="role.name" :value="role.role" v-for="role in roleList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="整件类型">
            <el-select style="width:100%" v-model="editRow.role">
              <el-option :key="role.id" :label="role.name" :value="role.role" v-for="role in roleList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名(中文)">
            <el-input v-model="editRow.gender"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名(英文)">
            <el-input v-model="editRow.employeeCode"></el-input>
        </el-form-item>
        <el-form-item label="联系人整件号码">
            <el-input v-model="editRow.employeeFirstName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="editRow.employeeLastName"></el-input>
        </el-form-item>
        <el-form-item label="省份城市">
            <el-input v-model="editRow.mobileTelephone"></el-input>
        </el-form-item>
        <el-form-item label="地址(中文)">
            <el-input v-model="editRow.officeTelephone"></el-input>
        </el-form-item>
        <el-form-item label="地址(英文)">
            <el-input v-model="editRow.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-row class="form-row">
            <el-col :span="13"><el-input v-model="editRow.companyCode"></el-input></el-col>
            <el-col class="ml-sm" :span="2">分机</el-col>
            <el-col :span="8"><el-input v-model="editRow.companyCode"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="传真">
          <el-row class="form-row">
            <el-col :span="13"><el-input v-model="editRow.companyCode"></el-input></el-col>
            <el-col class="ml-sm" :span="2">分机</el-col>
            <el-col :span="8"><el-input v-model="editRow.companyCode"></el-input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="邮编">
            <el-input v-model="editRow.departmentCode"></el-input>
        </el-form-item>
        <el-form-item label="上传实名资料">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
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
      roleList: [],
      rules: {
        userName: [
           { required: true, message: '请输入模板名称', trigger: 'blur' },
        ]
      }
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