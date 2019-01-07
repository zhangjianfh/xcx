function addrRegExp(addr){
  // var str = "中华(人民)共和国";
  // console.info(str.indexOf("(")!=-1);
  //截取括号里面的内容
  // var str = "(成都市)·广汽传祺(三和店)";
  // var reg = /[^\(\)]+(?=\))/g;
  // var res = str.match(reg);
  let reg = new RegExp(/省|市|区|县|自治区|特别行政区|自治县|自治州/g)
  let addrName = addr.split(reg)
  let addrArry = addr.match(reg)
  if(addrArry){
    if(addrArry.length == 2){
      return addrName[0]+''+addrArry[0]+'·'+addrName[1]+''+addrArry[1]
    }else if(addrArry.length == 1){
      return addrName[0]+''+addrArry[0]+'·'+addrName[1]
    }else{
      return addrName[1]+''+addrArry[1]+'·'+addrName[2]+''+addrArry[2]
    }
  }else{
    return addr
  }

}

module.exports = {
  addrRegExp: addrRegExp
}
