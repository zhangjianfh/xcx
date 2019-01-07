<template>
  <div class="footers">
    <ul>
      <li id="home-li" v-if="isMe">
        <navigator open-type="reLaunch" hover-class="none" href="/pages/home/main" @tap="navClickState">
          <img class="fimg-l" src="../../static/img/btn_home_engag.png" mode="widthFix" />
        </navigator>
      </li>
      <li id="home-li" v-else>
        <img class="fimg-l" src="../../static/img/btn_home_engaged.png" mode="widthFix" />
      </li>

      <li id="create-li">
        <navigator hover-class="none" href="/pages/release/main">
          <img class="fimg-c" src="../../static/img/btn_home_add.png" mode="widthFix" />
        </navigator>
      </li>

      <li id="me-li" v-if="isMe">
        <img class="fimg-r" src="../../static/img/btn_home_meed.png" mode="widthFix" />
      </li>
      <li id="me-li" v-else>
        <navigator hover-class="none" open-type="reLaunch" href="/pages/my/main">
          <img class="fimg-r" src="../../static/img/btn_home_me.png" mode="widthFix" />
        </navigator>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    isMe: Boolean
  },
  data () {
    return {
      msg: '底部导航'
    }
  },
  onLoad () {
  },
  methods: {
    navClickState(){
      wx.setStorageSync('navsta', 'y')
    }
  }
}
</script>

<style scoped>
.footers{padding:10px 0px;}
.footers>ul>li,.footers>ul>li>navigator{position:relative; height:45px; display:flex; align-items:center; justify-content:center;}
</style>
