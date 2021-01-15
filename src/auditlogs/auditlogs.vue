<template>
    <div>
       <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          操作日志
        </el-col>
      </el-row>
     <el-table
      :data="list"
      :max-height="900"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="User name">
      </el-table-column>
      <el-table-column
        prop="sourceIp"
        label="Source ip">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="Detail">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="Create time">
      </el-table-column>
      <el-table-column
        prop="Action"
        label="Action">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      list: [],
      loading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const url = '/apis/auditlogs';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    }
  }
};
</script>
<style scoped lang="scss">

</style>