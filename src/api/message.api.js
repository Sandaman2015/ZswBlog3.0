import request from '../utils/request'

// 获取所有留言
export const getMessageByPage = (limit, pageIndex, params) => {
  return request('get', `/message/get/page?limit=${limit}&pageIndex=${pageIndex}`, params)
}
// 添加留言
export const addMessage = (params) => {
  return request('post', `/message/save`, params)
}
export const getLocation = (ip, params) => {
  return request('get', `/Leactos/GetLocationByIp?ip=${ip}`, params)
}
export const getNearSaveMessage = (count, params) => {
  return request('get', `/message/get/list/${count}`, params)
}