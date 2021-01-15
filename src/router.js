import VueRouter from 'vue-router';
import $http from '@/http';

import login from './login/login.vue';
import home from './home/home.vue';
import auditlogs from './auditlogs/auditlogs.vue';
import zones from './zones/zones.vue';
import users from './users/users.vue';
import apps from './apps/apps.vue';
import groups from './groups/groups.vue';
import approveModule from './approveModule/approveModule.vue';
import approveList from './approveList/approveList.vue';
import zoneInfo from './zones/zoneInfo/zoneInfo.vue';
import domains from './domains/domains.vue';
import sslCertificates from './sslCertificates/sslCertificates.vue';
import icps from './icps/icps.vue';
import bigshow from './bigshow/bigshow.vue';

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/bigshow', name: 'bigshow', component: bigshow },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'auditlogs',
          component: auditlogs
        },
        {
          path: 'zones',
          component: zones,
        },
        {
          path: 'zones/:zoneId',
          component: zoneInfo,
        },
        {
          path: 'users',
          component: users
        },
        {
          path: 'apps',
          component: apps
        },
        {
          path: 'groups',
          component: groups
        },
        {
          path: 'approveModule',
          component: approveModule
        },
        {
          path: 'approveList',
          component: approveList
        },
        {
          path: 'domains',
          component: domains
        },
        {
          path: 'sslCertificates',
          component: sslCertificates
        },
        {
          path: 'icps',
          component: icps
        }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (['login', 'bigshow'].includes(to.name)) {
    next();
  } else {
    $http.get('/apis/current_role').then(() => {
      next();
    }, () => next({ name: 'login' }));
  }
})

export default router;