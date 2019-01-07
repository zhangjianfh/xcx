<template>
  <div class="container">
    <div class="box">
      <view class="section section-search">
        <icon type="search" size="14" />
        <input type="search" confirm-type="search" placeholder="搜索你想玩的主题" />
      </view>
      <view class="section section-theme">
        <h5>常用主题</h5>
        <ul class="hot-theme-ul">
          <li v-for="(hot,index) in hotTheme" :key="index">
            <label v-if="hot.cat === '运动'" class="yundong" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else-if="hot.cat === '游戏'" class="youxi" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else-if="hot.cat === '吃喝'" class="chihe" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else-if="hot.cat === '玩乐'" class="wanle" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else-if="hot.cat === '棋牌'" class="qipai" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else-if="hot.cat === '出游'" class="chuyou" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
            <label v-else class="qita" @tap="selTheme(hot.sub,hot.cat)">{{hot.sub}}</label>
          </li>
        </ul>
        <div class="theme-list-box">
          <div class="theme-list-title">
            <ul>
              <li v-for="(list,index) in listTheme" :key="index" @tap="selectTheme(list.cat)">
                <label v-if="list.cat == '吃喝'" :class="{'chihe-title':themeStu == '吃喝'}">{{list.cat}}</label>
                <label v-if="list.cat == '玩乐'" :class="{'wanle-title':themeStu == '玩乐'}">{{list.cat}}</label>
                <label v-if="list.cat == '棋牌'" :class="{'qipai-title':themeStu == '棋牌'}">{{list.cat}}</label>
                <label v-if="list.cat == '游戏'" :class="{'youxi-title':themeStu == '游戏'}">{{list.cat}}</label>
                <label v-if="list.cat == '出游'" :class="{'chuyou-title':themeStu == '出游'}">{{list.cat}}</label>
                <label v-if="list.cat == '运动'" :class="{'yundong-title':themeStu == '运动'}">{{list.cat}}</label>
                <label v-if="list.cat == '其他'" :class="{'qita-title':themeStu == '其他'}">{{list.cat}}</label>
              </li>
            </ul>
          </div>
          <div class="thme-list-ctn">
            <ul class="thme-list-ul" v-if="listArry.length > 0">
              <li v-for="(lst, index) in listArry" :key="index">
                <label v-if="themeStu == '吃喝'" class="chihe-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '玩乐'" class="wanle-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '棋牌'" class="qipai-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '游戏'" class="youxi-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '出游'" class="chuyou-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '运动'" class="yundong-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
                <label v-if="themeStu == '其他'" class="qita-list" @tap="selTheme(lst,themeStu)">{{lst}}</label>
              </li>
            </ul>
            <ul v-else>
              <li>暂无活动</li>
            </ul>
          </div>
        </div>
      </view>
    </div>
    <Isreg/>
  </div>

</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import { baseUrl,basePath }  from '../../../static/js/httpUrl'
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '主题选择',
      hotTheme: [
        {cat:"运动",sub:"篮球"},
        {cat:"吃喝",sub:"火锅"},
        {cat:"玩乐",sub:"玩乐乐"},
        {cat:"游戏",sub:"躲猫猫"},
        {cat:"出游",sub:"自驾"},
        {cat:"棋牌",sub:"麻将"},
        {cat:"其他",sub:"泡澡"}
      ],
      listTheme: [
        {cat:"吃喝",subs:["聚餐"]},
        {cat:"玩乐",subs:["K歌"]},
        {cat:"棋牌",subs:["麻将"]},
        {cat:"运动",subs:["篮球"]},
        {cat:"出游",subs:["野餐"]},
        {cat:"游戏",subs:["LOL"]},
        {cat:"其他",subs:["乱摸"]}
      ],
      listArry: [],
      themeStu: '吃喝'
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '主题选择'
    })
    this.themeHost()
    this.themeList()
  },
  mounted () {

  },
  methods: {
    selectTheme (str) {
      this.themeStu = str
      for(let i = 0; i < this.listTheme.length; i++){
        if(str == this.listTheme[i].cat){
          this.listArry = this.listTheme[i].subs
        }
      }
    },

    themeHost () {
      wx.showToast({ title: '加载中', icon: 'loading' })
      console.log(''+baseUrl+''+basePath.themeHot+'')
      let $this = this
      wx.request({
        method: 'GET',
        url: ''+baseUrl+''+basePath.themeHot+'',
        header: { "content-type": "application/x-www-form-urlencoded" },
        success (res) {
          console.log('----------------------热门主题-----------------------')
          console.log(res)
          $this.hotTheme = res.data.data
          wx.hideToast()
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    themeList () {
      wx.showToast({ title: '加载中', icon: 'loading' })
      console.log(''+baseUrl+''+basePath.themeList+'')
      let $this = this
      wx.request({
        method: 'GET',
        url: ''+baseUrl+''+basePath.themeList+'',
        header: { "content-type": "application/x-www-form-urlencoded" },
        success (res) {
          wx.hideToast()
          $this.listTheme = res.data.data
          $this.selectTheme ($this.themeStu)
        },
        fail (nogo) {
          console.log(nogo)
        }
      })
    },
    selTheme (name,type) {
      wx.setStorage({key:'theme',data:{name:name,type:type}})
      wx.redirectTo ({
        url: '../release/main'
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
.box{background-color:#fff; padding:0px;}
.section-search,.section-theme,ul.theme-list-ul,.theme-box>.theme-content{padding:0px 15px;}
.section-search>icon{position:absolute; left:28px; top:15px;}
.section-search>input{background-color:#F3F4F8; height:40px; padding-left:40px; border-radius:3px; font-size:16px;}

.section-theme{margin-top:25px;}
.section-theme>h5{color:#969696; font-size:16px;}
.section-theme>ul,.thme-list-ul{position:relative; width:100%; height:100%; display:flex; align-items:center;
  justify-content:space-between; flex-wrap:wrap; text-align:left;}
.section-theme>ul>li,.thme-list-ul>li{width:31%; margin-top:15px; display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.section-theme>ul>li>label,.thme-list-ul>li>label{width:100%; text-align:center; padding:15px 0px; font-size:18px; border-radius:5px;
  display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:16px;}

.theme-list-title{overflow-x:auto; overflow-y:hidden; white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all;}
.theme-list-title>ul{position:relative; width:100%; white-space:nowrap; -ms-word-break:keep-all; word-break:keep-all; border-bottom:2px solid #ccc;}
.theme-list-title>ul>li{display:inline-block; padding-left:20px; padding-bottom:6px;}
.theme-list-title>ul>li:nth-child(1){padding-left:0px;}
.theme-list-title>ul>li>label{padding:6px 0px; border-bottom:2px solid #ccc; font-size:16px;}

.theme-list-title>ul>li>label.chihe-title{color:#ffaa32 !important; border-color:#ffaa32 !important;}
.theme-list-title>ul>li>label.wanle-title{color:#14962a !important; border-color:#14962a !important;}
.theme-list-title>ul>li>label.qipai-title{color:#0a9b9b !important; border-color:#0a9b9b !important;}
.theme-list-title>ul>li>label.youxi-title{color:#d41e2a !important; border-color:#d41e2a !important;}
.theme-list-title>ul>li>label.chuyou-title{color:#481ebe !important; border-color:#481ebe !important;}
.theme-list-title>ul>li>label.yundong-title{color:#007efa !important; border-color:#007efa !important;}
.theme-list-title>ul>li>label.qita-title{color:#ff5a00 !important; border-color:#ff5a00 !important;}

</style>
