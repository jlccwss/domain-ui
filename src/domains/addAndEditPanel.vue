<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="域名注册">
      <el-form ref="form" :model="editRow">
         <el-form-item>
           <el-row>
             <el-col :span="20">
               <el-input
                type="textarea"
                placeholder="每行输入一个域名"
                rows="3"
                resize="none"
                v-model="editRow.flowName">
              </el-input>
             </el-col>
             <el-col :span="4" align="right">
               <el-button type="primary" size="small">查询</el-button>
             </el-col>
           </el-row>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked1">.unicom</el-checkbox>
            <el-checkbox v-model="checked2">.联通</el-checkbox>
        </el-form-item>
        <el-form-item label="可注册域名">
            <el-table
              :data="[{flowName: 1}, {flowName: 2}]"
              class="mt-xs"
              header-cell-class-name="table-head"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="域名">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="查询结果">
              </el-table-column>
              <el-table-column
                label="注册期限">
                <template slot-scope="{ row }">
                  <el-col :span="18">
                    <el-select class="w-full" size="small" v-model="row.flowName">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
                  </el-col>
                  <el-col align="right" :span="6">年</el-col>
                </template>
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="费用">
              </el-table-column>
            </el-table>
        </el-form-item>
        <el-row>
          <el-col align="right">
            批量设置
            <el-select size="small">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
            年
          </el-col>
        </el-row>
        <el-form-item>
          <div>联系人信息</div>
          <el-row>
            <el-col :span="6">注册人</el-col>
            <el-col :span="6">
              <el-select size="small" class="w-full">
                <el-option label="全部" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="pl-sm">
              <a>查看联系人明细</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">管理联系人</el-col>
            <el-col :span="6">
              <el-select size="small" class="w-full">
                <el-option label="全部" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="pl-sm">
              <el-checkbox v-model="checked1">使用注册人模板</el-checkbox>
            </el-col>
            <el-col :span="6">
              <a>查看联系人明细</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">技术联系人</el-col>
            <el-col :span="6">
              <el-select size="small" class="w-full">
                <el-option label="全部" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="pl-sm">
              <el-checkbox v-model="checked1">使用注册人模板</el-checkbox>
            </el-col>
            <el-col :span="6">
              <a>查看联系人明细</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">财务联系人</el-col>
            <el-col :span="6">
              <el-select size="small" class="w-full">
                <el-option label="全部" value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="pl-sm">
              <el-checkbox v-model="checked1">使用注册人模板</el-checkbox>
            </el-col>
            <el-col :span="6">
              <a>查看联系人明细</a>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="不可注册域名">
            <el-table
              :data="[{flowName: 1}, {flowName: 2}]"
              class="mt-xs"
              header-cell-class-name="table-head"
              style="width: 100%">
              <el-table-column
                prop="flowName"
                label="域名">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="查询结果">
              </el-table-column>
            </el-table>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row class="p-sm">
      <el-col align="right">
        <el-button @click="handlerCancel" size="small">
          取消
        </el-button>
        <el-button @click="handlerSave" type="primary" size="small">
          注册域名
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
      userList: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      const url = '/apis/users';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      const url = '/apis/approveModule';
      let func = this.editRow.id ? $http.put : $http.post;
      func(url, this.editRow).then(() => {
        this.$emit('close', true);
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
</style>