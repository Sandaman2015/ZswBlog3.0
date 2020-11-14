import request from '../utils/request'

// 获取所有留言
export const getInitData = (params) => {
  return request('get', `/common/get/init`, params)
}
