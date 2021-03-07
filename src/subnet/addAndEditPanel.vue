<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :rules="rules" :model="editRow" size="small">
        <el-form-item label="子网名称" prop="name">
            <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item label="子网地址" prop="subnet">
            <el-input :disabled="!!editRow.id" v-model="editRow.subnet"></el-input>
            <div class="tip">示例:192.168.1.0/24</div>
        </el-form-item>
        <el-form-item label="ip类型" prop="version">
          <div class="form-row">
            <el-radio v-model="editRow.version" :label="4">IPv4</el-radio>
            <el-radio v-model="editRow.version" :label="6">IPv6</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="使用率" prop="useRate">
            <el-input v-model="editRow.useRate"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="company">
            <el-input v-model="editRow.company"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="partment">
            <el-input v-model="editRow.partment"></el-input>
        </el-form-item>
        <el-form-item label="责任人(填工号)" prop="manager">
            <el-input v-model="editRow.manager"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="des">
            <el-input v-model="editRow.des"></el-input>
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
      rules: {
        subnet: [
           { required: true, message: '请输入子网地址', trigger: 'blur' },
        ],
        name: [
           { required: true, message: '请输入子网名称', trigger: 'blur' },
        ]
      }
    };
  },
  props: ['editRow'],
  methods: {
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      this.$refs.form.validate(valid => {
          if (valid) {
            let url = '/apis/subnets';
            let func = this.editRow.id ? $http.put : $http.post;
            if (this.editRow.id) {
              url += '/' + this.editRow.id;
            }
            func(url, this.editRow).then(res => {
              if (res.data.status) {
                this.$notify.error({
                  message: res.data.msg
                });
              } else {
                this.$emit('close', true);
              }
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

.tip {
  color: #F56C6C;
}
</style>