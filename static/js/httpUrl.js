const baseUrl = 'https://www.woyue.com'
const basePath = {
  post: '/wy/posts/post',
  list: '/wy/posts/lists', //获取约局活动列表
  info: '/wy/posts/info',
  join: '/wy/posts/join',
  application: '/wy/posts/status/application', //判断用户是否参加过 某个活动

  joint: '/wy/posts/joint',
  register: '/wy/user/register', //登陆
  login: '/wy/user/login',
  userPosts: '/wy/posts/user/posts', //用户的约局
  userApply: '/wy/posts/user/apply', //我申请的约局
  userJoin: '/wy/posts/user/join', //我加入的约局
  user: '/user/info',
  sucrel: '/wy/posts/info', //发布成功
  themeHot: '/wy/system/config?cfg=wy_categorys_recommend',
  themeList: '/wy/system/config?cfg=wy_categorys'
}
const imgPath = 'https://www.woyue.com/file/'
const uploadFile = 'https://www.woyue.com/file/'
module.exports = {
  baseUrl: baseUrl,
  basePath: basePath,
  imgPath: imgPath,
  uploadFile: uploadFile
}

/**内网**/
/**const baseUrl = 'https://dev.wy.woyue.com'
const basePath = {
  post: '/wy/posts/post',
  list: '/wy/posts/lists', //获取约局活动列表
  info: '/wy/posts/info',
  join: '/wy/posts/join',
  application: '/wy/posts/status/application', //判断用户是否参加过 某个活动

  joint: '/wy/posts/joint',
  register: '/wy/user/register', //登陆
  login: '/wy/user/login',
  userPosts: '/wy/posts/user/posts', //用户的约局
  userApply: '/wy/posts/user/apply', //我申请的约局
  userJoin: '/wy/posts/user/join', //我加入的约局
  user: '/user/info',
  sucrel: '/wy/posts/info', //发布成功
  themeHot: '/wy/system/config?cfg=wy_categorys_recommend',
  themeList: '/wy/system/config?cfg=wy_categorys'
}
const imgPath = 'dev.cdn.woyue.com:8080/file/'
const uploadFile = 'dev.cdn.woyue.com:8080/file/'
module.exports = {
  baseUrl: baseUrl,
  basePath: basePath,
  imgPath: imgPath,
  uploadFile: uploadFile
}**/
