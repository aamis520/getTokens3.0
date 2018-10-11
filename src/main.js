// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import VueClipboard from 'vue-clipboard2'
// import wx from 'weixin-js-sdk'
import 'mint-ui/lib/style.css'
import './assets/css/index.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import MintUI from 'mint-ui'
import moment from 'moment'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueScroller from 'vue-scroller'
Vue.prototype.moment = moment
Vue.prototype.changeTime = time => moment(time).startOf('minute').fromNow().replace(/hours?/, '小时').replace('ago', '前').replace(/days?/, '天').replace(/minutes?/, '分钟').replace(/\ban?/, '1').replace(/months?/, '个月').replace(/\byears?/, '年').replace(/\s/g, '').replace('fewseconds', '分钟')
Vue.use(MintUI) // 注册应用哦mint-ui
Vue.use(VueClipboard)
Vue.use(VueScroller)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    from.meta.savedPosition = document.body.scrollTop
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueClipboard,
  components: {
    App
  },
  template: '<App/>'
})
