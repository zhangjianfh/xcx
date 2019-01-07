<template>
  <div class="container">
    <div class="box" v-if="joinInfo.length > 0">
      <ul class="addin-list">
        <li v-for="(info,index) in joinInfo" :key="index">
          <navigator class="home-a" hover-class="none" :url="'../actinfo/main?gid='+info.gid+'&uid='+info.user.uid+''">
          <div class="yj-ctn-2 addin-uinfos">
            <div class="yj-avatar-info">
              <img :src="info.user.avatar" mode="widthFix" />
              <div class="yj-nickname">
                <p class="yj-nickname-p" v-if="!bcArry.isFir">
                  <label class="u-nikename">{{info.user.name}}</label>
                  <span class="man-span" v-if="info.user.gender == 1"><i class="icon iconfont icon-nan"></i>{{bcArry.birthday[index]}}</span>
                  <span v-else-if="info.user.gender == 2"><i class="icon iconfont icon-nv"></i>{{bcArry.birthday[index]}}</span>
                  <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>{{bcArry.birthday[index]}}</span>
                </p>
                <p class="yj-nickname-p" v-else>
                  <label class="u-nikename">{{info.user.name}}</label>
                  <span class="man-span" v-if="info.user.gender == 1"><i class="icon iconfont icon-nan"></i>{{bcArry.birthday}}</span>
                  <span v-else-if="info.user.gender == 2"><i class="icon iconfont icon-nv"></i>{{bcArry.birthday}}</span>
                  <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>{{bcArry.birthday}}</span>
                </p>
                <p class="yj-xr-p" v-if="!bcArry.isFir">信任值{{bcArry.score[index]}}分</p>
                <p class="yj-xr-p" v-else>信任值{{bcArry.score}}分</p>
              </div>
            </div>
            <div v-if="info.etm - nowDate > 0">
              <!--{{total[index]}}-->
              <div v-if="info.mems.length >= info.nmin ">
                <div class="yguo" v-if="info.mems.length == info.nmax ">已完成</div>
                <div class="wguos" v-else>已成局 ></div>
              </div>
              <div class="wguos" v-else>进行中 ></div>
              <p class="addin-ctm">{{info.ctm}}</p>
            </div>
            <div class="yguo" v-else>
              <div v-if="info.nmin == info.mems.length">
                <label style="color:#884898">已完成 ></label><p class="addin-ctm">{{info.ctm}}</p>
              </div>
              <div v-else>
                已失效 ><p class="addin-ctm">{{info.ctm}}</p>
              </div>
            </div>
          </div>
          <div class="addin-actinfos">
            <h2><label class="act-name">{{info.subject}}</label>
              <label class="act-name" v-if="info.data.pay != 0"> &nbsp;· 我买单</label>
              <label class="act-name" v-if="info.data.shuttle != 0"> &nbsp;· 我接送</label></h2>
            <p><image :src="timeIco" mode="widthFix"></image>
              <label class="addr-label">{{actDate[index]}}</label></p>
            <p><i></i><label class="addr-label">{{info.geon}}</label></p>
          </div>
          </navigator>
        </li>
      </ul>
      <ul class="yj-list-ul reach-bottom addin-bottom-loading" v-if="friendJu && myJu">
        <li>加载中...</li>
      </ul>
      <ul class="yj-list-ul reach-bottom addin-bottom-loading" v-else>
        <li>已全部加载完毕...</li>
      </ul>
    </div>
    <div class="box" v-else>
      <ul class="addin-list adl-fls" v-if="!friendJu">
        <li>他还没有发布过约局(⊙o⊙)!</li>
      </ul>
      <ul class="addin-list adl-fls" v-else-if="!myJu">
        <li>
          <navigator url="../home/main" open-type="reLaunch">
            <p>你还没参加过其他人的约局(⊙o⊙)!</p>
            <p>赶快去参加吧</p>
          </navigator>
        </li>
      </ul>
    </div>
    <Isreg/>
    <navigator open-type="reLaunch" class="home-ico" url="../home/main" @tap="navClickState"><img src="../../../static/img/back_home.png" mode="widthFix" /></navigator>
  </div>
</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import { baseUrl, basePath, imgPath }  from '../../../static/js/httpUrl'
import { hexMD5 }  from '../../../static/js/MD5'
import { userInfos, uAvatar }  from '../../../static/js/userInfo'
import { formatDateTime,dateCount } from '../../../static/js/formaDateTime'
import timeIco from '../../../static/img/icon_move_time.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '申请加入的局',
      sexIoc:sexIoc,
      timeIco: timeIco,
      nowDate: Date.parse(new Date()) / 1000,
      total: [],
      count: 10,
      id: 0,
      joinInfo: [],
      isMyCreateYj: true,
      setData: {
        user: userInfos(parseInt(wx.getStorageSync('uid')), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5),
        count: 10,
        id: 0,
        uid: 0
      },
      actDate: [],
      friendJu: true,
      myJu: true,
      isPages:true,
      bsdArry: [],
      bsdArry2: [],
      bcArry: {birthday:[],score:[], isFir:false}, //信任值 生日{birthday:[],score:[]}
    }
  },
  onLoad (opt) {
    console.log(opt)
    // opt.uid = '290820'
    wx.showLoading({ title: '加载中...' })
    this.setData.id = 0
    this.setData.count = 10
    console.log('-------------------setData-----------------------')
    this.joinInfo = []
    this.actDate = []
    if(opt.uid){ //好友发布的局
      this.isMyCreateYj = false
      this.myPage = 0
      this.setData.uid = parseInt(opt.uid)
      this.userPosts(this.setData)
    }else{ //我申请加入的局
      this.isMyCreateYj = true
      this.friendPage = 0
      this.setData.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
      this.setData.uid = wx.getStorageSync('uid')
      this.loadData(this.setData)
    }
  },
  /**
   * 上拉翻页
   */
  onReachBottom () {
    console.log('刷新，刷新')
    console.log(this.isPages)
    if(this.isPages){
      wx.showLoading({ title: '加载中...' })
      if(this.isMyCreateYj){
        this.loadData(this.setData)
      }else{
        this.userPosts(this.setData)
      }
    }else{
      wx.hideLoading()
    }
  },
  mounted () {

  },
  computed: {
    isInvalid(){
      return function(ctm) {
        return ctm - Date.parse(new Date()) / 1000
      }
    }
  },
  methods: {
    loadData($da){
      console.log('---------------------我 setData------------------')
      console.log($da)
      var $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.userJoin+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          wx.hideLoading()
          console.log('---------------------我申请加入的局------------------')
          console.log(res)
          $this.bsdArry = []
          $this.bsdArry2 = []
          if(res.data.status == 0 && res.data.data.length > 0){

            if(res.data.data.length >= 10){
              $this.isPages = true
              $this.myJu = true
            }else{
              $this.isPages = false
              $this.myJu = false
            }
            res.data.data = res.data.data.sort($this.compare('ctm'))
            console.log('/**用于活动----信任值，年龄**/')
            console.log(res.data.data)
            for(let i = res.data.data.length -1; i >= 0 ; i--){
              res.data.data[i].ctm = dateCount(res.data.data[i].ctm)
              uAvatar(res.data.data[i], 0, imgPath)
              const _date = formatDateTime(res.data.data[i].tm*1000, 0)
              $this.actDate.push(_date.replace(/年/g, ".").replace(/月/g, ".").replace(/日/g, "")+' '+formatDateTime(res.data.data[i].tm*1000, 2)+' ')
              $this.joinInfo.push(res.data.data[i])
              /**用于活动----信任值，年龄**/
              let $uDa = {}
              $uDa.uid = []
              $uDa.user = {}
              $uDa.uid = res.data.data[i].user.uid
              // $uDa.extra = true
              $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)

              $this.userInfosEvn($uDa, 0, i,(rs,ty)=>{
                // $this.bcArry.birthday = []
                $this.bcArry.isFir = false
                if(i == 0){
                  console.log('000000000000000000000---000000000000000000')
                  rs = rs.sort($this.compare('itm'))
                  for(let bc = rs.length -1; bc >= 0; bc--){
                    if(new Date().getFullYear() - parseInt(formatDateTime(rs[bc].birthday*1000, 0).split('年')[0])){
                      rs[bc].birthday = new Date().getFullYear() - parseInt(formatDateTime(rs[bc].birthday*1000, 0).split('年')[0])
                    }else{
                      rs[bc].birthday = 18
                    }
                    $this.bcArry.birthday.push(rs[bc].birthday)
                  }
                  console.log(rs)
                  console.log($this.bcArry)
                }
              })

              let $uDa2 = {}
              $uDa2.uid = []
              $uDa2.user = {}
              $uDa2.uid = res.data.data[i].user.uid
              $uDa2.extra = true
              $uDa2.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)

              $this.userInfosEvn($uDa2, 1, i,(rs,ty)=>{
                // $this.bcArry.score = []
                $this.bcArry.isFir = false
                if(i == 0){
                  console.log('1111111111111111------1111111111111111')
                  console.log(rs)
                  rs = rs.sort($this.compare('itm'))
                  for(let bc = rs.length -1; bc >= 0; bc--){
                    // if(new Date().getFullYear() - parseInt(formatDateTime(rs[bc].birthday*1000, 0).split('年')[0])){
                    //   rs[bc].birthday = new Date().getFullYear() - parseInt(formatDateTime(rs[bc].birthday*1000, 0).split('年')[0])
                    // }else{
                    //   rs[bc].birthday = 18
                    // }
                    $this.bcArry.score.push(rs[bc].score)
                  }
                }
              })

            }
            console.log($this.joinInfo)
            $this.setData.id = res.data.data[0].id

          }else{
            $this.isPages = false
            $this.myJu = false
          }
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    /**
     * 好友发布的局
     * @param $data
     */
    userPosts ($data) {
      console.log('---------------------朋友 setData------------------')
      console.log($data)
      var $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.userPosts+'',
        data: $data,
        header: { 'content-type': 'application/json' },
        success (res) {
          wx.hideLoading()
          console.log('---------------------好友发布的局------------------')
          console.log($data)
          console.log(res)
          $this.bsdArry = []
          $this.bsdArry2 = []
          if(res.data.status == 0 && res.data.data.length > 0){
            if(res.data.data.length >= 10){
              $this.friendJu = true
              $this.isPages = true
            }else{
              $this.friendJu = false
              $this.isPages = false
            }

            for(let i = 0; i < res.data.data.length; i++){
              res.data.data[i].ctm = dateCount(res.data.data[i].ctm)
              uAvatar(res.data.data[i], 0, imgPath)
              $this.total.push(res.data.data[i].mems.length)
              $this.joinInfo.push(res.data.data[i])
              const _date = formatDateTime(res.data.data[i].tm*1000, 0)
              $this.actDate.push(_date.replace(/年/g, ".").replace(/月/g, ".").replace(/日/g, "")+' '+formatDateTime(res.data.data[i].tm*1000, 2)+' ')
            }
            console.log($this.actDate)
            $this.setData.id = res.data.data[0].id

            let $uDa2 = {}
            $uDa2.uid = []
            $uDa2.user = {}
            $uDa2.uid = res.data.data[0].user.uid
            $uDa2.extra = true
            $uDa2.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)

            $this.userInfosEvn($uDa2, 1, 0,(rs,ty)=>{
              $this.bcArry.score = []
              console.log('0000000000000000000000')
              console.log($this.joinInfo[0].user.gender)
              console.log(rs)
              $this.bcArry.isFir = true
              $this.bcArry.score.push(rs[0].score)
            })

            let $uDa = {}
            $uDa.uid = []
            $uDa.user = {}
            $uDa.uid = res.data.data[0].user.uid
            // $uDa.extra = true
            $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
            $this.userInfosEvn($uDa, 0, 0,(rs,ty)=>{
              $this.bcArry.birthday = []
              console.log('1111111111111111111111111111')
              console.log(rs)
              console.log(parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0]))
              console.log(new Date().getFullYear() - parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0]))
              $this.bcArry.isFir = true
              if(new Date().getFullYear() - parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0])){
                $this.bcArry.birthday = [new Date().getFullYear() - parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0])]
              }else{
                $this.bcArry.birthday = [18]
              }
              // if(new Date().getFullYear() - parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0])){
              //   rs[0].birthday = new Date().getFullYear() - parseInt(formatDateTime(rs[0].birthday*1000, 0).split('年')[0])
              // }else{
              //   rs[0].birthday = 18
              // }
              // $this.bcArry.birthday.push(rs[0].birthday)
            })

          }else{
            $this.isPages = false
            $this.friendJu = false
          }
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },

    userInfosEvn($da, ty, item, callBack){
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $da,
        header: { 'content-type': 'application/json' },
        success (res) {
          res.data.data[0].itm = item
          if(ty == 0){
            $this.bsdArry.push(res.data.data[0])
            callBack($this.bsdArry,0)
          }else{
            $this.bsdArry2.push(res.data.data[0])
            callBack($this.bsdArry2,0)
          }
        },
        fail (nogo) {
          console.log(nogo)
          callBack(nogo,1)
        }
      })
    },

    compare(property){
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    navClickState(){
      wx.setStorageSync('navsta', 'y')
    }
  },
  created () {
  }
}
</script>

<style scoped>
.container{position:relative; height:initial;}
.box{background-color:#f3f4f8;}
ul.addin-list{padding-top:10px;}
ul.addin-list>li{background-color:#fff; margin-bottom:10px;}
.addin-uinfos{border-bottom:1px solid #f3f4f8; padding:15px 20px;}
.addin-actinfos{padding:15px 20px; padding-left:60px; background-color:#fff;}
.addin-actinfos>h2,.addin-actinfos>p{display:flex; align-items:center; justify-content:flex-start;}
.addin-actinfos>h2{font-size:18px; }
.addin-actinfos>h2>image{width:50px; margin-left:10px;}
.addin-actinfos>p{font-size:16px; color:#969696; margin-top:10px;}
.addin-actinfos>p>image{width:16px; margin-right:10px;}
.addin-actinfos>p>i{width:12px; height:12px; background-color:#238efa; border-radius:50%; margin-right:11px; margin-left:2px;}
label.act-name{font-size:16px;}
label.addr-label{font-size:14px;}
ul.adl-fls>li{font-size:14px; color:#969696; text-align:center; padding:10px 0px;}
.wguos,.yguo{font-size:15px; text-align:right;}  .yguo{color:#ccc;} .wguos{color:#238EFA;}
</style>
