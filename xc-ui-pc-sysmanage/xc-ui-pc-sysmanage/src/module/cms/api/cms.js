import http from './../../../base/api/public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list = (page,size,params) => {
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size)
}
export const page_add = (params) => {
  return http.requestPost(apiUrl+'/cms/page/add/',params)
}





