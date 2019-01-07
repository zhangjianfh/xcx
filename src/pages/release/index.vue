<template>
  <div class="container">
    <div class="box">
      <div class="rls-main-box">
        <ul>
          <li>
            <a class="main-a" href="/pages/theme/main">
              <label class="rlstitle">主题</label>
              <input type="text" disabled="true" v-if="theme.type == '游戏'" class="youxi-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '吃喝'" class="chihe-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '玩乐'" class="wanle-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '棋牌'" class="qipai-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '出游'" class="chuyou-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '运动'" class="yundong-ipt" v-model="theme.name" />
              <input type="text" disabled="true" v-else-if="theme.type == '其他'" class="qita-ipt" v-model="theme.name" />
              <input type="text" disabled="true" placeholder-style="color:#238EFA;" placeholder="选择主题" v-else />
            </a>
          </li>
          <li @tap="peopleSw(0)">
            <label class="rlstitle">时间</label>
            <input type="text" placeholder-style="color:#238EFA;" disabled="true" v-model="selDate" placeholder="活动时间选择" />
          </li>
          <li @tap="addrSel">
            <label class="rlstitle">地点</label>
            <text id="addr-text" v-if="isAddr">{{addr}}</text>
            <text id="addr-text" v-else>设置地址</text>
          </li>
        </ul>
      </div>
      <div class="rle-ge"></div>
      <div class="rls-main-box" style="margin-top:0px;">
        <ul>
          <li @tap="typeSel($event,0)">
            <label class="rlstitle">类型</label>
            <input type="text" placeholder-style="color:#238EFA;" placeholder="活动类型选择" disabled="true" v-model="typeVal" />
          </li>
          <li class="no-after-li">
            <label class="rlstitle">对象</label>
            <div class="noaft-box">
              <label v-for="(obj,index) in objArr" :key="index" :class="{'curlabel': obj.id == active}" @tap="selLabel(obj.id,0)">{{obj.label}}</label>
            </div>
          </li>
          <li @tap="peopleSw(1)">
            <label class="rlstitle">人数</label>
            <input type="text" placeholder-style="color:#238EFA;" disabled="true" v-model="peopleNum" placeholder="活动人数选择" />
          </li>
          <li class="no-after-li">
            <label class="rlstitle">买单</label>
            <div class="noaft-box">
              <label v-for="(pay,index) in payArr" :key="index" :class="{'curlabel': pay.id == active1}" @tap="selLabel(pay.id,1)">{{pay.label}}</label>
            </div>
          </li>
          <li class="no-after-li">
            <label>报名审核</label>
            <div class="noaft-box setting-switch">
              <switch @change="switch1Change($event,3)"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="rle-ge"></div>
      <div class="rls-main-box select-setting" v-bind:class="{curselstig:isZk}" style="margin-top:0px;">
        <ul>
          <li class="no-after-li" @tap="isUnfold">
            <label class="rlstitle">可选项设置</label>
            <input type="text" disabled="true" />
            <i class="is-sel-i" v-bind:class="{selicur:isZk}"></i>
          </li>
          <li class="no-after-li setting-li">
            <label>可携带朋友</label>
            <div class="noaft-box setting-switch">
              <switch @change="switch1Change($event,0)"/>
            </div>
          </li>
          <li class="no-after-li setting-li">
            <label>我接送</label>
            <div class="noaft-box setting-switch">
              <switch @change="switch1Change($event,1)"/>
            </div>
          </li>
          <li class="setting-li" @tap="peopleSw(3)">
            <label style="display:inline-block; width:180px;">截止报名时间</label>
            <input v-model="endDates" type="text" maxlength="200" disabled placeholder="设置时间" placeholder-style="font-size:30rpx; color:#238EFA; width:180px;" />
          </li>
          <li class="no-after-li setting-li">
            <label>允许邀约成员邀请好友加入</label>
            <div class="noaft-box setting-switch">
              <switch checked="true" @change="switch1Change($event,2)"/>
            </div>
          </li>
          <!--<li class="no-after-li setting-li">-->
            <!--<label>需要通过申请加入本局</label>-->
            <!--<div class="noaft-box setting-switch">-->
              <!--<switch @change="switch1Change($event,3)"/>-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
      <div class="rls-main-box ms-box" @tap="txtBox">
        <!--<button class="textarea-btn">活动描述</button>-->
        <p class="txt-ms-p">活动描述</p>
        <p class="ms-txt-info" v-if="txtVal == ''">活动描述请在此处添加</p>
        <p class="ms-txt-info" v-else style="color:#000;">{{txtVal}}</p>
        <!--<input v-model="txtVal" disabled placeholder-style="font-size:28rpx; color:#C7C7C7; text-align:left;" placeholder="在这里添加关于活动的纤细描述吧" />-->
      </div>

      <div class="upload-img">
        <ul>
          <li v-for="(item,index) in files" :key="index" class="upimg">
            <i @tap.stop="deletImg(index)">-</i>
            <image :src="item" mode="widthFix" @tap="predivImage" :id="item" />
          </li>
        </ul>
        <p @tap="uploadImg" class="upload-p">
          <i class="icon iconfont icon-tupianshangchuan"></i>
          <span>让别人发现你的美({{fileLg}}/3)</span>
        </p>
      </div>

      <div class="publish-box">
        <label>注：通过后显示您的发布内容，描述越完善通过就越高！</label>
        <button @tap="publishEv">发布</button>
      </div>

    </div>

    <!--类型选择弹出层-->
    <div class="type-sel-box" v-show="tpShow" :class="{trstn:typeTn}">
      <div class="zzc" @tap="typeSel($event,1)"></div>
      <div class="tps-center" :class="{tnctr:typeTn}">
        <ul>
          <li><p>选择你的类型</p></li>
          <li @tap="selTypes($event,1,0)">
            <h4>私密局</h4>
            <p>仅自己可见，其他人被邀请才能加入</p>
          </li>
          <li @tap="selTypes($event,1,1)">
            <h4>公开局</h4>
            <p>所有人都能看到和加入</p>
          </li>
        </ul>
        <button @tap="typeSel($event,1)">取消</button>
      </div>
    </div>

    <!--活动描述弹出层-->
    <div class="textarea-box" v-show="tBox" v-bind:class="{tbcur:tboxShow}">
      <div class="tbx-box-trans" v-bind:class="{tbtcur:tboxShow}">
        <p>活动描述</p>
          <textarea class="textarea-input" v-bind:class="{txtipt:tboxShow}" maxlength="200" type="text" v-model="txtVal" @input="maxLengthEvn"
                    placeholder="备注自己理想的说明，吸引对方关注你的魅力..."
                    placeholder-style="font-size:30rpx;" fixed="true" style="height:0px; overflow:hidden; padding:0px;" />
        <label id="maxft">{{maxFont}}</label>
        <button class="txtar-btn" @tap="txtarDefine">完成</button>
      </div>
    </div>


    <div class="select-people" :class="{sp:pview}" v-show="peopleShow">
      <div class="sp-mask" @tap="peopleSw(2)"></div>
      <view class="select-people-view" :class="{spv:pview}">
        <!---->
        <view class="spv-btn-box" v-if="isTime == true">
          <label @tap="peopleSw(2)" style="color:#c7c7c7;">取消</label>
          <label>时间选择</label>
          <label style="color:#238EFA;" v-if="jzOk" @tap="peopleQd(1,0)">确定</label>
          <label style="color:#238EFA;" v-else="jzOk" @tap="peopleQd(1,2)">确定</label>
        </view>
        <view class="spv-btn-box" v-else> <label @tap="peopleSw(2)" style="color:#c7c7c7;">取消</label><label>选择人数</label><label style="color:#238EFA;" @tap="peopleQd(1,1)">确定</label> </view>

        <picker-view v-if="isTime" class="picker-view" indicator-style="height:50px;" :value="multiIndex" @change="bindChange">
          <picker-view-column class="picker-view-column">
            <view v-for="(md,index) in multiArray[0]" :key="index" style="line-height:50px">{{md}}</view>
          </picker-view-column>
          <picker-view-column class="picker-view-column">
            <view style="line-height:50px;" v-for="(hour,index) in multiArray[1]" :key="index">{{hour}}</view>
          </picker-view-column>
          <picker-view-column class="picker-view-column">
            <view v-for="(minutes,index) in multiArray[2]" :key="index" style="line-height:50px">{{minutes}}</view>
          </picker-view-column>
        </picker-view>

        <picker-view v-else class="picker-view" indicator-style="height:50px;" value="actval" @change="bindChange">
          <picker-view-column class="picker-view-column">
            <view v-for="(stp,index) in activityArray[0]" :key="index" style="line-height:50px">{{stp}}</view>
          </picker-view-column>
          <picker-view-column class="picker-view-column">
            <view style="line-height:50px; color:#238EFA;">{{activityArray[1]}}</view>
          </picker-view-column>
          <picker-view-column class="picker-view-column">
            <view v-for="(edp,index) in activityArray[2]" :key="index" style="line-height:50px">{{edp}}</view>
          </picker-view-column>
        </picker-view>

      </view>
    </div>
    <Isreg @myevent="onMyevent" :is-loading="isLoadingShow" />
  </div>
</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import { userLoadings } from '../../../static/js/Landing'
import '../../../static/icon/iconfont.css'
import '../../../static/css/transition.css'
import { countMonth, endDate, activityNum,dateProcess }  from '../../../static/js/dateArry'
import { isNull }  from '../../../static/js/verify'
import { baseUrl, basePath, imgPath, uploadFile }  from '../../../static/js/httpUrl'
import { hexMD5 }  from '../../../static/js/MD5'
import { addrRegExp } from '../../../static/js/addrRegExp'
const objArry = [{id:4, label:'不限男女'},{id:1, label:'男'},{id:2, label:'女'}]
const pay = [{id:0, label:'我买单'},{id:1, label:'AA制'}]
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '发布活动',
      isLoadingShow: false,
      active: 4,
      active1: 0,
      maxFont: '200',
      theme: {},//主题
      addr: '',//选择的地址
      isAddr: false,
      activityArray: activityNum(), //人数选择activityNum()
      timeArr: [],
      // maxPeople: [],
      actval: [0, 0, 0],
      peopleShow: false, peopleNum: '', typeTmpVal: '', pview: false, timeTmpVal: '', selDate: '',//时间值
      isTime: false, jzOk:false, endDates: '',

      typeVal: '',//选择的类型
      typeTn: false,//类型弹框动画状态
      tpShow: false,//类型弹框显示状态

      multiArray: countMonth(),//时间弹框的数据
      multiIndex: [0, 0, 0],//时间弹框下标

      isAuthorize: false,
      objArr: objArry,
      payArr: pay,

      txtVal: '', //活动描述
      tBox: false, //描述输入框层是否显示
      tboxShow: false, //描述输入框层是否添加class
      isZk: false, //是否展开
      files: [],
      imgArrs: [],
      fileLg: 0,
      emdnum:0,
      emdnum2:0,
      setDataInfo:{
        "pt": 8,	//那些人可见 1自己  2朋友 4非朋友 8所有
        "gender": 4, //性别 1男 2女 4全部
        "companion": 0, //1可否携带朋友

        "nrange": {
          "nmax": 2, //最多人
          "nmin": 2  //最少人
        },
        "trange": {
          "etm": '', //报名截止时间
          "tm": ''	//活动时间
        },
        "location": {
          "city": "",
          "geon": "", //地点名
          "lon": 0.01, //纬度
          "lat": 0.01
        },
        joint: 0, // 1需要审核
        "category": "", //主题大分类
        "subject": "",  //主题
        "decription": "", //活动描述
        "images": [], //图片地址
        "gn": "", //群名（时间加主题）
        "data": {
          "pay": 1, //付费方式（买单） AA
          "relay": 1, //转发（允许邀约好友）0不允许转发
          "shuttle": 0 //接送 0不接送
        },
        user:{uid: 0, token: '', tm:0} //"token": hash(tm, "Token", token)
      },
      flag:false,
    }
  },
  onLoad () {
    // wx.stopPullDownRefresh()
    wx.setNavigationBarTitle({
      title: '发起我约'
    })
    if(wx.getStorageSync('token')){
      this.isLoadingShow = false
    }else{
      this.isLoadingShow = true
    }
  },
  onShow(){
    this.theme.type = ''
    this.themeFn()
  },
  //页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
  onHide(){
    // this.selDate = ''
  },
  onUnload(){
    // wx.redirectTo ({
    //   url: '../home/main'
    // })
  },
  mounted(){
    this.getSetting()
  },
  methods: {
    onMyevent(e){
      let $this = this
      if(e){
        userLoadings(wx,baseUrl,basePath,(res)=>{
          if(res){
            if(wx.getStorageSync('token')){
              $this.isLoadingShow = false
            }else{
              $this.isLoadingShow = true
            }
          }
        })
      }else{
        // this.adactav = []
      }
    },

    maxLengthEvn (e) {
      let len = 200 - e.mp.detail.value.length
      this.maxFont = len
    },

    //发布活动 txtVal
    publishEv () {
      let $this = this
      let tm = Date.parse(new Date())
      let tTmp = this.setDataInfo.trange.tm - Date.parse(new Date()) / 1000
      tTmp = tTmp / 60
      if(!isNull(this.theme.type)){
        wx.showToast({ title: '请选择主题', icon: 'none', duration: 1000 })
      }else if(!isNull(this.selDate)){
        wx.showToast({ title: '请选择活动时间', icon: 'none', duration: 1000 })
      }else if(!isNull(this.addr)){
        wx.showToast({ title: '请选择活动地点', icon: 'none', duration: 1000 })
      }else if(!isNull(this.typeVal)){
        wx.showToast({ title: '请选择活动类型', icon: 'none', duration: 1000 })
      }else if(!isNull(this.peopleNum)){
        wx.showToast({ title: '请选择参加人数', icon: 'none', duration: 1000 })
      }else if(tTmp < 2){
        wx.showToast({ title: '活动时间距离现在不能小于1分钟', icon: 'none', duration: 1000 })
      }else{
        wx.showLoading({ title: '正在发布', mask: true })
        this.setDataInfo.gn = this.selDate.split('周')[0].replace(/日 /g, "日").replace(/\s+/g,"")+'(周'+this.selDate.split('周')[1].substr(0,1)+')'+ this.theme.name
        this.setDataInfo.user.uid = wx.getStorageSync('uid')
        if(this.setDataInfo.trange.etm == ''){
          this.setDataInfo.trange.etm = this.setDataInfo.trange.tm
        }
        this.setDataInfo.user.tm = tm/1000
        this.setDataInfo.user.token = hexMD5(tm/1000+'Token'+wx.getStorageSync('token'))
        if($this.files.length > 0){
          this.uploadImageQuer($this.files,(rs)=>{
            $this.createActive($this.setDataInfo)
          })
        }else{
          $this.createActive($this.setDataInfo)
        }
      }
    },
    //创建活动
    createActive($data){
      console.log('---------------------发布发布发布----------------------')
      console.log($data)
      let $this = this
      wx.request({ //发布
        method: 'POST',
        url: ''+baseUrl+''+basePath.post+'',
        data: $data,
        header: { 'content-type': 'application/json' },
        success (res) {
          console.log('---------------------发布返回的数据----------------------')
          console.log(res)
          wx.showLoading()
          if(parseInt(res.data.status) == 0){
            $this.isAddr = false
            wx.showToast({ title: '发布成功', duration:1500 })
            $this.selDate = ''
            $this.resetActivInfo()
            wx.reLaunch({
              url: '../sucrel/main?gid='+res.data.data.gid+''
            })
          }else{
            wx.showLoading()
            if(res.data.message == 'gender'){
              wx.showToast({ title: '性别参数错误请从选', icon: 'none', duration: 1500, mask:true })
            }
          }
        },
        fail(){
          wx.showLoading()
        }
      })
    },
    //主题
    themeFn () {
      const $this = this
      wx.getStorage({
        key:'theme',
        success:function (res) {
          $this.setDataInfo.category = res.data.type
          $this.setDataInfo.subject = res.data.name
          $this.theme = res.data
        }
      })
    },

    //对象 买单类型选择
    selLabel (index,ty) {
      if(parseInt(ty) == 0){
        this.active = index
        if(parseInt(index == 0)){
          this.setDataInfo.gender = 4
        }else{
          this.setDataInfo.gender = index
        }
        console.log(this.active)
      }else{
        this.active1 = index
        if(parseInt(index) == 0){
          this.setDataInfo.data.pay = 1
        }else{
          this.setDataInfo.data.pay = 0
        }
      }

    },
    //打开 时间 人数选择
    peopleSw (num) {
      this.isTime = false
      if(parseInt(num) === 0){ //打开时间选择框-----报名开始时间
        this.multiArray = countMonth()
        this.isTime = true
        this.jzOk = true
        this.peopleShow = !this.peopleShow
        setTimeout(()=>{
          this.pview = !this.pview
        })
      }else if(parseInt(num) === 1){//打开-------人数选择框
        this.peopleShow = !this.peopleShow
        setTimeout(()=>{
          this.pview = !this.pview
        })
      }else if(parseInt(num) === 3){ //打开时间选择框-----报名截止时间
        this.jzOk = false
        console.log('打开活动结束时间选择')
        if(this.selDate){
          if(endDate(this.selDate)){ //获取到 活动时间 大于 当前时间 -- 60分钟
            let tmpYmd = this.selDate.split('周')[0].replace(/日 /g, "日")+' 周'+this.selDate.split('周')[1].substr(0,1)
            let ymdIndex = this.multiArray[0].indexOf(tmpYmd)
            if(parseInt(ymdIndex) == -1){
              ymdIndex = 0
            }
            this.multiArray[0] = this.multiArray[0].slice(0,parseInt(ymdIndex + 1))

            this.isTime = true
            this.peopleShow = !this.peopleShow
            setTimeout(()=>{
              this.pview = !this.pview
            })
          }else{
            wx.showToast({
              title: '活动即将到期无法选择结束时间', icon: 'none', duration: 1000, mask:true })
          }
        }else{
          wx.showToast({ title: '请先选择活动时间', icon: 'none', duration: 1000, mask:true })
        }
        console.log('11111111111')
        console.log(this.multiArray)
      }else{
        this.pview = !this.pview
        setTimeout(()=>{
          this.peopleShow = !this.peopleShow
        },500)
      }
    },
    minutesCount (index) {  //分钟变化
      const minutes = []
      if(parseInt(new Date().getMinutes()) <= 55){
        for(let mt = parseInt(new Date().getMinutes()); mt < 55; mt+=5){
          if(parseInt(mt)%5 != 0){

            switch (parseInt(mt)%5) {
              case 1:
                mt = mt + 4
                break;
              case 2:
                mt = mt + 3
                break;
              case 3:
                mt = mt + 2
                break;
              case 4:
                mt = mt + 1
                break;
            }
            minutes.push(mt)
          }else{
            minutes.push(mt)
          }
        }
      }else{
        for(let mt = 0; mt < 55; mt+=5){
          minutes.push(mt)
        }
        // hour.splice(1)
      }
      return minutes
    },
    dayCount (index, is, tVal) { //天数变化-------------------------------------------------------------
      const hour = []
      let minutes = []
      if(parseInt(index[0]) != 0){
        for(let h = 0; h < 24; h++){
          if(h < 10){
            hour.push('0'+ h)
          }else{
            hour.push(h)
          }
        }
        for(let mt = 0; mt < 55; mt+=5){
          if(mt < 10){
            minutes.push('0' + mt)
          }else{
            minutes.push(mt)
          }
        }
      }else{
        let hs = parseInt(new Date().getHours())
        if(!is){
          hs = hs + 1
        }else{
          hs = new Date().getHours()
        }
        for(let h = hs; h < 24; h++){
          if(h < 10){
            hour.push('0'+ h)
          }else{
            hour.push(h)
          }
        }
        if(index[1] != 0){ //分钟数
          for(let mt = 0; mt < 55; mt+=5){
            if(mt < 10){
              minutes.push('0' + mt)
            }else{
              minutes.push(mt)
            }
          }
        }else{
          minutes = this.minutesCount(index)
        }
      }

      if(is){
        this.multiArray[1] = hour
        this.multiArray[2] = minutes
      }else{
        if(index[0] == this.multiArray[0].length-1){
          let eh = []
          let _hs = this.selDate.split(':')[0].split('周')[1].split(' ')[1]
          let _ms = this.selDate.split(':')[1]
          if(parseInt(_hs) == -1){ _hs = 0 }
          if(parseInt(_ms) == -1){ _ms = 0 }

          for(let h = 0; h <= parseInt(_hs); h++){
            if(h < 10){
              eh.push('0'+ h)
            }else{
              eh.push(h)
            }
          }
          this.multiArray[1] = eh

          if(parseInt(_hs) == parseInt(tVal)){
            if(parseInt(_ms) < 10){
              this.multiArray[2] = this.multiArray[2].slice(0,this.multiArray[2].indexOf(_ms) + 1)
            }else {
              this.multiArray[2] = this.multiArray[2].slice(0,this.multiArray[2].indexOf(parseInt(_ms)) + 1)
            }
          }else{
            this.multiArray[2] = minutes
          }
        }else{
          this.multiArray[1] = hour
          this.multiArray[2] = minutes
        }
      }

    },

    //时间选择 人数选择框 变化事件
    bindChange (e) {
      if(this.isTime){ //时间选择
        this.multiIndex = [e.mp.detail.value[0],e.mp.detail.value[1],e.mp.detail.value[2]]
        this.dayCount(this.multiIndex, this.jzOk, this.multiArray[1][e.mp.detail.value[1]])
        this.timeTmpVal = this.multiArray[0][e.mp.detail.value[0]] + ' '+ this.multiArray[1][e.mp.detail.value[1]] + ':' + this.multiArray[2][e.mp.detail.value[2]]
      }else{ //人数选择-----------------------------------------------------------------
        let mPeople = []
        let people = e.mp.detail.value[0]
        let maxPeople = e.mp.detail.value[0]+2
        for(let i = 0; i < 49-parseInt(people); i++){
          mPeople.push(maxPeople+'人')
          maxPeople++
        }
        this.activityArray[2] = mPeople
        this.emdnum = e.mp.detail.value[0]
        this.emdnum2 = e.mp.detail.value[2]
        this.typeTmpVal = this.activityArray[0][e.mp.detail.value[0]] + '成局,最多' + this.activityArray[2][e.mp.detail.value[2]]
        this.actval = [e.mp.detail.value[0],0,e.mp.detail.value[2]]
      }
    },
    //时间 人数 确认选择
    peopleQd  (num,type) {
      console.log('确定')
      if(parseInt(type) == 0){ //确定选择的时间
        if(this.timeTmpVal == ''){
          this.selDate = this.multiArray[0][0] + ' '+ this.multiArray[1][0] + ':' + this.multiArray[2][0]
        }else{
          this.selDate = this.timeTmpVal
          this.endDates = this.timeTmpVal
        }
        this.setDataInfo.trange.tm = dateProcess(this.selDate) / 1000
        if(this.setDataInfo.trange.etm != ''){
          if(this.setDataInfo.trange.tm - this.setDataInfo.trange.etm < 0){
            this.setDataInfo.trange.etm = ''
            this.endDates = ''
          }
        }
      }else if(parseInt(type) == 2){ //确定选择报名截止时间时间
        let tmpEtm = ''
        if(this.timeTmpVal == ''){
          // this.endDates = this.multiArray[0][0] + ' '+ this.multiArray[1][0] + ':' + this.multiArray[2][0]
          tmpEtm = this.multiArray[0][0] + ' '+ this.multiArray[1][0] + ':' + this.multiArray[2][0]
        }else{
          // this.endDates = this.timeTmpVal
          tmpEtm = this.timeTmpVal
        }
        if(dateProcess(tmpEtm) - Date.parse(new Date()) > 0){
          this.endDates = tmpEtm
          this.setDataInfo.trange.etm = dateProcess(this.endDates) / 1000
        }else{
          wx.showToast({ title: '结束时间不能小于当前时间', icon: 'none', duration: 1500, mask:true })
        }

      }else{ //确定选择的人数
        if(this.typeTmpVal == ''){
          this.peopleNum = '2人成局,最多2人'
          this.setDataInfo.nrange.nmax = 2
          this.setDataInfo.nrange.nmin = 2
        }else{
          this.peopleNum = this.typeTmpVal
          this.setDataInfo.nrange.nmax = parseInt(this.activityArray[2][this.emdnum2].split('人')[0])
          this.setDataInfo.nrange.nmin = parseInt(this.activityArray[0][this.emdnum].split('人')[0])
        }
      }
      this.peopleSw(num)
    },
    //类型
    typeSel (e,num) {
      e.stopPropagation()
      if(parseInt(num) === 0){
        this.tpShow = !this.tpShow
        setTimeout(()=>{
          this.typeTn = !this.typeTn
        })
      }else{
        this.typeTn = !this.typeTn
        setTimeout(()=>{
          this.tpShow = !this.tpShow
        },500)
      }
    },
    //选择活动类型
    selTypes (e,num,n) {
      if(parseInt(n) === 0){
        this.typeVal = '私密局'
        this.setDataInfo.pt = 1
        this.typeSel(e,num)
      }else{
        this.typeVal = '公开局'
        this.setDataInfo.pt = 8
        this.typeSel(e,num)
      }
    },
    isUnfold () { //是否展开 可选设置
      this.isZk = !this.isZk
    },
    txtBox () { //描述输入框层是否显示
      this.tBox = true
      let $this = this
      setTimeout(()=>{
        $this.tboxShow = true
      },100)
    },
    txtarDefine () { //编辑完成
      this.tboxShow = false
      let $this = this
      setTimeout(()=>{
        $this.tBox = false
      },400)
     this.setDataInfo.decription = this.txtVal
    },
    switch1Change (e,ty) { //开关
      if(parseInt(ty) == 0){ //x携带朋友
        if(e.mp.detail.value){
          this.setDataInfo.companion = 1
        }else{
          this.setDataInfo.companion = 0
        }
      }else if(parseInt(ty) == 1){ //接送方式
        if(e.mp.detail.value){
          this.setDataInfo.data.shuttle = 1
        }else{
          this.setDataInfo.data.shuttle = 0
        }
      }else if(parseInt(ty) == 2){ //邀请（转发）
        if(e.mp.detail.value){
          this.setDataInfo.data.relay = 1
        }else{
          this.setDataInfo.data.relay = 0
        }
      }else{
        if(e.mp.detail.value){
          this.setDataInfo.joint = 1
        }else{
          this.setDataInfo.joint = 0
        }
      }
    },
    uploadImg () { //图片上传
      let $this = this;
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {

          if($this.files.length + res.tempFiles.length <= 3){
            for(let i = 0; i < res.tempFilePaths.length; i++){
              $this.files.push(res.tempFilePaths[i])
            }
            $this.fileLg = $this.files.length
          }else{
            wx.showToast({ title: '亲最多只能上传三张图片', icon: 'none', duration: 2000 })
          }

        }
      });

    },
    predivImage (e) { //图片预览
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
    deletImg(index){ //删除图片
      this.imgArrs.splice(index,1)
      this.files.splice(index,1)
      this.fileLg = this.files.length
    },
    uploadImageQuer(imgArr,callBack){
      let $this = this
      for(let i = 0; i < imgArr.length; i++){
        wx.uploadFile({
          method:'POST',
          url: uploadFile,
          filePath: imgArr[i],
          name: 'file',
          formData: {
            'file': i
          },
          success (res_r){
            console.log(res_r)
            wx.hideLoading()
            let jsonStr = res_r.data
            jsonStr = jsonStr.replace(" ","")
            if(typeof jsonStr!= 'object'){
              jsonStr= jsonStr.replace(/\ufeff/g,"")
              let $files = JSON.parse(jsonStr)
              $this.setDataInfo.images.push($files.files[0].fid)
              // $this.files.push(''+imgPath+''+$files.files[0].fid+'')
              if(i == imgArr.length-1){
                callBack(true)
              }
            }else{
              if(i == imgArr.length-1){
                callBack(false)
              }
            }
          },
          fail (r){
            wx.hideToast()
            wx.showToast({ title: '网络超时', icon: 'none', duration: 2000 })
          }
        })
      }
    },
    getSetting () { //位置授权
      let $this = this
      wx.getSetting({
        success: (res) => {
          if(!res.authSetting['scope.userLocation']){
            wx.authorize({
              scope: 'scope.userLocation',
              success(res) {
                $this.isAuthorize = true
              }
            })
          } else {
            $this.isAuthorize = true
          }
        }
      })
    },

    addrSel () { //选择地址
      let $this = this
      if(this.isAuthorize){
        wx.chooseLocation({
          success(res) {
            console.log(res)
            $this.isAddr = true
            $this.addr = res.name
            $this.setDataInfo.location.city = res.address
            $this.setDataInfo.data.addrArea = addrRegExp(res.address)
            $this.setDataInfo.location.geon = res.name
            $this.setDataInfo.location.lon = res.longitude
            $this.setDataInfo.location.lat = res.latitude
          },
        })
      }else{
        wx.getSetting({
          success: (res) => {
            wx.showModal({
              title: '是否授权当前位置',
              content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
              success(tip) {
                if(tip.confirm){
                  wx.openSetting({
                    success(data) {
                      if(data.authSetting["scope.userLocation"] === true){
                        $this.isAuthorize = true
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                      }else{
                        wx.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    },

    //清空发布活动数据
    resetActivInfo(){
      this.txtVal = ''
      this.endDates = ''
      this.peopleNum = ''
      this.typeVal = ''
      this.addr = ''
      this.selDate = ''
      this.imgArrs = []
      this.files = []
      this.setDataInfo = {
        "pt": 8,	//那些人可见 1自己  2朋友 4非朋友 8所有
          "gender": 4, //性别 1男 2女 4全部
          "companion": 0, //1可否携带朋友

          "nrange": {
          "nmax": 2, //最多人
            "nmin": 2  //最少人
        },
        "trange": {
          "etm": '', //报名截止时间
            "tm": ''	//活动时间
        },
        "location": {
          "city": "",
            "geon": "", //地点名
            "lon": 0.01, //纬度
            "lat": 0.01
        },
        joint: 0, // 1需要审核
          "category": "", //主题大分类
          "subject": "",  //主题
          "decription": "", //活动描述
          "images": [], //图片地址
          "gn": "", //群名（时间加主题）
          "data": {
          "pay": 1, //付费方式（买单） AA
            "relay": 1, //转发（允许邀约好友）0不允许转发
            "shuttle": 0 //接送 0不接送
        },
        user:{uid: 0, token: '', tm:0} //"token": hash(tm, "Token", token)
      }
    },

    /**
     * 计算经纬距离
     * @param lat1
     * @param lng1
     * @param lat2
     * @param lng2
     */
    getDistance (lat1, lng1, lat2, lng2) {
      lat1 = lat1 || 0;
      lng1 = lng1 || 0;
      lat2 = lat2 || 0;
      lng2 = lng2 || 0;

      let rad1 = lat1 * Math.PI / 180.0;
      let rad2 = lat2 * Math.PI / 180.0;
      let a = rad1 - rad2;
      let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

      let r = 6378137;
      return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
    }

  }
}
</script>

<style scoped>

.section{margin-top:15px; position:relative; width:100%; padding:10px 15px; background-color:#fff; box-sizing:border-box;}

.container,.box{padding:0px;}
.rls-main-box{margin-top:15px; background-color:#fff; }
.select-setting{height:47px; overflow-y:hidden; transition:height .6s ease;}
.curselstig{height:317px !important;}
.ms-box{padding:10px 15px; height:80px;}
p.txt-ms-p{font-size:15px; font-weight:600;}
.rls-main-box>ul{display:inline-block; list-style:none;}
.rls-main-box>ul>li{display:inline-block; border-top:1px solid #f3f4f8; padding:15px 20px;
  display:flex; align-items:center; justify-content:space-between; font-size:16px;}
.rls-main-box>ul>li label{color:#231916; font-family:"Microsoft YaHei UI";}
.rls-main-box>ul>li label.rlstitle{display:inline-block; min-width:85px;}
.rls-main-box>ul>li input {padding-right:20px;}
.rls-main-box>ul>li:after{content:"\20"; width:8px; height:8px; position:absolute;
  border-left:2px solid #ccc; border-bottom:2px solid #ccc; right:20px; top:27px;
  -webkit-transform:translate(0,-50%) rotate(-135deg); transform:translate(0,-50%) rotate(-135deg);  }
i.is-sel-i{width:12px; height:12px; position:absolute;
  border-left:2px solid #ccc; border-bottom:2px solid #ccc; right:20px; top:23px;
  -webkit-transform:translate(0,-50%) rotate(-45deg); transform:translate(0,-50%) rotate(-45deg);}
i.selicur{top:30px !important; -webkit-transform:translate(0,-50%) rotate(-225deg) !important; transform:translate(0,-50%) rotate(-225deg) !important;}
li.no-after-li::after{width:0px !important; height:0px !important; border:0px !important; content:"";}
li.no-after-li>.noaft-box>label{font-size:14px; color:#999; padding:1px 10px; background-color:#F3F4F8; margin-left:8px; border-radius:15px;}
li.no-after-li>.noaft-box>label:nth-child(1){margin-left:0px;}
li.setting-li{padding-left:30px !important;}
input{text-align:right; color:#238EFA; font-size:16px;}
textarea.textarea-input{padding:0px; font-size:16px; width:100%; height:0px; background-color:#fff; border-radius:3px;
  outline:none; resize:none; transition:padding .5s, height .5s;}
.button-hover{background-color:#fff;}
.txtipt{padding:10px 15px !important; height:100px !important;}

.textarea-box{position:fixed; overflow:hidden; top:0px; left:0px; height:100%; background:rgba(236,239,242,0); transition:background .5s ease; z-index:9999;}
.tbcur{background:rgba(0,0,0,.5);}
.tbx-box-trans{position:absolute; top:400px; left:0px; width:100%; transition:top .5s ease; padding:10px;}
.tbtcur{top:10px !important; left:0px;}
.txtar-btn{font-size:16px; border-radius:0px; background-color:#fff; margin-top:15px;}
.txtar-btn:after{border:none !important;}
.tbx-box-trans p{background-color:#fff; padding:5px 15px; font-size:14px; font-weight:600;}
p.ms-txt-info{font-size:14px; color:#ccc; margin-top:10px; display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}

p.upload-p{display:flex; align-items:center; justify-content:center; flex-direction:column;}
i.icon-tupianshangchuan{font-size:40px;}
p.upload-p>span{font-size:14px; color:#969696;}

.publish-box>label{background-color:#FFFAE7; display:inline-block; font-size:12px; color:#666; padding:10px 20px;}
.publish-box>.button-hover,.publish-box>button{background-color:#FFDA4A; color:#231916; border-radius:0px; font-weight:600; font-size:18px;}
.publish-box>button:after{border:none !important;}
.publish-box>button{padding:5px 0px;}
/*吃喝*/
input.chihe-ipt{color:#ffaa32 !important;}
/*玩乐*/
input.wanle-ipt{color:#14962a !important;}
/*运动*/
input.yundong-ipt{color:#007efa !important;}
/*棋牌*/
input.qipai-ipt{ color:#0a9b9b !important;}
/*出游*/
input.chuyou-ipt{ color:#481ebe !important;}
/*其他*/
input.youxi-ipt{ color:#d41e2a !important;}
/*其他*/
input.qita-ipt{ color:#ff5a00 !important;}

label.curlabel{background-color:#238EFA !important; color:#fff !important;}
text#addr-text{display:inline-block; width:80%; height:20px; padding-right:20px; text-align:right; color:#238EFA;
  display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
#maxft{position:absolute; right:20px; bottom:70px; font-size:14px; color:#ccc;}
.rle-ge{position:relative; width:100%; height:10px; background-color:#f3f4f8;}
.sp-mask{position:absolute; top:0px; left:0px; width:100%; height:100%; background-color:transparent;}
</style>
