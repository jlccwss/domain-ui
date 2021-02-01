  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>公网域名</el-breadcrumb-item>
          <el-breadcrumb-item>域名注册</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          域名管理
        </el-col>
        <el-col :span="20" align="right">
          <el-button @click="handlerAdd()" type="primary" size="small">
            注册
          </el-button>
        </el-col>
      </el-row>
     <el-form class="mt-xs" size="small" label-width="120px" label-position="right">
       <el-row>
         <el-col :span="6">
          <el-form-item label="域名">
            <el-input ></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
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
         </el-col>
       </el-row>
       <el-row>
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
       </el-row>
       <el-row class="align-left">
         <el-button size="small">查询</el-button>
         <el-button size="small">导出</el-button>
         <el-button size="small">批量下载证书</el-button>
       </el-row>
    </el-form>
     <el-table
      :data="list"
      class="mt-xs"
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="flowName"
        label="域名">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="TLD">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="注册人">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="域名状态">
      </el-table-column>
      <el-table-column
        label="注册日期">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="到期日期">
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