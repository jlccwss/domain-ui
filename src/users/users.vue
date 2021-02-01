<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          账号管理
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
        label="用户名">
        <template slot-scope="{ row }">
          <el-popover
            placement="top"
            width="160"
            trigger="hover">
            <p>
              <span>用户名：{{row.userName}}</span><br />
              <span>角色：{{rulesMap[row.role]}}</span><br />
              <span>性别：{{row.gender}}</span><br />
              <span>员工编号：{{row.employeeCode}}</span><br />
              <span>员工姓：{{row.employeeFirstName}}</span><br />
              <span>员工名：{{row.employeeLastName}}</span><br />
              <span>移动电话：{{row.mobileTelephone}}</span><br />
              <span>办公电话：{{row.officeTelephone}}</span><br />
              <span>邮箱：{{row.email}}</span><br />
              <span>公司编号：{{row.companyCode}}</span><br />
              <span>公司名称：{{row.companyName}}</span><br />
              <span>部门编号：{{row.departmentCode}}</span><br />
              <span>部门名称：{{row.departmentName}}</span><br />
              <span>职位编号：{{row.positionCode}}</span><br />
              <span>职位名称：{{row.positionName}}</span>
            </p>
            <span slot="reference">
              <el-button type="text" size="small">{{row.userName}}</el-button>
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="{ row }">{{rulesMap[row.role]}}</template>
      </el-table-column>
      <!-- <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="employeeCode"
        label="员工编号">
      </el-table-column> -->
      <el-table-column
        prop="employeeFirstName"
        label="员工姓">
      </el-table-column>
      <el-table-column
        prop="employeeLastName"
        label="员工名">
      </el-table-column>
      <el-table-column
        prop="mobileTelephone"
        label="移动电话">
      </el-table-column>
      <!-- <el-table-column
        prop="officeTelephone"
        label="办公电话">
      </el-table-column> -->
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <!-- <el-table-column
        prop="companyCode"
        label="公司编号">
      </el-table-column> -->
      <el-table-column
        prop="companyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="departmentCode"
        label="部门编号">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门名称">
      </el-table-column>
      <!-- <el-table-column
        prop="positionCode"
        label="职位编号">
      </el-table-column> -->
      <el-table-column
        prop="positionName"
        label="职位名称">
      </el-table-column>
      <el-table-column
        width="120"
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column width="120" label="操作">
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
import { rulesMap } from './const';
import addAndEditPanel from './addAndEditPanel.vue';

export default {
  components: {
    addAndEditPanel
  },
  data() {
    return {
      list: [],
      loading: false,
      rulesMap: rulesMap,
      editRow: {},
      addAndEdit: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handlerAdd() {
      this.addAndEdit = true;
      this.editRow = {};
    },
    handlerEdit(row) {
      this.addAndEdit = true;
      this.editRow = row;
    },
    getList() {
      this.loading = true;
      const url = '/apis/users';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      })
    },
    handlerDel(rowId) {
      this.$confirm('删除后不可恢复', '确认要删除这条信息吗？')
          .then(() => {
            const url = `/apis/users/${rowId}`;
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
<style scoped lang="scss">

</style>