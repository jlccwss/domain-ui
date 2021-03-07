  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>域名注册管理</el-breadcrumb-item>
          <el-breadcrumb-item>域名注册</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="mt-xs">
        <el-col :span="4" class="page-title">
          域名注册
        </el-col>
      </el-row>
      <el-form class="mt-xs form" ref="form" :model="editRow" label-width="120px" v-if="step===1">
         <el-form-item label="注册域名">
           <el-input
            placeholder=""
            rows="3"
            resize="none"
            v-model="editRow.flowName">
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="small" @click="next" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item label="可注册域名">
            <el-checkbox v-model="checked1">.unicom</el-checkbox>
            <el-checkbox v-model="checked2">.联通</el-checkbox>
        </el-form-item>
      </el-form>
      <div v-if="step===2" class="form">
        <el-row class="mt-xs">域名可注册</el-row>
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
            <el-row class="mt-xs">
              <el-button size="small" type="primary" @click="register">注册选中域名</el-button>
            </el-row>
            <el-row class="mt-xs">不可注册域名</el-row>
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
      </div>
      <div v-if="step===3">
        <el-row class="mt-xs">域名订单创建成功</el-row>
        <el-table
              :data="[{flowName: 1}, {flowName: 2}]"
              class="mt-xs"
              header-cell-class-name="table-head"
              style="width: 100%">
              <el-table-column
                prop="flowName"
                label="单号">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="域名">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="会员名">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="期限">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="费用">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="上游机构">
              </el-table-column>
              <el-table-column
                prop="flowName"
                label="状态">
              </el-table-column>
            </el-table>
      </div>
    </div>
</template>

<script>
// import $http from '@/http';

export default {
  data() {
    return {
      list: [],
      step: 1,
      editRow: {}
    };
  },
  mounted() {
 
  },
  methods: {
    next() {
      this.step = 2;
    },
    register() {
      this.step = 3;
    }
  }
};
</script>
<style scoped>
.form {
  text-align: left;
}

.el-form-item__content {
  text-align: left;
}
</style>