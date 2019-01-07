/**
 * 分享图片生成---上传到服务器
 * @param wx ： wx
 * @param ctx : canvas
 * @param $this : this
 * @param uploadFile ： 图片上传地址
 * @param imgPath : 图片拼接地址
 */
function createImg(wx,ctx,$this,uploadFile,imgPath){
  let tempImgUrl = []
  let tmpArrImg = []
  wx.getUserInfo({
    success: res => {
      for(let i in $this.doinImg){
        if($this.doinImg[i].avatar.split('://')[0] == 'http'){
          tempImgUrl.push('https://'+$this.doinImg[i].avatar.split('://')[1])
        }else{
          tempImgUrl.push($this.doinImg[i].avatar)
        }
      }
      let tmpNum = 0;
      if(tempImgUrl.length >= 3){
        tmpNum = 3;
      }else{
        tmpNum = tempImgUrl.length
      }
      for(let j = 0; j < tmpNum; j++){
        tmpArrImg.push(joinAvat(tempImgUrl[j]))
      }
      Promise.all(tmpArrImg).then(rst=>{
        console.log('----------------Promise--all---------------')
        console.log(rst)
      // })

      // wx.downloadFile({
      //   url: res.userInfo.avatarUrl,
      //   success: function(resdl){

          // console.log('------------------头像头像--------------------')
          // console.log(resdl.tempFilePath)
          // $this.avatarImg = resdl.tempFilePath

          ctx.setFillStyle('#fff');
          ctx.fillRect(0, 0, 200, 160);

          //背景渐变色
          const grd = ctx.createLinearGradient(0, 0, 0, 250)
          roundRect(ctx, 0, 0, 200, 160, 10)
          grd.addColorStop(0, '#ffd100')
          grd.addColorStop(1, '#ffaa00')
          ctx.setFillStyle(grd);//将渐变色渲染入正方形
          ctx.fillRect(0, 0, 200, 160);//起点坐标为（0，0），长为150px 宽适应屏幕的正方形

          //标题
          ctx.setFillStyle('#fff')
          ctx.setFontSize(22)
          ctx.setTextAlign('left')
          ctx.fillText($this.zInfo.subject, 15, 40)

          console.log('===========-canver-===========')
          console.log('===========-绘制头像-===========')
          console.log($this.doinImg)
          //头像
          /*ctx.save()
          ctx.beginPath()
          ctx.arc(176,30, 8, 0, 2 * Math.PI)
          ctx.setStrokeStyle('#fff')
          ctx.stroke()
          ctx.clip()
          ctx.drawImage($this.avatarImg, 168, 22, 18, 18)
          ctx.restore()*/
          let dx1 = 168
          let dx2 = 176
          let pasAvt = 0
          for(let n = 0; n < rst.length; n++){
            let jl = dx1 - pasAvt
            let jl2 = dx2 - pasAvt
            avatCv(ctx,rst[n],jl,jl2)
            pasAvt += 15
          }
          /*for(let i in rst){
            let jl = dx1 - pasAvt
            let jl2 = dx2 - pasAvt
            avatCv(ctx,rst[i],jl,jl2)
            pasAvt += 15
          }*/

          //城市·地址
          ctx.setFillStyle('#fff')
          ctx.setFontSize(10)
          ctx.setTextAlign('left')
          ctx.fillText($this.zInfo.city, 121, 135)


          //时间
          ctx.setFillStyle('#fff')
          ctx.setFontSize(13)
          ctx.setTextAlign('center')
          ctx.fillText($this.times, 66, 135)

          ctx.setFillStyle('#fff')
          ctx.setFontSize(10)
          ctx.setTextAlign('left')
          ctx.fillText($this.ymd, 15, 116)


          //圆角矩形 ctx,x,y,宽,高,圆角
          roundRect(ctx, 15, 123, 30, 16, 7)
          ctx.setFillStyle('#ffcf00')
          ctx.setFontSize(10)
          ctx.setTextAlign('left')
          ctx.fillText($this.week, 20, 135)


          // ctx.draw()
          ctx.draw(true,setTimeout(function(){
            wx.showLoading({ title: '加载中', mask: false })
            wx.canvasToTempFilePath({
              x:0,
              y:0,
              width:200,
              height:160,
              destWidth: 200*10, //200 * 750 / wx.getSystemInfoSync().windowWidth,
              destHeight: 160*10, //160 * 750 / wx.getSystemInfoSync().windowWidth,
              fileType: 'jpg',
              quality: 1,
              canvasId:'myCav',
              success: function (res) {
                var tmpFilePath = res.tempFilePath
                console.log(tmpFilePath)
                wx.uploadFile({
                  method:'POST',
                  url: uploadFile,
                  filePath: tmpFilePath,
                  name: 'file',
                  formData: {
                    'file': 0
                  },
                  success (res_r){
                    console.log('--------------------YYYYYYYYYYYYYYYYYYYYYYYYY---------------------------')
                    console.log(res_r)
                    let jsonStr = res_r.data
                    jsonStr = jsonStr.replace(" ","")
                    console.log(jsonStr)
                    if(typeof jsonStr!= 'object'){
                      jsonStr= jsonStr.replace(/\ufeff/g,"")
                      let $files = JSON.parse(jsonStr)
                      $this.shareImg = ''+imgPath+''+$files.files[0].fid+''
                      console.log('--------------------oooooooo---------------------------')
                      console.log($this.shareImg)
                    }
                    wx.hideLoading()
                  },
                  fail (r){
                    wx.hideLoading()
                    wx.showToast({ title: '网络超时', icon: 'none', duration: 2000 })
                    console.log('图片上传失败')
                    console.log(r)
                  }
                })
              },
              fail(f){
                console.log('----------------没进入------------------')
                console.log(f)
              }
            })
          },1000));


      //   }, //
      //   fail(dlf){
      //     console.log('===================downloadFile>>>>>ERROR======================')
      //     console.log(dlf)
      //   }
      // })

      })
    }
  })
}

function joinAvat(arrAvat){

  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: arrAvat, // 仅为示例，并非真实的资源
      success(res) {
        resolve(res.tempFilePath)
      },
      fail(err){
        reject(err)
      }
    })
  })

}

function avatCv(ctx,avatarImg,dx1,dx2){
  ctx.save()
  ctx.beginPath()
  ctx.arc(dx2,30, 8, 0, 2 * Math.PI)
  ctx.setStrokeStyle('#fff')
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(avatarImg, dx1, 22, 18, 18)
  ctx.restore()
}

function roundRect(ctx, x, y, w, h, r) {
  // 开始绘制
  ctx.beginPath()
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  // 这里是使用 fill 还是 stroke都可以，二选一即可
  ctx.setFillStyle('#fff')
  ctx.setStrokeStyle('#fff')
  // 左上角
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

  // border-top
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 右上角
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

  // border-right
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 右下角
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

  // border-bottom
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 左下角
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

  // border-left
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)

  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
  ctx.fill()
  ctx.closePath()
  // 剪切
  ctx.clip()
  ctx.stroke()
}

module.exports = {
  createImg: createImg
}
