<template>
  <div class="container">
    <div class="box">
      <movable-area>
        <div class="rel-prompt" :style="{opacity}">
          <img :src="shareUser.avatar" mode="widthFix" id="share-user-avatar" />
          <h1 id="yq-name">{{shareUser.name}}</h1>
          <label>邀请你加入该局</label>
        </div>
        <movable-view direction="vertical" out-of-bounds="false" :friction="2" @change="onChange">
          <div class="surrel-content ivtcb" id="srlbox">
            <i><img class="icon-img" src="../../../static/img/btn_share_up.png" mode="widthFix" /></i>
            <div class="surrel-ctn-box">
              <ul class="yj-list-ul">
                <li>
                  <div class="yj-ctn-1">
                    <div class="yj-title-box">
                      <h4 v-if="zInfo.companion == 1">{{zInfo.subject}} · 可携带朋友</h4>
                      <h4 v-else>{{zInfo.subject}}</h4>
                    </div>
                    <div class="yj-label-box">
                      <label v-if="zInfo.pt == 8">公开局</label>
                      <label v-else-if="zInfo.pt == 4">陌生局</label>
                      <label v-else-if="zInfo.pt == 2">好友局</label>
                      <label v-else>私有局</label>

                      <label v-if="zInfo.gender == 1">限男{{zInfo.numpp}}人 </label>
                      <label v-else-if="zInfo.gender == 2">限女{{zInfo.numpp}}人 </label>
                      <label v-else-if="zInfo.gender == 4">不限男女{{zInfo.numpp}}人 </label>

                      <label v-if="zInfo.shuttle != 0">我接送</label>
                      <label v-if="zInfo.pay != 0" class="illpay">我买单</label>
                    </div>
                    <div class="yj-addr-date-box">
                      <div class="yj-date-box">
                        <p class="yj-date-mday">{{ymd}}</p>
                        <p class="yj-date-time">
                          <label class="yj-date-today" v-if="week == '今天'">{{week}}</label>
                          <label class="yj-date-today yj-date-gq" v-else>{{week}}</label>
                          <label>{{times}}</label>
                        </p>
                      </div>
                      <div class="yj-addr-box">
                        <p class="yj-addr-city"><label class="activ-addr-label">{{zInfo.city}}</label><label v-show="isLocation">(距离:{{distance}}km)</label></p>
                        <p>{{zInfo.geon}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="yj-ctn-2">
                    <navigator class="avt-nav-main" :url="'../friend/main?uid='+shareUser.uid+'&name='+shareUser.name+'&gender='+shareUser.gender+'&avatar='+shareUser.avatar+''">
                    <div class="yj-avatar-info">
                      <img :src="shareUser.avatar" />
                      <div class="yj-nickname">
                        <p class="yj-nickname-p">
                          <label id="fx-name-label">{{shareUser.name}}</label>
                          <span class="man-span" v-if="shareUser.gender == 1"><i class="icon iconfont icon-nv"></i>18</span>
                          <span v-else-if="shareUser.gender == 2"><i class="icon iconfont icon-nv"></i>18</span>
                          <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>18</span>
                        </p>
                        <p class="yj-xr-p">信任值{{bsIbfo.score}}分</p>
                      </div>
                    </div>
                    <div class="yj-fb-time">{{ctime}}</div>
                    </navigator>
                  </div>
                </li>
                <li class="pp-info-li">
                  <!--<div class="authorize-y" v-if="isAuthorize">-->
                  <div class="authorize-y">
                    <div class="participate-people">
                      <div> <label>已报名</label> <p>{{total}}人</p> </div>
                      <div v-if="total < zInfo.nmin"> <label>还差</label> <p>{{zInfo.nmin - total}}人</p> </div>
                      <div v-else> <label>距离满员</label> <p>{{zInfo.nmax - total}}人</p> </div>
                      <div> <label>报名截止</label> <p>{{endDate}}</p> </div>
                    </div>
                    <div class="chengju" v-if="total >= zInfo.nmin"><img src="../../../static/img/icon_organized@2x.png" mode="widthFix" /><label>已成局</label></div>
                    <div class="participate-people-Avatar">
                      <ul class="pp-avatar-ul">
                        <ol><img id="img-yz" src="../../../static/img/icon_main_lord.png" mode="widthFix" /><img /></ol>
                        <ol><img /></ol>
                        <ol><img /></ol>
                        <ol><img /></ol>
                        <ol><img /></ol>
                        <ol><img /></ol>
                      </ul>
                      <ul class="pp-avatar-img-ul" :class="{'paiul':isBg}">
                        <ol v-for="(cava,idx) in doinImg" :key="idx">
                          <navigator class="avt-main" :url="'../friend/main?uid='+cava.uid+'&name='+cava.name+'&gender='+cava.gender+'&avatar='+cava.avatar+''">
                            <img :src="cava.avatar" mode="widthFix" />
                          </navigator>
                        </ol>
                      </ul>
                    </div>
                  </div>
                  <!--<div class="authorize-n" v-else>-->
                    <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" id="authorize-btn">授权查看更多信息</button>-->
                  <!--</div>-->
                </li>
                <li class="introduction" v-if="files.length > 0">
                  <h2>活动介绍</h2>
                  <div class="idtimg">
                    <image v-for="(item,index) in files" :src="item" @click="predivImage(item)" :key="index" mode="aspectFill"></image>
                  </div>
                  <div class="idt-text">
                    <text>{{zInfo.decription}}</text>
                  </div>
                </li>
                <li class="introduction" v-else-if="zInfo.decription != ''">
                  <h2>活动介绍</h2>
                  <div class="idtimg">
                    <image v-for="(item,index) in files" :src="item" @click="predivImage(item)" :key="index" mode="aspectFill"></image>
                  </div>
                  <div class="idt-text">
                    <text>{{zInfo.decription}}</text>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </movable-view>

        <div class="bottom-box" v-show="isAuthorize">
          <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">进入该局</button>-->
          <div v-if="!vtf">
            <div class="surrel-share" v-if="isMe">
              <button id="yijiar">已加入该局</button>
              <button class="share-wx" open-type="share" id="share-wx">邀请好友</button>
            </div>
            <div class="surrel-share ss-box" v-else>
              <button v-if="zInfo.companion == 1" @tap="signUp">我要报名</button>
              <button v-else @tap="addAct">我要报名</button>
            </div>
          </div>
          <div v-else>
            <button id="yijiar">等待审核</button>
          </div>
        </div>
      </movable-area>
    </div>

    <div class="peoplenum" v-show="lnShow">
      <div class="tmpclick" @click="hdpl($event)"></div>
      <div class="peoplenum-box">
        <div class="peoplenum-cneter">
          <h2>申请报名</h2>
          <p>确认你的报名人数</p>
          <div class="tx-people"><label @click="reduce">-</label><input type="number" disabled="true" v-model="pnum" /><label @click="add">+</label></div>
          <button @tap="addAct">确定</button>
        </div>
      </div>
    </div>

    <div class="share-img">
      <div class="share-img-box">
        <canvas canvas-id="myCav"></canvas>
      </div>
    </div>
    <!--<Isreg/>-->
    <!--授权页面-->
    <div class="isreg-box" v-show="!isAuthorize">
      <div class="shouquan">
        <div class="shouquan-box" :class="{'shouquanboxhd':isShow}">
          <div class="sq-title-p">
            <div class="prp-img"><img src="../../../static/img/icon_pop_tips@2x.png" mode="widthFix" /></div>
            <div>
              <h4>用户授权提示</h4>
              <p>按照以下步骤操作</p>
            </div>
          </div>
          <div class="sq-cotent">正常使用“我约Lite”小程序需允许微信授权，请点击“下一步”后“允许”授权。</div>
          <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" class="islogins">下一步</button>
        </div>
      </div>
    </div>

    <div class="deviant" v-show="sitIsShow">
      <div class="deviant-ctn">
        <div class="deviant-box">
          <p class="deviant-title">提示</p>
          <p>活动异常-前往活动广场</p>
          <p><navigator open-type="reLaunch" hover-class="none" href="/pages/home/main" @tap="navClickState">确定</navigator></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import '../../../static/css/surrel.css'
import '../../../static/icon/iconfont.css'
import { baseUrl, imgPath, uploadFile, basePath }  from '../../../static/js/httpUrl'
import { formatDateTime,GetDistance2, dateCount }  from '../../../static/js/formaDateTime'
import { addrRegExp } from '../../../static/js/addrRegExp'
import { hexMD5 }  from '../../../static/js/MD5'
import { userInfos, uAvatar }  from '../../../static/js/userInfo'
import { createImg } from '../../../static/js/shareCreatImg'
import shareImg from '../../../static/img/img_share_def.png'
import daImg from '../../../static/img/default_avatar.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  data () {
    return {
      msg: '被邀请者看到的页面',
      sexIoc:sexIoc,
      pnum: 1,
      lnShow: false,
      shareUser:{},
      zInfo:{},
      files: [],
      isAuthorize: false,
      isLocation: true,
      total: 0,
      latitude: 0, //纬度
      longitude: 0, //经度
      distance: 0, //距离
      ymd: 0,
      week: '',
      times: '',
      ctime: '',
      endDate: '',
      regs: {
        inviter: 0, //邀请人ID
      },
      doinImg: [],
      shareImg: shareImg,
      avatarImg: '',
      shareGid: 0,
      isMe: false,
      isBg:false,
      opacity:1,
      bsIbfo:{},
      vtf: false,
      device: '',
      sitIsShow:false,
    }
  },
  onLoad (opt) {
    this.files = []
    let $this = this
    // opt = {'gid':'765566', 'inviter':'715587'}
    // gid:765566 inviter:715587
    console.log('====================opt==============opt==============opt===========')
    console.log(opt)
    this.shareGid = parseInt(opt.gid) //opt.gid 718961
    this.pageLoadInfo(parseInt(opt.gid)) //opt.gid 718961
    this.regs.inviter = parseInt(opt.inviter) //opt.inviter 邀请人ID 353153
    this.getSetting()


    if(wx.getStorageSync('token')){
      $this.isAuthorize = true

      console.log(parseInt(wx.getStorageSync('uid')))

      if(this.regs.inviter == parseInt(wx.getStorageSync('uid'))){
        $this.isMe = true
      }else{
        $this.isMe = false
      }

    }else{
      wx.getSystemInfo({
        success: function(res){
          $this.regs.device = res.model
          $this.regs.version = res.version
          $this.userReg($this.regs)
        },
        fail: function(res){
          console.log('fail')
          console.log(res)
        }
      })
    }

    var query = wx.createSelectorQuery();
    query.select('#srlbox').boundingClientRect(function (rect) {
      console.log('............................................................')
      console.log(rect)
      console.log(rect.width)
    }).exec()

    let vtf = {}
    vtf.user = userInfos(wx.getStorageSync('uid'),wx.getStorageSync('token'),Date.parse(new Date())/1000,hexMD5)
    vtf.gid = parseInt(opt.gid)
    this.vftAdActvit(vtf)

  },
  mounted () {
  },
  onHide(){
    this.lnShow = false
  },
  methods: {
    navClickState(){
      wx.setStorageSync('navsta', 'y')
    },
    pageLoadInfo (_gid) {
      console.log('======================pageLoadInfopageLoadInfo=======================')
      console.log('GID:' + _gid)
      // wx.showToast({ title: '加载中', icon: 'loading',duration: 5000 })
      let $this = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          $this.isLocation = true
          console.log('-------------------getLocation----------------------')
          console.log(res)
          $this.latitude = res.latitude
          $this.longitude = res.longitude
          $this.getDataInfo(_gid,$this)
        },
        fail(f){
          $this.isLocation = false
          $this.latitude = 0
          $this.longitude = 0
          $this.getDataInfo(_gid,$this)
        }
      })

    },

    getSetting () { //验证是否授权
      let $this = this
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              lang:'zh_CN',
              success: (res) => {
                console.log('用户已授权过')
                if(wx.getStorageSync('token')){
                  // $this.isAuthorize = true
                }else{
                  $this.isAuthorize = false
                }
              }
            })
          } else {
            $this.isAuthorize = false
            console.log('用户未授权')
          }
        }
      })
    },
    bindGetUserInfo (e) { //用户授权
      let $this = this
      if (e.mp.detail.rawData){
        $this.userReg($this.regs)
      } else {
        console.log('用户按了拒绝按钮')
      }
    },
    //点击进入该局
    signUp(){
      this.lnShow = true
    },
    add () {
      if(this.pnum <= (this.zInfo.nmax - this.total)){
        this.pnum++
      }
    },
    reduce () {
      if(this.pnum > 1){
        this.pnum--
      }
    },
    //确定加入该局
    addAct(){
      wx.showToast({ title: '加载中', icon: 'loading' })
      let objData = {}
      objData.user = {}
      objData.user = userInfos(wx.getStorageSync('uid'),wx.getStorageSync('token'),this.zInfo.tm,hexMD5)
      objData.inviter = this.regs.inviter //邀请人ID
      objData.count = this.pnum
      objData.gid = this.shareGid

      console.log(objData)

      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.join+'',
        data: objData,
        header: { 'content-type': 'application/json' },
        success (res) {
          wx.hideToast()
          if(res.data.data == 1){
            wx.redirectTo ({
              url: '../signup/main?data=1'
            })
          }else{
            wx.redirectTo ({
              url: '../signup/main?data=2'
            })
          }
        }
      })
    },
    hdpl (ev) {
      this.lnShow = false
    },


    userReg($reg){
      let $this = this
      wx.login({  //获取用户信息
        success: function(rs) {
          $reg.code = rs.code
          wx.getUserInfo({
            lang:'zh_CN',
            success: (res) => {
              wx.getSystemInfo({
                success: function(sys){
                  $this.regs.device = sys.model
                  $this.regs.version = sys.version
                  $reg.iv = res.iv
                  $reg.encryptdata = res.encryptedData
                  console.log($reg)
                  $this.regInfos($reg)
                },
                fail: function(res){
                  console.log('fail')
                  console.log(res)
                }
              })

            },
            fail(f){
              console.log('获取用户信息ERROR')
              console.log(f)
            }
          })
        },
        fail(lf){
          console.log('wx.login -- ERROR')
          console.log(lf)
        }
      })
    },
    regInfos($da){ //注册
      let $this = this
      wx.showToast({ title: '登陆中', icon: 'loading' })
      wx.request({ //注册
        method: 'POST',
        url: ''+baseUrl+''+basePath.register+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('注册')
          console.log(res)
          wx.setStorageSync('token',res.data.user.token)
          wx.setStorageSync('uid',res.data.user.uid)
          wx.hideToast()

          if(wx.getStorageSync('token')){
            console.log('tokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentoken')
            $this.isAuthorize = true
            $this.getDataInfo($this.shareGid,$this)
          }

        },
        fail(f){
          console.log('注册ERROR')
          console.log(f)
        }
      })
    },

    //获取数据信息
    getDataInfo(_gid,$this){
      var $this = this
      console.log('=================================getDataInfogetDataInfo====================================')
      console.log('_gid: '+_gid)
      wx.request({ //获取信息
        method: 'POST',
        url: ''+baseUrl+''+basePath.sucrel+'',
        data: {gid:_gid},
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('--------------------------获取基本信息数据-------------------------------')
          console.log(res)
          if(res.data.status == 0){
            if($this.isAuthorize){
              let $uDa = {}
              $uDa.uid = []
              $uDa.user = {}
              $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
              for(let i = 0; i < res.data.data.mems.length; i++){
                console.log(res.data.data.mems[i].uid)
                $uDa.uid.push(res.data.data.mems[i].uid)
              }
              if(res.data.data.images.length >= 1){
                for(let i = 0; i < res.data.data.images.length; i++){
                  $this.files.push(''+imgPath+''+res.data.data.images[i])
                }
              }
              console.log('--------------------------$uDa$uDa$uDa$uDa-------------------------------')
              console.log($this.files)
              console.log($uDa)
              $this.doinImg = []
              $this.getUserInfos($uDa)
              $this.bsGetInfo($uDa)
            }
            if(res.data.data.nmin-1 == res.data.data.nmax-1){
              res.data.data.numpp = res.data.data.nmin-1
            }else{
              res.data.data.numpp = (res.data.data.nmin-1)+'-'+(res.data.data.nmax-1)
            }
            res.data.data.city = addrRegExp(res.data.data.city)
            $this.zInfo = res.data.data;
            if(res.data.data.user.avatar.split('://')[0] != 'https' && res.data.data.user.avatar.split('://')[0] != 'http'){
              res.data.data.user.avatar = imgPath+res.data.data.user.avatar
            }else{
              res.data.data.user.avatar = daImg
            }
            $this.shareUser = res.data.data.user
            console.log('--------------------------zInfozInfozInfozInfo-------------------------------')
            console.log($this.zInfo)
            wx.hideToast()
            $this.total = res.data.data.mems.length
            $this.ymd = formatDateTime(res.data.data.tm*1000, 0)
            $this.week = formatDateTime(res.data.data.tm*1000, 1)
            $this.times = formatDateTime(res.data.data.tm*1000, 2)
            $this.ctime = dateCount(res.data.data.ctm)  //formatDateTime(res.data.data.ctm*1000, 0)
            console.log($this.ctime)
            $this.endDate = formatDateTime(res.data.data.etm*1000, 0)
            $this.distance = GetDistance2($this.latitude, $this.longitude, res.data.data.geom.lat, res.data.data.geom.lon)

          }else{
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            $this.sitIsShow = true
            console.log($this.sitIsShow)
          }
        },
        fail(fl){
          console.log('aaaaaaaaa')
        }
      })
    },

    getUserInfos($da) {
      let $this = this
      console.log('--------------------------------------------------')
      console.log($da)
      // $da.extra = true
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('12222222222222222222')
          console.log(res)
          if(res.data.status == 0){
            uAvatar(res.data.data, 1, imgPath)

            for(let i = res.data.data.length-1; i>=0; i--){
              $this.doinImg.push(res.data.data[i])
            }
            for(let i = 0; i < res.data.data.length; i++){
              if(parseInt(wx.getStorageSync('uid')) === parseInt(res.data.data[i].uid)){
                $this.isMe = true
                break
              }else{
                $this.isMe = false
              }
            }
            // doinImg.push('http://www.aydtgt.com/UploadFiles/img_2_934709179_540878833_27.jpg')
            if($this.doinImg.length >= 5){
              $this.isBg = true
            }else{
              $this.isBg = false
            }
            console.log('=================================Ava=====================================')
            console.log($this.doinImg)
            $this.shareFdq()
          }else{
            console.log('*************多端登陆***************')
            if(res.data.message == 'not allow'){
              $this.isAuthorize = false
            }else if(res.data.message == 'token'){
              $this.isAuthorize = false
            }
          }
        },
        fail (nogo) {
          console.log('====================USER--info---ERROR=====================')
          console.log(nogo)
        }
      })
    },

    bsGetInfo($da){
      let $this = this
      $da.extra = true
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          if(res.data.status == 0){
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
            console.log(res.data.data)
            $this.bsIbfo = res.data.data[0]
          }else{
            if(res.data.message == 'not allow'){
              $this.isAuthorize = false
            }else if(res.data.message == 'token'){
              $this.isAuthorize = false
            }
          }
        },
        fail (nogo) {
        }
      })
    },

    vftAdActvit(objData){
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.application+'',
        data: objData,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('-----------------验证当前用户是否加入该局-----------------')
          console.log(objData)
          console.log(res)
          console.log(res.data.data)
          $this.vtf = res.data.data
        },
        fail(fal){
          console.log(fal)
        }
      })
    },

    //分享到朋友圈
    shareFdq () {
      var $this = this
      const ctx = wx.createCanvasContext('myCav')
      createImg(wx,ctx,$this,uploadFile,imgPath)
    },

    onChange(e){
      if(e.mp.detail.y >= 0){
        this.opacity = 1
      }else if(e.mp.detail.y <= -140){
        this.opacity = 0
      }else{
        this.opacity = 1 - parseInt(Math.abs(e.mp.detail.y) / 10)/10
      }
    },

    predivImage (url) { //图片预览
      let $this = this
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: $this.files, // 需要预览的图片http链接列表
        success: res => {
        }
      })
    },

  },
  created () {
  },
  /**
   * 转发
   * @param res
   * @returns {{title: string, path: string, imageUrl: string}}
   */
  onShareAppMessage(res){
    var $this = this
    console.log(res)
    if(res.from == 'button'){
      console.log(res.target)
    }
    return {
      title: '我发起了一个'+this.zInfo.subject+'约局,一起来吧!',
      path: 'pages/invites/main?gid='+$this.shareGid+'&inviter='+wx.getStorageSync('uid')+'',
      imageUrl: $this.shareImg,
      success(re){
        //在页面onLoad()实践中实现接口  onLoad(opt)
        wx.showShareMenu({
          //返回分享目标信息
          withShareTicket: true
        })
      }
    }
  }
}
</script>

<style scoped>
.box{z-index:3;}
.bottom-box{position:fixed; padding:10px 20px; background-color:#fff; bottom:0px; left:0px; width:100%; border-top:1px solid #e8ebf0;}
.bottom-box>button{background-color:#238EFA; color:#fff; font-size:18px; font-weight:700; height:40px; line-height:40px;}
.peoplenum{position:fixed; width:100%; height:100%; background:rgba(0,0,0,.5); top:0px; left:0px; z-index:999;}
.peoplenum-box{position:absolute; bottom:0px; left:0px; width:100%; padding:20px;}
.tmpclick{position:absolute; width:100%; height:100%; top:0px; left:0px; z-index:1;}
.peoplenum-cneter{background-color:#fff; width:100%; position:relative; padding:15px; z-index:2;}
.peoplenum-cneter>h2{font-size:20px; color:#007EFA; text-align:center;}
.peoplenum-cneter>p{text-align:center; font-size:17px; color:#7A7A7A; margin-top:10px;}
.tx-people{display:flex; align-items:center; justify-content:center; margin:15px 0px;}
.tx-people>input{width:70px; height:40px; text-align:center; border-top:1px solid #dcdcdc; border-bottom:1px solid #dcdcdc;}
.tx-people>label{width:40px; height:40px; background-color:#dcdcdc; color:#fff; font-size:20px; font-weight:700; display:flex; align-items:center; justify-content:center;}
.peoplenum-cneter>button{background-color:#007efa; color:#fff; font-size:20px; font-weight:700; border-radius:0px;}
.peoplenum-cneter>button:after{border:none !important;}
img#share-user-avatar{width:38px; height:38px; border-radius:5px;}
.participate-people-Avatar{padding:5px 15px;}
img#img-yz{width:20px !important; position:absolute; top:-10px; left:18px; background-color:#fff;}
ul.pp-avatar-ul{display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap;}
ul.pp-avatar-ul>ol{width:57px; height:57px; padding:5px; border-radius:5px; position:relative;}
img#img-yz{width:20px !important; position:absolute; top:-10px; left:18px; background-color:#fff;}
ul.pp-avatar-ul>ol>img{display:inline-block; width:100%; height:100%; background-color:#e8ebf0; border-radius:5px;}
/*display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap;*/
ul.pp-avatar-img-ul{position:absolute; display:inline-block; top:5px; left:15px; width:calc(100% - 30px);
  overflow-x:auto; white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all;}
.paiul{background-color:#fff;}
ul.pp-avatar-img-ul>ol{display:inline-block; width:57px; height:57px; padding:5px; border-radius:5px;}
ul.pp-avatar-img-ul>ol>img{display:inline-block; width:100%; height:100%; vertical-align:middle; border-radius:5px;}
.authorize-n{padding:10px;}
#authorize-btn{font-size:14px; background-color:#fff;}

.surrel-share>button{margin:0px; margin:0px 20px;}

button#yijiar{background-color:#e8ebf0; color:#b3b6b9;}
button#share-wx{background-color:#1c67ee; color:#fff;}
.introduction>h2{padding-left:10px; padding-bottom:10px;}
h1#yq-name,#fx-name-label{max-width:100px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;}
.activ-addr-label{max-width:121px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;}

.deviant{position:fixed; width:100%; height:100%; z-index:999; top:0px; left:0px;}
.deviant-ctn{position:relative; width:100%; height:100%; z-index:999; background:rgba(0,0,0,.5); top:0px; left:0px; display:flex; align-items:center; justify-content:center;}
.deviant-box{padding:20px 30px; background-color:#fff; border-radius:4px;}
.deviant-box>p{position:relative; font-size:16px;}
.deviant-box>p:nth-child(1){margin-bottom:20px;}
.deviant-box>p>navigator{background-color:#238EFA !important; font-size:16px; color:#fff; height:30px; width:80px; line-height:30px;
text-align:center; border-radius:4px;}
.deviant-box>p:nth-child(3){height:25px; display:flex; align-items:center; justify-content:flex-end; margin-top:20px;}
</style>
