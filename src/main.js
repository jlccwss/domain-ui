import Vue from 'vue';
import App from './app.vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'

import router from './router';

import 'element-ui/lib/theme-chalk/index.css';
import './filter';
import './css/index.scss';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter)

document.onkeydown = function(e) {
  if (e.keyCode == 13) {
      return false;
  }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
