import http from './../../../base/api/public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list = (page,size,params) => {
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size)
}
export const page_add = (params) => {
  return http.requestPost(apiUrl+'/cms/page/add/',params)
}
export const page_get = id => {
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
}
export const page_edit = (id,params) => {
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
}
export const page_delete = (id) => {
  return http.requestDelete(apiUrl+'/cms/page/delete/'+id)
}







