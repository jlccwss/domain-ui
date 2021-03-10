<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="修改备案编号">
      <el-form ref="form" :model="editRow" size="small" :rules="rules">
         <el-form-item prop="icpNo" label="备案编号">
            <el-input v-model="editRow.icpNo"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row class="p-sm">
      <el-col align="right">
        <el-button @click="handlerCancel" size="small">
          取消
        </el-button>
        <el-button @click="handlerSave" type="primary" size="small">
          修改
        </el-button>
      </el-col>
    </el-row>
    </div>    
  </div>
</template>

<script>
import $http from '@/http';

export default {
  props: ['editRow'],
  methods: {
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      this.$refs.form.validate(valid => {
          if (valid) {
            let url = '/apis/icp/' + this.editRow.id;
            $http.put(url, this.editRow).then(res => {
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
</style>