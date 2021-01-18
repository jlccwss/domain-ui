<template>
    <div>
       <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>审批管理</el-breadcrumb-item>
          <el-breadcrumb-item>审批管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          审批管理
        </el-col>
      </el-row>
     <el-table
      :data="list"
      class="mt-xs"
      style="width: 100%">
      <el-table-column
        prop="flowName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="类型">
        <template slot-scope="{ row }">
          {{flowTypes[row.flowType]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="flowName"
        width="400"
        label="审批流">
        <template slot-scope="{ row }">
          <el-steps :active="active" finish-status="success">
            <el-step :title="row.flowPath1"></el-step>
            <el-step :title="row.flowPath2"></el-step>
            <el-step :title="row.flowPath3"></el-step>
            <el-step :title="row.flowPath4"></el-step>
          </el-steps>

        </template>
      </el-table-column>
      <el-table-column
        label="完成状态">
        <template slot-scope="{ row }">
          {{finishStatus[row.finishStatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="detail"
        label="详情">
      </el-table-column>
      <el-table-column
        prop="flowOwner"
        label="所有人">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
    </el-table>
    <addAndEditPanel @close="close" v-if="addAndEdit" :editRow="editRow"></addAndEditPanel>
    </div>
</template>

<script>
import $http from '@/http';
import { flowTypes, finishStatus } from './const';

export default {
  data() {
    return {
      list: [],
      centerList: [],
      loading: false,
      editRow: {},
      addAndEdit: false,
      flowTypes: flowTypes,
      finishStatus: finishStatus
    };
  },
  mounted() {
    this.getList();
    console.log(finishStatus)
  },
  methods: {
    getList() {
      this.loading = true;
      const url = '/apis/approveList';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/groups/${rowId}`;
            $http.delete(url).then(() => {
              this.$notify.success({
                message: '删除成功'
              });
              this.getList();
            }, () => {
              this.$notify.error({
                message: '删除失败'
              });
            });
          });
    },
    close(refresh) {
      if (refresh) {
        this.getList();
      }
      this.addAndEdit = false;
    }
  }
};
</script>