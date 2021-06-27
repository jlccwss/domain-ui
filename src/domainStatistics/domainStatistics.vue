  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名记录管理</el-breadcrumb-item>
          <el-breadcrumb-item>域名统计</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
     <el-form class="mt-xs" size="small" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="域名" label-width="40px">
            <el-input v-model="params.searchName" placeholder="请输入域名"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6" :offset="1">
          <el-form-item label="月份" label-width="40px">
            <el-date-picker
              class="w-full"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="params.time"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
         </el-col>
         <el-col :span="6" :offset="1" align="left">
          <el-button size="small" type="primary" @click="handlerQuery">查询</el-button>
          <el-button size="small" type="primary" @click="handlerExport">导出</el-button>
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
        prop="domain"
        label="域名地址">
      </el-table-column>
      <el-table-column
        prop="total"
        label="访问量">
      </el-table-column>
      <el-table-column
        label="开始时间">
        <template slot-scope="{ row }">
          {{row.beginTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间">
        <template slot-scope="{ row }">
          {{row.endTime | dateFormat}}
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
import { exportCsv } from '@/utils/export';
import dateFormat from '@/filter/dateFilter';

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
    handlerExport() {
      const url = `/apis/topn?pageNum=1&pageSize=999999`;
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          let list = res.data.data;
          if (list.length) {
            let data = list.map(item => {
              return [
                item.domain,
                item.total,
                dateFormat(item.beginTime),
                dateFormat(item.endTime)
              ];
            });
            data.unshift(['域名地址', '访问量', '开始时间', '结束时间']);
            exportCsv('域名统计导出数据', data);
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
    getList() {
      this.loading = true;
      const { currpage, pagesize } = this.pagination;
      let url = `/apis/topn?pageNum=${currpage}&pageSize=${pagesize}`;
      const { searchName, time } = this.params;
      if (searchName) {
        url += `&searchName=${searchName}`;
      }
      if (time) {
        url += `&time=${time}`;
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
    }
  }
};
</script>