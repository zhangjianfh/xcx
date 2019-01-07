<template>
  <div class="container">
    <div class="box">
      <div class="basis-info">
        <div class="fiend-ans">
          <image :src="uinfo.avatar" mode="aspectFill" @tap="predivImage(uinfo.avatar)"></image>
          <div class="fiend-nickname">
            <h2>
              <label class="u-nikename">{{uinfo.name}}</label>
              <span class="man-span" v-if="uinfo.gender == '1'"><i class="icon iconfont icon-nan"></i>{{birthday}}</span>
              <span v-else-if="uinfo.gender == '2'"><i class="icon iconfont icon-nv"></i>{{birthday}}</span>
              <span class="why-sex" v-else><image class="sex-icon" :src="sexIoc" mode="aspectFit"></image>{{birthday}}</span>
            </h2>
            <p>
              <!--<image v-for="(item,index) in approveLabel" :src="item" :key="index" mode="widthFix"></image>-->
              <!--import videoImg from '../../../static/img/icon_me_videos.png'-->
              <!--import rzImg1 from '../../../static/img/icon_cert_sfzed.png'-->
              <!--import rzImg2 from '../../../static/img/icon_cert_teled.png'-->
              <!--import rzImg3 from '../../../static/img/img_cert_videoed.png'-->
              <image v-if="extraInfo.idcard" :src="rz1" mode="widthFix"></image>
              <image v-if="extraInfo.state" :src="rz2" mode="widthFix"></image>
              <image v-if="extraInfo.state_etm" :src="rz3" mode="widthFix"></image>
            </p>
          </div>
        </div>
        <div class="fiend-id">
          <text>ID: {{uinfo.uid}}</text>
          <!--<image src="../../../static/img/btn_me_copyid.png" mode="widthFix"></image>-->
        </div>
      </div>

      <div class="addractv">
        <div class="addr-box"><text>地区</text><text>- -</text></div>
        <div class="fd-wy" @tap="jumpWoye">
          <div class="fdwy-left">
            <p>Ta的我约</p>
            <p><image :src="timeImg" mode="widthFix"></image><text>9月3日(周一) 一起吃火锅</text></p>
            <p>邀请Ta来参加我的邀约</p>
          </div>
          <div> <i class="iconfont icon-gengduo"></i></div>
        </div>
      </div>

      <div class="videorz">
        <div class="fdwy-left">
          <p>Ta的视频认证</p>
          <p><image :src="videoImg" mode="widthFix"></image><text>视频已认证</text></p>
        </div>
        <text>查看</text>
      </div>

      <div class="evaluate">
        <h2>评价</h2>
        <div class="evaluate-label">
          <ul>
            <li v-for="(lbl, index) in labels" :key="index">{{lbl}} &nbsp; {{lblNum[index]}}</li>
          </ul>
        </div>
      </div>
      <div class="bottom-box">
        <p>聊天、查看视频请下载我约APP</p>
      </div>
    </div>
    <Isreg/>
  </div>

</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import { baseUrl, basePath,imgPath }  from '../../../static/js/httpUrl'
import { hexMD5 }  from '../../../static/js/MD5'
import { formatDateTime }  from '../../../static/js/formaDateTime'
import { userInfos,uAvatar }  from '../../../static/js/userInfo'
import timeImg from '../../../static/img/btn_home_engaged.png'
import videoImg from '../../../static/img/icon_me_videos.png'
import rz1 from '../../../static/img/icon_cert_sfzed.png'
import rz2 from '../../../static/img/icon_cert_teled.png'
import rz3 from '../../../static/img/img_cert_videoed.png'
import sexIoc from '../../../static/img/icon_main_u@2x.png'
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '好友资料',
      sexIoc: sexIoc,
      avtImgArr: [],
      labels: [],
      lblNum: [],
      uinfo: {},
      extraInfo:{},
      timeImg: timeImg,
      videoImg: videoImg,
      count: 10,
      rz1: rz1,
      rz2: rz2,
      rz3: rz3,
      id: 0,
      taId: 0,
      birthday: 18,
    }
  },
  onLoad (opt) {
    // opt.uid = 290820
    this.taId = opt.uid
    console.log(opt)
    let $da = {}
    $da.user = userInfos(parseInt(wx.getStorageSync('uid')), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
    $da.uid = parseInt(opt.uid)
    this.friendInfo($da,0)

    let uDa = {}
    uDa = $da
    uDa.extra = true
    this.friendInfo(uDa,1)


  },
  onShow(){
    this.labels = []
  },
  mounted () {
  },
  methods: {
    jumpWoye () {
      wx.navigateTo ({
        url: '../addin/main?uid='+this.taId+''
      })
    },

    /**
     * 好友标签信息
     * @param $data: 请求发送的信息
     */
    friendInfo ($data,ty) {
      console.log(ty)
      let $this = this
      wx.request({
        method: 'POST',
        url: ''+baseUrl+''+basePath.user+'',
        data: $data,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('^^^^^^^^^^^^|||||||||||^^^^^^^^^^^^^^')
          console.log(res)
          if(res.data.data[0].labels){
            let label = JSON.parse(res.data.data[0].labels)
            Object.keys(label).forEach(function(key){
              $this.labels.push(key)
              $this.lblNum.push(label[key])
            });
          }
          if(ty == 0){
            uAvatar(res.data.data, 1, imgPath)//头像
            $this.uinfo = res.data.data[0]
            console.log(res.data.data[0].birthday)
            console.log(parseInt(formatDateTime(res.data.data[res.data.data.length-1].birthday*1000, 0)))
            let btd = new Date().getFullYear() - parseInt(formatDateTime(res.data.data[res.data.data.length-1].birthday*1000, 0).split('年')[0])
            if(btd){
              if(btd < 0){
                $this.birthday = 18
              }else{
                $this.birthday = new Date().getFullYear() - parseInt(formatDateTime(res.data.data[res.data.data.length-1].birthday*1000, 0).split('年')[0])
              }
            }else{
              $this.birthday = 18
            }
          }else{
            $this.extraInfo = res.data.data[0]
          }
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },

    predivImage (url) { //图片预览
      this.avtImgArr = []
      let $this = this
      this.avtImgArr.push(url)
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: $this.avtImgArr, // 需要预览的图片http链接列表
        success: res => {
        }
      })
    },

  },
  created () {
  }
}
</script>

<style scoped>
.box{background-color:#f3f4f8;}
.basis-info{background-color:#fff; height:80px; padding:15px; display:flex; align-items:center; justify-content:space-between;}
.fiend-ans{display:flex; align-items:center; justify-content:flex-start; width:70%;}
.fiend-ans>image{position:relative; display:inline-block; width:50px; height:50px !important; border-radius:5px;}
.fiend-nickname{display:flex; align-items:flex-start; justify-content:center; flex-direction:column; padding-left:10px; height:50px; width:calc(100% - 60px);}
.fiend-nickname>h2{font-size:15px; font-weight:600; display:flex; align-items:center; justify-content:flex-start; width:100%;}
.fiend-nickname>p{display:flex; align-items:center; justify-content:flex-start; margin-top:5px; height:30px; width:100%;}
.fiend-nickname>p>image{width:24px; height:16px !important; margin-left:5px;}
.fiend-nickname>p>image:nth-child(1){margin:0px;}

.fiend-nickname>h2>span{padding:2px 6px; border-radius:14px; margin-left:10px; color:#fff; padding-left:23px;
  display:flex; align-items:center; justify-content:center; font-size:12px; position:relative;
  background:-webkit-linear-gradient(left,#ff65b4,#ff90dd); background:-o-linear-gradient(right,#ff65b4,#ff90dd);
  background:-moz-linear-gradient(right,#ff65b4,#ff90dd); background:linear-gradient(to right,#ff65b4,#ff90dd);}
.fiend-nickname>h2>span i{position:absolute; left:5px; font-size:12px;}
.fiend-id{display:flex; align-items:center; justify-content:center;}
.fiend-id>text{font-size:14px; color:#969696;}
.fiend-id>image{width:26px;}

.addractv,.videorz,.evaluate,.bottom-box{margin-top:10px; background-color:#fff;}
.addr-box,.videorz{display:flex; align-items:center; justify-content:space-between; padding:15px; border-bottom:1px solid #f3f4f8;}
.addr-box>text{font-size:15px;}
.addr-box>text:nth-child(2){color:#007EFA;}
.fd-wy{display:flex; align-items:center; justify-content:space-between; padding:15px;}
.fdwy-left>p{margin-top:10px; font-size:15px;}
.fdwy-left>p:nth-child(1){margin:0px;} .fdwy-left>p:nth-child(3){color:#007EFA;}
.fdwy-left>p:nth-child(2){display:flex; align-items:center; justify-content:flex-start;}
.fdwy-left>p:nth-child(2)>image{width:23px; margin-right:10px;}
.videorz>text{font-size:15px; color:#007EFA;}
.evaluate>h2{text-align:left; padding:15px; border-bottom:1px solid #f3f4f8; font-size:15px;}
.evaluate-label{padding:10px 20px;}
.evaluate-label>ul{display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap;}
.evaluate-label>ul>li{font-size:14px; width:30%; padding:4px 5px; text-align:center; background-color:#007EFA; color:#fff;
border-radius:3px; margin-top:10px; margin-right:10px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical;}
.evaluate-label>ul>li:nth-child(1),.evaluate-label>ul>li:nth-child(2),.evaluate-label>ul>li:nth-child(3){margin-top:0px;}
.evaluate-label>ul>li:nth-child(3n){margin-right:0px;}
.bottom-box{padding:15px;}
.bottom-box>p{text-align:center; font-size:16px; background-color:#007EFA; color:#fff; padding:15px 0px; border-radius:3px;}
</style>
