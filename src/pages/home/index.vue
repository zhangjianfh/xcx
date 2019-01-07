<template>
  <div class="container">
    <div class="filter">
      <ul>
        <li v-for="(fl,index) in chNavArry" :key="index" @tap="isActive(index)" :class="{'curselfilter':fl.id == iactive}">{{fl.name}}</li>
      </ul>
      <label class="filter-lbl" @tap="openFc">筛选<i class="icon iconfont icon-shaixuan"></i></label>
    </div>
    <div class="box">
      <!--v-if="loadList.length > 0"-->
      <ul class="yj-list-ul" v-if="loadList.length > 0">
        <li v-for="(list,index) in loadList" :key="index">
          <!--?id={list.gid}-->
          <!--<navigator class="home-a" :url="'../actinfo/main?gid='+list.gid+'&uid='+list.user.uid+''">-->
            <div class="yj-ctn-1">
              <navigator class="home-a" :url="'../actinfo/main?gid='+list.gid+'&uid='+list.user.uid+''">
              <div class="yj-title-box">
                <h4 v-if="list.companion == 1">{{list.subject}} · 可携带朋友</h4>
                <h4 v-else>{{list.subject}}</h4>
                <div class="yj-us-header">
                  <img v-for="(avt, item) in adactav[index]" :src="avt.avatar" mode="widthFix" :key="item" />
                  <!--<img v-for="(avt, item) in list.aduser" :src="avt" mode="widthFix" :key="item" />-->
                </div>
              </div>
              <div class="yj-label-box home-ylb">
                <label v-if="list.pt == 8">公开局</label>
                <label v-else-if="list.pt == 4">陌生局</label>
                <label v-else-if="list.pt == 2">好友局</label>
                <label v-else>私有局</label>

                <label v-if="list.gender == 1">限男{{list.numpp}}人 </label>
                <!--{{list.nmin-1}}-{{list.nmax-1}}-->
                <label v-else-if="list.gender == 2">限女{{list.numpp}}人 </label>
                <!--{{list.nmin-1}}-{{list.nmax-1}}-->
                <label v-else-if="list.gender == 4">不限男女{{list.numpp}}人 </label>

                <label v-if="list.data.shuttle != 0">我接送</label>
                <label v-if="list.data.pay != 0" class="illpay">我买单</label>
                <label v-else class="illpay">AA制</label>
              </div>
              <div class="yj-addr-date-box">
                <div class="yj-date-box">
                  <p class="yj-date-mday">{{ymd[index]}}</p>
                  <p class="yj-date-time">
                    <label class="yj-date-today" v-if="week[index] == '今天'">{{week[index]}}</label>
                    <label class="yj-date-today yj-date-gq" v-else>{{week[index]}}</label>
                    <label>{{times[index]}}</label>
                  </p>
                </div>
                <div class="yj-addr-box">
                  <p class="yj-addr-city">
                    <label class="city-s" v-if="list.data.addrArea">{{list.data.addrArea}}</label>
                    <label class="city-s" v-else>{{list.city}}</label>
                    <label class="distance" v-if="isLoc">(距离{{distance[index]}}km)</label>
                    <!--<label class="distance" v-show="isLoc">(距离{{distance[index]}}km)</label>-->
                  </p>
                  <p>{{list.geon}}</p>
                </div>
              </div>
              </navigator>
            </div>
            <!--进入好友信息页-->
            <div class="yj-ctn-2">
              <!--:url="'../actinfo/main?gid='+list.gid+'&uid='+list.user.uid+''"-->
              <!--../friend/main-->
              <navigator :url="'../friend/main?uid='+list.user.uid+'&name='+list.user.name+'&gender='+list.user.gender+'&avatar='+list.user.avatar+''">
                <div class="yj-avatar-info">
                  <img :src="list.user.avatar" mode="aspectFill" />
                  <div class="yj-nickname">
                    <p class="yj-nickname-p">
                      <label class="u-nikename">{{list.user.name}}</label>
                      <span class="man-span" v-if="list.user.gender == 1"><i class="icon iconfont icon-nan"></i><label>{{birthday[index]}}</label></span>
                      <span v-else-if="list.user.gender == 2"><i class="icon iconfont icon-nv"></i><label>{{birthday[index]}}</label></span>
                      <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image><label>{{birthday[index]}}</label></span>
                    </p>
                    <p class="yj-xr-p">信任值{{list.score}}分</p>
                  </div>
                </div>
                <div class="yj-fb-time">{{ctm[index]}}</div>
              </navigator>
            </div>
          <!--</navigator>-->
        </li>
      </ul>

      <ul class="yj-list-ul reach-bottom" v-else>
        <li style="font-size:14px; padding:10px;">还没有新的约局哦,赶快去发布吧！(*^__^*)</li>
      </ul>
      <div class="rb-box" v-if="loadList.length > 2">
        <ul class="yj-list-ul reach-bottom addin-bottom-loading" v-if="isPage">
          <li>加载中...</li>
        </ul>
        <ul class="yj-list-ul reach-bottom addin-bottom-loading" v-else>
          <li>已全部加载完毕...</li>
        </ul>
      </div>
    </div>
    <div class="fileter-condition" v-show="show">
      <div class="fczz" @tap="closeFc"></div>
      <div class="fc-ctn">
        <div class="fc-header"><i class="icon iconfont icon-guanbi" @tap="closeFc"></i><label>筛选</label><label @tap="selOk" id="selys">确定</label></div>
        <div class="fc-content">
          <div class="fc-type">
            <p>类别</p>
            <ul>
              <li v-for="(jt, itm) in juType" :key="itm"  @tap="filterEvn(jt.id, 0)" :class="{'fcordercur':jt.id == filter}">{{jt.name}}</li>
            </ul>
          </div>
          <div class="fc-type">
            <p>性别</p>
            <ul><li v-for="(ga, idx) in gndArry" :key="idx" @tap="filterEvn(ga.id, 1)" :class="{'fcordercur':ga.id == filter1}">{{ga.name}}</li></ul>
          </div>
          <div class="fc-type fc-order">
            <p>排序</p>
            <ul><li v-for="(sa, sim) in sortArr" :key="sim" @tap="filterEvn(sa.id, 2)" :class="{'fcordercur':sa.id == filter2}">{{sa.name}}</li></ul>
          </div>
        </div>
        <!--<div class="fc-video">-->
        <!--<text>仅看视频认证用户</text>-->
        <!--<switch @change="switch1Change($event)"/>-->
        <!--</div>-->
      </div>
    </div>
    <Footers :isMe="false" />
    <!--@myevent="onMyevent"-->
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
  </div>

</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import Footers from '../../components/Footers.vue'
import '../../../static/icon/iconfont.css'
import { baseUrl,basePath, imgPath }  from '../../../static/js/httpUrl'
import { formatDateTime,GetDistance2, dateCount } from '../../../static/js/formaDateTime'
import { addrRegExp } from '../../../static/js/addrRegExp'
import { hexMD5 } from '../../../static/js/MD5'
import { userInfos,uAvatar, adActivUinfo } from '../../../static/js/userInfo'
import { userLoadings } from '../../../static/js/Landing'
// import { PromiseTest } from '../../../static/js/tstAjax'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  components: {Isreg:Isreg, Footers:Footers},
  template: '<Isreg/> <Footers/>',
  data () {
    return {
      msg: '首页',
      // dAvatar: DefaultAvatar,
      show: false,
      sexIoc: sexIoc,
      isAuthorize: false,
      chNavArry: [
        {name:'全部', id:'0'},{name:'吃喝', id:'1'},{name:'玩乐', id:'2'},
        {name:'运动', id:'3'},{name:'游戏', id:'4'},{name:'棋牌', id:'5'},
        {name:'出游', id:'6'},{name:'其他', id:'7'}
      ],
      juType: [
        {name:'全部', id:15},{name:'好友局', id:2},{name:'陌生局', id:4}
        ], //类别
      gndArry: [
        {name:'不限', id:4},{name:'女士', id:2},{name:'男士', id:1}
      ], //性别
      sortArr: [ //{name:'开始时间', id:3},
        {name:'最新发布', id:0}, {name:'离我最近', id:4}, {name:'信任值', id:5}
      ],
      iactive: '0',
      filterStatus: true,
      filter: 15,
      filter1: 4,
      filter2: 0,
      setDatas: {
        vvts: 15, //8 视频认证 15 全部
        sort: 1, //排序 0默认（时间） 1发布时间时间 3开始时间 4距离 5评分
        genders: 7, //性别 1男 2女 4所有
        posts: 15, //类别 1自己可见 2朋友 4非朋友 8所有可见 15全部
        limit: {idskip:0, count:10}, //idskip 返回最小的id
        categorys: [], //主题大分类
        location: {lon:0.01, lat:0.01}, //经纬度
      },
      flag: false,
      loadList: [],
      adUser: [], //活动参加的用户 (11-17临时加的)
      ymd: [], //年月日
      week: [], //星期几
      times:[], //时间
      fbtime: [],
      ctm: [], //创建时间
      distance: [], //距离
      isLoc: false,
      lon: 0.01,
      lat: 0.01,
      adactav: [], ////每个活动的参加者的头像
      isPage: true,
      isLoadingShow: false,
      tmpArry: [], //临时存放参加活动的用户信息
      tstArry: [],
      birthday:[],
      isNav: 0,
    }
  },
  onLoad (opt) {
    this.birthday = []
    // console.log(this.$root.$mp)
    // console.log(wx.getStorageSync('token'))
    let $this = this
    if(wx.getStorageSync('token')){
      this.isLoadingShow = false
        wx.getLocation({ //定位授权
          type: 'wgs84',
          success: function(res){
            $this.isLoc = true
            $this.lon = res.longitude
            $this.lat = res.latitude
            $this.setDatas.location = {lon:res.longitude, lat:res.latitude}
            // PromiseTest(''+baseUrl+''+basePath.list+'',$this.setDatas,'post',userInfos,hexMD5)
            $this.loadPageInfo($this.setDatas,0)
          },
          fail: resf => {
            $this.isLoc = false
            $this.lon = 0.01
            $this.lat = 0.01
            $this.loadPageInfo($this.setDatas,0)
          }
        })
    }else{
      this.isLoadingShow = true
      $this.isLoc = false
      // $this.lon = 0.01
      // $this.lat = 0.01
      // $this.loadInfoReset()
      // $this.loadPageInfo($this.setDatas)
    }
  },
  onShow () {
    wx.removeStorage({ key: 'theme' }) //清除主题缓存
    if(wx.getStorageSync('cssu')){
      console.log('onShowonShowonShowonShow')
      this.birthday = []
      this.loadInfoReset()
      this.setDatas.limit = {idskip:0, count:10}
      this.loadPageInfo(this.setDatas,0)
    }
    if(wx.getStorageSync('navsta')){
      console.log('导航跳')
      this.birthday = []
      this.loadInfoReset()
      this.setDatas.limit = {idskip:0, count:10}
      this.loadPageInfo(this.setDatas,0)
    }
  },
  onPageScroll(e){
  },
  /**
   *  下拉刷新 "enablePullDownRefresh": true,
   */
  onPullDownRefresh(e){
    this.birthday = []
    this.loadInfoReset()
    this.filter = 15
    this.filter1 = 4
    this.filter2 = 0
    this.tmpArry = []
    this.setDatas.sort = 0
    this.setDatas.limit = {idskip:0, count:10}
    console.log('--------------刷新---------------')
    this.loadPageInfo(this.setDatas,1)
    console.log(this.setDatas)
  },
  /**
   * 上拉翻页 idskip最新发布是按ID来
   */
  onReachBottom (e) {
    // this.loadInfoReset()

    if(wx.getStorageSync('token')){
      if(this.isPage){
        this.tmpArry = []
        this.loadPageInfo(this.setDatas,0)
      }
    }
  },
  mounted () {
  },
  computed:{},
  methods: {
    onMyevent(e){ //授权
      let $this = this
      if(e){
        /**此处页面展示数据需要清空一下**/
        this.loadInfoReset()
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){
              $this.isLoadingShow = false
            }else{
              $this.isLoadingShow = true
            }
            wx.getLocation({ //定位授权
              type: 'wgs84',
              success: function(lcRes){
                $this.isLoc = true
                $this.lon = lcRes.longitude
                $this.lat = lcRes.latitude
                $this.setDatas.location = {lon:lcRes.longitude, lat:lcRes.latitude}
                $this.loadPageInfo($this.setDatas,0)
              },
              fail: resf => {
                $this.isLoc = false
                $this.lon = 0.01
                $this.lat = 0.01
                $this.setDatas.location = {lon:0.01, lat:0.01}
                $this.loadPageInfo($this.setDatas,0)
              }
            })
          }
        })
      }else{
        // this.adactav = []
      }
    },

    isActive (num) { //主题筛选
      this.loadInfoReset()
      this.filterStatus = true
      this.setDatas.limit.idskip = 0
      this.setDatas.categorys = []
      this.iactive = num
      for(let i = 0; i < this.chNavArry.length; i++){
        if(num == this.chNavArry[i].id){
          this.setDatas.categorys.push(this.chNavArry[i].name)
        }
      }
      if(num == 0){
        this.setDatas.sort = 0
        this.setDatas.categorys = []
      }
      this.loadPageInfo(this.setDatas,0)
      console.log(this.setDatas)
    },
    switch1Change (e) { //开关
      console.log(e)
    },
    //打开筛选
    openFc () {
      this.show = true
    },
    //关闭筛选
    closeFc () {
      this.show = false
    },
    //筛选
    filterEvn (num,type) {
      if(parseInt(type) == 0){ //类别
        this.filter = num
        this.setDatas.posts = num
      }else if(parseInt(type) == 1){ //性别
        this.filter1 = num
        this.setDatas.genders = num
      }else{ //排序
        this.filter2 = num
        this.setDatas.sort = num
      }
    },
    //确认筛选
    selOk () {
      this.loadInfoReset()
      this.birthday = []
      this.filterStatus = false
      this.setDatas.limit.idskip = 0
      this.loadPageInfo(this.setDatas,0)
      this.show = false
    },

    loadPageInfo ($data,n) {
      console.log(this.isLoc)
      console.log('----------请求参数----------')
      console.log($data)
      if(n == 0){ wx.showLoading({ title: '加载中', mask: false }) }
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.list+'',
        data: $data,
        header: { 'content-type': 'application/json' },
        success (ress) {
          console.log(ress)
          wx.stopPullDownRefresh()
          $this.tmpArry = []
          if(parseInt(ress.data.status) == 0){
            let tmpIdx = 0
            let $uDa = {}
            $uDa.uid = []
            $uDa.user = {}
            $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
            if(ress.data.data.length > 0){
              $this.isPage = true
              if($this.filterStatus){ //没有筛选
                $this.setDatas.limit.idskip = ress.data.data[0].id
              }else{ //筛选了的
                if($data.sort == 1){ //如果是按最新发布排序 那么idskip 每次那最小的ID
                  $this.setDatas.limit.idskip = ress.data.data[0].id
                }else{
                  $this.setDatas.limit.idskip += $this.setDatas.limit.count
                }
              }
              for(let i = ress.data.data.length-1; i >= 0; i--){
                if(ress.data.data[i].nmin-1 == ress.data.data[i].nmax-1){
                  ress.data.data[i].numpp = ress.data.data[i].nmin-1
                }else{
                  ress.data.data[i].numpp = (ress.data.data[i].nmin-1)+'-'+(ress.data.data[i].nmax-1)
                }
                /******/
                ress.data.data[i].city = addrRegExp(ress.data.data[i].city)
                uAvatar(ress.data.data[i], 0, imgPath)//头像
                $this.loadList.push(ress.data.data[i])

                $this.ymd.push(formatDateTime(ress.data.data[i].tm*1000, 0))
                $this.ctm.push(dateCount(ress.data.data[i].ctm))
                $this.week.push(formatDateTime(ress.data.data[i].tm*1000, 1))
                $this.times.push(formatDateTime(ress.data.data[i].tm*1000, 2))
                $this.fbtime.push(formatDateTime(ress.data.data[i].etm*1000, 0))
                $this.distance.push(GetDistance2($this.lat, $this.lon, ress.data.data[i].geom.lat, ress.data.data[i].geom.lon))
                /******/
                if(ress.data.data[i].user.birthday != 'undefined'){
                  if(new Date().getFullYear() - parseInt(formatDateTime(ress.data.data[i].user.birthday*1000, 0).split('年')[0])){
                    ress.data.data[i].user.birthday = new Date().getFullYear() - parseInt(formatDateTime(ress.data.data[i].user.birthday*1000, 0).split('年')[0])
                  }else{
                    ress.data.data[i].user.birthday = 18
                  }
                }else{
                  ress.data.data[i].user.birthday = 18
                }
                $this.birthday.push(ress.data.data[i].user.birthday)

                if(!$this.isLoadingShow){
                  $uDa.uid = []
                  if(ress.data.data[i].mems.length > 3){
                    for(let j = 0; j < 3; j++){
                      $uDa.uid.push(ress.data.data[i].mems[j].uid)
                    }
                  }else{
                    for(let j = 0; j < ress.data.data[i].mems.length; j++){
                      $uDa.uid.push(ress.data.data[i].mems[j].uid)
                    }
                  }
                  $this.getUserInfos($uDa, i, n, (rs) => {
                    if(i == ress.data.data.length-1){
                      console.log('------------发送的信息------------')
                      console.log($uDa)
                      setTimeout(()=>{
                        rs = rs.sort($this.compare('tIndex')) //不能删这句代码  对象排序   误删几次了
                        for(let n = rs.length-1; n >= 0; n--){ //排序
                          // for(let b = 0; b < rs[n].data.length; b++){
                          //   console.log(rs[n].data[b].birthday + rs[n].data[b].user)
                          //   if(new Date().getFullYear() - parseInt(formatDateTime(rs[n].data[b].birthday*1000, 0).split('年')[0])){
                          //     rs[n].data[b].birthday = new Date().getFullYear() - parseInt(formatDateTime(rs[n].data[b].birthday*1000, 0).split('年')[0])
                          //   }else{
                          //     rs[n].data[b].birthday = 18
                          //   }
                          // }
                          // $this.birthday.push(rs[n].data[rs[n].data.length - 1].birthday)
                          $this.adactav.push(rs[n].data)
                          $this.tstArry.push(rs[n].tIndex)
                        }
                        if(n == 0){wx.hideLoading()}
                      },500)
                      wx.removeStorageSync('cssu')
                      wx.removeStorageSync('navsta')
                      console.log('--------对象排序后---------')
                      console.log(rs)
                    }
                  })
                }
              }
              console.log('------------年龄----------')
              console.log($this.birthday)
            }else{
              $this.isPage = false
            }
          }else{
            $this.loadList = []
          }
          if(n == 0){wx.hideLoading()}
        },
        fail (nogo) {
          wx.hideLoading()
          console.log(nogo)
        }
      })
    },

    getUserInfos($da,item,n,callBack) {
      if(n == 0){wx.showLoading({ title: '加载中', mask: true })}
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          if(res.data.status == 0){
            uAvatar(res.data.data, 1, imgPath)
            adActivUinfo(res.data,item)
            $this.tmpArry.push(res.data)
            callBack($this.tmpArry)
          }else{
            console.log('*************多端登陆***************')
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

    getArray(a){
      var hash = {}, len = a.length, result = [];
      for (var i = 0; i < len; i++){
        if (!hash[a[i]]){
          hash[a[i]] = true;
          result.push(a[i]);
        }
      }
      return result;
    },

    loadInfoReset(){
      this.tmpArry = []
      this.loadList = [] //加载数据
      this.ymd = [] //年月日
      this.week = [] //星期几
      this.times = [] //时间
      this.fbtime = []
      this.ctm = [] //创建时间
      this.distance = [] //距离
      this.adactav = [] //加入活动人员头像
    },
    /**
     * 对象排序
     * @param property
     * @returns {function(*, *): number}
     */
    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },

  }
}
</script>

<style scoped>
.box{background-color:#f3f4f8; padding:10px; height:100%; padding-bottom:57px;}
.container{position:relative; height:initial; margin-top:40px;}
navigator.home-a{position:relative; width:100%; background-color:#fff;}
label.yj-date-gq{background-color:#238EFA !important;}
span.man-span{background:-webkit-linear-gradient(left,#3d8afa,#88b8ff); background:-o-linear-gradient(right,#3d8afa,#88b8ff);
  background:-moz-linear-gradient(right,#3d8afa,#88b8ff); background:linear-gradient(to right,#3d8afa,#88b8ff);}
.filter{position:fixed; left:0px; top:0px; width:100%; background-color:#fff; padding:0px 15px; z-index:9; padding-left:10px;}
/*display:flex; align-items:center; justify-content:space-between;*/
.filter>ul{list-style:none; position:relative; width:86%; height:40px; white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all; overflow-x:scroll;
  display:flex; align-items:center; justify-content:space-between;}
/**/
.filter>ul>li{display:inline-block; font-size:14px; padding:5px 15px;}

.curselfilter{border-bottom:2px solid #333; font-size:16px !important;}
.filter-lbl{position:absolute; top:0px; right:15px; height:40px; font-size:14px; line-height:40px; display:flex; align-items:center; justify-content:space-between;}
.fileter-condition{position:fixed; width:100%; height:100%; top:0px; left:0px;}
.fczz{position:absolute; width:100%; height:100%; background:rgba(0,0,0,.5);}
.fc-ctn{background-color:#fff; position:absolute; bottom:60px; left:0px; width:100%;}
.fc-header{display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #ccc;}
.fc-header>i,.fc-header>label{padding:15px;}
.fc-content{padding:15px;}  .fc-type{text-align:center;}
.fc-type{margin-bottom:20px;} .fc-type p{color:#969696; margin:10px 0px; font-size:14px;}
/*space-around*/
.fc-type ul{list-style:none; border-radius:3px; display:flex; align-items:center; justify-content:center;}

.fc-type ul li{display:inline-block; width:90px; text-align:center; border:1px solid #007EFA; font-size:14px; padding:6px 0px; border-left:0px; color:#007EFA;}
.fc-type ul li:nth-child(1){border-left:1px solid #007EFA; border-top-left-radius:3px; border-bottom-left-radius:3px;}
.fc-type ul li:nth-child(3){border-top-right-radius:3px; border-bottom-right-radius:3px;}
.fc-order>ul>li{border:0px; background-color:#f3f4f8; color:#333; border-radius:3px;} .fc-order ul li:nth-child(1){border-left:0px;}
.fc-order ul li:nth-child(2){margin:0px 10px;} .fc-order ul li:nth-child(3){margin-right:10px;}
.fcordercur{background-color:#007EFA !important; color:#fff !important;}
.fc-video{padding:20px 25px; display:flex; align-items:center; justify-content:space-between; font-size:16px; border-top:1px solid #ccc;}
.yj-us-header{display:flex; align-items:center; justify-content:flex-end;}
#selys{color:#238EFA;}
i.icon-guanbi{color:#c7c7c7;}
.home-ylb{display:block;} .yj-fb-time{bottom:0px;}
.refresh{padding-top:0px !important;}
</style>
