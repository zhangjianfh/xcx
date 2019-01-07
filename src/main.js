import Vue from 'vue'
import App from './App'
import '../static/css/main.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

/*eslint-disable*/
export default {
  config: {
    pages: [
      'pages/actinfo/main',//活动详情
      'pages/invites/main',//朋友被邀请页面
      'pages/sucrel/main',//
      'pages/home/main',
      'pages/release/main',
      'pages/theme/main',
      'pages/index/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: '我约Lite',
      backgroundColor: '#eeeeee',
      navigationBarTextStyle: 'black'
      // 'navigationStyle':'custom'
    }
  }
}
