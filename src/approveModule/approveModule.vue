<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>审批管理</el-breadcrumb-item>
          <el-breadcrumb-item>审批模板</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          <!-- 审批模板 -->
        </el-col>
        <el-col :span="20" align="right">
          <el-button @click="handlerAdd" type="primary" size="small">
            创建
          </el-button>
        </el-col>
      </el-row>
     <el-table
      :data="list"
      class="mt-xs"
      v-loading="loading"
      max-height="700"
      style="width: 100%">
      <el-table-column
        prop="flowName"
        label="模板名称">
      </el-table-column>
      <el-table-column
        label="启用状态">
        <template slot-scope="{ row }">
          <span :class="{enable: row.status === 1, disbale: row.status === 0}">{{row.status === 1 ? '开启' : '关闭'}}</span>
        </template>
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
      const { currpage, pagesize } = this.pagination;
      const url = `/apis/approveModule?pageNum=${currpage}&pageSize=${pagesize}`;
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
    changeCenter(rowId, center) {
      this.$confirm('是否切换到 '+ center.dataCenter +' 数据中心?', '切换数据中心')
          .then(() => {
            const url = `/apis/groups/${rowId}/switch/${center.id}`;
            $http.post(url).then(() => {
              this.$notify.success({
                message: '数据中心切换成功'
              });
              this.getList();
            }, () => {
              this.$notify.error({
                message: '数据中心切换失败!'
              });
            });
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
        status: 1,
        // flowPath1: [],
        // flowPath2: [],
        // flowPath3: [],
        // flowPath4: []
      };
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/approveModule/${rowId}`;
            $http.delete(url).then(res => {
              if (res.data.status) {
                this.$notify.error({
                  message: res.data.msg
                });
              } else {
                this.$notify.success({
                  message: '删除成功'
                });
              }
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
<style scoped lang="scss">
.enable {
  color: green;
}

.disbale {
  color: red;
}
</style>