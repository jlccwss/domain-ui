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
                  {{user.userName}}
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
      viewList: [],
      allUserList: [],
      userList: [],
      userSearch: '',
      selectUsers: []
    };
  },
  props: ['editRow'],
  mounted() {
    this.selectUsers = this.editRow.owners || [];
    this.getViewList();
    this.getUserList();
  },
  methods: {
    search() {
      this.userList = this.allUserList.filter(item => item.userName.includes(this.userSearch));
    },
    getViewList() {
      const url = '/apis/views';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.viewList = res.data.data;
        }
      });
    },
    getUserName(userId) {
      let user = this.userList.find(user => user.id === userId);
      return user ? user.userName : '';
    },
    addUser(userId) {
      if (!this.selectUsers.includes(userId)) {
        this.selectUsers.push(userId);
      }
    },
    handleDel(userId) {
      this.selectUsers = this.selectUsers.filter(id => id !== userId);
    },
    getUserList() {
      const url = '/apis/users';
      $http.get(url).then(res => {
        if (res.data.status === 0) {
          this.allUserList =  this.userList = res.data.data;
        }
      });
    },
    handlerCancel() {
      this.$emit('close')
    },
    handlerSave() {
      const url = '/apis/zones/' + this.editRow.id + '/owner';
      $http.post(url, {userids: this.selectUsers}).then(() => {
        this.$emit('close', true);
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