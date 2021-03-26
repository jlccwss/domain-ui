  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名注册管理</el-breadcrumb-item>
          <el-breadcrumb-item>域名管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          域名管理
        </el-col>
      </el-row>
     <el-table
      :data="list"
      v-loading="loading"
      max-height="700"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="域名">
      </el-table-column>
      <el-table-column
        prop="tldId"
        label="TLD">
      </el-table-column>
      <el-table-column
        prop="registrant"
        label="注册人">
      </el-table-column>
      <el-table-column
        prop="status"
        label="域名状态">
      </el-table-column>
      <el-table-column
        label="注册日期">
        <template slot-scope="{ row }">
          {{row.crdate | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="到期日期">
        <template slot-scope="{ row }">
          {{row.exdate | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        width="240"
        label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerChange(row)" type="text" size="small">修改所有者</el-button>
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
    <authorizationPanel @close="close" v-if="changeDialog" :editRow="editRow"></authorizationPanel>
    </div>
</template>

<script>
import $http from '@/http';
import authorizationPanel from './authorizationPanel.vue';

export default {
  components: {
    authorizationPanel
  },
  data() {
    return {
      list: [],
      centerList: [],
      loading: false,
      editRow: {},
      addAndEdit: false,
      changeDialog: false,
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
    handlerChange(row) {
      this.changeDialog = true;
      this.editRow = row;
    },
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
      const url = `/apis/domain/query?pageNum=${currpage}&pageSize=${pagesize}`;
      $http.post(url).then(res => {
        if (res.data.success) {
          this.list = res.data.data;
          this.pagination.total = res.data.TotalRowNum;
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
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {
        flowType: 1,
        status: 1
      };
    },
    handlerPay(row) {
      this.$confirm('是否确认购买证书', '购买证书')
          .then(() => {
            const url = '/apis/register/ssl';
            let data = {
              domainName: row.name,
              price: 66
            };
            $http.post(url, data).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  message: '购买成功'
                });
                this.getList();
              } else {
                this.$notify.error({
                  message: res.data.message
                });
              }
            }, () => {
              this.$notify.error({
                message: '购买失败'
              });
            });
          });
    },
    handlerRenew(row) {
      this.$confirm('是否确认续费', '续费')
          .then(() => {
            const url = '/apis/register/domain';
            let data = {
              domainName: row.name,
              price: 66
            };
            $http.post(url, data).then(res => {
              if (res.data.success) {
                this.$notify.success({
                  message: '续费成功'
                });
                this.getList();
              } else {
                this.$notify.error({
                  message: res.data.message
                });
              }
            }, () => {
              this.$notify.error({
                message: '续费失败'
              });
            });
          });
    },
    close(refresh) {
      if (refresh) {
        this.getList();
      }
      this.changeDialog = false;
    }
  }
};
</script>