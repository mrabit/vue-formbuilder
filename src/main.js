// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview';
import 'iview/dist/styles/iview.css'
import cascaderSelect from './components/custom_form/components/cascader-multi';
import uploadCustom from './components/custom_form/components/Uploads';

import axios from 'axios';

Vue.config.productionTip = false
Vue.use(iview);
Vue.use(cascaderSelect);
Vue.use(uploadCustom);

axios.defaults.baseURL = '/apis';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
