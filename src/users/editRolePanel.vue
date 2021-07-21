<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form">
         <div class="mt-md" :key="role.id" v-for="role in roleList">
            <el-checkbox v-model="selectRole" :label="role.id">{{role.name}}</el-checkbox>
        </div>
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
      selectRole: [],
      roleList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getRoleList();
    this.getSelectRole();
  },
  methods: {
    getSelectRole() {
      const url = '/apis/roles/' + this.editRow.id;
      $http.get(url).then(res => {
        if (res.data.admin === 'admin') {
          this.selectRole = ['1'];
        } else {
          this.selectRole = res.data.roleid || [];
        }
      });
    },
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
      let url = '/apis/roles';
      let data = {
        uid: this.editRow.id,
        roleid: this.selectRole,
        admin: this.selectRole.includes('1') ? 'admin' : ''
      };
      $http.post(url, data).then(() => {
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