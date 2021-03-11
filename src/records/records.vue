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
      v-loading="loading"
      max-height="700"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="domain"
        label="备案域名">
      </el-table-column>
      <el-table-column
        label="备案提交时间">
        <template slot-scope="{ row }">
          <span :class="{enable: row.enable === 1, disbale: row.enable === 2}">{{row.createTime | dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="wangzhanTel"
        label="负责人手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        label="联系邮箱">
      </el-table-column>
      <el-table-column
        label="审核状态">
        <template slot-scope="{ row }">
          {{approveMap[row.approveStatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="icpNo"
        label="备案编号">
      </el-table-column>
      <el-table-column
        width="220"
        label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="isAdmin" @click="handlerUpdate(row)" type="text" size="small">修改备案号</el-button>
          <el-button @click="handlerEdit(row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
          <el-button @click="handlerView(row.id)" type="text" size="small">查看</el-button>
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
import { getUser } from '@/user';

export default {
  data() {
    return {
      list: [],
      isAdmin: false,
      loading: false,
      pagination: {
        currpage: 1,
        pagesize: 10
      },
      approveMap: {
        0: '未审核',
        1: '通过',
        2: '驳回'
      }
    };
  },
  mounted() {
    let user = getUser();
    this.isAdmin = user.role === 'admin';
    this.getList();
  },
  methods: {
    handlerUpdate(row) {
      this.addAndEdit = true;
      this.editRow = { ...row };
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
      const url = `/apis/icps?pageNum=${currpage}&pageSize=${pagesize}`;
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
    handlerView(id) {
      this.$router.push({
        path: 'records/' + id,
        query: {
          view: true
        }
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
    }
  }
};
</script>
<style scoped lang="scss">
.enable {
  color: green;
}

.disbale {
  color: red;
}
</style>