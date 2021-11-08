<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名记录管理</el-breadcrumb-item>
          <el-breadcrumb-item>广域网</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
      <el-row>
        <el-col :span="6">
          <!-- 广域网 -->
          <el-form-item label="文本框" label-width="70px">
            <el-input @keyup.enter.native="handlerSearch" v-model="params.search" placeholder="文本框"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" align="left" :offset="1">
          <el-button size="small" type="primary" @click="handlerSearch">查询</el-button>
          <el-button v-if="isAdmin" @click="handlerAdd" type="primary" size="small">
            创建
          </el-button>
        </el-col>
      </el-row>
      </el-form>
     <el-table
      class="mt-xs"
      :data="list"
      header-cell-class-name="table-head"
      v-loading="loading"
      max-height="700"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="区名称">
        <template slot-scope="{ row }">
          <a href="javascript: void(0)" @click="go(row.id)">{{row.zoneName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="viewName"
        label="视图名称">
      </el-table-column>
      <el-table-column
        prop="defaultTtl"
        label="默认TTL">
      </el-table-column>
      <el-table-column
        prop="total"
        label="记录数">
      </el-table-column>
      <el-table-column
        prop="des"
        label="备注">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column width="220" label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="isAdmin" @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerExport(row)" type="text" size="small">导出</el-button>
          <el-button v-if="isAdmin" @click="handlerChange(row)" type="text" size="small">修改所有者</el-button>
          <el-button v-if="isAdmin" @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
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
    <addAndEditPanel @close="close" v-if="addAndEdit" :editRow="editRow"></addAndEditPanel>
    <authorizationPanel @close="close" v-if="changeDialog" :editRow="editRow"></authorizationPanel>
    </div>
</template>

<script>
import $http from '@/http';
import { exportCsv } from '@/utils/export';
import addAndEditPanel from './addAndEditPanel.vue';
import authorizationPanel from './authorizationPanel.vue';
import { getUser } from '@/user';
import dateFormat from '@/filter/dateFilter';

export default {
  components: {
    addAndEditPanel,
    authorizationPanel
  },
  data() {
    return {
      list: [],
      params: {},
      loading: false,
      editRow: {},
      addAndEdit: false,
      changeDialog: false,
      isAdmin: false,
      enableMap: {1: '启用', 0: '未启用'},
      pagination: {
        currpage: 1,
        pagesize: 10
      },
      approveStatus: {
        0: '未审核',
        1: '已通过',
        2: '已拒绝',
      }
    };
  },
  mounted() {
    this.getList();
    let user = getUser();
    this.isAdmin = user.admin === 'admin';
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
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {
        defaultTtl: 10,
        type: 2
      };
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/zones/${rowId}`;
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
    handlerEdit(row) {
      this.addAndEdit = true;
      this.editRow = { ...row };
    },
    handlerExport(row) {
      const url = '/apis/zones/' + row.id + '/rrs';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          let list = res.data.data;
          if (list.length) {
            let data = list.map(item => {
              return [
                item.rrName,
                item.viewName,
                item.rrTtl,
                item.des,
                this.enableMap[item.enable],
                item.centerName,
                this.approveStatus[item.approveStatus],
                dateFormat(item.createTime)
              ];
            });
            data.unshift(['记录名称', '视图名称', 'TTL（分钟）', '备注', '是否启用', '数据中心', '审批状态', '创建时间']);
            exportCsv(row.zoneName, data);
          } else {
            this.$notify.warning({
              message: '没有记录'
            });
          }
        } else {
          this.$notify.warning({
            message: '导出失败'
          });
        }
      });
    },
    handlerChange(row) {
      this.changeDialog = true;
      this.editRow = { ...row };
    },
    go(id) {
      this.$router.push({
        path: 'gzones/' + id
      });
    },
    getList() {
      this.loading = true;
      const { currpage, pagesize } = this.pagination;
      let url = `/apis/zones?type=2&pageNum=${currpage}&pageSize=${pagesize}`;
      const { search } = this.params;
      if (search) {
        url += `&searchName=${search}`;
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
    },
    close(refresh) {
      if (refresh) {
        this.getList();
      }
      this.addAndEdit = false;
      this.changeDialog = false;
    }
  }
};
</script>
<style scoped lang="scss">

</style>