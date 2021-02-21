<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form size="small" ref="form" :rules="rules" :model="editRow">
         <el-form-item prop="name" label="分组名称">
            <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item prop="des" label="描述">
            <el-input v-model="editRow.des"></el-input>
        </el-form-item>
        <el-form-item prop="centerId" label="数据中心">
            <el-select v-model="editRow.centerId" style="width:100%">
              <el-option :key="center.id" :label="center.dataCenter" :value="center.id" v-for="center in centerList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="appids" label="应用">
            <el-select style="width:100%" filterable v-model="editRow.appids" multiple>
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
           { required: true, message: '请输入分组名称', trigger: 'blur' },
        ],
        centerId: [
           { required: true, message: '请选择数据中心', trigger: 'blur' },
        ]
      }
    };
  },
  props: ['editRow'],
  mounted() {
    this.getCenterList();
    this.getAppList();
    if (this.editRow.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      const url = '/apis/groups/' + this.editRow.id;
      $http.get(url).then(res => {
        if (res.data) {
          this.editRow.appids = res.data.appids;
        }
      });
    },
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
            let url = '/apis/groups';
            let func = this.editRow.id ? $http.put : $http.post;
            if (this.editRow.id) {
              url += '/' + this.editRow.id;
            }
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