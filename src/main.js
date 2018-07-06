// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ToastPlugin, LoadingPlugin, VuxComponentListData,ConfirmPlugin, AlertPlugin  } from 'vux'
import App from './App'
import router from './router'
import store from './store'
import Qc from "./components/Qc";
import wxSdk from "./util/wxSdk";
import http from "./api/http";
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(require('vue-wechat-title'))
Vue.component(Qc.name, Qc)

Vue.prototype.$http = http
Vue.prototype.$wxSdk = wxSdk
if(process.env.NODE_ENV === 'production') {
  console.log('production');
  Vue.prototype.$ROOTURL = location.origin + location.pathname.match(/^\/\w+/g)[0] ;
} else if(process.env.NODE_ENV === 'development') {
  console.log('development');
}
Vue.prototype.imgHost = 'http://athena-1255600302.cosgz.myqcloud.com'
Vue.prototype.imgCut = 'http://athena-1255600302.picgz.myqcloud.com'
Vue.prototype.cutParam1 = '?imageView2/1/w/200/h/164'
Vue.prototype.cutParam2 = '?imageView2/1/w/750/h/360'
Vue.prototype.cutParam3 = '?imageView2/1/w/750/h/290'
Vue.prototype.cutParam4 = '?imageView2/1/w/97/h/97'
Vue.prototype.toast = function (text) {
  this.$vux.toast.show({
    text: text,
    type: 'text',
    time: 1500
  })
};

/* eslint-disable no-new */
Vue.filter('formatDate', (v) => {
  return v.replace(/^(.{16})(.*)/g, '$1')
})

Vue.filter('formatPrice', (v) => {
  return v / 100;
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
