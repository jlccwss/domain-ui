  <template>
    <div>
      <el-form class="mt-xs form" label-position="right" label-width="340px">
        <el-form-item label="备案域名">
            <div class="align-left">{{editRow.domain}}</div>
        </el-form-item>
        <el-form-item class="align-left" label="营业执照副本彩色电子件">
            <img v-if="editRow.zhizhao" :src="editRow.zhizhao" />
        </el-form-item>
        <el-form-item class="align-left" label="主体负责人的身份证正面（彩色）">
            <img v-if="editRow.zhutiZheng" :src="editRow.zhutiZheng" />
        </el-form-item>
        <el-form-item class="align-left" label="主体负责人的身份证反面（彩色）">
            <img v-if="editRow.zhutiFan" :src="editRow.zhutiFan" />
        </el-form-item>
        <el-form-item class="align-left" label="网站负责人的身份证正面（彩色）">
            <img v-if="editRow.wangzhanZheng" :src="editRow.wangzhanZheng" />
        </el-form-item>
        <el-form-item class="align-left" label="网站负责人的身份证反面（彩色）">
            <img v-if="editRow.wangzhanFan" :src="editRow.wangzhanFan" />
        </el-form-item>
        <el-form-item class="align-left" label="网站真实性核验单电子件加盖公章（模版可下载）">
            <!-- <span class="mr-sm">{{editRow.wangzhanheyan}}</span> -->
        </el-form-item>
        <el-form-item class="align-left" label="含背景布网站负责人照片（联系管理员索取背景布）">
          <img v-if="editRow.beijingPhoto" :src="editRow.beijingPhoto" />
        </el-form-item>
        <el-form-item label="联系方式">
            <div class="align-left">{{editRow.wangzhanTel}}</div>
        </el-form-item>
        <el-form-item label="应急联系人">
            <div class="align-left">{{editRow.yingjiTel}}</div>
        </el-form-item>
        <el-form-item label="联系邮箱">
            <div class="align-left">{{editRow.email}}</div>
        </el-form-item>
        <el-form-item>
          <el-button @click="handlerCancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['editRow'],
  methods: {
    handlerCancel() {
      this.$router.push({
        name: 'records'
      });
    },
  }
};
</script>
<style scoped lang="scss">
.form {
  width: 80%;
}
</style>