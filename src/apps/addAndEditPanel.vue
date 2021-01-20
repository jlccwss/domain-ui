<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :rules="rules" :model="editRow" size="small">
         <el-form-item label="应用名称" prop="name">
            <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="des">
            <el-input v-model="editRow.des"></el-input>
        </el-form-item>
        <el-form-item label="数据中心" prop="status">
            <el-select :disabled="!!editRow.id" v-model="editRow.status" style="width:100%">
              <el-option :key="center.id" :label="center.dataCenter" :value="center.id" v-for="center in centerList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="记录" prop="appids">
            <el-select style="width:100%" v-model="editRow.appids" multiple>
              <el-option :key="app.id" :label="app.name + '('+ app.centerName + ')'" :value="app.id" v-for="app in appList"></el-option>
            </el-select>
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
      form: {},
      centerList: [],
      appList: [],
      rules: {
        name: [
           { required: true, message: '请输入应用名称', trigger: 'blur' },
        ],
        status: [
           { required: true, message: '请选择数据中心', trigger: 'blur' },
        ]
      }
    };
  },
  props: ['editRow'],
  mounted() {
    this.getCenterList();
    this.getAppList();
  },
  methods: {
    getCenterList() {
      const url = '/apis/datacenter/datas';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.centerList = res.data.data;
        }
      });
    },
    getAppList() {
      const url = '/apis/apps';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.appList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      this.$refs.form.validate(valid => {
          if (valid) {
            const url = '/apis/apps';
            let func = this.editRow.id ? $http.put : $http.post;
            func(url, this.editRow).then(() => {
              this.$emit('close', true);
            });
          }
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