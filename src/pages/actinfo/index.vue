<template>
  <div class="container">
    <div class="box" v-if="zInfo">
      <div class="surrel-content">
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
                  <!--{{zInfo.nmin-1}}-{{zInfo.nmax-1}}-->
                  <label v-else-if="zInfo.gender == 2">限女{{zInfo.numpp}}人 </label>
                  <label v-else-if="zInfo.gender == 4">不限男女{{zInfo.numpp}}人 </label>

                  <label v-if="liData.shuttle != 0">我接送</label>

                  <label v-if="liData.pay != 0" class="illpay">我买单</label>
                  <label v-else>AA制</label>
                </div>
                <div class="yj-addr-date-box">
                  <div class="yj-date-box">
                    <p class="yj-date-mday">{{cymd}}</p>
                    <p class="yj-date-time">
                      <label class="yj-date-today" v-if="week == '今天'">{{week}}</label>
                      <label class="yj-date-today yj-date-gq" v-else>{{week}}</label>
                      <label>{{times}}</label>
                    </p>
                  </div>
                  <div class="yj-addr-box">
                    <p class="yj-addr-city act-city-p">{{zInfo.city}}</p>
                    <p>{{zInfo.geon}}</p>
                  </div>
                </div>
              </div>
              <div class="yj-ctn-2">
                <navigator class="avt-nav-main" :url="'../friend/main?uid='+userData.uid+'&name='+userData.name+'&gender='+userData.gender+'&avatar='+userData.avatar+''">
                  <div class="yj-avatar-info">
                    <image :src="userData.avatar" mode="aspectFill"></image>
                    <div class="yj-nickname">
                      <p class="yj-nickname-p">
                        <label class="u-nikename">{{userData.name}}</label>
                        <span class="man-span" v-if="userData.gender == 1"><i class="icon iconfont icon-nan"></i>{{birthday}}</span>
                        <span v-else-if="userData.gender == 2"><i class="icon iconfont icon-nv"></i>{{birthday}}</span>
                        <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>{{birthday}}</span>
                      </p>
                      <p class="yj-xr-p">信任值{{uData.score}}分</p>
                    </div>
                  </div>
                  <div class="yj-fb-time">{{ymd}}</div>
                </navigator>
              </div>
            </li>
            <li class="pp-info-li">
              <div class="participate-people">
                <div> <label>已报名</label> <p class="pp-p2">{{total}}人</p> </div>
                <div v-if="zInfo.nmax - total != '0'">
                  <div v-if="total < zInfo.nmin"> <label>还差</label> <p>{{zInfo.nmin - total}}人</p> </div>
                  <div v-else> <label>距离满员</label> <p>{{zInfo.nmax - total}}人</p> </div>
                </div>
                <div v-if="zInfo.nmax - total != '0'"> <label>报名截止</label> <p class="pp-p2">{{endTime}}</p> </div>
                <div v-else> <label>报名状态</label> <p class="pp-p2">已报满</p> </div>
              </div>
              <div class="chengju" v-if="total >= zInfo.nmin"><img src="../../../static/img/icon_organized@2x.png" mode="widthFix" /><label>已成局</label></div>
              <div class="participate-people-Avatar">
                <ul class="pp-avatar-ul" v-if="doinImg.length >= 6" style="opacity:0;"><ol><img /></ol></ul>
                <ul class="pp-avatar-ul" v-else><ol><img /></ol><ol><img /></ol><ol><img /></ol><ol><img /></ol><ol><img /></ol><ol><img /></ol></ul>
                <ul class="pp-avatar-img-ul">
                  <ol class="qzidt"><img src="../../../static/img/icon_main_lord.png" mode="widthFix" /></ol>
                  <ol v-for="(cjz,index) in doinImg" :key="index">
                    <navigator class="avt-main" :url="'../friend/main?uid='+cjz.uid+'&name='+cjz.name+'&gender='+cjz.gender+'&avatar='+cjz.avatar+''">
                      <img :src="cjz.avatar" mode="aspectFill" />
                      <!--style="opacity:0"-->
                      <!--<i class="i-cpna">{{companionArr[index]}} companion</i>-->
                      <i class="i-cpna" v-if="cjz.companion > 1">{{cjz.companion}}</i>
                      <i class="i-cpna" v-else style="opacity:0">{{cjz.companion}}</i>
                    </navigator>
                  </ol>
                </ul>
              </div>
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
      <!--------------------------------------------------------------------------->
      <div v-if="stale">
        <div v-if="zInfo.gender == 4"> <!--性别限制-->
          <div v-if="!vtf"> <!--需要审核的报名(已经报名过该活动)-->
            <div v-if="total < zInfo.nmax"> <!--是否满员-->
              <div class="bottom-box" v-if="isSelf"> <!--是否是自己发布的局-->
                <button v-if="bmsuss" class="bmsuss-yes">已报名</button>
                <button v-else>我的局</button>
                <button open-type="share">邀请朋友</button>
              </div>
              <div class="bottom-box" v-else>
                <button class="add-ju-btn" @click="addJuEvn1">我要报名</button>
              </div>
            </div>
            <div v-else>
              <div class="bottom-box">
                <button class="bmsuss-yes ym-btn">报名人数已满</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bottom-box">
              <button class="bmsuss-yes ym-btn">等待审核</button>
            </div>
          </div>
        </div>
        <div v-else-if="zInfo.gender == sex">
          <div v-if="!vtf">
            <div v-if="total < zInfo.nmax">
              <div class="bottom-box" v-if="isSelf">
                <button v-if="bmsuss" class="bmsuss-yes">已报名</button>
                <button v-else>我的局</button>
                <button open-type="share">邀请朋友</button>
              </div>
              <div class="bottom-box" v-else>
                <button class="add-ju-btn" @click="addJuEvn1">我要报名</button>
              </div>
            </div>
            <div v-else>
              <div class="bottom-box">
                <button class="bmsuss-yes ym-btn">报名人数已满</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="bottom-box">
              <button class="bmsuss-yes ym-btn">等待审核</button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bottom-box">
            <button class="bmsuss-yes ym-btn">活动性别限制无法报名</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="bottom-box">
          <button class="bmsuss-yes ym-btn">报名已截止</button>
        </div>
      </div>
      <!------------------------------------------------------------------------->

    </div>
    <!--<div class="box" v-else><p class="prp-p">该活动异常!!!</p></div>-->
    <div class="count-box" v-show="show">
      <div class="count-box-s">
        <div class="count-ctn">
          <i class="icon iconfont icon-guanbi" @click="addClose"></i>
          <p>确认你报名的人数</p>
          <div class="count-info">
            <button class="count-btns" @click="minus">-</button><input type="number" disabled v-model="count" /><button class="count-btns" @click="plus">+</button>
          </div>
          <button class="add-ju-btn" @click="addJuEvn">确定加入该局</button>
        </div>
      </div>
    </div>
    <div class="share-img">
      <div class="share-img-box">
        <canvas canvas-id="myCav"></canvas>
      </div>
    </div>
    <Isreg/>
  </div>
</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import '../../../static/css/surrel.css'
import '../../../static/icon/iconfont.css'
import { baseUrl, imgPath, uploadFile, basePath }  from '../../../static/js/httpUrl'
import { formatDateTime, dateCount }  from '../../../static/js/formaDateTime'
import { hexMD5 }  from '../../../static/js/MD5'
import { userInfos, uAvatar }  from '../../../static/js/userInfo'
import { addrRegExp } from '../../../static/js/addrRegExp'
import { createImg } from '../../../static/js/shareCreatImg'
import shareImg from '../../../static/img/img_share_def.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '活动详情',
      sexIoc: sexIoc,
      sex: 0,
      files: [],
      show: false,
      uData: {},//认证信息,信任值等
      doinImg: [], //参加活动用户头像
      companionArr: [], //参加活动用户 携带人数
      birthday:18,
      isSelf: false, //底部bottom是否是自己的局
      zInfo: {}, //初始数据
      liData: {},
      userData: {},
      week: '',
      cymd: '',
      ymd: '',
      times: '',
      endTime: '',
      gid: 0,
      shareImg: shareImg,
      avatarImg: '',
      bmsuss: false,
      total: 0,
      count: 1,
      maxCount: 0,
      vtf: false,
      initID: 0,
      stale: true, // 活动是否过时Date.parse(new Date());
    }
  },
  onLoad (opt) { //获取url参数
    console.log('*******************************************************************************')
    this.sex = parseInt(wx.getStorageSync('sex'))
    console.log(this.sex)
    console.log(opt)
    // opt = {gid: "845570", uid: "884000"}
    this.gid = opt.gid
    if(parseInt(opt.uid) == parseInt(wx.getStorageSync('uid'))){
      this.isSelf = true
    }else{
      this.isSelf = false
    }
    this.doinImg = []
    this.activInfo(parseInt(this.gid),parseInt(wx.getStorageSync('uid')))

    let vtf = {}
    vtf.user = userInfos(wx.getStorageSync('uid'),wx.getStorageSync('token'),Date.parse(new Date())/1000,hexMD5)
    vtf.gid = parseInt(opt.gid)
    this.vftAdActvit(vtf)
  },
  onShow () {
    this.show = false
  },
  mounted () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onHide(){
    this.show = false
  },
  onUnload(){
  },
  methods: {

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


    //加入该局
    addJuEvn () {
      let $this = this
      wx.showToast({ title: '加载中', icon: 'loading' })
      console.log(111111111)
      let objData = {}
      objData.user = {}
      objData.user = userInfos(wx.getStorageSync('uid'),wx.getStorageSync('token'),this.zInfo.tm,hexMD5)
      objData.inviter = 0 //邀请人ID
      objData.count = this.count
      objData.gid = this.gid
      console.log(objData)
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.join+'',
        data: objData,
        header: { 'content-type': 'application/json' },
        success (res) {
          //wx.showToast({ title: '你已报名过该活动', duration:1500 })
          console.log('----------------|||||||||||||||||||--------------')
          console.log(res)
          console.log(res.data.data)
          wx.hideToast()
          if(res.data.status == 0){
            if(res.data.data == 2){
              wx.redirectTo ({
                url: '../signup/main?data=2'
              })
            }else if(res.data.data == 1){
              wx.redirectTo ({
                url: '../signup/main?data=1'
              })
            }
          }else{
            if(res.data.message == 'expired'){
              wx.showToast({ title: '活动已过期，无法报名。', icon: 'none', duration: 1500, mask:true })
              $this.show = false
            }else if(res.data.message == 'full'){
              wx.showToast({ title: '携带人数超出名额', icon: 'none', duration: 1500, mask:true })
              $this.show = false
            }
          }
        },
        fail(fal){
          console.log(fal)
        }
      })
    },

    addJuEvn1() {
      this.count = 1
      console.log('。。。。我要报名。。。。')
      console.log(this.zInfo)
      //判断是否可携带朋友 this.zInfo.companion
      if(this.zInfo.companion == 0){
        this.addJuEvn()
      }else{
        this.show = true
      }
    },
    addClose(){
      this.show = false
    },
    minus(){
      if(this.count > 1){
        this.count --
      }
    },
    plus(){
      console.log(this.maxCount)
      if(this.count < this.maxCount){
        this.count ++
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
    activInfo (_gid,_uid) {
      this.files = []
      let $this = this
      wx.showToast({ title: '加载中', icon: 'loading' })
      console.log(_gid)
      wx.request({ //获取信息
        method: 'POST',
        url: ''+baseUrl+''+basePath.sucrel+'',
        data: {gid:_gid},
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('-------------------初始数据--------------------')
          console.log(res)
          if(res.data.status == 0){
            if(Date.parse(new Date())/1000 - res.data.data.etm > 0){
              $this.stale = false
            }else{
              $this.stale = true
            }
            $this.initID = res.data.data.user.uid
            wx.hideToast()
            uAvatar(res.data.data, 0, imgPath) //头像
            if(res.data.data.nmin-1 == res.data.data.nmax-1){
              res.data.data.numpp = res.data.data.nmin-1
            }else{
              res.data.data.numpp = (res.data.data.nmin-1)+'-'+(res.data.data.nmax-1)
            }
            $this.zInfo = res.data.data
            if(res.data.data){
              for(let i = 0; i < res.data.data.mems.length; i++){
                console.log(res.data.data.mems[i].uid)
                console.log(parseInt(wx.getStorageSync('uid')))
                if(res.data.data.mems[i].uid == parseInt(wx.getStorageSync('uid'))){
                  $this.isSelf = true
                  $this.bmsuss = true
                }else{
                  // $this.isSelf = false
                  // $this.bmsuss = false
                }
              }

              // $this.ymd = formatDateTime(res.data.data.ctm*1000, 0)
              $this.ymd = (dateCount(res.data.data.ctm))
              $this.cymd = formatDateTime(res.data.data.etm*1000, 0)
              $this.week = formatDateTime(res.data.data.ctm*1000, 1)
              $this.times = formatDateTime(res.data.data.etm*1000, 2)
              $this.endTime = formatDateTime(res.data.data.etm*1000, 0) + ' ' + formatDateTime(res.data.data.etm*1000, 2)
              $this.gid = res.data.data.gid
              $this.liData = res.data.data.data
              $this.userData = res.data.data.user
              console.log($this.userData.gender)
              $this.maxCount = res.data.data.nmax
              $this.companionEvn(res.data.data.mems)
              // $this.total = res.data.data.mems.length
              if(res.data.data.images.length >= 1){
                for(let i = 0; i < res.data.data.images.length; i++){
                  $this.files.push(''+imgPath+''+res.data.data.images[i])
                }
              }
              $this.zInfo.city = addrRegExp($this.zInfo.city)

              let $uDa = {}
              $uDa.uid = []
              $uDa.user = {}
              $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
              for(let j = 0; j < res.data.data.mems.length; j++){
                $uDa.uid.push(res.data.data.mems[j].uid)
              }
              console.log('uid:' + _uid)
              // for(let k = 0; k < res.data.data.mems.length; k++){
              if(parseInt(res.data.data.user.uid) == parseInt(_uid)){
                // $this.isSelf = true
                // break;
                $this.bmsuss = false
              }else{
                // $this.isSelf = false
              }
              // }
              $this.getUserInfos($uDa,res.data.data.mems)
              let eDa = {}
              eDa.uid = []
              eDa.uid = $uDa.uid
              eDa.user = {}
              eDa.user = $uDa.user
              eDa.extra = true
              $this.extraInfos(eDa)
            }
            if($this.total < res.data.data.nmax){
              if($this.isSelf){
                $this.shareFdq()
              }
            }
            if(new Date().getFullYear() - parseInt(formatDateTime(res.data.data.user.birthday*1000, 0).split('年')[0])){
              $this.birthday = new Date().getFullYear() - parseInt(formatDateTime(res.data.data.user.birthday*1000, 0).split('年')[0])
            }else{
              $this.birthday = 18
            }
          }
        }
      })
    },

    companionEvn($da){
      console.log('00000000000000000000携带人数00000000000000000000')
      console.log($da)
      this.total = 0
      for(let i = 0; i < $da.length; i++){
        this.total += $da[i].companion
      }
      this.maxCount = this.maxCount - this.total
    },

    getUserInfos($da,$cpn) {
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('*************参加活动用户信息*************')
          console.log(res)
          console.log($cpn)
          $this.doinImg = []
          $this.companionArr = []
          uAvatar(res.data.data, 1, imgPath) //头像

          let temp = {}
          for(let i = 0; i<res.data.data.length; i++){
            if($this.initID == res.data.data[i].uid){
              temp = res.data.data[i]
              res.data.data.splice(i, 1); // 如果数据组存在该元素，则把该元素删除
              break;
            }
          }
          res.data.data.unshift(temp); // 再添加到第一个位置
          $this.doinImg = res.data.data

          for(let j = 0; j < $cpn.length; j++){
            for(let n = 0; n < $this.doinImg.length; n++){
              if($cpn[j].uid == $this.doinImg[n].uid){
                $this.doinImg[n].companion = $cpn[j].companion
              }
            }
          }
          console.log('*************参加活动|||用户信息*************')
          console.log($this.doinImg)
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    //获取 信任值 认证信息等
    extraInfos($da){
      let $this= this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('*************参加活动------用户信息*************')
          console.log(res.data.data)
          for(let i = 0; i < res.data.data.length; i++){
            if(res.data.data[i].uid == $this.initID){
              $this.uData.score = res.data.data[i].score
            }
          }
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    //分享到朋友圈
    shareFdq () {
      var $this = this
      const ctx = wx.createCanvasContext('myCav')
      wx.showLoading({ title: '加载中', mask: false })
      createImg(wx,ctx,$this,uploadFile,imgPath)
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
    console.log('gid:'+$this.gid, 'inviter:'+wx.getStorageSync('uid'))
    return {
      title: '我参加了约局,一起来吧!',
      path: 'pages/invites/main?gid='+$this.gid+'&inviter='+wx.getStorageSync('uid')+'',
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
  .container{padding-bottom:55px;}
  .box{background-color:#e8ebf0;}
  .surrel-content{border:0px; border-radius:0px; padding-bottom:0px; margin:0px; background-color:#fff;}
  li.introduction>h2{padding:10px; font-size:18px;}


  .bottom-box{position:fixed; padding:10px 20px; background-color:#fff; bottom:0px; left:0px; width:100%; border-top:1px solid #e8ebf0;
    display:flex; align-items:center; justify-content:space-between; }
  .bottom-box>button{border-radius:3px; font-size:17px; font-weight:700; width:46%; margin:0px; background-color:#238EFA; color:#fff;}
  .bottom-box>button:nth-child(1){background-color:#E8EBF0; color:#238EFA;}
  .add-ju-btn{background-color:#238EFA !important; color:#fff !important; width:100% !important; display:inline-block;}
  label.yj-date-gq{background-color:#238EFA !important;}
  p.pp-p2{font-size:14px;}
  .count-box{position:fixed; top:0px; left:0px; width:100%; height:100%; }
  .count-box-s{position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(0,0,0,.5)}
  .count-ctn{position:relative; width:100%; background-color:#fff; padding:20px; border-radius:3px;}
  .count-ctn h4{color:#007efa; text-align:center}
  .count-ctn p{font-size:14px; color:#7A7A7A; text-align:center; margin:10px 0px;}
  .count-ctn button{background-color:#007efa; color:#fff;}
  .count-info{display:flex; align-items:center; justify-content:center; margin-bottom:10px;}
  i.icon-guanbi{position:absolute; right:10px; top:10px; color:#7a7a7a;}
  button.count-btns{background-color:#dcdcdc; font-size:20px; font-weight:600; height:36px; line-height:36px; margin:0px; border:none; border-radius:0px; outline:none;}
  .count-info>input{width:60px; border:1px solid #dcdcdc; height:36px; text-align:center;}
  .prp-p{text-align:center; padding:30px; font-size:16px;}
  button.bmsuss-yes{color:#C7C7C7 !important;}
  p.act-city-p{font-size:11px !important;}
  .yj-date-box p.yj-date-mday{margin-bottom:4px !important;}
  .ym-btn{width:100% !important;}
  .participate-people-Avatar>ul{padding:10px 0px;}
</style>
