import request from '../utils/request'

export const getTop30MusicList = (params) => {
  return request('get', `/common/getmusiclist`, params)
}

export const getAllMusicList = (params) => {
  return request('get', `/common/GetAllMusicList`, params)
}