import VueRouter from 'vue-router';
import login from './login/login.vue';
import home from './home/home.vue';
import auditlogs from './auditlogs/auditlogs.vue';
import zones from './zones/zones.vue';
import users from './users/users.vue';
import apps from './apps/apps.vue';
import groups from './groups/groups.vue';
import approveModule from './approveModule/approveModule.vue';
import zoneInfo from './zones/zoneInfo/zoneInfo.vue';

const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
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
      ]
    }
  ]
});

export default router;