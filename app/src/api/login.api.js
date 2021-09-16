import request from '../utils/request'

// 获取登录地址
export const getQQLoginUrl = (params) => {
  return request('get', `/user/generate/qqurl`, params)
}
