import request from '../utils/request'
import * as storage from '../utils/storage'

/**
 * 登录
 * @param {object} data 登录数据
 */
export const login = async data => {
  try {
    const res = await request.post('user/login', data)
    if (res.success) {
      storage.set('token', 'Bearer ' + res.data.access_token)
    }
    return res
  } catch (err) {
    return Promise.reject(err)
  }
}

/**
 * 刷新 access_token
 */
export const refreshToken = () => { }

/**
 * 登出
 */
export const loginout = () => {
  return storage.clear()
}
