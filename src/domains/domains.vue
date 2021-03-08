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
        <!-- <el-col :span="20" align="right">
          <el-button @click="handlerAdd()" type="primary" size="small">
            注册
          </el-button>
        </el-col> -->
      </el-row>
     <!-- <el-form class="mt-xs" size="small" label-width="120px" label-position="right"> -->
       <!-- <el-row> -->
         <!-- <el-col :span="6">
          <el-form-item label="域名">
            <el-input ></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
           <el-button size="small" @click="handlerQuery">查询</el-button>
           <el-button size="small">导出</el-button>
           <el-button size="small">批量下载证书</el-button>
         </el-col> -->
         <!-- <el-col :span="6">
          <el-form-item label="TLD">
            <el-select class="w-full">
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="实名审核状态">
            <el-select class="w-full">
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </el-form-item>
         </el-col> -->
       <!-- </el-row> -->
       <!-- <el-row>
         <el-col :span="12">
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              class="w-full"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
         </el-col>
         <el-col :span="12">
          <el-form-item label="到期时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              class="w-full"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
         </el-col>
       </el-row> -->
    <!-- </el-form> -->
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
        prop="tld"
        label="TLD">
      </el-table-column>
      <el-table-column
        prop="registrantName"
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
      centerList: [],
      loading: false,
      editRow: {},
      addAndEdit: false,
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
          this.pagination.total = res.data.totalRowNum;
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
      this.addAndEdit = false;
    }
  }
};
</script>