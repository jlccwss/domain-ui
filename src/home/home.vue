<template>
    <div class="main">
      <div class="header">
        <div class="logo"></div>
        <div class="handler flex">
          <i class="el-icon-bell mr-sm"></i>
          <i class="el-icon-question mr-sm"></i>
          <el-avatar class="mr-sm"></el-avatar>
          <el-dropdown class="mr-sm" @command="handleCommand">
            <span class="el-dropdown-link">
            {{user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <el-menu :router="true" @select="selectMenu" :default-openeds="openeds" class="menu" :default-active="currentNav">
          <el-submenu index="1">
            <template slot="title">
              <span>域名管理</span>
            </template>
            <el-menu-item index="zones">区管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>域名注册</span>
            </template>
            <el-menu-item index="domains">域名注册</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>ICP备案</span>
            </template>
            <el-menu-item index="icps">ICP备案</el-menu-item>
            <el-menu-item index="sslCertificates">SSL证书</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>系统管理</span>
            </template>
            <el-menu-item index="users">账号管理</el-menu-item>
            <el-menu-item index="auditlogs">操作日志</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <span>审批管理</span>
            </template>
            <el-menu-item index="approveList">审批管理</el-menu-item>
            <el-menu-item index="approveModule">审批模板</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <span>灾备切换</span>
            </template>
            <el-menu-item index="apps">应用列表</el-menu-item>
            <el-menu-item index="groups">分组列表</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="page">
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view></router-view>
        </div>
      </div>
      <changePwdDialog v-if="pwdDialog" :user="user" @close="close"></changePwdDialog>
    </div>
</template>

<script>
import $http from '@/http';
import changePwdDialog from './changePwdDialog.vue';

export default {
  components: {
    changePwdDialog
  },
  data() {
    return {
      user: {},
      pwdDialog: false,
      currentNav: 'zones',
      openeds: ['1', '2', '3', '4', '5', '6']
    };
  },
  mounted() {
    this.getCurRole();
    this.currentNav = this.$route.path.split('/').pop();
  },
  methods: {
    selectMenu() {
      console.log()
    },
    getCurRole() {
      const url = '/apis/current_role';
      $http.get(url).then(res => {
        this.user = res.data;
      });
    },
    handleCommand(type) {
      if (this[type]) {
        this[type]();
      }
    },
    changePwd() {
      this.pwdDialog = true;
    },
    close(refresh) {
      console.log(1)
      if (refresh) {
        this.getCurRole();
      }
      this.pwdDialog = false;
    },
    logout() {
      const url = '/apis/logout';
      $http.delete(url).then(() => {
        this.$router.push({
            path: 'login'
          });
      });
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  height: 100%;
  .header {
    height: 60px;
    background: #001529;
    display: flex;
    .logo {
      width: 200px;
    }
    .handler {
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      .el-icon-bell {
        color: #fff;
      }

      .el-icon-question {
        background: #fff;
        border-radius: 50%;
        color: #001529;
      }

      .user {
        color: #fff;
      }
    }
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .content {
    display: flex;
    height: 100%;
    background: #f5f5f5;

    .menu {
      width: 240px;
      text-align: left;
    }

    .page {
      flex: 1;
      overflow-y: 'hidden';
      padding: 12px 16px;
    }
  }

  .breadcrumb {
    
  }
}
</style>