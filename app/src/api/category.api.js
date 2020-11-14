import request from '../utils/request'
//获取所有评论
export const getAllCategory = (params) => {
  return request('get', `/category/get/all`, params)
}
export const getCategoryById = (id,params) => {
  return request('get', `/category/get/${id}`, params)
}
