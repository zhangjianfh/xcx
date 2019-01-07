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

function formatDateTime(inputTime,ty) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;

  var $thisDay = getMonthLength(m.toString()) - new Date().getDate()
  let tempDay = new Date().getDate()//今天
  let ymd = '' //拼接年月日
  let str = '' //星期临时变量
  let md = '' //年月日星期 拼接变量
  for(let i = 0; i <= $thisDay; i++ ){
    ymd = y + '-' + m + '-' + d
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
    if(tempDay == d){
      str = '今天 '
    }
  }
  if(parseInt(ty) == 0){
    return y + '年' + m + '月' + d + '日'
  }else if(parseInt(ty) == 1){
    return str
  }else{
    return h+':'+minute
  }
  // return y + '-' + m + '-' + d+' '+h+':'+minute;
}

/**
 * 计算 发布时间（1分钟前，1小时前，1天前，1个月前）
 * @param relDate
 */
function dateCount(relDate){
  let nowDate = Date.parse(new Date())
  let nTime = nowDate/1000 - relDate
  var day = Math.floor(nTime/86400) //天
  var hour = Math.floor(nTime%86400/3600) //时
  var minute = Math.floor(nTime%86400%3600/60) //分
  if(day !=0 && day <= 20){
    if(day < 0){
      return  '刚刚发布'
    }else{
      return  day+'天前发布'
    }
  }else if(day > 20){
    return formatDateTime(relDate*1000, 0)
  }else{
    // {
      if(hour != 0){
        return  hour+'小时前发布'
      }else{
        if(minute != 0){
          return minute+'分钟前发布'
        }else{
          return '刚刚发布'
        }
      }
    // }
  }
}

/**
 * 计算经纬距离
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 */
function getDistance (lat1, lng1, lat2, lng2) {
  lat1 = lat1 || 0;
  lng1 = lng1 || 0;
  lat2 = lat2 || 0;
  lng2 = lng2 || 0;

  let rad1 = lat1 * Math.PI / 180.0;
  let rad2 = lat2 * Math.PI / 180.0;
  let a = rad1 - rad2;
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

  let r = 6378.137;
  return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
}

function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance2(lat1,lng1,lat2,lng2){
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var  b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s *6378.137 ;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  //s=s.toFixed(4);
  return s.toFixed(2);
}

module.exports = {
  formatDateTime:formatDateTime,
  GetDistance2:GetDistance2,
  dateCount:dateCount
}
