<template>
  <div class="container">
    <div class="box">
      <movable-area>
        <div class="rel-prompt" :style="{opacity}">
          <view class="group">
            <block iconColor="green">
              <icon type="success" size="30"/>
            </block>
          </view>
          <h1>发布成功</h1>
        </div>
        <div class="surrel-share" :style="{opacity}">
          <!--@tap="shareFdq(0)"-->
          <button class="share-pyq"><img src="../../../static/img/btn_share_pyq.png" mode="widthFix" /></button>
          <!--@tap="shareFdq(1)"-->
          <button class="share-wx" open-type="share"><img src="../../../static/img/btn_share_weixin.png" mode="widthFix" /></button>
        </div>
        <!--<image :src="shareImg" mode="center"></image>-->
        <movable-view direction="vertical" out-of-bounds="false" :friction="2" @change="onChange">
          <div class="surrel-content">
            <i><img class="icon-img" src="../../../static/img/btn_share_up.png" mode="widthFix" /></i>
            <div class="surrel-ctn-box">
              <ul class="yj-list-ul">
                <li id="suc-li-1">
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

                      <label v-if="zQt.shuttle != 0">我接送</label>
                      <label v-if="zQt.pay != 0" class="illpay">我买单</label>
                      <label v-else class="illpay">AA制</label>
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
                        <p class="yj-addr-city"><label class="city-s">{{zInfo.city}}</label><label class="distance">(距离:{{distance}}km)</label></p>
                        <p>{{zInfo.geon}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="yj-ctn-2">
                    <div class="yj-avatar-info">
                      <img :src="userInfo.avatar" />
                      <div class="yj-nickname">
                        <p class="yj-nickname-p">
                          <label class="u-nikename">{{userInfo.name}}</label>
                          <!--<span><i class="icon iconfont icon-nv"></i>{{gender}}</span>-->
                          <span class="man-span" v-if="gender == 1"><i class="icon iconfont icon-nan"></i>18</span>
                          <span v-else-if="gender == 2"><i class="icon iconfont icon-nv"></i>18</span>
                          <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>18</span>
                        </p>
                        <p class="yj-xr-p">信任值{{zInfo.score}}分</p>
                      </div>
                    </div>
                    <div class="yj-fb-time">刚刚发布</div>
                  </div>
                </li>
                <li class="pp-info-li" id="adpil">
                  <div class="participate-people">
                    <div> <label>已报名</label> <p>1人</p> </div>
                    <div> <label>还差</label> <p>{{zInfo.nmin - 1}}人</p> </div>
                    <div> <label>报名截止</label> <p>{{endDate}}</p> </div>
                  </div>
                  <div class="participate-people-Avatar">
                    <ul class="pp-avatar-ul">
                      <ol><img id="img-yz" src="../../../static/img/icon_main_lord.png" mode="widthFix" /><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                    </ul>
                    <ul class="pp-avatar-img-ul">
                      <ol><img :src="userInfo.avatar" mode="widthFix" /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                      <ol><img /></ol>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </movable-view>
      </movable-area>
    </div>
    <div class="btn-fh-box">
      <navigator url="../home/main" open-type="reLaunch" @tap="qlState">返回首页</navigator>
    </div>
    <div class="share-img" v-show="isShow" @tap="closeCav">
      <div class="share-img-box">
        <canvas canvas-id="myCav"></canvas>
      </div>
    </div>
    <!--<Isreg/>-->
  </div>
</template>

<script type="text/ecmascript-6">
// import Isreg from '../../components/Isreg.vue'
import '../../../static/icon/iconfont.css'
import { baseUrl, imgPath, uploadFile, basePath }  from '../../../static/js/httpUrl'
import { hexMD5 } from '../../../static/js/MD5'
import { userInfos, uAvatar } from '../../../static/js/userInfo'
import { formatDateTime,GetDistance2, dateCount }  from '../../../static/js/formaDateTime'
import { addrRegExp } from '../../../static/js/addrRegExp'
import { createImg } from '../../../static/js/shareCreatImg'
import shareImg from '../../../static/img/img_share_def.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  // components: { Isreg },
  // template: '<Isreg/>',
  data () {
    return {
      msg: '发布成功',
      sexIoc: sexIoc,
      isShow: false,
      styles: {width:'', height:''},
      windowWidth:200,
      windowHeight:160,
      zInfo: {},
      userInfo: {},
      zQt: {},
      latitude: 0.01, //纬度
      longitude: 0.01, //经度
      distance: 0, //距离
      ymd: 0,
      week: '',
      times: '',
      ctime: '',
      shareImg: shareImg,
      avatarImg: '',
      endDate: '',
      shareGid: 0,
      opacity:1,
      gender: 0,
      doinImg:[] //用于 canvas 头像
    }
  },
  onLoad (opt) {
    this.zInfo = {}
    let $this = this
    console.log("******************************655687*********************************")
    console.log(opt)
    // opt = {'gid': 765566}
    //gid:765566 inviter:715587
    this.shareGid = parseInt(opt.gid)
    this.pageLoadInfo(parseInt(opt.gid)) //213842
    this.tempTest()

  },
  onShow(){
    wx.removeStorage({ key: 'theme' }) //清除主题缓存
  },
  mounted () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  methods: {
    tempTest(){
      console.log('tempTest')
    },

    pageLoadInfo (_gid) {
      this.doinImg = []
      wx.showLoading({ title: '加载中', mask: true })
      let $this = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          $this.latitude = res.latitude
          $this.longitude = res.longitude
          $this.getRequestInfo(_gid,res.latitude,res.longitude)


        },
        fail(fi){
          console.log('定位失败')
          console.log(fi)
          $this.latitude = 0.01
          $this.longitude = 0.01
          $this.getRequestInfo(_gid,$this.latitude,$this.longitude)
        }
      })

    },
    getRequestInfo(_gid,lat,lon){
      console.log('-----------------传送信息------------------')
      console.log(_gid)
      let $this = this
      wx.request({ //获取信息
        method: 'POST',
        url: ''+baseUrl+''+basePath.sucrel+'',
        data: {gid:_gid},
        header: { 'content-type': 'application/json' },
        success (res) {
          let $uDa = {}
          $uDa.uid = []
          $uDa.user = {}
          $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
          console.log('--------------------------获取基本信息数据-------------------------------')
          console.log(res)
          $this.doinImg.push(res.data.data.user)
          res.data.data.city = addrRegExp(res.data.data.city)
          uAvatar(res.data.data, 0, imgPath)//头像
          if(res.data.data.nmin-1 == res.data.data.nmax-1){
            res.data.data.numpp = res.data.data.nmin-1
          }else{
            res.data.data.numpp = (res.data.data.nmin-1)+'-'+(res.data.data.nmax-1)
          }
          $this.gender = res.data.data.user.gender
          $this.zInfo = res.data.data
          $this.userInfo = res.data.data.user
          console.log(formatDateTime(res.data.data.tm*1000, 2))
          $this.ymd = formatDateTime(res.data.data.tm*1000, 0)
          $this.week = formatDateTime(res.data.data.tm*1000, 1)
          $this.times = formatDateTime(res.data.data.tm*1000, 2)
          $this.ctime = dateCount(res.data.data.ctm)// formatDateTime(res.data.data.ctm*1000, 0)
          $this.endDate = formatDateTime(res.data.data.etm*1000, 0)

          $uDa.uid.push(res.data.data.mems[0].uid)
          $this.getUserInfos($uDa,1)
          $this.getUserInfos($uDa,0)
          $this.zQt = res.data.data.data
          $this.distance = GetDistance2(lat, lon, res.data.data.geom.lat, res.data.data.geom.lon)
          wx.hideLoading()
          $this.shareFdq(0)
        },
        fail(fl){
          console.log('aaaaaaaaa')
        }
      })

    },

    getUserInfos($da,ty) {
      if(ty == 0){
        $da.extra = true
      }
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('********************|||||||||||*************************')
          console.log(res)
          $this.zInfo.score = res.data.data[0].score
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },


    closeCav () {
      this.isShow =false
    },
    //分享到朋友圈
    shareFdq (num) {
      if(parseInt(num) == 0){
        this.isShow =true
      }else{
        this.isShow =false
      }
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
    qlState(){
      wx.setStorageSync('cssu', 'y')
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
    console.log('---------------------hhhhhhhhhhhhhhhh-----------------')
    console.log('gid:'+$this.shareGid, 'inviter:'+wx.getStorageSync('uid'))
    console.log($this.shareImg)
    console.log(res)
    if(res.from == 'button'){
      console.log(res.target)
    }
    return {
      title: '我发起了一个新约局，赶紧来加入吧！',
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
.box{padding:0px; background-color:#fff; z-index:10;}
.rel-prompt,.surrel-share{display:flex; align-items:center; justify-content:center; padding:10px 0px;}
.rel-prompt>h1{font-size:20px; font-weight:700; margin-left:10px; margin-top:-6px;}
/*.surrel-share>img{width:34%;}.surrel-share>img:nth-child(2){margin-left:15px;}*/
.surrel-share>button{border:0px; outline:none; background-color:#fff; font-size:16px; margin:7px; padding:0px; width:34%;}
.surrel-share>button:after{border:none !important;}
.surrel-share>button>img{width:100%;}

.surrel-content{border-top-left-radius:12px; border-top-right-radius:12px; border-top:5px solid #3c4ce0;}
.surrel-content>i{position:absolute; width:100%; margin:0px; padding:0px; box-sizing:border-box;
  display:flex; align-items:center; justify-content:center; top:-35px; left:0px;}
.surrel-content>i img.icon-img{width:30px;}
.surrel-ctn-box{border-top-left-radius:12px; border-top-right-radius:12px; background-color:#e8ebf0; overflow:hidden; padding-bottom:0px;}
.surrel-ctn-box>ul.yj-list-ul>li{padding:10px 10px; border-radius:0px;}
.surrel-ctn-box>ul.yj-list-ul>li:nth-child(2){margin-top:10px;}

li.pp-info-li{padding:10px 0px !important;}
.participate-people{display:flex; align-items:center; justify-content:flex-start; padding:5px 20px;}
.participate-people>div{padding:5px 20px; position:relative;}
.participate-people>div:nth-child(1){padding-left:0px;}
.participate-people>div:before{content:"\20"; display:inline-block; position:absolute; left:0px; bottom:0px;
  width:2px; height:70%; background-color:rgba(232,235,240,1);}
.participate-people>div:nth-child(1):before{width:0px; height:0px;}
.participate-people>div>label{font-size:11px; color:#C7C7CC;}
.participate-people>div>p{font-size:15px; margin-top:10px;}
.participate-people-Avatar{padding:5px 15px;}
.participate-people-Avatar>img{width:33px; height:33px;}
ul.pp-avatar-ul{display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap;}
ul.pp-avatar-ul>ol{width:57px; height:57px; padding:5px; border-radius:5px; position:relative;}
img#img-yz{width:20px !important; position:absolute; top:-10px; left:18px; background-color:#fff;}
ul.pp-avatar-ul>ol>img{display:inline-block; width:100%; height:100%; background-color:#e8ebf0; border-radius:5px;}
ul.pp-avatar-img-ul{display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap; position:absolute; top:5px;}
ul.pp-avatar-img-ul>ol{width:57px; height:57px; padding:5px; border-radius:5px;}
ul.pp-avatar-img-ul>ol>img{display:inline-block; width:100%; height:100%; vertical-align:middle; border-radius:5px;}


.btn-fh-box{padding:10px; background-color:#fff; position:fixed; bottom:0px; left:0px; z-index:9999; width:100%; border-top:1px solid #e8ebf0;}
.btn-fh-box>navigator{box-sizing:border-box; position:relative; width:100%; text-align:center; padding:10px; background-color:#e8ebf0; color:#238efa; border-radius:15px;}
label.yj-date-gq{background-color:#238EFA !important;}
#suc-li-1{border-top-left-radius:12px !important; border-top-right-radius:12px !important;}
movable-view{top:168px;}
li#adpil{margin-top:5px !important;}
</style>
