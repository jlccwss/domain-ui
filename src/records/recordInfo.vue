  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-position="right" label-width="120px">
        <el-steps :active="active" finish-status="success" label-wi>
          <el-step title="填写主体信息"></el-step>
          <el-step title="填写网站信息"></el-step>
          <el-step title="上传附件"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
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
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
            <el-select class="w-full">
              <el-option value="1" label="个人"></el-option>
              <el-option value="2" label="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主办单位性质">
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