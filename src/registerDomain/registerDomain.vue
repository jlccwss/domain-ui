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
           <el-row>
             <el-col :span="12">
               <el-input
                  placeholder=""
                  resize="none"
                  v-model="domain.domainName">
                </el-input>
             </el-col>
           </el-row>
        </el-form-item>
        <el-form-item>
            <el-button size="small" @click="next" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item label="TLD">
            <el-checkbox-group v-model="domainList">
              <el-checkbox label=".com">.com</el-checkbox>
              <el-checkbox label=".cn">.cn</el-checkbox>
              <el-checkbox label=".cc">.cc</el-checkbox>
              <el-checkbox label=".com.cn">.com.cn</el-checkbox>
              <el-checkbox label=".wang">.wang</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div v-if="step===2" class="form">
        <el-row class="mt-xs align-left">域名可注册</el-row>
        <el-table
              :data="registerList"
              class="mt-xs"
              header-cell-class-name="table-head"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="domainName"
                label="域名">
              </el-table-column>
              <el-table-column
                label="查询结果">
                <template>可注册</template>
              </el-table-column>
              <el-table-column
                width="200"
                label="注册期限">
                <template slot-scope="{ row }">
                  <el-col :span="9">
                    <el-select class="w-full" size="small" v-model="row.period">
                      <el-option :key="year" v-for="year in years" :label="year" :value="year"></el-option>
                    </el-select>
                  </el-col>
                  <el-col class="pl-sm" align="left" :span="9">年</el-col>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="price"
                label="费用">
              </el-table-column> -->
            </el-table>
            <el-row class="mt-xs">
              <el-col :span="4">注册人</el-col>
              <el-col :span="6">
                <el-select class="w-full" size="small" v-model="registerData.registrantTemplateId">
                  <el-option :key="contact.id" v-for="contact in contactList" :label="contact.name" :value="contact.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="mt-xs">
              <el-col :span="4">管理联系人</el-col>
              <el-col :span="6">
                <el-select class="w-full" size="small" v-model="registerData.adminTemplateId">
                  <el-option :key="contact.id" v-for="contact in contactList" :label="contact.name" :value="contact.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="mt-xs">
              <el-col :span="4">技术联系人</el-col>
              <el-col :span="6">
                <el-select class="w-full" size="small" v-model="registerData.techTemplateId">
                  <el-option :key="contact.id" v-for="contact in contactList" :label="contact.name" :value="contact.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="mt-xs">
              <el-col :span="4">财务联系人</el-col>
              <el-col :span="6">
                <el-select class="w-full" size="small" v-model="registerData.billingTemplateId">
                  <el-option :key="contact.id" v-for="contact in contactList" :label="contact.name" :value="contact.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="mt-xs">
              <el-button size="small" type="primary" @click="register">注册选中域名</el-button>
            </el-row>
            <el-row class="mt-xs align-left">不可注册域名</el-row>
            <el-table
              :data="unRegisterList"
              class="mt-xs"
              header-cell-class-name="table-head"
              style="width: 100%">
              <el-table-column
                prop="domainName"
                label="域名">
              </el-table-column>
              <el-table-column
                label="查询结果">
                <template>不可注册</template>
              </el-table-column>
            </el-table>
      </div>
      <div v-if="step===3">
        <el-row class="mt-xs align-left">域名订单创建成功</el-row>
        <el-table
              :data="registerResList"
              class="mt-xs"
              header-cell-class-name="table-head"
              style="width: 100%">
              <el-table-column
                prop="serialNumber"
                label="单号">
              </el-table-column>
              <el-table-column
                prop="domainName"
                label="域名">
              </el-table-column>
              <!-- <el-table-column
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
              </el-table-column> -->
              <el-table-column
                label="状态">
                <template>操作成功</template>
              </el-table-column>
            </el-table>
      </div>
    </div>
</template>

<script>
import $http from '@/http';

export default {
  data() {
    return {
      list: [],
      step: 1,
      domain: {},
      editRow: {},
      domainList: [],
      unRegisterList: [],
      registerList: [],
      selectDomains: [],
      contactList: [],
      registerData: {},
      registerResList: [],
      years: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  mounted() {
    this.getContactList();
  },
  methods: {
    getContactList() {
      const url = '/apis/contact/template/list';
      $http.post(url).then(res => {
        if (res.data.success) {
          this.contactList = res.data.data;
        }
      })
    },
    next() {
      let a = 1;
      if (a===1) {
        this.$router.push({
          path: '/home/domains'
        });
        return
      }
      if (!this.domain.domainName) {
        this.$notify.warning({
          message: '请填写注册域名'
        });
        return;
      }

      if (!this.domainList.length) {
        this.$notify.warning({
          message: '请选择TLD'
        });
        return;
      }
      const { domainName } = this.domain;
      const https = this.domainList.map(domain => {
        const url = `/apis/domain/check/${domainName}${domain}`;
        return $http.get(url)
      });

      Promise.all(https).then(arr => {
        let errMessage = '';
        let registerList = [];
        let unRegisterList = [];
        arr.forEach(res => {
          if (res.data.code === 1000 || res.data.code === 3000)  {
            let data = res.data.data;
            if (data.available) {
              registerList.push({...data, period: 1});
            } else {
              unRegisterList.push(data);
            }
          } else {
              errMessage = res.data.message
          }
        });

        this.registerList = registerList;
        this.unRegisterList = unRegisterList;
        if (this.registerList.length || this.unRegisterList.length) {
          this.step = 2;
        }
        if (errMessage) {
          this.$notify.error({
            message: errMessage
          });
        }
      });
    },

    register() {
      if (!this.selectDomains.length) {
        this.$notify.warning({
          message: '请选择注册域名'
        });
        return;
      }

      if (!this.registerData.registrantTemplateId) {
        this.$notify.warning({
          message: '请选择注册人'
        });
        return;
      }

      const https = this.selectDomains.map(domain => {
        const url = `/apis/domain/create/`;
        let price = domain.price * domain.period;
        let data = {
          domainName: domain.domainName,
          period: domain.period,
          price: Number(price.toFixed(3)),
          ...this.registerData
        };
        return $http.post(url, data);
      });

      this.step = 3;

      Promise.all(https).then(arr => {
        let errMessage = '';
        let result = [];
        arr.forEach(res => {
          if (res.data.code === 1000 || res.data.code === 3000)  {
            let data = res.data.data;
            if (data) {
              result.push(data);
            }
            this.$notify.success(res.data.message);
            setTimeout(() => {
              this.$router.push({
                name: 'domains'
              });
            }, 500);
          } else {
            errMessage = res.data.message
          }
        });

        this.registerResList = result;
        if (errMessage) {
          this.$notify.error({
            message: errMessage
          });
          setTimeout(() => {
            this.$router.push({
              name: 'domains'
            });
          }, 500);
        }
      }, () => {
        this.$router.push({
          name: 'domains'
        });
      });    
    },

    handleSelectionChange(val) {
      this.selectDomains = val;
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