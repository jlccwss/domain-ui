  <template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>icp备案</el-breadcrumb-item>
          <el-breadcrumb-item>备案管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form class="mt-xs form" label-position="right" label-width="340px">
        <!-- <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-steps :active="active" finish-status="success" label-wi>
              <el-step title="填写主体信息"></el-step>
              <el-step title="填写网站信息"></el-step>
              <el-step title="上传附件"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row> -->
        <el-form-item label="备案域名">
            <el-input v-model="editRow.domain"></el-input>
        </el-form-item>
        <el-form-item class="align-left" label="营业执照副本彩色电子件">
            <span class="mr-sm">{{info.zhizhao}}</span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhizhaoFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="主体负责人的身份证正反面（彩色）">
            <span class="mr-sm">{{info.zhutiZheng}}</span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhutiZhengFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="网站负责人的身份证正反面（彩色）">
            <span class="mr-sm">{{info.zhutiFan}}</span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getZhutiFanFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="网站真实性核验单电子件加盖公章（模版可下载）">
            <span class="mr-sm">{{info.wangzhanZheng}}</span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getWangzhanZhengFile"
              :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item class="align-left" label="含背景布网站负责人照片（联系管理员索取背景布）">
          <span class="mr-sm">{{info.wangzhanFan}}</span>
            <el-upload
              class="display-inline"
              action="#"
              :show-file-list="false"
              :on-change="getWangzhanFanFile"
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
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import $http from '@/http';
import { getBase64 } from './utils';
export default {
  data() {
    return {
      editRow: {},
      info: {
        zhizhao: '',
        zhutiZheng: '',
        zhutiFan: '',
        wangzhanZheng: '',
        wangzhanFan: ''
      }
    };
  },
  created() {
    if (this.$route.params.recordId !== 'add') {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      let recordId = this.$route.params.recordId;
      const url = '/apis/icp/' + recordId;
      $http.get(url).then(res => {
        console.log(res)
      });
    },
    getZhizhaoFile(file, files) {
      this.getFile(file, files, 'zhizhao')
    },
    getZhutiZhengFile(file, files) {
      this.getFile(file, files, 'zhutiZheng')
    },
    getZhutiFanFile(file, files) {
      this.getFile(file, files, 'zhutiFan')
    },
    getWangzhanZhengFile(file, files) {
      this.getFile(file, files, 'wangzhanZheng')
    },
    getWangzhanFanFile(file, files) {
      this.getFile(file, files, 'wangzhanFan')
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
      this.info[key] = file.name;
      getBase64(file.raw).then(res => {
        this.editRow[key] = res;
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
          this.$emit('close', true);
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
</style>