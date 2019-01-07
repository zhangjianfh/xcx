<template>
  <div class="container">
    <movable-area style="height: 200px;width: 200px;background: red;">

      <!--蓝色任意方向拖动的内容-->
      <movable-view direction="all" style="height: 50px; width: 50px; background: blue;">
      </movable-view>

      <!--黄色只能横向拖动的内容-->
      <movable-view direction="vertical" style="height: 20px; width: 50px; background: yellow;">
      </movable-view>

    </movable-area>
  </div>
</template>

<script>
export default {
  name: "test",
  data () {
    return {
      msg: 'test'
    }
  },
  onLoad(){

    // let tmpImg = 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg'
    // ctx.drawImage(tmpImg, 50, 50, 20, 20)
  },
  methods: {
    clearData(){
      wx.clearStorage()
      wx.clearStorageSync()
    },
  }
}
</script>

<style scoped>
.container{background-color:#0a9b9b;}
</style>
