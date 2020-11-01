import request from '../utils/request'

export const getMusicList = (params) => {
  return request('get', `/music/get/top`, params)
}