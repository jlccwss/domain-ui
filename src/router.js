import VueRouter from 'vue-router';
import $http from '@/http';
import authority from './home/authority';
import { setUser } from './user';

import login from './login/login.vue';
import home from './home/home.vue';
import auditlogs from './auditlogs/auditlogs.vue';
import zones from './zones/zones.vue';
import gzones from './gzones/zones.vue';
import users from './users/users.vue';
import apps from './apps/apps.vue';
import groups from './groups/groups.vue';
import approveModule from './approveModule/approveModule.vue';
import approveList from './approveList/approveList.vue';
import zoneInfo from './zones/zoneInfo/zoneInfo.vue';
import gzoneInfo from './gzones/zoneInfo/zoneInfo.vue';
import domains from './domains/domains.vue';
import sslCertificates from './sslCertificates/sslCertificates.vue';
import icps from './icps/icps.vue';
import bigshow from './bigshow/bigshow.vue';
import contacts from './contacts/contacts.vue';
import website from './website/website.vue';
import records from './records/records.vue';
import recordInfo from './records/recordInfo.vue';
import subnet from './subnet/subnet.vue';
import ranking from './ranking/ranking.vue';
import notFound from './404/404.vue';

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/bigshow', name: 'bigshow', component: bigshow },
    { path: '/404', name: '404', component: notFound },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'auditlogs',
          name: 'auditlogs',
          component: auditlogs
        },
        {
          path: 'zones',
          name: 'zones',
          component: zones,
        },
        {
          path: 'gzones',
          name: 'gzones',
          component: gzones,
        },
        {
          path: 'zones/:zoneId',
          name: 'zoneInfo',
          component: zoneInfo,
        },
        {
          path: 'gzones/:zoneId',
          name: 'gzoneInfo',
          component: gzoneInfo,
        },
        {
          path: 'users',
          name: 'users',
          component: users
        },
        {
          path: 'apps',
          name: 'apps',
          component: apps
        },
        {
          path: 'groups',
          name: 'groups',
          component: groups
        },
        {
          path: 'approveModule',
          name: 'approveModule',
          component: approveModule
        },
        {
          path: 'approveList',
          name: 'approveList',
          component: approveList
        },
        {
          path: 'domains',
          name: 'domains',
          component: domains
        },
        {
          path: 'sslCertificates',
          name: 'sslCertificates',
          component: sslCertificates
        },
        {
          path: 'icps',
          name: 'icps',
          component: icps
        },
        {
          path: 'records',
          name: 'records',
          component: records
        },
        {
          path: 'records/:zoneId',
          name: 'recordInfo',
          component: recordInfo,
        },
        {
          path: 'website',
          name: 'website',
          component: website
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: contacts
        },
        {
          path: 'subnet',
          name: 'subnet',
          component: subnet
        },
        {
          path: 'ranking',
          name: 'ranking',
          component: ranking
        },
        {
          path: '404',
          name: 'home404',
          component: notFound
        },
      ]
    }
  ]
});

let getRolePromise;
function getRole() {
  if (!getRolePromise) {
    getRolePromise = $http.get('/apis/current_role');
  }
  return getRolePromise;
}

router.beforeEach((to, from, next) => {
  if (['login', 'bigshow', '404'].includes(to.name)) {
    next();
  } else {
    getRole().then(res => {
      let user = res.data;
      setUser(user);
      let authorityArr = authority[user.role];
      if (to.path === '/home/addressManage' && from.name) {
        next({ name: from.name });
        return;
      }
      if (authorityArr.includes(to.name) || to.name === 'home404') {
        next();
      } else {
        next({ name: authorityArr[0] });
      }
    }, () => next({ name: 'login' }));
  }
})

export default router;