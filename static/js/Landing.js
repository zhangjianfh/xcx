let data = {
  code: '',
  iv: '',
  encryptdata: '',
  inviter: '', //邀请者ID
  device: '', //手机型号
  version: '' //微信版本号
}



function userLoadings(wx,baseUrl,basePath,callBack){
  if(wx.getStorageSync('token')){ //登陆
    console.log('已注册')
    wx.login({
      success: function(rs) {
        console.log(rs)
        data.code = rs.code
        wx.getUserInfo({ //获取用户相关信息
          lang:'zh_CN',
          success: (userRes) => {
            console.log('登陆')
            console.log(userRes)
            wx.showToast({ title: '登陆中', icon: 'loading' })
            wx.getSystemInfo({ //获取用户 手机 系统信息
              success: function(res){
                data.device = res.model
                data.version = res.version
                data.iv = userRes.iv
                data.encryptdata = userRes.encryptedData
                let $da = {code:data.code, iv:data.iv, encryptdata:data.encryptdata, inviter:data.inviter,
                  device:data.device, version:data.version}
                loginInfo($da,baseUrl,basePath,callBack)
              },
              fail: function(res){
                callBack(false)
                console.log('fail')
                console.log(res)
              }
            })
          },
          fail(f){
            callBack(false)
            console.log('登陆中ERROR')
            console.log(f)
          }
        })
      }
    })
  }else{ //=========================注册=注册=========================
    wx.login({
      success: function(rs) {  //获取用户信息
        console.log(rs)
        data.code = rs.code
        wx.getUserInfo({
          lang:'zh_CN',
          success: (userRes) => {
            console.log('获取用户信息')
            console.log(userRes)
            wx.showToast({ title: '登陆中', icon: 'loading' })
            //获取系统信息
            wx.getSystemInfo({
              success: function(res){
                console.log(res)
                data.device = res.model
                data.version = res.version
                data.iv = userRes.iv
                data.encryptdata = userRes.encryptedData
                let $da = {code:data.code, iv:data.iv, encryptdata:data.encryptdata, inviter:data.inviter,
                  device:data.device, version:data.version}
                regInfos($da,baseUrl,basePath,callBack)
              },
              fail: function(res){
                callBack(false)
                console.log('fail')
                console.log(res)
              }
            })
          },
          fail(f){
            callBack(false)
            console.log('登陆ERROR')
            console.log(f)
          }
        })
      }
    })
  }
}

/**
 * 登陆
 * @param $da
 */
function loginInfo($da,baseUrl,basePath,callBack){
  wx.request({
    method: 'POST',
    url: ''+baseUrl+''+basePath.login+'',
    data: $da,
    header: { 'content-type': 'application/json' },
    success (res) {
      console.log('------------------------登陆---------------------')
      console.log(res)
      // $this.loginToken = res.data.user.token
      wx.setStorageSync('token',res.data.user.token)
      wx.setStorageSync('uid',res.data.user.uid)
      wx.setStorageSync('sex',res.data.user.gender)
      callBack(true)
    },
    fail(){
      callBack(false)
    }
  })
}
/**
 * 注册
 * @param $da
 */
function regInfos($da,baseUrl,basePath,callBack){
  let $this = this
  wx.request({
    method: 'POST',
    url: ''+baseUrl+''+basePath.register+'',
    data: $da,
    header: { 'content-type': 'application/json' },
    success (res) {
      console.log('-----------------注册---------------')
      console.log(res)
      wx.showToast({ title: '登陆中', icon: 'loading' })
      // $this.loginToken = res.data.user.token
      wx.setStorageSync('token',res.data.user.token)
      wx.setStorageSync('uid',res.data.user.uid)
      wx.setStorageSync('sex',res.data.user.gender)
      callBack(true)
    },
    fail(f){
      callBack(false)
      console.log('注册ERROR')
      console.log(f)
    }
  })
}

/**
 * //判断用户是否授权
 * @param callback
 *  这样使用 authUserInfo((result) => { console.log(result) })
 */
const authUserInf = (callback) => {
  wx.getSetting({
    success: (response) => {
      if (response.authSetting['scope.userInfo']) {
        return callback(true)//已授权
      }else{
        return callback(false) //未授权
      }
      // wx.authorize({
      //   scope: 'scope.userInfo',
      //   success: () => {
      //     return callback(true)
      //   },
      //   fail: () => {
      //     return callback(false)
      //   }
      // })
    }
  })
}


module.exports = {
  userLoadings:userLoadings,
  authUserInf:authUserInf
}
