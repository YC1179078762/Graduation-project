import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import "./assets/font_qflggrecr9e/iconfont.css"
import 'vant/lib/index.less';
import './assets/css/style.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Vant);
Vue.config.productionTip = false
import 'lib-flexible/flexible.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
