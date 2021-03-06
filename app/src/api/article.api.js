import request from '../utils/request'
// 分页获取文章信息
export const getArticlesByPage = (limit, pageIndex, params) => {
  return request('get', `/article/get/page?limit=${limit}&pageIndex=${pageIndex}`, params)
}
// 获取点赞次数前五的文章
export const getArticleOnLike = (params) => {
  return request('get', `/article/get/list/like`, params)
}
// 获取浏览次数前五的文章
export const getArticleOnVisit = (params) => {
  return request('get', `/article/get/list/visit`, params)
}
// 根据类型获取分页文章
export const getArticlesPageByCategory = (limit, pageIndex, categoryId, params) => {
  return request('get', `/article/get/page?limit=${limit}&pageIndex=${pageIndex}&categoryId=${categoryId}`, params)
}
// 模糊查询文章
export const getArticleByDimTitle = (title, params) => {
  return request('get', `/article/get/fuzzy?fuzzyTitle=${title}`, params)
}
// 获取单个文章
export const getArticleById = (id, params) => {
  return request('get', `/article/get/${id}`, params)
}
// 添加文章的点赞数(目前暂定)
export const addArticleLike = (id, params) => {
  return request('post', `/article/save/like/${id}`, params)
}
