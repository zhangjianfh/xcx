<template>
  <div class="container">
    <div class="box">
      <web-view src="http://10.10.1.106:8081/#/download"></web-view>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default{
    data () {
      return {
        msg: '镶嵌页面'
      }
    },
    onLoad () {
      wx.setNavigationBarTitle({
        title: '镶嵌页面'
      })
    },
    mounted () {
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style scoped>
  .box{padding:15px; background-color:#f3f4f8;}
</style>
