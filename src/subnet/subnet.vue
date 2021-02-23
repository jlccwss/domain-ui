<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>IP管理</el-breadcrumb-item>
          <el-breadcrumb-item>子网上报</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          子网上报
        </el-col>
        <el-col :span="20" align="right">
          <el-button @click="handlerAdd()" type="primary" size="small">
            创建
          </el-button>
        </el-col>
      </el-row>
      <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="子网">
            <el-input v-model="params.searchSubnet" placeholder="子网"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary" @click="handlerSearch">查询</el-button>
         </el-col>
       </el-row>
    </el-form>
     <el-table
      :data="list"
      v-loading="loading"
      max-height="700"
      class="mt-xs"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="subnet"
        label="子网">
      </el-table-column>
      <el-table-column
        prop="useRate"
        label="使用率">
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="partment"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="manager"
        label="责任人">
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
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
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
import addAndEditPanel from './addAndEditPanel.vue';

export default {
  components: {
    addAndEditPanel
  },
  data() {
    return {
      list: [],
      loading: false,
      editRow: {},
      addAndEdit: false,
      centerList: [],
      pagination: {
        currpage: 1,
        pagesize: 10
      },
      params: {}
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
      const { searchSubnet } = this.params;
      let url = `/apis/subnets?pageNum=${currpage}&pageSize=${pagesize}`;
      if (searchSubnet) {
        url += `&searchSubnet=${searchSubnet}`;
      }
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
          this.pagination.total = res.data.total;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handlerEdit(row) {
      this.addAndEdit = true;
      this.editRow = { ...row };
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/subnets/${rowId}`;
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
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {
        version: 4
      };
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