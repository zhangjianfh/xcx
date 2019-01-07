<template>
  <div class="container">
    <div class="box">
      <h3>所有消息</h3>
      <ul class="msg-list">
        <li>
          <h4><label>入局申请</label><label>2018年10月17日 10:19</label></h4>
          <div class="msg-info-box">
            <div class="msg-info">
              <navigator url="../friend/main"><img src="../../../static/img/test_header.png" /></navigator>
              <div class="msg-info-left">
                <h2><label class="u-name">名字</label><label>申请加入</label></h2>
                <p>10月17日 · 打球</p>
              </div>
            </div>
            <button @tap="dwEvnt">处理</button>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      msg: '消息中心'
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
  },
  mounted () {
  },
  methods: {
    dwEvnt () {
      wx.redirectTo ({
        url: '../download/main'
      })
    },

    // downLoadEvn () {
    //   console.log(1111111111)
    //   wx.downloadFile({
    //     url: 'http://m.down.sandai.net/mobile/OfficialSite_XunLeiProductCenter.apk',
    //     success: res => {
    //       console.log(res)
    //     },
    //     fail: fa => {
    //       console.log(fa)
    //     }
    //   })
    // }
  },
  created () {
  }
}
</script>

<style scoped>
  .box{padding:15px; background-color:#f3f4f8;}
  .box>h3{font-size:14px;}
  ul.msg-list li{margin-top:15px; border-radius:5px; background-color:#fff;}
  ul.msg-list li h4{color:#969696; font-size:12px; padding:14px; border-bottom:1px solid #f3f4f8; display:flex; align-items:center; justify-content:space-between;}
  .msg-info-box{padding:10px 14px; display:flex; align-items:center; justify-content:space-between;}
  .msg-info>navigator>img{width:50px; height:50px;}
  button{margin:0px; font-size:12px; color:#fff; font-weight:600; background-color:#007EFA;}
  .msg-info{display:flex; align-items:center; justify-content:space-between;}
  .msg-info-left{padding-left:15px;}
  .msg-info-left>h2>label{font-size:13px; color:#969696;}
  .msg-info-left>h2>.u-name{font-size:15px; font-weight:600; color:#000; margin-right:14px;}
  .msg-info-left>p{font-size:14px; color:#007EFA;}
</style>
