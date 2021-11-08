<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
      <el-form ref="form" :rules="rules" :model="editRow" size="small">
         <el-form-item label="应用名称" prop="name">
            <el-input v-model="editRow.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="des">
            <el-input v-model="editRow.des"></el-input>
        </el-form-item>
        <el-form-item label="数据中心" prop="centerId">
            <el-select :disabled="!!editRow.id" v-model="editRow.centerId" class="w-full">
              <el-option :key="center.id" :label="center.dataCenter" :value="center.id" v-for="center in centerList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="记录" prop="rrids">
           <el-table :data="selectRRList">
             <el-table-column label="名称">
              <template slot-scope="{ row }">
                {{row.rrName}}({{row.centerName}})
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button @click="handleDel(row)" type="text">删除</el-button>
              </template>
            </el-table-column>
           </el-table>
           <el-input placeholder="请输入内容" v-model="search" class="input-with-select mt-xs">
            <!-- <el-select v-model="type" slot="prepend" placeholder="请选择">
              <el-option label="互联网" value="1"></el-option>
              <el-option label="广域网" value="2"></el-option>
            </el-select> -->
            <el-button slot="append" @click="handlerSearch" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
        <el-table v-loading="loading" :data="rrlist" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="{ row }">
              {{row.rrName}}({{row.centerName}})
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currpage"
          :page-size="pagination.pagesize"
          :total="pagination.total">
        </el-pagination>
        <el-row style="text-align:right">
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-row class="p-sm">
      <el-col align="right">
        <el-button @click="handlerCancel" size="small">
          取消
        </el-button>
        <el-button @click="handlerSave" type="primary" size="small">
          提交
        </el-button>
      </el-col>
    </el-row>
    </div>    
  </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      loading: false,
      selectRRList: [],
      multipleSelection: [],
      search: '',
      form: {},
      centerList: [],
      pagination: { currpage: 1, pagesize: 10 },
      appList: [],
      rrlist: [],
      type: '2',
      rules: {
        name: [
           { required: true, message: '请输入应用名称', trigger: 'blur' },
        ],
        centerId: [
           { required: true, message: '请选择数据中心', trigger: 'blur' },
        ]
      }
    };
  },
  props: ['editRow'],
  mounted() {
    this.getCenterList();
    // this.getAppList();
    if (this.editRow.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      const url = '/apis/apps/' + this.editRow.id;
      $http.get(url).then(res => {
        if (res.data) {
          // this.editRow.rrids = res.data.rrids;
          this.getRRData(res.data.rrids);
        }
      });
    },
    getRRData(rrids) {
      if (!rrids || !rrids.length) {
        return;
      }
      let promiseList = [];
      rrids.forEach(rrid => {
        let url = '/apis/rrs/' + rrid;
        promiseList.push($http.get(url));
      });

      Promise.all(promiseList).then(resList => {
        this.selectRRList = resList.filter(res => {
          return res.status === 200;
        }).map(res => {
          return res.data;
        });
      });
    },
    handleDel(row) {
      this.selectRRList = this.selectRRList.filter(item => item.id !== row.id);
    },
    getCenterList() {
      const url = '/apis/datacenter/datas';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.centerList = res.data.data;
        }
      });
    },
    // getAppList() {
    //   const url = '/apis/rrs';
    //   $http.get(url).then(res => {
    //     if (res.data.status === 0) {
    //       this.appList = res.data.data;
    //     }
    //   });
    // },
    handlerCancel() {
      this.$emit('close')
    },
    handleCurrentChange(pageNum) {
      this.pagination.currpage = pageNum;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.pagination.pagesize = pageSize;
      this.getList();
    },
    handlerSearch() {
      this.pagination = { currpage: 1, pagesize: 10 };
      this.getList();
    },
    getList() {
      const { currpage, pagesize } = this.pagination;
      let url = `/apis/type/${this.type}/rrs?pageNum=${currpage}&pageSize=${pagesize}`;
      if (this.search) {
        url += `&searchName=${this.search}`;
      }
      this.loading = true;
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.rrlist = res.data.data;
          this.pagination.total = res.data.total;
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.multipleSelection.length) {
        this.multipleSelection.forEach(item => {
          if (!this.selectRRList.some(rr => rr.id === item.id)) {
            this.selectRRList.push(item);
          }
        });
      } 
    },
    handlerSave() {
      const ids = this.selectRRList.map(row => row.id);
      this.editRow.rrids = ids;
      this.$refs.form.validate(valid => {
          if (valid) {
            let url = '/apis/apps';
            let func = this.editRow.id ? $http.put : $http.post;
            if (this.editRow.id) {
              url += '/' + this.editRow.id;
            }
            func(url, this.editRow).then(res => {
              if (res.data.status) {
                this.$notify.error({
                  message: res.data.msg
                });
              } else {
                this.$emit('close', true);
              }
            });
          }
      });
    }
  }
};
</script>
<style scoped lange="scss">
.left-panel {
    width: 500px;
    text-align: left;
    background: #fff;
}

.input-with-select /deep/ .el-input--suffix {
  width: 100px;
}
</style>