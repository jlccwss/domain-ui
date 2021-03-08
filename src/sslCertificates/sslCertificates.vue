<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名注册管理</el-breadcrumb-item>
          <el-breadcrumb-item>SSL证书</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          SSL证书
        </el-col>
        <!-- <el-col :span="20" align="right">
          <el-button @click="handlerAdd" type="primary" size="small">
            创建
          </el-button>
        </el-col> -->
      </el-row>
     <el-table
      :data="list"
      v-loading="loading"
      max-height="700"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="certType"
        label="证书">
      </el-table-column>
      <el-table-column
        prop="certBrand"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="commonName"
        label="绑定域名">
      </el-table-column>
      <el-table-column
        prop="period"
        label="有效期">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerDown(row.certificateUrl)" type="text" size="small">下载</el-button>
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
    getList() {
      this.loading = true;
      const { currpage, pagesize } = this.pagination;
      const url = `/apis/ssls/list?pageNum=${currpage}&pageSize=${pagesize}`;
      $http.get(url).then(res => {
        if (res.data.success) {
          this.list = res.data.data;
          this.pagination.total = res.data.totalRowNum;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handlerDown(url) {
      window.open('/apis' + url);
    }
  }
};
</script>