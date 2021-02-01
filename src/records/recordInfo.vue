  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="mt-xs form" label-position="right" label-width="130px">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-steps :active="active" finish-status="success" label-wi>
              <el-step title="填写主体信息"></el-step>
              <el-step title="填写网站信息"></el-step>
              <el-step title="上传附件"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
            <!-- <div>
              <div>1、个人网站选择个人；</div>
              <div>1、个人网站选择个人；</div>
            </div> -->
        </el-form-item>
        <el-form-item label="主办单位证件类型">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位证件号码">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="主办单位所选区域">
          <el-col :span="8">
            <el-select class="w-full pl-sm" placeholder="所在省份">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="w-full pl-sm" placeholder="所在城市">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="w-full pl-sm" placeholder="所在区县">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="主办单位或主办人名称">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="主办单位证件住所">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="主办单位通讯地址">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="投资人或主管单位">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            placeholder=""
            rows="3"
            resize="none"
            v-model="editRow.flowName">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人姓名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="负责人证件类型">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="负责人手机号码">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="负责人联系方式">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="电子邮件地址">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="应急手机号码">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="即时通讯类型">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>

export default {
  data() {
    return {
      editRow: {}
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>
<style scoped lang="scss">
.form {
  width: 80%;
}
</style>