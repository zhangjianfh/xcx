<template>
  <div class="container">
    <div class="box">
      <div class="signup">
        <image class="image-banner" :src="bnImg" mode="widthFix"></image>
        <p class="signup-status" v-if="sgSta == 1"> <image :src="succImg" mode="widthFix"></image> <text>报名成功!</text> </p>
        <p class="signup-status" v-else-if="sgSta == 2"> <image :src="verifyImg" mode="widthFix"></image> <text>等待审核!</text> </p>
        <p class="signup-status" v-else> <image :src="failImg" mode="widthFix"></image> <text>报名失败!</text> </p>
        <div class="dld-txt">
          <p>即刻下载我约APP</p>
          <p>与其他小伙伴一起讨论，实时关注动态</p>
        </div>
        <div class="bottom-box">
          <button class="add-ju-btn" @tap="viewAp">查看我的约局</button>
        </div>
      </div>
    </div>
    <Isreg/>
  </div>
</template>

<script type="text/ecmascript-6">
import Isreg from '../../components/Isreg.vue'
import '../../../static/icon/iconfont.css'
import bannerImg from '../../../static/img/img_s-start_banner.png'
import succImg from '../../../static/img/img_s-post_ok.png'
import verifyImg from '../../../static/img/img_s-post_load.png'
import failImg from '../../../static/img/img_s-post_erro.png'
export default{
  components: { Isreg },
  template: '<Isreg/>',
  data () {
    return {
      msg: '报名结果提示页面',
      sgSta: 1,
      bnImg: bannerImg,
      succImg: succImg,
      verifyImg: verifyImg,
      failImg: failImg,

    }
  },
  onLoad(opt){
    // console.log(opt)
    // opt = {data: "2"}
    this.sgSta = parseInt(opt.data)
  },
  mounted () {
  },
  methods: {
    viewAp () {
      wx.redirectTo ({
        url: '../addin/main'
      })
    }
  },
  created () {
  },
}
</script>

<style scoped>
.bottom-box{position:fixed; padding:18px 20px; background-color:#fff; bottom:0px; left:0px; width:100%; border-top:1px solid #e8ebf0;}
.bottom-box>button{background-color:#238EFA; color:#fff; font-size:18px; font-weight:700; height:40px; line-height:40px;}
.signup{position:relative; width:100%; padding: 20px;}
.image-banner{width:100%;}
p.signup-status{display:flex; align-items:center; justify-content:center; margin:50px 0px;}
p.signup-status>image{width:30px; margin-right:15px;}
.dld-txt{position:relative; width:100%; padding:10px 0px;}
.dld-txt>p{text-align:center; margin-bottom:10px; font-size:16px; color:#969696;}
</style>
