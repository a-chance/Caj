// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// rem h5 适配
// import 'amfe-flexible/index.js'

Vue.config.productionTip = false


// 引入基础CSS文件
import './assets/css/base.css'
import './assets/css/border.css'

// 引入自定义方法JS文件
import round from './assets/js'
Vue.use(round)

// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 引入 YDUI框架
import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';

Vue.use(YDUI)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>', 
  render: h => h(App)
})
