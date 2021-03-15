  <template>
    <div class="scroll-auto">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="mt-xs form" label-position="right" label-width="340px" v-if="!isView">
        <el-form-item label="备案域名">
            <el-input v-model="editRow.domain"></el-input>
        </el-form-item>
        <el-form-item class="align-left" label="营业执照副本彩色电子件">
            <span class="mr-sm img-target" v-if="editRow.zhizhao">
              <el-image
                class="img"
                :src="editRow.zhizhao"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhizhaoFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="主体负责人的身份证正面（彩色）">
            <span class="mr-sm img-target" v-if="editRow.zhutiZheng">
              <el-image
                class="img"
                :src="editRow.zhutiZheng"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhutiZhengFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="主体负责人的身份证反面（彩色）">
            <span class="mr-sm img-target" v-if="editRow.zhutiFan">
              <el-image
                class="img"
                :src="editRow.zhutiFan"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhutiFanFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="网站负责人的身份证正面（彩色）">
            <span class="mr-sm img-target" v-if="editRow.wangzhanZheng">
              <el-image
                class="img"
                :src="editRow.wangzhanZheng"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getWangzhanZhengFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="网站负责人的身份证反面（彩色）">
            <span class="mr-sm img-target" v-if="editRow.wangzhanFan">
              <el-image
                class="img"
                :src="editRow.wangzhanFan"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getWangzhanFanFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="网站真实性核验单电子件加盖公章（模版可下载）">
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getWangzhanHeyanFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <a class="ml-sm" href="/网站备案信息真实性核验单V12.doc">下载模板</a>
        </el-form-item>
        <el-form-item class="align-left" label="含背景布网站负责人照片（联系管理员索取背景布）">
          <span class="mr-sm img-target" v-if="editRow.beijingPhoto">
              <el-image
                class="img"
                :src="editRow.beijingPhoto"
                :fit="fit">
              </el-image>
            </span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getBeijingPhotoFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-input v-model="editRow.wangzhanTel"></el-input>
        </el-form-item>
        <el-form-item label="应急联系人">
            <el-input v-model="editRow.yingjiTel"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
            <el-input v-model="editRow.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handlerSave" size="small" type="primary">保存</el-button>
          <el-button @click="handlerCancel" size="small">取消</el-button>
        </el-form-item>
      </el-form>
      <record-info-view :edit-row="editRow" v-if="isView"></record-info-view>
    </div>
</template>

<script>
import $http from '@/http';
import recordInfoView from './recordInfoView.vue'
import { getBase64 } from './utils';
export default {
  components: {
    recordInfoView
  },
  data() {
    return {
      editRow: {
        zhizhao: '',
        zhutiZheng: '',
        zhutiFan: '',
        wangzhanZheng: '',
        wangzhanFan: '',
        wangzhanheyan: '',
        beijingPhoto: ''
      },
      isView: false
    };
  },
  created() {
    if (this.$route.params.recordId !== 'add') {
      this.getDetail();
    }
    if (this.$route.query.view) {
      this.isView = true;
    }
  },
  methods: {
    getDetail() {
      let recordId = this.$route.params.recordId;
      const url = '/apis/icp/' + recordId;
      $http.post(url).then(res => {
        this.editRow = res.data;
      });
    },
    getZhizhaoFile(file, files) {
      this.getFile(file, files, 'zhizhao');
    },
    getZhutiZhengFile(file, files) {
      this.getFile(file, files, 'zhutiZheng');
    },
    getZhutiFanFile(file, files) {
      this.getFile(file, files, 'zhutiFan');
    },
    getWangzhanZhengFile(file, files) {
      this.getFile(file, files, 'wangzhanZheng');
    },
    getWangzhanFanFile(file, files) {
      this.getFile(file, files, 'wangzhanFan');
    },
    getWangzhanHeyanFile(file, files) {
      this.getFile(file, files, 'wangzhanheyan');
    },
    getBeijingPhotoFile(file, files) {
      this.getFile(file, files, 'beijingPhoto');
    },
    getFile(file, files, key) {
      if (file.size > 5 * 1024 *1024) {
        this.$notify.warning({
          message: '图片不能大于5M'
        });
        return;
      }
      if (files.length > 1) {
        files.shift();
      }
      getBase64(file.raw).then(res => {
        this.editRow[key] = res;
      });
    },
    handlerCancel() {
      this.$router.push({
        name: 'records'
      });
    },
    handlerSave() {
      if (!this.editRow.domain) {
        this.$notify.warning({
          message: '请输入备案域名'
        });
        return;
      }
      let url = '/apis/icp';
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
          this.$notify.success({
            message: '保存成功'
          });
          this.handlerCancel();
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.form {
  width: 80%;
}

.img-target {
  .img {
    z-index: 10;
    background: #fff;
    width: 200px;
    height: 200px;
  }
}
</style>