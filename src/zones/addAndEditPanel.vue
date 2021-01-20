<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow">
         <el-form-item label="区名称">
            <el-input :disabled="!!editRow.id" v-model="editRow.zoneName"></el-input>
        </el-form-item>
        <el-form-item label="默认TTL">
          <el-row class="form-row">
            <el-col :span="20"><el-input-number min="1" style="width: 100%" size="small" v-model="editRow.defaultTtl"></el-input-number></el-col>
            <el-col :span="4" class="pl-sm">分钟</el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="视图名称">
            <el-select :disabled="!!editRow.id" style="width:100%" v-model="editRow.viewName">
              <el-option :key="view.id" :label="view.viewName" :value="view.viewName" v-for="view in viewList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注">
            <el-input
              v-model="editRow.des"
              type="textarea"
              rows="3"
              resize="none"></el-input>
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
      viewList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getViewList();
  },
  methods: {
    getViewList() {
      const url = '/apis/views';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.viewList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      const url = '/apis/zones';
      let func = this.editRow.id ? $http.put : $http.post;
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