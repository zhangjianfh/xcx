<template>
  <div class="isreg-box" v-show="isLoading">
    <div class="shouquan">
      <div class="shouquan-box" :class="{'shouquanboxhd':isShow}">
        <div class="sq-title-p">
          <div class="prp-img"><img src="../../static/img/icon_pop_tips@2x.png" mode="widthFix" /></div>
          <div>
            <h4>用户授权提示</h4>
            <p>按照以下步骤操作</p>
          </div>
        </div>
        <div class="sq-cotent">正常使用“我约Lite”小程序需允许微信授权，请点击“下一步”后“允许”授权。</div>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo" @tap="getUserInfo1" class="islogins">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  },
  data(){
    return{
      msg: '用于判断用户是否注册',
      userInfo: {},
      isShow: false,
      code: '',
      iv: '',
      loginToken: '',
      encryptdata: '',
      inviter: '', //邀请者ID
      device: '', //手机型号
      version: '' //微信版本号
    }
  },
  onLoad () {
    this.getSetting()
  },
  onShow(){
  },
  mounted () {
  },
  methods:{
    getSetting () { //验证用户是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            console.log('用户已授权')
            console.log(wx.getStorageSync('token'))
            if(wx.getStorageSync('token') == ''){
              wx.redirectTo ({
                url: '../index/main'
              })
            }
          } else {
            console.log('用户已授权')
          }
        }
      })
    },

    getUserInfo1(){ //判断用户微信版本是否可用
      this.isShow = false
      if(wx.canIUse('button.open-type.getUserInfo')){
        console.log('用户版本可用')
      }else{
        console.log('请升级微信版本')
      }
    },

    bindGetUserInfo(e){
      console.log(e)
      let $this = this
      if (e.mp.detail.rawData){
        this.isShow = false
        console.log('用户按了允许授权按钮')
        this.$emit('myevent',true,{bubbles:false});
      }else{
        this.isShow = false
        this.$emit('myevent',false,{bubbles:false});
        console.log('哈哈哈哈哈哈')
        console.log('用户按了拒绝按钮')
        wx.redirectTo ({
          url: '../index/main'
        })
      }
    },

  }

}
</script>

<style scoped>
/*background-color:transparent;*/
/*button.islogins{position:fixed; width:100%; height:100%; top:0px; left:0px; z-index:15; border-radius:0px; background-color:red;}*/
</style>
