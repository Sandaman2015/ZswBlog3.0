import request from '../utils/request'

// 获取最近登录人员列表
export const getNearUsers = (params) => {
  return request('get', `/user/get/near`, params)
}
// 保存人员邮箱
export const saveEmail = (params) => {
  return request('post', `/user/save/email`, params)
}
// 转换url
export const parseUrl = (params) =>{
  return request("get", `/user/parse/qqurl`, params)
}
