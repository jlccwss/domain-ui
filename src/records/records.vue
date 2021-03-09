  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          备案管理
        </el-col>
        <el-col :span="20" align="right">
          <el-button type="primary" size="small" @click="handlerAdd">
            申请备案
          </el-button>
        </el-col>
      </el-row>
     <!-- <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="审核状态">
            <el-select class="w-full" placeholder="请选择审核状态">
              <el-option label="状态1" value="1"></el-option>
              <el-option label="状态2" value="2"></el-option>
            </el-select>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="主办单位名称">
            <el-input placeholder="主办单位名称"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary">查询</el-button>
         </el-col>
       </el-row>
    </el-form> -->
     <el-table
      :data="list"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="flowName"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="主办单位名称">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="主办单位性质">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="投资人或主管单位">
      </el-table-column>
      <el-table-column
        label="主体负责人">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="网站名称">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="网站域名">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="审核状态">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="isAdmin" @click="handlerEdit(row.id)" type="text" size="small">编辑</el-button>
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
    </div>
</template>

<script>
import $http from '@/http';

export default {
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
      const url = '/apis/icps';
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
    handlerEdit(id) {
      this.$router.push({
        path: 'records/' + id
      });
    },
    handlerAdd() {
      this.$router.push({
        path: 'records/add'
      });
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/icp/${rowId}`;
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