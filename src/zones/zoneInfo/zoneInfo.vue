<template>
    <div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          区管理
        </el-col>
        <el-col :span="20" align="right">
          <el-button @click="handlerAdd" type="primary" size="small">
            创建
          </el-button>
        </el-col>
      </el-row>
     <el-table
      :data="list"
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
        label="TTL">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column width="140">
        <template slot-scope="{ row }">
          <el-button @click="handlerEdit(row)" type="text" size="small">编辑</el-button>
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
      loading: false,
      editRow: {},
      addAndEdit: false,
      zoneId: ''
    };
  },
  mounted() {
    this.zoneId = this.$route.params.zoneId;
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
      const url = '/apis/zones/' + this.zoneId + '/rrs';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      })
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