<template>
  <div class="woye-prompt" v-show="isHidden">
    <div class="wyprompt">
      <div class="woye-pmp-box">
        <div class="wpb-title">
          <div class="wpb-title-left"><img src="../../static/img/icon_pop_tips@2x.png" mode="widthFix" /></div>
          <div class="wpb-title-right">
            <h3>下载我约APP了解更多</h3>
            <p>按照以下步骤开启我约APP</p>
          </div>
        </div>
        <div class="wpb-ctns">
          <h4>1、打开手机浏览器输入并前往</h4>
          <p><label class="txt-lanse">www.woyue.com</label></p>
        </div>
        <div class="wpb-ctns">
          <h4>2、按照提示下载安装或打开我约APP。</h4>
          <p>( iOS用户打开<label class="txt-lanse">AppStore</label>搜索我约<label class="txt-lanse">APP</label>安装/打开 ）</p>
        </div>
        <div class="wpb-btn">
          <button @tap="hidenPromp">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isHidden: Boolean
  },
  data(){
    return{
      msg: '下载提示',
    }
  },
  onLoad () {
  },
  onShow(){
  },
  mounted () {
  },
  methods:{
    hidenPromp(){
      this.isHidden = false
      this.$emit('promps',false,{bubbles:false});
    }
  }

}
</script>

<style scoped>
.woye-prompt{position:fixed; top:0px; left:0px; width:100%; height:100%; background:rgba(0,0,0,.5); z-index:99; }
.wyprompt{position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center;}
.woye-pmp-box{padding:20px 0px; border-radius:10px; background-color:#fff;}
.wpb-title,.wpb-ctns{padding:0px 15px;}
.wpb-title{display:flex; align-items:center; justify-content:flex-start;}
.wpb-title-left>img{width:50px;}
.wpb-title-right{padding-left:15px; text-align:left;}
.wpb-title-right>h3{font-weight:600; margin-bottom:4px;} .wpb-title-right>p{font-size:12px; color:#636363; font-size:16px;}
.wpb-ctns{margin-top:14px;}
.wpb-ctns>h4{font-size:14px; padding-left:30px; margin-bottom:4px;} .wpb-ctns>p{font-size:12px; padding-left:40px;}
.txt-lanse{color:#007EFA;}
.wpb-btn{margin-top:15px; padding-top:10px; border-top:1px solid #E8EBF0;}
.wpb-btn>button{background-color:#007EFA; color:#fff; font-size:15px; width:90%; border-radius:30px;}
</style>
