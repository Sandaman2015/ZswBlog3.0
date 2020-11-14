import request from '../utils/request'

// 获取所有留言
export const getAllFriendLink = (params) => {
  return request('get', `/friendlink/get/all`, params)
}
export const applyFriendLink = (params) => {
  return request('post', `/friendlink/save`, params)
}
