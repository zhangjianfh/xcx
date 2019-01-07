function getData(url,data,method) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

// function tstAjax(url,data,method){
//   getData(url,data,method).then((res)=>{
//     console.log('----------Promise------------')
//     console.log(userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5))
//     let data = res.data.data
//     let user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
//     console.log(user)
//     for(let i = 0; i < data.length; i++){
//       console.log(data[i].mems)
//       Promise.all([data[i].mems.map(item => getData(''+baseUrl+''+basePath.user+'',{uid:item.uid, user:user},'post'))]).then(da=>{
//         console.log('-------------P-r-o-m-i-s-e------------')
//         console.log(da)
//       })
//     }
//   })
// }

function PromiseTest(url,$data,method,userInfos,hexMD5){

  getData(url,$data,method).then((res)=>{
    let prmArr = []
    console.log('----------------Promise--act---------------')
    for(i in res.data.data){
      let $uDa = {}
      $uDa.uid = []
      $uDa.user = {}
      $uDa.user = userInfos(wx.getStorageSync('uid'), wx.getStorageSync('token'), Date.parse(new Date())/1000, hexMD5)
      console.log(res.data.data[i].user)
      $uDa.uid.push(res.data.data[i].user.uid)
      prmArr.push(getData('https://www.woyue.com/user/info',$uDa,'post'))
    }

    Promise.all(prmArr).then(rst=>{
      console.log('----------------Promise--all---------------')
      for(itm in rst){
        console.log(rst[itm].data.data)
      }
      console.log('----------------Promise--all---------------')
    })

    //'https://www.woyue.com/user/info'


  })

}



module.exports = {
  PromiseTest:PromiseTest
}
