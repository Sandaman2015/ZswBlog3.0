import request from '../utils/request'
//获取所有评论
export const getPushAnnouncement = (params) => {
  return request('get', `/announcement/get/push`, params)
}
export const getTopAnnouncement = (params) => {
  return request('get', `/announcement/get/top`, params)
}
export const getAllAnnocement = (params) => {
  return request('post', `/announcement/get/all`, params)
}
