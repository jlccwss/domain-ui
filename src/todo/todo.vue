<template>
    <div>
     <el-table
      v-loading="loading"
      max-height="700"
      :data="list"
      class="mt-xs"
      style="width: 100%">
      <el-table-column
        prop="flowName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="flowName"
        label="类型">
        <template slot-scope="{ row }">
          {{flowTypes[row.flowType]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="flowName"
        width="500"
        label="审批流">
        <template slot-scope="{ row }">
          <el-steps class="steps" :active="row.step">
            <el-step :status="finishStep[row.flowPath1Status]">
              <template slot="title">
                <div :class="{approve: row.flowPath1Status[index] === 1, reject: row.flowPath1Status[index] === 2}" :key="name + index + 'flowPath1'" v-for="(name, index) in row.flowPath1">{{name}}{{row.flowPath1Name[index]}}</div>
              </template>
            </el-step>
            <el-step :status="finishStep[row.flowPath2Status]">
              <template slot="title">
                <div :class="{approve: row.flowPath2Status[index] === 1, reject: row.flowPath2Status[index] === 2}" :key="name + index + 'flowPath2'" v-for="(name, index) in row.flowPath2">{{name}}{{row.flowPath2Name[index]}}</div>
              </template>
            </el-step>
            <el-step :status="finishStep[row.flowPath3Status]">
              <template slot="title">
                <div :class="{approve: row.flowPath3Status[index] === 1, reject: row.flowPath3Status[index] === 2}" :key="name + index + 'flowPath3'" v-for="(name, index) in row.flowPath3">{{name}}{{row.flowPath3Name[index]}}</div>
              </template>
            </el-step>
            <el-step :status="finishStep[row.flowPath4Status]">
              <template slot="title">
                <div :class="{approve: row.flowPath4Status[index] === 1, reject: row.flowPath4Status[index] === 2}" :key="name + index + 'flowPath4'" v-for="(name, index) in row.flowPath4">{{name}}{{row.flowPath4Name[index]}}</div>
              </template>
            </el-step>
          </el-steps>
          <el-row :style="{paddingLeft: row.step * 110 + 'px'}"  v-if="![1, 2].includes(row.finishStatus)">
            <el-button :disabled="row.disabled" type="primary" size="mini" @click="handlerApprove(row.id)">通过</el-button>
            <el-button :disabled="row.disabled" size="mini" @click="handlerReject(row.id)">驳回</el-button>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="完成状态">
        <template slot-scope="{ row }">
          {{finishStatus[row.finishStatus]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="detail"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="flowOwner"
        label="发起人">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="{ row }">
          {{row.createTime | dateFormat}}
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import $http from '@/http';
import { flowTypes, finishStatus } from './const';

export default {
  data() {
    return {
      list: [],
      centerList: [],
      loading: false,
      flowTypes: flowTypes,
      finishStatus: finishStatus,
      finishStep: {
        0: 'wait',
        1: 'success',
        2: 'error'
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const { approveListid, user } =  this.$route.query;
      const url = `/apis/todo/${user}/approveList/${approveListid}`;
      const list = ['flowPath1', 'flowPath2', 'flowPath3', 'flowPath4'];
      $http.get(url).then(res => {
        if (res.data) {
          let record = res.data;
          const activeStep = list.findIndex((l) => {
            let status = Math.max(...record[`${l}Status`]);
            if (status === 0 || status === 2) {
                return true;
            }
            return false;
          });
          const errorStep = list.findIndex((l) => {
            let status = Math.max(...record[`${l}Status`]);
            if (status === 2) {
                return true;
            }
            return false;
          });
          record.step = activeStep;
          record.disabled = !record[`${list[activeStep]}`].includes(user) || errorStep !== -1;
          this.list = [ record ];
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handlerReject(rowId) {
      const { user } =  this.$route.query;
      this.$prompt('请输入原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        const url = `/apis/todo/${user}/approveList/${rowId}/reject/${value}`;
        $http.post(url).then(() => {
            this.$notify.success({
              message: '驳回成功'
            });
            this.getList();
          });
      });
    },
    handlerApprove(rowId) {
      const { user } =  this.$route.query;
      // const url = `/apis/approveList/${rowId}/approve`;
      const url = `/apis/todo/${user}/approveList/${rowId}/approve`;
      $http.post(url).then(() => {
          this.$notify.success({
            message: '通过成功'
          });
          this.getList();
        });
    }
  }
};
</script>
<style scoped lang="scss">
.steps {
  width: 400px;
  margin: auto;
}

.approve {
  color: green;
}

.reject {
  color: red;
}
</style>