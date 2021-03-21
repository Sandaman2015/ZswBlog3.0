import request from '../utils/request'
//获取所有评论
export const getTravelByPage = (limit,pageIndex,params) => {
  return request('get', `/travel/get/page?limit=${limit}&pageIndex=${pageIndex}`, params)
}
