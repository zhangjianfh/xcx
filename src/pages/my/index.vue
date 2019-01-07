<template>
  <div class="container">
    <div class="box">
      <div class="uinfos">
        <label id="user-id">ID:{{userId}}</label>
        <image :src="myInfo.avatar" mode="widthFix"></image>
        <h2>
          {{myInfo.name}}
          <span class="man-span" v-if="myInfo.gender == 1"><i class="icon iconfont icon-nan"></i>{{birthday}}</span>
          <span v-else-if="myInfo.gender == 2"><i class="icon iconfont icon-nv"></i>{{birthday}}</span>
          <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>{{birthday}}</span>
        </h2>
      </div>
      <div class="list">
        <ul>
          <li>
            <a href="../addin/main">
              <div class="list-left">
                <image src="../../static/img/btn_me_engag.png" mode="widthFix"></image>
                <span>我的约局</span>
              </div>
              <i class="iconfont icon-gengduo"></i>
            </a>
          </li>
          <li>
            <!--<a href="../msg/main">-->
            <a @tap="showPromp">
              <div class="list-left">
                <image src="../../static/img/btn_me_news.png" mode="widthFix"></image>
                <span>消息中心</span>
              </div>
              <i class="iconfont icon-gengduo"></i>
            </a>
          </li>
          <li>
            <a href="">
              <div class="list-left">
                <image src="../../static/img/btn_me_faq.png" mode="widthFix"></image>
                <span>联系客服</span>
              </div>
              <label id="lxkefu">support@woyue.com</label>
              <!--<i class="iconfont icon-gengduo"></i>-->
            </a>
          </li>
          <li @tap="signOut">
            <a href="">
              <div class="list-left">
                <image src="../../static/img/btn_me_exit.png" mode="widthFix"></image>
                <span>退出当前账号</span>
              </div>
              <i class="iconfont icon-gengduo"></i>
            </a>
          </li>
        </ul>
      </div>
      <Footers :isMe="true" />
    </div>
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
    <Wyprompt @promps="prompsIs" :is-hidden="isPromp" />
  </div>

</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import Footers from '../../components/Footers.vue'
import Wyprompt from '../../components/Wyprompt.vue'
import { formatDateTime }  from '../../../static/js/formaDateTime'
import { userInfos, uAvatar }  from '../../../static/js/userInfo'
import { hexMD5 }  from '../../../static/js/MD5'
import { baseUrl, basePath, imgPath }  from '../../../static/js/httpUrl'
import { userLoadings } from '../../../static/js/Landing'
import avtImg from '../../../static/img/logo.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  components: { Isreg:Isreg, Wyprompt:Wyprompt, Footers:Footers },
  template: '<Isreg/> <Wyprompt/> <Footers/>',
  data () {
    return {
      msg: '个人中心',
      sexIoc:sexIoc,
      myInfo: {},
      isLoadingShow: false,
      isPromp: false,
      userId: '',
      birthday: 18
    }
  },
  onLoad () {
    wx.removeStorage({ key: 'theme' }) //清除主题缓存
    this.myInfo.avatar = avtImg;
    this.userId = wx.getStorageSync('uid')
    if(wx.getStorageSync('token')){
      this.isLoadingShow = false
      wx.showLoading({ title: '加载中...' })
      this.getUserInfos()
    }else{
      this.isLoadingShow = true
    }
  },
  onShow(){
    wx.removeStorage({ key: 'theme' }) //清除主题缓存
  },
  mounted () {
  },
  methods: {
    prompsIs(e){
      this.isPromp = e
    },
    showPromp(){
      this.isPromp = true
    },
    onMyevent(e){
      let $this = this
      if(e){
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){
              $this.isLoadingShow = false
              $this.getUserInfos()
            }else{
              $this.isLoadingShow = true
            }
          }
        })
      }else{
        // this.adactav = []
      }
    },


    getUserInfos() {
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: {uid: parseInt(wx.getStorageSync('uid')), user: userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)},
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('------------获取用户信息---------------')
          console.log(res.data)
          wx.hideLoading()
          if(res.data.status == 0){
            if(res.data.data[0].avatar != ''){
              if(res.data.data[0].avatar.split('://')[0] != 'https' && res.data.data[0].avatar.split('://')[0] != 'http'){
                res.data.data[0].avatar = imgPath+res.data.data[0].avatar
              }
            }
            if(new Date().getFullYear() - parseInt(formatDateTime(res.data.data[res.data.data.length-1].birthday*1000, 0).split('年')[0])){
              $this.birthday = new Date().getFullYear() - parseInt(formatDateTime(res.data.data[res.data.data.length-1].birthday*1000, 0).split('年')[0])
            }else{
              $this.birthday = 18
            }
            $this.myInfo = res.data.data[0]
            console.log($this.myInfo)
          }else{
            if(res.data.message == 'not allow'){
              wx.redirectTo ({
                url: '../index/main'
              })
            }else if(res.data.message == 'token'){
              wx.redirectTo ({
                url: '../index/main'
              })
            }
          }
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    signOut () {
      wx.showModal({
        title: '提示',
        content: '是否确定退出当前账号',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.showToast({ title: '退出中', icon: 'loading' })
            // wx.removeStorage({
            //   key: 'token',
            //   success (res) {
            //     console.log(res.data)
            //   }
            // })
            // wx.removeStorageSync({
            //   key: 'token',
            //   success (res) {
            //     console.log(res.data)
            //   }
            // })
            // wx.removeStorage({
            //   key: 'uid',
            //   success (res) {
            //     console.log(res.data)
            //   }
            // })
            // wx.removeStorageSync({
            //   key: 'uid',
            //   success (res) {
            //     console.log(res.data)
            //   }
            // })
            wx.clearStorageSync()
            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            console.log(wx.getStorageSync('token'))
            console.log(wx.getStorageSync('uid'))
            wx.redirectTo ({
              url: '../index/main'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .box{padding:15px; background-color:#f3f4f8;}
  .uinfos{padding:40px 0px; background-color:#fff; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-direction:column;}
  .uinfos>image{width:80px; height:80px; border:2px solid #f3f4f8; border-radius:10px;}
  .uinfos>h2{display:flex; align-items:center; justify-content:center; margin-top:20px;}
  .uinfos>h2>span{padding:2px 6px; border-radius:14px; margin-left:10px; color:#fff; padding-left:23px;
    display:flex; align-items:center; justify-content:center; font-size:12px; position:relative;
    background:-webkit-linear-gradient(left,#ff65b4,#ff90dd); background:-o-linear-gradient(right,#ff65b4,#ff90dd);
    background:-moz-linear-gradient(right,#ff65b4,#ff90dd); background:linear-gradient(to right,#ff65b4,#ff90dd);}
  .uinfos>h2>span i{position:absolute; left:5px; font-size:12px;}

  .list{margin-top:15px; border-radius:10px; overflow:hidden;}
  .list a{position:relative; width:100%; background-color:#fff; padding:15px; display:flex; align-items:center; justify-content:space-between;}
  .list ul li{border-bottom:1px solid #f3f4f8;}
  .list-left{display:flex; align-items:center; justify-content:flex-start;}
  .list-left>image{width:25px; margin-right:15px;}
  .list-left>span{font-size:16px;}
  label#user-id{position:absolute; left:20px; top:20px; color:#969696; font-size:12px;}
  label#lxkefu{font-size:12px; color:#8F8F8F;}
</style>
