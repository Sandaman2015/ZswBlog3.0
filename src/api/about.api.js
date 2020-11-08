import request from '../utils/request'
//获取所有评论
export const getAllSiteTag = (params) => {
  return request('get', `/sitetag/get/all`, params)
}
export const getAllTimeLine = (params) => {
  return request('get', `/timeline/get/all`, params)
}
export const addSiteTag = (params) => {
  return request('post', `/sitetag/save`, params)
}
