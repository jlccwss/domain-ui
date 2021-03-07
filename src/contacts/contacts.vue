<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>联系人模板</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          联系人模板
        </el-col>
        <!-- <el-col :span="20" align="right">
          <el-button @click="handlerAdd" type="primary" size="small">
            新建模板
          </el-button>
        </el-col> -->
      </el-row>
      <!-- <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="模板名称">
            <el-input v-model="queryParams.tplName" placeholder="请输入关键字"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="实名状态">
            <el-select class="w-full" placeholder="请选择实名状态">
              <el-option label="状态1" value="1"></el-option>
              <el-option label="状态2" value="2"></el-option>
            </el-select>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary">查询</el-button>
          <el-button size="small">清空</el-button>
         </el-col>
       </el-row>
    </el-form> -->
     <el-table
      :data="list"
      class="mt-xs"
      v-loading="loading"
      max-height="700"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="模板名称">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="实名状态">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerView(row)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
          <el-button @click="handlerAuth(row.id)" type="text" size="small">授权</el-button> -->
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
    </div>
</template>

<script>
import $http from '@/http';
import { rulesMap } from './const';
import addAndEditPanel from './addAndEditPanel.vue';

export default {
  components: {
    addAndEditPanel
  },
  data() {
    return {
      list: [],
      loading: false,
      rulesMap: rulesMap,
      editRow: {},
      addAndEdit: false,
      queryParams: {
        tplName: ''
      },
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
      this.editRow = {};
    },
    handlerView(row) {
      this.addAndEdit = true;
      this.editRow = { ...row };
    },
    getList() {
      this.loading = true;
      const { currpage, pagesize } = this.pagination;
      const url = `/apis/users?pageNum=${currpage}&pageSize=${pagesize}`;
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
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/users/${rowId}`;
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
    handlerAuth(rowId) {
      this.$confirm('确认授权吗', '授权')
          .then(() => {
            const url = `/apis/users/${rowId}`;
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
<style scoped lang="scss">

</style>