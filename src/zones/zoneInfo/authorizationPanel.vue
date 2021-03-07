<template>
  <div class="bg-edit">
    <div class="left-panel flex-col">
      <el-card shadow="never" class="box-card flex-auto" header="新增编辑">
        <el-row>
          <el-col :span="12">
              <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                class="input"
                @input="search"
                v-model="userSearch">
              </el-input>
              <div class="item-list" style="border-right: none">
                <div class="item" @click="addUser(user.id)" :key="user.id" v-for="user in userList">
                  {{user.userName}}<span v-if="user.employeeFirstName || user.employeeLastName">({{user.employeeFirstName}}{{user.employeeLastName}})</span>{{user.companyName}}
                </div>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="count">已添加用户{{selectUsers.length}}个</div>
              <div class="item-list">
                <el-tag
                  :key="userId"
                  v-for="userId in selectUsers"
                  closable
                  class="tag"
                  size="small"
                  :disable-transitions="false"
                  @close="handleDel(userId)">
                  {{getUserName(userId)}}
                </el-tag>
              </div>
          </el-col>
        </el-row>
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
      allUserList: [],
      userList: [],
      userSearch: '',
      selectUsers: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.getUserList();
  },
  methods: {
    search() {
      this.userList = this.allUserList.filter(item => item.userName.includes(this.userSearch));
    },
    getUserName(userId) {
      let user = this.userList.find(user => user.id === userId);
      return user ? user.userName : '';
    },
    addUser(userId) {
      this.selectUsers = [userId];
    },
    handleDel(userId) {
      this.selectUsers = this.selectUsers.filter(id => id !== userId);
    },
    getUserList() {
      const url = '/apis/usersall';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.allUserList =  this.userList = res.data.data;
          if (this.editRow.createBy) {
            let user = this.allUserList.find(user => user.userName === this.editRow.createBy);
            if (user) {
              this.selectUsers = [user.id];
            }
          }
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      if (!this.selectUsers.length) {
        this.$notify.warning({
            message: '请选择用户'
          });
        return;
      }
      const zoneId = this.$route.params.zoneId;
      let url = '/apis/zones/' + zoneId + '/rrs/' + this.editRow.id;
      let user = this.allUserList.find(user => user.id === this.selectUsers[0]);
      if (user) {
        this.editRow.createBy = user.userName;
      }
      
      $http.put(url, this.editRow).then(res => {
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
.left-panel {
    width: 500px;
    text-align: left;
    background: #fff;
}

.item {
  line-height: 20px;
  padding: 6px 12px;
  cursor: pointer;
  &:hover {
    background: #eee;
  }

  &.active {
    background: #eee;
  }
}

.input /deep/ .el-input__inner {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: none;
}

.item-list {
  border: 1px solid #DCDFE6;
  border-top: none;
  height: 300px;
  overflow: auto;
}

.count {
  line-height: 38px;
  padding-left: 8px;
  border: 1px solid #DCDFE6;
  border-top-right-radius: 4px;
}

.tag {
  margin-left: 8px;
  margin-top: 8px;
}
</style>