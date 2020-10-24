import request from '../utils/request'

// 获取文章类别
export const getNearUsers = (params) => {
  return request('get', `/user/get/near`, params)
}
