import Vue from 'vue';
import App from './app.vue';
// import './components/common';
// import './components/form';
// import './directives';

import './css/index.scss';

Vue.config.devtools = true;

new Vue({
    el:'#app',
    // store,
    render:h=>h(App) 
});