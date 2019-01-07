const dataArrrMonth = []
const dataArrrDay = []

/**
 * 获取每月天数
 * @param date
 * @returns {number}
 */
function getMonthLength(date){
  let d = new Date(date)
  // 将日期设置为下月一号
  d.setMonth(d.getMonth()+1)
  d.setDate('1')
  // 获取本月最后一天
  d.setDate(d.getDate()-1)
  return d.getDate()
}

function arryYmdx(dayNum,ym,month){
  let mdx = [];
  let day = 1;
  let opDate = '';
  var str = '';
  for(let i = 0; i < dayNum; i++){
    switch (new Date(ym+'-'+day).getDay()) {
      case 0:
        str = "周日";
        break;
      case 1:
        str = "周一";
        break;
      case 2:
        str = "周二";
        break;
      case 3:
        str = "周三"
        break;
      case 4:
        str = "周四";
        break;
      case 5:
        str = "周五";
        break;
      case 6:
        str = "周六";
        break;
    }
    if(month > 12){
      month = month - 12
    }
    opDate = month + '月 ' + day + '日 ' + str
    mdx.push(opDate)
    day++
  }
  return mdx
}


function monthDay(){
  let monthDay = []
  let mdx = []
  let thisYear = new Date().getFullYear();//当前年
  let thisMonth = parseInt(new Date().getMonth())+1;//当前月
  let nowDay = parseInt(new Date().getDate()) //今天几号
  let tday1 = 0;
  // let tday2 = 0;
  let pjYmd = ''
  if(thisMonth+1 > 12){
    tday1 = getMonthLength((thisYear+1) + '-' + (thisMonth+1 - 12)) - nowDay
    pjYmd = (thisYear+1) + '-' + (thisMonth+1 - 12)
    monthDay = arryYmdx(tday1,pjYmd,thisMonth+1)
  }else{
    tday1 = 30 //getMonthLength((thisMonth+1).toString()) - nowDay
    pjYmd = thisYear+'-'+(thisMonth+1)
    monthDay = arryYmdx(tday1,pjYmd,thisMonth+1)
  }

  // if(thisMonth+2 > 12){
  //   tday2 = getMonthLength((thisYear+1) + '-' + (thisMonth+2 - 12))
  //   pjYmd = (thisYear+1) + '-' + (thisMonth+2 - 12)
  //   mdx = arryYmdx(tday2,pjYmd,thisMonth+2)
  // }else{
  //   tday2 = getMonthLength((thisMonth+2).toString())
  //   pjYmd = thisYear+'-'+(thisMonth+2)
  //   mdx = arryYmdx(tday2,pjYmd,thisMonth+2)
  // }
  monthDay = monthDay.concat(mdx)
  return monthDay
}

/**
 * 时间 天数 星期几
 * @returns {Array}
 */
function countMonth(){

  let selDate = []
  let mdx = []
  let hour = []
  let minutes = []

  let thisMonth = new Date().getMonth()+1
  var $thisDay = getMonthLength(thisMonth.toString()) - new Date().getDate()

  let year = new Date().getFullYear()//年
  let month = new Date().getMonth()+1//月

  let ymd = '' //拼接年月日
  let str = '' //星期临时变量
  let md = '' //年月日星期 拼接变量
  let tempDay = new Date().getDate()//今天
  let tmpHour = new Date().getHours()//今天几点
  let tmpMinutes = new Date().getMinutes()//分

  if(tempDay == new Date().getDate()){
    for(let h = tmpHour; h < 24; h++){
      if(h < 10){
        hour.push('0'+ h)
      }else{
        hour.push(h.toString())
      }
    }
    if(tmpMinutes <= 55){
      for(let mt = tmpMinutes; mt <= 55; mt+=5){
        if(parseInt(mt)%5 != 0){
          switch (parseInt(mt)%5) {
            case 1:
              mt = mt + 4
              break;
            case 2:
              mt = mt + 3
              break;
            case 3:
              mt = mt + 2
              break;
            case 4:
              mt = mt + 1
              break;
          }
          if(mt < 10){
            minutes.push('0'+mt)
          }else{
            minutes.push(mt)
          }
        }else{
          minutes.push(mt)
        }
      }
    }else{
      hour.splice(0,1)
      for(let mt = 0; mt < 55; mt+=5){
        if(mt<10){
          minutes.push('0'+mt)
        }else{
          minutes.push(mt)
        }
        // minutes.push(mt)
      }
    }
  }else{
      for(let h = 0; h < 24; h++){
        if(h < 10){
          hour.push('0'+ h)
        }else{
          hour.push(h.toString())
        }
      }
      for(let mt = 0; mt < 55; mt+=5){
        if(mt < 10){
          minutes.push('0' + mt)
        }else{
          minutes.push(mt)
        }
      }
  }

  for(let i = 0; i <= $thisDay; i++ ){
    ymd = year + '/' + month + '/' + tempDay
    switch (new Date(ymd).getDay()) {
      case 0:
        str = "周日";
        break;
      case 1:
        str = "周一";
        break;
      case 2:
        str = "周二";
        break;
      case 3:
        str = "周三"
        break;
      case 4:
        str = "周四";
        break;
      case 5:
        str = "周五";
        break;
      case 6:
        str = "周六";
        break;
    }
    if(tempDay == new Date().getDate()){
      md = '今天 ' + str
    }else{
      md = month + '月 ' + tempDay + '日 ' + str
    }
    mdx.push(md)
    tempDay++
  }
  selDate.push(mdx)
  selDate.push(hour)
  selDate.push(minutes)
  selDate[0] = selDate[0].concat(monthDay())
  return selDate
}

/**
 * 人数
 * @returns {Array}
 */
function activityNum (){
  const activityArray = []
  activityArray[0] = []
  activityArray[1] = ['至']
  activityArray[2] = []
  let people = 2;
  for(let i = 0; i < 49; i++){
    activityArray[0].push(people+'人')
    activityArray[2].push(people+'人')
    people++
  }
  return activityArray
}

function endDate (startDate) {
  let tmpYmd = startDate.split('周')[0].replace(/日 /g, "日")+' 周'+startDate.split('周')[1].substr(0,1)
  let ymdIndex = countMonth()[0].indexOf(tmpYmd)
  if(parseInt(ymdIndex) == -1){
    ymdIndex = 0
  }
  let ymd = countMonth()[0].splice(ymdIndex,countMonth()[0].length) //获取到年月日星期几 (时间插件所需第一个数组)

  /*********************************************** ************************************************************/

  let $today = '今天'.charCodeAt()
  let today = startDate.replace(/月 /g, "-").replace(/日 /g, "").split('周')[0].charCodeAt()
  let time = startDate.replace(/月 /g, "/").replace(/日 /g, "/").split('周')[1]
  let startTime = time.replace(/ /g, "").substr(1)
  let sTime = startTime.split(':')[0]//报名时间(小时)
  let year = new Date().getFullYear()//年
  let dYear = year
  let month = new Date().getMonth()+1//月
  let tempDay = new Date().getDate()//今天
  if(parseInt(startDate.split('月')[0]) < parseInt(month)){
    dYear = parseInt(year) + 1
  }

  let nDate = Date.parse(dYear + '/' +  startDate.split('周')[0].replace(/月 /g, "/").replace(/日 /g, "") + ' ' + sTime + ':' + startTime.split(':')[1])
  if(today == $today){
    nDate = Date.parse(dYear + '/' + month + '/' + tempDay + ' ' + sTime + ':' + startTime.split(':')[1]) //报名时间（小时）
  }
  let _date = Date.parse(year + '/' + month + '/' + tempDay + ' ' + new Date().getHours() + ':' + new Date().getMinutes())
  let val = new Date(nDate) - new Date(_date)
  if(val/(1000 * 60) > 60){ //获取到 活动时间 - 当前时间 > 60分钟
    return true
  }else{
    return false
  }
}

/**
 * 时间格式处理
 * @param str
 * @returns {number}
 */
function dateProcess (str){
  let year = new Date().getFullYear()//年
  let month = new Date().getMonth()+1//月
  let day = new Date().getDate()//今天
  let $today = '今天'.charCodeAt()
  let _today = str.replace(/月 /g, "-").replace(/日 /g, "").split('周')[0].charCodeAt()

  let time = str.replace(/月 /g, "/").replace(/日 /g, "/").split('周')[1]
  let startTime = time.replace(/ /g, "").substr(1)
  let dateC = 0
  let dateT = 0
  if(_today == $today){
    dateT = year +　'-' + month + '-' + day + ' ' + startTime + ':' + '00'
    dateT = dateT.substring(0,19)
    dateT = dateT.replace(/-/g,'/')
    dateC = new Date(dateT).getTime()
  }else{
    let $tmt = str.split('月')[0]
    let $mt = str.replace(/月 /g, "-").replace(/日 /g, "").split('周')[0]
    if(parseInt($tmt) < parseInt(month)){
      year = year + 1
    }
    dateT = year +　'-' + $mt + ' ' + startTime + ':' + '00'
    dateT = dateT.substring(0,19)
    dateT = dateT.replace(/-/g,'/')
    dateC = new Date(dateT).getTime()
  }
  return dateC
}

/**
 *
 * @type {{countMonth: (function(): Array), endDate: endDate, activityNum: (function(): Array), dateProcess: (function(*): number)}}
 */
module.exports = {
  countMonth:countMonth,
  endDate:endDate,
  activityNum:activityNum,
  dateProcess:dateProcess
}
