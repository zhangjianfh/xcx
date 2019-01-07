var defaultAvatar = require('../../static/img/default_avatar.png')
/**
 * 公用user对象
 * @param wxStorId ： 存储的id --- wx.getStorageSync('uid')
 * @param wxStorToken 存储的用户token  --- wx.getStorageSync('token')
 * @param tm 活动开始时间
 * @param MD5 MD5 "token": hash(tm, "Token", token)
 */
function userInfos(wxStorId,wxStorToken,tm,MD5){
  let user = {uid: 0, token: '', tm:0}
  user.uid = parseInt(wxStorId)
  user.tm = parseInt(tm)
  user.token = MD5(tm+'Token'+wxStorToken)
  return user
}

function uAvatar(data, type, imgPath){
  //头像 路径处理
  if(type == 0){
    if(data.user.avatar != ''){
      if(data.user.avatar.split('://')[0] != 'https' && data.user.avatar.split('://')[0] != 'http'){
        data.user.avatar = imgPath+data.user.avatar
      }
    }else{
      data.user.avatar = defaultAvatar
    }
  }else if(type == 1){
    for(let i = 0; i < data.length; i++){
      if(data[i].avatar != ''){
        if(data[i].avatar.split('://')[0] != 'https' && data[i].avatar.split('://')[0] != 'http'){
          data[i].avatar = imgPath+data[i].avatar
        }
      }else{
        data[i].avatar = defaultAvatar
      }
    }
  }
}

function adActivUinfo($data,item){
  $data.tIndex = item
}


module.exports = {
  userInfos:userInfos,
  uAvatar:uAvatar,
  adActivUinfo:adActivUinfo
}
