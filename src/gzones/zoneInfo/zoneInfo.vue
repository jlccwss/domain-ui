<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>DNS管理</el-breadcrumb-item>
          <el-breadcrumb-item>广域网</el-breadcrumb-item>
          <el-breadcrumb-item>{{detail.zoneName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          记录
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
      header-cell-class-name="table-head"
      style="width: 100%">
      <el-table-column
        prop="rrName"
        label="记录名称">
      </el-table-column>
      <el-table-column
        prop="viewName"
        label="视图名称">
      </el-table-column>
      <el-table-column
        prop="rrTtl"
        label="TTL（分钟）">
      </el-table-column>
      <el-table-column
        prop="des"
        label="备注">
      </el-table-column>
      <el-table-column
        label="是否启用">
        <template slot-scope="{ row }">
          <span :class="{enable: row.enable === 1, disbale: row.enable === 0}">{{enableMap[row.enable]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="centerName"
        label="数据中心">
      </el-table-column>
      <el-table-column
        label="审批状态">
        <template slot-scope="{ row }">
          {{approveStatus[row.approveStatus]}}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column width="140" label="操作">
        <template slot-scope="{ row }">
          <el-button @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addAndEditPanel :zoneName="detail.zoneName" @close="close" v-if="addAndEdit" :editRow="editRow"></addAndEditPanel>
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
      loading: false,
      editRow: {},
      detail: {},
      addAndEdit: false,
      zoneId: '',
      enableMap: {1: '启用', 0: '未启用'},
      approveStatus: {
        0: '未审核',
        1: '已通过',
        2: '已拒绝',
      }
    };
  },
  mounted() {
    this.zoneId = this.$route.params.zoneId;
    this.getList();
    this.getDetail();
  },
  methods: {
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {
        enable: 1
      };
    },
    handlerEdit(row) {
      this.addAndEdit = true;
      this.editRow = row;
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/zones/${this.zoneId}/rrs/${rowId}`;
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
    getDetail() {
      const url = '/apis/zones/' + this.zoneId;
      $http.get(url).then(res => {
        if (res.data) {
          this.detail = res.data;
        }
      })
    },
    getList() {
      this.loading = true;
      const url = '/apis/zones/' + this.zoneId + '/rrs';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
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
  color: blue;
}

.disbale {
  color: red;
}
</style>