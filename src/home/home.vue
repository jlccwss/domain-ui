<template>
    <div class="main">
      <div class="header">
        <div class="logo">
          <div class="logo-img"></div>
          <div class="logo-name">集团域名解析统一管理系统</div>
        </div>
        <div class="handler flex">
          <!-- <i class="el-icon-bell mr-sm" v-if="user.role === 'admin'"></i>
          <i class="el-icon-question mr-sm"></i> -->
          <div class="user-logo mr-sm"></div>
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
        <el-menu :unique-opened="true" :router="true" :default-openeds="openeds" class="menu" :default-active="currentNav">
          <el-submenu index="1" v-if="authority.includes('1')">
            <template slot="title">
              <span><span class="icon dns"></span>域名记录管理</span>
            </template>
            <el-menu-item index="/home/zones" v-if="authority.includes('zones')">互联网</el-menu-item>
            <el-menu-item index="/home/gzones" v-if="authority.includes('gzones')">广域网</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2" v-if="authority.includes('2')">
            <template slot="title">
              <span><span class="icon domain"></span>域名注册管理</span>
            </template>
            <el-menu-item index="/home/domains" v-if="authority.includes('domains')">域名管理</el-menu-item>
            <el-menu-item index="/home/sslCertificates" v-if="authority.includes('sslCertificates')">SSL证书</el-menu-item>
          </el-submenu> -->
          <el-submenu index="3" v-if="authority.includes('3')">
            <template slot="title">
              <span><span class="icon icp"></span>ICP备案</span>
            </template>
            <!-- <el-menu-item index="icps" v-if="authority.includes('icps')">ICP备案</el-menu-item> -->
            <el-menu-item index="/home/records" v-if="authority.includes('records')">备案管理</el-menu-item>
            <el-menu-item index="/home/website" v-if="authority.includes('website')">网站信息表</el-menu-item>
          </el-submenu>
          <el-submenu index="7" v-if="authority.includes('7')">
            <template slot="title">
              <span><span class="icon ip"></span>IP管理</span>
            </template>
            <el-menu-item index="/home/addressManage" @click="navToAddress" v-if="authority.includes('addressManage')">地址管理</el-menu-item>
            <!-- <el-menu-item index="/home/ranking" v-if="authority.includes('ranking')">使用排行</el-menu-item> -->
            <el-menu-item index="/home/subnet" v-if="authority.includes('subnet')">子网上报</el-menu-item>
          </el-submenu>
          <el-submenu index="4" v-if="authority.includes('4')">
            <template slot="title">
              <span><span class="icon sys"></span>系统管理</span>
            </template>
            <el-menu-item index="/home/users" v-if="authority.includes('users')">账号管理</el-menu-item>
            <el-menu-item index="/home/auditlogs" v-if="authority.includes('auditlogs')">操作日志</el-menu-item>
            <!-- <el-menu-item index="/home/contacts" v-if="authority.includes('contacts')">联系人模板</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5" v-if="authority.includes('5')">
            <template slot="title">
              <span><span class="icon approal"></span>审批管理</span>
            </template>
            <el-menu-item index="/home/approveList" v-if="authority.includes('approveList')">审批单管理</el-menu-item>
            <el-menu-item index="/home/approveModule" v-if="authority.includes('approveModule')">审批模板</el-menu-item>
          </el-submenu>
          <el-submenu index="6" v-if="authority.includes('6')">
            <template slot="title">
              <span><span class="icon toogale"></span>灾备切换</span>
            </template>
            <el-menu-item index="/home/apps" v-if="authority.includes('apps')">应用管理</el-menu-item>
            <el-menu-item index="/home/groups" v-if="authority.includes('groups')">分组管理</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="page">
          <router-view></router-view>
        </div>
      </div>
      <changePwdDialog v-if="pwdDialog" :user="user" @close="close"></changePwdDialog>
    </div>
</template>

<script>
import $http from '@/http';
import changePwdDialog from './changePwdDialog.vue';
import authority from './authority';
import { getUser } from '@/user';

export default {
  components: {
    changePwdDialog
  },
  data() {
    return {
      user: {},
      pwdDialog: false,
      currentNav: '',
      openeds: [],
      authority: []
    };
  },
  mounted() {
    this.getCurRole();
    this.currentNav = this.$route.path;
    this.initWss();
  },
  methods: {
    navToAddress() {
      var ww = window.open('/apis/ipamurl');
      ww.onload = function() {
        ww.close();
      };
    },
    initWss() {
      const host = `${location.protocol === 'https' ? 'wss': 'ws'}://${location.host}`;
      this.wss = new WebSocket(`${host}/apis/ws`);
      this.wss.onopen = function() {
        console.log('open')
      };
      this.wss.onmessage = function(event) {
        console.log(event)
      };
    },
    getCurRole() {
      this.user = getUser();
      // this.user.role = 'itInterfacer';
      this.authority = authority[this.user.role];
    },
    handleCommand(type) {
      if (this[type]) {
        this[type]();
      }
    },
    changePwd() {
      this.pwdDialog = true;
    },
    close() {
      this.pwdDialog = false;
    },
    logout() {
      const url = '/apis/logout';
      $http.delete(url).then(() => {
        this.$router.push({
            path: '/login'
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
      width: 400px;
      color: #fff;
      display: flex;
      text-align: left;
      align-items: center;
      padding-left: 16px;
      .logo-img {
        display: inline-block;
        background: url(./../assets/logo.png);
        background-repeat: no-repeat;
        background-size: contain;
        height: 28px;
        width: 135px;
      }

      .logo-name {
        display: inline-block;
        line-height: 28px;
      }
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

  .user-logo {
    width: 40px;
    height: 40px;
    background: url(./../assets/account.jpeg);
    background-size: cover;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .content {
    display: flex;
    height: calc(100% - 60px);
    background: #f5f5f5;

    .menu {
      width: 240px;
      text-align: left;
      background: #233353;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
      & /deep/ .el-menu {
        background: transparent;
      }

      & /deep/ .el-menu-item {
        color: #fff;
      }

      & /deep/ .el-submenu__title {
        color: #fff;
      }

      & /deep/ .el-submenu__title:hover {
        background: transparent;
      }

      & /deep/ .el-menu-item:focus {
        color: #40A9FF;
        background: transparent;
      }

      & /deep/ .el-menu-item:hover {
        color: #40A9FF;
        background: transparent;
      }

      & /deep/ .el-submenu.is-active .el-submenu__title {
        color: #40A9FF;
      }

      & /deep/ .el-menu-item.is-active {
        color: #40A9FF;
      }


      .icon {
        background-size: cover;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 15px;
        &.dns {
          background-image: url(./../assets/dns-icon.png);
        }

        &.domain {
          background-image: url(./../assets/domain-icon.png);
        }

        &.icp {
          background-image: url(./../assets/icp-icon.png);
        }

        &.ip {
          background-image: url(./../assets/ip-icon.png);
        }

        &.sys {
          background-image: url(./../assets/sys-icon.png);
        }

        &.approal {
          background-image: url(./../assets/approal-icon.png);
        }

        &.toogale {
          background-image: url(./../assets/toogale-icon.png);
        }
      }

      & /deep/ .el-submenu.is-active .icon {
        &.dns {
          background-image: url(./../assets/dns-icon-active.png);
        }

        &.domain {
          background-image: url(./../assets/domain-icon-active.png);
        }

        &.icp {
          background-image: url(./../assets/icp-icon-active.png);
        }

        &.ip {
          background-image: url(./../assets/ip-icon-active.png);
        }

        &.sys {
          background-image: url(./../assets/sys-icon-active.png);
        }

        &.approal {
          background-image: url(./../assets/approal-icon-active.png);
        }

        &.toogale {
          background-image: url(./../assets/toogale-icon-active.png);
        }
      }
    }

    .page {
      flex: 1;
      overflow-y: hidden;
      padding: 12px 16px;
    }
  }
}
</style>