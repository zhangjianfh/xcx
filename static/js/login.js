let data = {
  code: '',
  iv: '',
  encryptdata: '',
  inviter: '', //邀请者ID
  device: '', //手机型号
  version: '' //微信版本号
}
let baseUrl = 'http://10.10.1.102:81'

function login(wx){
  wx.getSetting({
    success: (res_set) => {
      if(!res_set.authSetting['scope.userInfo']){
        wx.authorize({
          scope: 'scope.userInfo',
          success(s_res) {
            console.log(s_res)
          }
        })
      }else{
        console.log('已授权')
      }
    }
  })



  //获取系统信息
  wx.getSystemInfo({
    success: function(res){
      // console.log(res)
      data.device = res.model
      data.version = res.version
    },
    fail: function(res){
      console.log('fail')
      console.log(res)
    }
  })
  //获取用户信息
  wx.login({
    success: function(rs) {
      // console.log(rs)
      data.code = rs.code
      wx.getUserInfo({
        lang:'zh_CN',
        success: (res) => {
          data.iv = res.iv
          data.encryptdata = res.encryptedData
          let $da = {code:data.code, iv:data.iv, encryptdata:data.encryptdata, inviter:data.inviter,
            device:data.device, version:data.version}
          console.log($da)
          setInfos(wx,$da)
        }
      })
    }
  })

}

function setInfos(wx,$da){
  wx.request({
    method: 'POST',
    url: ''+baseUrl+'/wx/user/register',
    data: $da,
    header: { 'content-type': 'application/json' },
    success (res) {
      console.log('-------------注册------------')
      console.log(res.data)
    }
  })
}

module.exports = {
  login:login
}
