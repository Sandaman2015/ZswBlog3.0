import request from '../utils/request'

// 获取用户信息
export const getQQUserInfo = (accessToken, callbackUrl, params) => {
  return request('get', `/user/login/qq?accessToken=${accessToken}&returnUrl=${callbackUrl}`, params)
}