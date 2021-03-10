  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名记录管理</el-breadcrumb-item>
          <el-breadcrumb-item>域名统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          域名统计
        </el-col>
      </el-row>
     <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="域名">
            <el-input v-model="params.searchName" placeholder="请输入域名"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="月份">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="params.time"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary" @click="handlerQuery">查询</el-button>
         </el-col>
       </el-row>
    </el-form>
     <el-table
      :data="list"
      v-loading="loading"
      max-height="700"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="域名地址">
      </el-table-column>
      <el-table-column
        prop="tld"
        label="访问量">
      </el-table-column>
      <el-table-column
        label="开始时间">
        <template slot-scope="{ row }">
          {{row.crdate | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间">
        <template slot-scope="{ row }">
          {{row.crdate | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerRenew(row)" type="text" size="small">域名续费</el-button>
          <el-button @click="handlerPay(row)" type="text" size="small">购买证书</el-button>
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
      params: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handlerQuery() {
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
      let url = `/apis/topn?pageNum=${currpage}&pageSize=${pagesize}`;
      const { searchName, time } = this.params;
      if (searchName) {
        url += `&searchName=${searchName}`;
      }
      console.log(time)
      if (time) {
        url += `&time=${time}`;
      }
      $http.get(url).then(res => {
        if (res.data.success) {
          this.list = res.data.data;
          this.pagination.total = res.data.totalRowNum;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  }
};
</script>