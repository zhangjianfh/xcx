<template>
  <div class="container">
    <div class="box">
      <div class="lg-title-p">
        <p><img id="login-title-img" src="../../../static/img/icon_login_text.png" mode="widthFix" /></p>
        <p>见面不等待，约局就现在</p>
      </div>
      <div>
        <img src="../../../static/img/logo.png" mode="widthFix" />
      </div>
      <div class="lg-box">
        <!--bindgetuserinfo="onGotUserInfo"-->
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">登陆</button>
        <p class="login-prm">下载我约APP, 探索更多精彩活动></p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { baseUrl, basePath }  from '../../../static/js/httpUrl'
export default{
  data () {
    return {
      msg: '登陆',
      userInfo: {},
      code: '',
      iv: '',
      loginToken: '',
      encryptdata: '',
      inviter: '', //邀请者ID
      device: '', //手机型号
      version: '' //微信版本号
    }
  },
  onLoad (){
    wx.setNavigationBarTitle({
      title: ' '
    })
  },
  mounted () {
    let $this = this
    //获取系统信息
    wx.getSystemInfo({
      success: function(res){
        $this.device = res.model
        $this.version = res.version
      },
      fail: function(res){
        console.log('fail')
        console.log(res)
      }
    })
    if(this.loginToken){
      console.log('111111111111111111111111')
      if(console.log(wx.getStorageSync('token'))){
        wx.removeStorageSync({
          key: 'token',
          success (res) {
            console.log(res.data)
          }
        })
        wx.removeStorageSync({
          key: 'uid',
          success (res) {
            console.log(res.data)
          }
        })
      }
      console.log('-------------------Login----------------------')
      console.log(this.loginToken)
      this.getSetting()
    }
  },
  methods: {
    getSetting () { //验证是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              lang:'zh_CN',
              success: (res) => { //用户已授权过
                console.log('用户已授权111')
              }
            })
          } else { //用户未授权

          }
        }
      })
    },
    getUserInfo1(){ //判断用户微信版本是否可用
      if(wx.canIUse('button.open-type.getUserInfo')){
        console.log('用户版本可用')
      }else{
        console.log('请升级微信版本')
      }
    },
    bindGetUserInfo (e) { //用户授权
      let $this = this
      if (e.mp.detail.rawData){
        console.log('用户按了允许授权按钮')
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        console.log(wx.getStorageSync('token'))
        if(wx.getStorageSync('token')){ //登陆
          console.log('已注册')
          wx.login({
            success: function(rs) {
              console.log(rs)
              $this.code = rs.code
              wx.getUserInfo({
                lang:'zh_CN',
                success: (res) => {
                  wx.showToast({ title: '登陆中', icon: 'loading' })
                  $this.iv = res.iv
                  $this.encryptdata = res.encryptedData
                  let $da = {code:$this.code, iv:$this.iv, encryptdata:$this.encryptdata, inviter:$this.inviter,
                    device:$this.device, version:$this.version}
                  $this.loginInfo($da)
                  wx.redirectTo ({
                    url: '../home/main'
                  })
                },
                fail(f){
                  console.log('登陆中ERROR')
                  console.log(f)
                }
              })
            }
          })
        }else{ //登陆
          wx.login({  //获取用户信息
            success: function(rs) {
              console.log(rs)
              $this.code = rs.code
              wx.getUserInfo({
                lang:'zh_CN',
                success: (res) => {
                  console.log('登陆')
                  wx.showToast({ title: '登陆中', icon: 'loading' })
                  $this.iv = res.iv
                  $this.encryptdata = res.encryptedData
                  let $da = {code:$this.code, iv:$this.iv, encryptdata:$this.encryptdata, inviter:$this.inviter,
                    device:$this.device, version:$this.version}
                  $this.regInfos($da,$this)
                },
                fail(f){
                  console.log('登陆ERROR')
                  console.log(f)
                }
              })
            }
          })
        }
      } else {
        console.log('用户按了拒绝按钮')
      }
    },
    regInfos($da){
      let $this = this
      wx.request({ //注册
        method: 'POST',
        url: ''+baseUrl+''+basePath.register+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('注册')
          wx.showToast({ title: '登陆中', icon: 'loading' })
          $this.loginToken = res.data.user.token
          wx.setStorageSync('token',res.data.user.token)
          wx.setStorageSync('uid',res.data.user.uid)
          wx.setStorageSync('sex',res.data.user.gender)
          wx.redirectTo ({
            url: '../home/main'
          })
        },
        fail(f){
          console.log('注册ERROR')
          console.log(f)
        }
      })
    },

    loginInfo($da){ //登陆
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.login+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('------------------------登陆---------------------')
          console.log(res)
          $this.loginToken = res.data.user.token
          wx.setStorageSync('token',res.data.user.token)
          wx.setStorageSync('uid',res.data.user.uid)
          wx.setStorageSync('sex',res.data.user.gender)
          wx.redirectTo ({
            url: '../home/main'
          })
        }
      })
    }

  },
  created () {
  }
}
</script>

<style scoped>
.box{display:flex; align-items:center; justify-content:space-around; flex-direction:column;}
.lg-title-p>p,.lg-title-p,.lg-box{position:relative; width:100%;}
.lg-title-p{text-align:center; font-size:12px;}
.lg-title-p>p{ margin-bottom:15px;}
.lg-title-p>p>img#login-title-img{width:30%;}
.lg-box>button{position:relative; width:50%; background-color:#fff; color:#238EFA; font-size:26px; font-weight:600;}
.lg-box>button::after{ position:absolute; border:none; content:"\20"; width:25px; height:24px;
  background-image:url("../../../static/img/btn_main_login.png"); top:28px; left:130px;}
p.login-prm{text-align:center; font-size:14px; color:#ABABAF; padding-top:20px;}
</style>
