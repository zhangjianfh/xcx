function isNull(val){
  if(val == "" || val == undefined || val == null || val == NaN){
    return false;
  }else{
    return true;
  }
}

module.exports = {
  isNull:isNull
}
