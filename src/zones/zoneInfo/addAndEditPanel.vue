<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :model="editRow" size="small" :rules="rules">
         <el-form-item prop="rrName" label="记录名称">
            <el-input v-model="editRow.rrName"></el-input>
        </el-form-item>
        <el-form-item prop="defaultTtl" label="TTL">
          <el-row class="form-row">
          <el-col :span="20"><el-input-number :min="1" style="width: 100%" size="small" v-model="editRow.defaultTtl"></el-input-number></el-col>
          <el-col :span="4" class="pl-sm">分钟</el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="rrType" label="记录类型">
            <el-select style="width:100%" v-model="editRow.rrType">
              <el-option :key="type.id" :label="type.typeName" :value="type.typeName" v-for="type in typeList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="rrValue" label="记录值">
          <el-input-number style="width: 100%" size="small" v-model="editRow.rrValue"></el-input-number>
        </el-form-item>
        <el-form-item prop="dataCenter" label="数据中心">
            <el-select v-model="editRow.status" style="width:100%">
              <el-option :key="center.id" :label="center.dataCenter" :value="center.id" v-for="center in centerList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="des" label="备注">
            <el-input v-model="editRow.des"></el-input>
        </el-form-item>
        <el-form-item prop="enable" label="开启">
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
      typeList: [],
      rules: {
        rrName: [
           { required: true, message: '请输入记录名称', trigger: 'blur' },
        ],
        rrType: [
           { required: true, message: '请选择记录类型', trigger: 'blur' },
        ],
        rrValue: [
           { required: true, message: '请出入记录值', trigger: 'blur' },
        ],
        status: [
           { required: true, message: '请选择数据中心', trigger: 'blur' },
        ]
      }
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
      this.$refs.form.validate(valid => {
          if (valid) {
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