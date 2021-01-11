<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow">
         <el-form-item label="记录名称">
            <el-input v-model="editRow.rrName"></el-input>
        </el-form-item>
        <el-form-item label="TTL">
          <el-input-number style="width: 100%" size="small" v-model="editRow.rrTtl"></el-input-number>
        </el-form-item>
        <el-form-item label="记录类型">
            <el-select style="width:100%" v-model="editRow.rrType">
              <el-option :key="type.id" :label="type.typeName" :value="type.typeName" v-for="type in typeList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="记录值">
          <el-input-number style="width: 100%" size="small" v-model="editRow.rrValue"></el-input-number>
        </el-form-item>
        <el-form-item label="数据中心">
            <el-select v-model="editRow.status" style="width:100%">
              <el-option :key="center.id" :label="center.dataCenter" :value="center.id" v-for="center in centerList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="注释">
            <el-input v-model="editRow.zoneName"></el-input>
        </el-form-item>
        <el-form-item label="开启">
            <el-switch
              v-model="editRow.enable"
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
      viewList: [],
      centerList: [],
      typeList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getTypeList();
    this.getCenterList();
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
    getTypeList() {
      const url = '/apis/types';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.typeList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      const zoneId = this.$route.params.zoneId;
      const url = '/apis/zones/' + zoneId + '/rrs';
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