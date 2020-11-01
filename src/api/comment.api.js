import request from '../utils/request'
//获取所有评论
export const getAllComment = (articleId, limit, pageIndex, params) => {
  return request('get', `/comment/get/page?articleId=${articleId}&limit=${limit}&pageIndex=${pageIndex}`, params)
}
// 添加留言
export const addComment = (params) => {
  return request('post', `/comment/save`, params)
}