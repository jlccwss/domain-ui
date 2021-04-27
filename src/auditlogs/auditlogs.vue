<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>操作日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="mt-xs" size="small" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="操作时间：" label-width="90px">
            <el-date-picker
              v-model="params.date"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary" @click="handlerSearch">查询</el-button>
         </el-col>
       </el-row>
    </el-form>
     <el-table
      :data="list"
      class="mt-xs"
      max-height="700"
      v-loading="loading"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="sourceIp"
        label="源IP">
      </el-table-column>
      <el-table-column
        prop="Action"
        label="动作">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="result"
        label="操作结果">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-popover
            placement="top"
            width="160"
            trigger="hover">
            <p>{{row.detail}}</p>
            <el-button type="text" slot="reference">详情</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination-con">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currpage"
        :page-size="pagination.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </el-row>
    </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      params: {},
      list: [],
      loading: false,
      pagination: {
        currpage: 1,
        pagesize: 10
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handlerSearch() {
      this.pagination.currpage = 1;
      this.getList();
    },
    handleCurrentChange(pageNum) {
      this.pagination.currpage = pageNum;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.pagination.pagesize = pageSize;
      this.getList();
    },
    getList() {
      this.loading = true;
      const { currpage, pagesize } = this.pagination;
      let url = `/apis/auditlogs?pageNum=${currpage}&pageSize=${pagesize}`;
      if (this.params.date) {
        let date = this.params.date;
        url += `&begin=${date[0]}&end=${date[1]}`;
      }
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
          this.pagination.total = res.data.total;
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