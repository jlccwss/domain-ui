  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>网站信息表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          网站信息表
        </el-col>
        <el-col :span="20" align="right">
          <el-button type="primary" size="small">
            添加网站
          </el-button>
        </el-col>
      </el-row>
     <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
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
          <el-form-item label="备案/许可证号">
            <el-input placeholder="备案/许可证号"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="网站域名">
            <el-input placeholder="网站域名"></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-button size="small" type="primary">查询</el-button>
         </el-col>
       </el-row>
    </el-form>
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
        label="备案/许可证号">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="网站名称">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="网站域名">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="网站首页地址">
      </el-table-column>
      <el-table-column
        label="更新时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerRenew(row.id)" type="text" size="small">续费</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      addAndEdit: false
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const url = '/apis/domains';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
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
    handlerRenew(rowId) {
      this.$confirm('续费', '续费')
          .then(() => {
            const url = `/apis/groups/${rowId}`;
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