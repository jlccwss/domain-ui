<template>
    <div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          分组列表
        </el-col>
        <el-col :span="20" align="right">
          <el-button @click="handlerAdd()" type="primary" size="small">
            创建
          </el-button>
        </el-col>
      </el-row>
     <el-table
      :data="list"
      class="mt-xs"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="分组名称">
      </el-table-column>
      <el-table-column
        prop="des"
        label="描述">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="数据中心">
        <template slot-scope="{ row }">
          <el-button @click="changeCenter(row.id, center)" :disabled="row.status===center.id" type="text" size="small" :key="center.id" v-for="center in centerList">{{center.dataCenter}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="Action">
        <template slot-scope="{ row }">
          <el-button @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
          <el-button @click="handlerDel(row.id)" type="text" size="small">删除</el-button>
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
    this.getList();
    this.getCenterList();
  },
  methods: {
    getList() {
      this.loading = true;
      const url = '/apis/groups';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    getCenterList() {
      const url = '/apis/datacenter/datas';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.centerList = res.data.data;
        }
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
      this.editRow = row;
    },
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {};
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
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